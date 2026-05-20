import type { MiddlewareHandler } from 'astro';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;

  if (pathname.startsWith('/fonts/')) {
    response.headers.set('Cache-Control', `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`);
  }

  // Security headers for all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
};
