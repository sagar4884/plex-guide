import { debugLog, checkServerAccess, logResourceAccess } from './_utils';

export async function onRequest({ request, env }) {
  try {
    const url = new URL(request.url);
    debugLog(env, "Processing request", { url: url.toString() });

    // Validate required environment variables
    if (!env.COOKIE_NAME || !env.PLEX_CLIENT_ID) {
      throw new Error("Missing required environment variables");
    }

    debugLog(env, "Environment variables validated");

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
            logResourceAccess(env, url);
            return new Response(null, {
              status: 200,
              headers: new Headers({ "X-Auth-Status": "authenticated" }),
            });
          }
        }
        debugLog(env, "Session token invalid or expired");
      }
    }

    // Show login page
    debugLog(env, "Showing login page");
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Login Required</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/assets/css/auth.css">
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
          </div>
          <script src="/auth/js"></script>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    debugLog(env, "Fatal error:", error);
    console.error("OAuth Error:", error.message, error.stack);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
