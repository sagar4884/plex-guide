// Import debug logger
import { debugLog } from './_utils';

// Define constants for Jellyfin auth header
const CLIENT_NAME = "CloudflareAuth"; // Simple name for this app accessing Jellyfin
const DEVICE_NAME = "Cloudflare Function"; // Description of device
const DEVICE_ID = "cloudflare-jellyfin-auth-v1"; // A unique ID for this app instance
const APP_VERSION = "1.0.0"; // Version of this auth app

export async function onRequest({ request, env }) {
  // --- Check Request Method ---
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    // --- Parse Request Body ---
    let username, password;
    try {
      const body = await request.json();
      username = body.username;
      password = body.password;
    } catch (e) {
      debugLog(env, "Failed to parse request body:", e);
      return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // --- Validate Inputs ---
    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // --- Validate Environment Variables ---
    if (!env.JELLYFIN_URL || !env.JELLYFIN_APP_NAME || !env.COOKIE_NAME) {
       console.error("Missing required Jellyfin environment variables (JELLYFIN_URL, JELLYFIN_APP_NAME, COOKIE_NAME)");
       throw new Error("Server configuration error.");
    }
    debugLog(env, "Jellyfin environment variables validated.");

    // --- Prepare Jellyfin API Request ---
    const jellyfinAuthUrl = `${env.JELLYFIN_URL.replace(/\/$/, '')}/Users/AuthenticateByName`;
    const jellyfinRequestBody = JSON.stringify({
      Username: username,
      Pw: password // Jellyfin API uses 'Pw'
    });

    // Construct the authorization header required by Jellyfin
    // Using JELLYFIN_APP_NAME provides better context in Jellyfin dashboard
    const jellyfinAuthHeader = `MediaBrowser Client="${env.JELLYFIN_APP_NAME}", Device="${DEVICE_NAME}", DeviceId="${DEVICE_ID}", Version="${APP_VERSION}"`;

    debugLog(env, `Attempting Jellyfin auth for user ${username} at ${jellyfinAuthUrl}`);

    // --- Call Jellyfin API ---
    const jellyfinResponse = await fetch(jellyfinAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Emby-Authorization': jellyfinAuthHeader // Preferred header for Jellyfin/Emby APIs
        // Alternatively, use 'Authorization': jellyfinAuthHeader, but X-Emby-Authorization is more common in examples
      },
      body: jellyfinRequestBody
    });

    // --- Handle Jellyfin API Response ---
    if (!jellyfinResponse.ok) {
      if (jellyfinResponse.status === 401) {
        debugLog(env, `Jellyfin auth failed for user ${username}: Invalid credentials`);
        return new Response(JSON.stringify({ error: 'Invalid username or password.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      } else {
        debugLog(env, `Jellyfin auth failed for user ${username}: Status ${jellyfinResponse.status}`, await jellyfinResponse.text());
        return new Response(JSON.stringify({ error: 'Jellyfin server error during authentication.' }), { status: jellyfinResponse.status, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // --- Process Successful Authentication ---
    const jellyfinData = await jellyfinResponse.json();
    const jellyfinAccessToken = jellyfinData.AccessToken;
    const jellyfinUserId = jellyfinData.User?.Id; // Optional: get user ID

    if (!jellyfinAccessToken) {
      debugLog(env, `Jellyfin auth succeeded for user ${username} but no AccessToken found in response.`);
      throw new Error("Jellyfin authentication response missing token.");
    }

    debugLog(env, `Jellyfin auth successful for user ${username} (ID: ${jellyfinUserId}). Setting cookie.`);

    // --- Set Authentication Cookie ---
    // We store ONLY the Jellyfin AccessToken directly for now.
    // We will handle distinguishing Plex vs Jellyfin tokens in the next step.
    const cookieValue = `${env.COOKIE_NAME}=${jellyfinAccessToken}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`; // 7 days expiration

    // --- Return Success Response to Frontend ---
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieValue
      }
    });

  } catch (error) {
    // --- Handle Unexpected Errors ---
    console.error("Error in /auth/jellyfin-login:", error);
    debugLog(env, "Error in /auth/jellyfin-login:", error.message);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
