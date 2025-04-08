export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);

  // Skip auth check for auth routes and assets
  if (url.pathname.startsWith('/auth/') ||
      url.pathname.startsWith('/assets/') ||
      url.pathname.match(/\.(ico|css|js|png|jpg|webp)$/)) {
    return next();
  }

  try {
    const cookie = request.headers.get("Cookie");
    if (!cookie) {
      return Response.redirect(`${url.origin}/auth/login`, 302);
    }

    // Check if we have a valid auth cookie
    const token = cookie.split(";")
      .find((c) => c.trim().startsWith(`${env.COOKIE_NAME}=`))
      ?.split("=")[1];

    if (!token) {
      return Response.redirect(`${url.origin}/auth/login`, 302);
    }

    // Continue to the requested page
    return next();

  } catch (error) {
    console.error('Middleware Authentication Error', error);
    return Response.redirect(`${url.origin}/auth/login`, 302);
  }
}
