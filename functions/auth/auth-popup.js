import { debugLog } from './_utils';

export async function onRequest({ request, env }) {
  debugLog(env, "Auth popup requested");

  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Connecting to Plex...</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/assets/css/auth.css">
    </head>
    <body>
        <div class="container">
            <div class="loading"></div>
            <h1>Connecting to Plex...</h1>
            <p>You'll be redirected to Plex.tv to sign in.</p>
        </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}
