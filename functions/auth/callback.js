import { debugLog, checkServerAccess, logAuthentication } from './_utils';

export async function onRequest({ request, env }) {
  try {
    const url = new URL(request.url);
    debugLog(env, "Processing callback");

    const pinId = url.searchParams.get("pinId");
    if (!pinId) {
      debugLog(env, "No pin ID provided");
      return new Response("No pin ID provided", { status: 400 });
    }

    const headers = {
      "Accept": "application/json",
      "X-Plex-Client-Identifier": env.PLEX_CLIENT_ID,
      "X-Plex-Product": "Plex Server Guide"
    };

    const pinCheckResponse = await fetch(`https://plex.tv/api/v2/pins/${pinId}`, {
      headers
    });

    if (!pinCheckResponse.ok) {
      debugLog(env, "Failed to check pin status");
      return new Response("Failed to check pin status", { status: 500 });
    }

    const pinData = await pinCheckResponse.json();

    if (pinData.authToken) {
      debugLog(env, "Retrieved auth token");
      const resourcesResponse = await fetch("https://plex.tv/api/v2/resources", {
        headers: {
          ...headers,
          "X-Plex-Token": pinData.authToken
        }
      });

      if (!resourcesResponse.ok) {
        throw new Error("Failed to verify server access");
      }

      const resources = await resourcesResponse.json();
      const hasAccess = checkServerAccess(resources, env);

      if (!hasAccess) {
        debugLog(env, "User does not have access to server");
        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Access Denied</title>
            <meta charset="UTF-8">
            <script>
              try {
                if (window.opener && !window.opener.closed) {
                  window.opener.location.href = "/auth/access-denied";
                } else {
                  window.location.href = "/auth/access-denied";
                }
              } catch (e) {
                window.location.href = "/auth/access-denied";
              }
              setTimeout(() => window.close(), 500);
            </script>
          </head>
          </html>
        `, {
          status: 403,
          headers: {
            'Content-Type': 'text/html',
            'Set-Cookie': `${env.COOKIE_NAME}_checked=1; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
          }
        });
      }

      debugLog(env, "User authenticated successfully");
      await logAuthentication(env, pinData.authToken, true);

      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authentication Successful</title>
          <script>
            try {
              if (window.opener && !window.opener.closed) {
                window.opener.location.href = '/';
                window.close();
              } else {
                window.location.href = '/';
              }
            } catch (e) {
              window.location.href = '/';
            }
          </script>
        </head>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Set-Cookie': `${env.COOKIE_NAME}=${pinData.authToken}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
        }
      });
    }

    debugLog(env, "Auth token not yet available");
    return new Response("Authentication token not yet available", { status: 403 });

  } catch (error) {
    debugLog(env, "Callback error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
