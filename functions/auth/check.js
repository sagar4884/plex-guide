// functions/auth/check.js
import { debugLog, checkServerAccess } from './_utils';

export async function onRequest({ request, env }) {
  try {
    debugLog(env, "Auth check requested");

    // Check for existing session
    const cookie = request.headers.get("Cookie");
    if (cookie && cookie.includes(env.COOKIE_NAME)) {
      const token = cookie.split(";")
        .find((c) => c.trim().startsWith(`${env.COOKIE_NAME}=`))
        ?.split("=")[1];

      if (token) {
        debugLog(env, "Checking session token");
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

          const hasAccess = checkServerAccess(resources, env);

          if (hasAccess) {
            debugLog(env, "Valid session token");
            return new Response(null, { status: 200 });
          }
        }
        debugLog(env, "Session token invalid or expired");
      }
    }

    // If we get here, no valid session
    return new Response("Unauthorized", { status: 401 });

  } catch (error) {
    debugLog(env, "Auth check error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
