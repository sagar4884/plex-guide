import { debugLog, checkServerAccess, logResourceAccess, validateJellyfinToken } from './_utils'; // Added validateJellyfinToken import

export async function onRequest({ request, env }) {
  try {
    const url = new URL(request.url);
    debugLog(env, `Processing request in [[route]].txt for: ${url.pathname}`);

    // Validate required base environment variables
    if (!env.COOKIE_NAME) {
      console.error("Missing COOKIE_NAME environment variable.");
      throw new Error("Server configuration error: Missing COOKIE_NAME.");
    }
     // PLEX_CLIENT_ID and PLEX_SERVER_ID are only needed for Plex validation path below
     // JELLYFIN_URL and JELLYFIN_APP_NAME are needed for Jellyfin validation path below

    debugLog(env, "Base environment variables validated.");

    // --- Check for existing session cookie ---
    const cookie = request.headers.get("Cookie");
    let isValidSession = false; // Flag to track if any validation succeeded

    if (cookie && cookie.includes(env.COOKIE_NAME)) {
      const token = cookie.split(";")
        .find((c) => c.trim().startsWith(`${env.COOKIE_NAME}=`))
        ?.split("=")[1];

      if (token) {
        debugLog(env, "Found auth token in cookie. Starting validation...");

        // --- Attempt 1: Validate as Jellyfin Token ---
        const isJellyfinTokenValid = await validateJellyfinToken(token, env);

        if (isJellyfinTokenValid) {
           debugLog(env, "Token validated successfully as Jellyfin session.");
           isValidSession = true;
        } else {
           debugLog(env, "Token failed Jellyfin validation. Attempting Plex validation...");

           // --- Attempt 2: Validate as Plex Token ---
           // Check if Plex config exists before attempting Plex validation
           if (!env.PLEX_CLIENT_ID || !env.PLEX_SERVER_ID) {
               debugLog(env, "Plex environment variables (PLEX_CLIENT_ID, PLEX_SERVER_ID) missing, skipping Plex validation.");
           } else {
               try {
                   const resourcesResponse = await fetch("https://plex.tv/api/v2/resources", {
                       headers: {
                           "X-Plex-Token": token,
                           "X-Plex-Client-Identifier": env.PLEX_CLIENT_ID,
                           "Accept": "application/json",
                       },
                       // Add a timeout? Cloudflare fetch doesn't support timeout directly. Consider signal/AbortController if needed.
                   });

                   if (resourcesResponse.ok) {
                       const resources = await resourcesResponse.json();
                       // Ensure checkServerAccess handles potentially non-array/malformed resources
                       const hasPlexAccess = checkServerAccess(resources, env);

                       if (hasPlexAccess) {
                           debugLog(env, "Token validated successfully as Plex session with server access.");
                           isValidSession = true;
                       } else {
                           debugLog(env, "Plex token was valid but user lacks access to the specific server.");
                           // isValidSession remains false
                       }
                   } else {
                       debugLog(env, `Plex /resources fetch failed: Status ${resourcesResponse.status}`);
                       // isValidSession remains false
                   }
               } catch (plexError) {
                   console.error("Error during Plex validation fetch:", plexError);
                   debugLog(env, "Error during Plex validation fetch:", plexError.message);
                   // isValidSession remains false
               }
           } // End Plex validation block
        } // End else (Jellyfin failed) block

      } else {
          debugLog(env, "Auth cookie found but token parsing failed.");
      } // End if(token)
    } else {
        debugLog(env, "Auth cookie not found.");
    } // End if(cookie)

    // --- Handle Validation Result ---
    if (isValidSession) {
      debugLog(env, "Session is valid. Allowing access.");
      logResourceAccess(env, url); // Log access if session is valid
      // Indicate success; middleware should pass request to actual page handler/static asset
      // Returning 200 OK here might intercept the request before it hits the actual page.
      // Let's rely on the middleware behavior: if we don't redirect, it proceeds.
      // However, returning *something* might be necessary for Functions routing.
      // Let's return a 200 with a special header middleware *could* check if needed.
       return new Response(null, {
         status: 200, // Or maybe 204 No Content? Let's stick with 200 for now.
         headers: new Headers({ "X-Auth-Validation-Status": "success" }),
       });
    } else {
      // --- Show Login Page if Session is Invalid or Missing ---
      debugLog(env, "Session invalid or missing. Showing login page.");
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
              /* Style for Jellyfin button (can move to auth.css) */
              .jellyfin-button { background-color: #00a4dc; color: white; border: none; cursor: pointer; }
              .jellyfin-button:hover { background-color: #008bbd; }
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
    } // End else (session invalid)

  } catch (error) {
    console.error("Fatal error in [[route]].txt handler:", error);
    debugLog(env, "Fatal error in [[route]].txt handler:", error.message);
    // Ensure a generic error response is sent
    return new Response(`An unexpected server error occurred. Please try again later.`, { status: 500 });
  }
}
