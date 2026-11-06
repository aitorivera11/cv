import type { MiddlewareHandler } from 'astro';
import { contentSecurityPolicy } from './lib/csp';

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
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Pàgines HTML dinàmiques: Cloudflare (si fa cache) pot servir-les 60 s i revalidar en segon pla.
  if (
    context.request.method === 'GET' &&
    response.status === 200 &&
    (response.headers.get('content-type') ?? '').includes('text/html') &&
    !response.headers.has('Cache-Control')
  ) {
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
  }

  // CSP només per a documents HTML (no per a PDF ni JSON de l'API)
  if ((response.headers.get('content-type') ?? '').includes('text/html')) {
    response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  }

  return response;
};
