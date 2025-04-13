// functions/auth/check.js
import { debugLog, checkServerAccess, validateJellyfinToken } from './_utils'; // Added validateJellyfinToken import

export async function onRequest({ request, env }) {
  try {
    debugLog(env, "Auth check endpoint requested");

    // Check for existing session cookie
    const cookie = request.headers.get("Cookie");
    let isValidSession = false; // Flag to track if any validation succeeded

    if (cookie && cookie.includes(env.COOKIE_NAME)) {
      const token = cookie.split(";")
        .find((c) => c.trim().startsWith(`${env.COOKIE_NAME}=`))
        ?.split("=")[1];

      if (token) {
        debugLog(env, "Auth check: Found token. Starting validation...");

        // --- Attempt 1: Validate as Jellyfin Token ---
        const isJellyfinTokenValid = await validateJellyfinToken(token, env);

        if (isJellyfinTokenValid) {
          debugLog(env, "Auth check: Token validated successfully as Jellyfin session.");
          isValidSession = true;
        } else {
          debugLog(env, "Auth check: Token failed Jellyfin validation. Attempting Plex validation...");

           // --- Attempt 2: Validate as Plex Token ---
           // Check if Plex config exists before attempting Plex validation
           if (!env.PLEX_CLIENT_ID || !env.PLEX_SERVER_ID) {
               debugLog(env, "Auth check: Plex environment variables (PLEX_CLIENT_ID, PLEX_SERVER_ID) missing, skipping Plex validation.");
           } else {
              try {
                  const resourcesResponse = await fetch("https://plex.tv/api/v2/resources", {
                    headers: {
                      "X-Plex-Token": token,
                      "X-Plex-Client-Identifier": env.PLEX_CLIENT_ID,
                      "Accept": "application/json",
                    },
                  });

                  if (resourcesResponse.ok) {
                    const resources = await resourcesResponse.json();
                    // Ensure checkServerAccess handles potentially non-array/malformed resources
                    const hasPlexAccess = checkServerAccess(resources, env);

                    if (hasPlexAccess) {
                      debugLog(env, "Auth check: Token validated successfully as Plex session with server access.");
                      isValidSession = true;
                    } else {
                      debugLog(env, "Auth check: Plex token was valid but user lacks access to the specific server.");
                      // isValidSession remains false
                    }
                  } else {
                      debugLog(env, `Auth check: Plex /resources fetch failed: Status ${resourcesResponse.status}`);
                      // isValidSession remains false
                  }
              } catch (plexError) {
                  console.error("Error during Auth check Plex validation fetch:", plexError);
                  debugLog(env, "Error during Auth check Plex validation fetch:", plexError.message);
                  // isValidSession remains false
              }
           } // End Plex validation block
        } // End else (Jellyfin failed) block

      } else {
          debugLog(env, "Auth check: Auth cookie found but token parsing failed.");
      } // End if(token)
    } else {
        debugLog(env, "Auth check: Auth cookie not found.");
    } // End if(cookie)

    // --- Return Result ---
    if (isValidSession) {
      debugLog(env, "Auth check: Session is valid.");
      return new Response(null, { status: 200 }); // OK, session valid
    } else {
      debugLog(env, "Auth check: Session invalid or missing.");
      return new Response("Unauthorized", { status: 401 }); // Unauthorized
    }

  } catch (error) {
    console.error("Error in /auth/check handler:", error);
    debugLog(env, "Auth check error:", error.message);
    return new Response(`Auth check error: ${error.message}`, { status: 500 });
  }
}
