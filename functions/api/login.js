// functions/api/login.js
import jwt from '@tsndr/cloudflare-worker-jwt'; // See note below about dependencies

// Basic input validation (add more robust validation as needed)
function validateInput(username, password) {
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }
  return true;
}

export async function onRequestPost({ request, env }) {
  try {
    // Read the username and password from the incoming request body
    const { username, password } = await request.json();

    // Basic validation
    if (!validateInput(username, password)) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // --- Call Jellyfin API ---
    const jellyfinAuthUrl = `${env.JELLYFIN_SERVER_URL}/Users/AuthenticateByName`;
    // Use the app name from environment variables, provide a default if not set
    const appName = env.JELLYFIN_APP_NAME || 'CloudflareDocs';
    // Construct the necessary header for Jellyfin API auth
    const authHeader = `MediaBrowser Client="${appName}", Device="CloudflareFunction", DeviceId="cloudflare-${appName}-${Date.now()}", Version="1.0.0"`; // Added timestamp for uniqueness

    console.log(`Attempting Jellyfin auth to: ${jellyfinAuthUrl} for user: ${username}`); // Basic logging

    const response = await fetch(jellyfinAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Emby-Authorization': authHeader,
        // Add any other necessary headers if your Jellyfin/tunnel requires them (e.g., CF Access headers if tunnel is protected)
      },
      body: JSON.stringify({ Username: username, Pw: password }), // Note: Jellyfin API uses "Pw"
    });

    // --- Process Jellyfin Response ---
    if (response.ok) {
      const data = await response.json();
      console.log(`Jellyfin auth successful for user: ${data.User.Name}`);

      // --- Create JWT Session Token ---
      const token = await jwt.sign({
        userId: data.User.Id,        // Store Jellyfin User ID
        username: data.User.Name,    // Store Jellyfin Username
        authMethod: 'jellyfin',      // Indicate how the user logged in
        // Add other relevant, non-sensitive user data if needed
        iss: appName,                // Issuer claim (using app name)
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expires in 24 hours (adjust as needed)
      }, env.JWT_SECRET); // Sign with the secret from environment variables

      // --- Set Session Cookie ---
      // Use the cookie name from environment variables (same one middleware will check)
      const cookieName = env.COOKIE_NAME; // Keeping the same name as you specified
      const cookieOptions = `HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax`; // Max-Age should match JWT expiry (in seconds)

      // Return success response to the frontend, setting the cookie
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Set-Cookie': `${cookieName}=${token}; ${cookieOptions}`,
          'Content-Type': 'application/json'
        }
      });

    } else {
      // Jellyfin login failed
      console.error(`Jellyfin Auth Failed: ${response.status} ${response.statusText}`);
      // Optionally read response body for more details if available
      // const errorBody = await response.text();
      // console.error(`Jellyfin Error Body: ${errorBody}`);
      return new Response(JSON.stringify({ error: 'Invalid Jellyfin credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error) {
    console.error('Login API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// Handle methods other than POST
export async function onRequestGet({ request, env }) {
    // You could optionally return the login page HTML here if accessed via GET
    // For now, just disallow GET
    return new Response('Method Not Allowed', { status: 405 });
}
// Add handlers for other methods (PUT, DELETE etc) if needed, returning 405

// Default handler if only POST is defined above
export async function onRequest({ request, env }) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    // This might not be needed if onRequestPost handles everything
}
