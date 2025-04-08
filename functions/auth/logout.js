import { debugLog } from './_utils';

export async function onRequest({ request, env }) {
  debugLog(env, "Logout requested");

  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Logging Out...</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/assets/css/auth.css">
        <script>
            window.onload = () => {
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        </script>
    </head>
    <body>
        <div class="container">
            <h1>Logging out...</h1>
        </div>
    </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': `${env.COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
    }
  });
}
