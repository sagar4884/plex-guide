import { debugLog } from './_utils';

export async function onRequest({ request, env }) {
  debugLog(env, "Access denied page requested");

  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Access Denied</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/assets/css/auth.css">
    </head>
    <body>
      <div class="container">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this server's documentation.</p>
      </div>
    </body>
    </html>
  `, {
    status: 403,
    headers: { 'Content-Type': 'text/html' }
  });
}
