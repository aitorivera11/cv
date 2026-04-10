import type { MiddlewareHandler } from 'astro';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;

  if (pathname.startsWith('/fonts/')) {
    response.headers.set('Cache-Control', `public, max-age=${ONE_YEAR_IN_SECONDS}, immutable`);
  }

  return response;
};
