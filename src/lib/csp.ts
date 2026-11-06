function originOf(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

// L'script d'analítica (si n'hi ha) pot venir d'un altre domini.
const analyticsOrigin = originOf(import.meta.env.PUBLIC_ANALYTICS_SRC);

// 'unsafe-inline' a script-src és necessari: Astro injecta scripts d'illes i
// el tema fa servir un script inline. La resta de directives sí que restringeixen.
const baseDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${analyticsOrigin ? ` ${analyticsOrigin}` : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://api.emailjs.com${analyticsOrigin ? ` ${analyticsOrigin}` : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
];

// Capçalera HTTP (inclou frame-ancestors, que no es pot posar en un <meta>)
export const contentSecurityPolicy = [...baseDirectives, "frame-ancestors 'self'"].join('; ');

// Per al <meta>: les pàgines prerenderitzades no passen pel middleware i no tenen capçaleres.
export const contentSecurityPolicyMeta = baseDirectives.join('; ');
