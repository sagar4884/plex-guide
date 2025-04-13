import { debugLog, checkServerAccess, logResourceAccess } from './_utils';

export async function onRequest({ request, env }) {
  try {
    const url = new URL(request.url);
    debugLog(env, "Processing request", { url: url.toString() });

    // Validate required environment variables
    // Note: We will add JELLYFIN_URL validation later when implementing Jellyfin logic
    if (!env.COOKIE_NAME || !env.PLEX_CLIENT_ID) {
      throw new Error("Missing required environment variables");
    }

    debugLog(env, "Environment variables validated");

    // Check for existing session
    // Note: This section will be updated later to handle both Plex and Jellyfin tokens
    const cookie = request.headers.get("Cookie");
    if (cookie && cookie.includes(env.COOKIE_NAME)) {
      const token = cookie.split(";")
        .find((c) => c.trim().startsWith(`${env.COOKIE_NAME}=`))
        ?.split("=")[1];

      if (token) {
        // Current logic only checks Plex. This will be modified.
        debugLog(env, "Checking session token (Plex logic)");
        const resourcesResponse = await fetch("https://plex.tv/api/v2/resources", {
          headers: {
            "X-Plex-Token": token,
            "X-Plex-Client-Identifier": env.PLEX_CLIENT_ID,
            "Accept": "application/json",
          },
        });

        if (resourcesResponse.ok) {
          const resources = await resourcesResponse.json();
          debugLog(env, "Resources response:", resources);

          // Check access using the Plex-specific function
          const hasAccess = checkServerAccess(resources, env);

          if (hasAccess) {
            debugLog(env, "Valid Plex session token");
            logResourceAccess(env, url);
            // Return a simple 200 OK or similar if auth is valid
            // This path might not be hit if middleware handles valid sessions correctly,
            // but serves as a fallback validation.
             return new Response(null, {
               status: 200,
               headers: new Headers({ "X-Auth-Status": "authenticated" }),
             });
          }
        }
        // If resource check fails or token is invalid for Plex
        debugLog(env, "Session token invalid or expired (Plex logic)");
        // Proceed to show login page below
      }
    }

    // --- Show login page if no valid session ---
    debugLog(env, "Showing login page");
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Login Required</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/assets/css/auth.css">
          <style>
            .login-form { margin-top: 20px; }
            .login-form label { display: block; margin-bottom: 5px; }
            .login-form input { width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box; }
            .login-form button { width: 100%; padding: 10px; }
            .separator { text-align: center; margin: 15px 0; color: #ccc; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Login Required</h1>
              <p>You must be logged in to access this content.</p>

              <button onclick="startPlexAuth()" class="plex-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 12L4 4V20L20 12Z" fill="currentColor"/>
                  </svg>
                  Login with Plex
              </button>
              <div class="separator">OR</div>

              <form id="jellyfinLoginForm" class="login-form">
                <label for="jellyfinUsername">Jellyfin Username:</label>
                <input type="text" id="jellyfinUsername" name="username" required>

                <label for="jellyfinPassword">Password:</label>
                <input type="password" id="jellyfinPassword" name="password" required>

                <button type="submit" class="jellyfin-button">Login with Jellyfin</button>
                 </form>
              <div id="loginStatus" style="margin-top: 15px; color: red;"></div>

          </div>
          <script src="/auth/js"></script>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    debugLog(env, "Fatal error in [[route]].txt:", error);
    console.error("OAuth Error:", error.message, error.stack);
    // Ensure a generic error response is sent
    return new Response(`An unexpected error occurred. Please try again later. Details: ${error.message}`, { status: 500 });
  }
}
