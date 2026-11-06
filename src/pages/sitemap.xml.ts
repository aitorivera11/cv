import type { APIRoute } from 'astro';
import { getPosts } from '../lib/directus-content';

const SITE = 'https://aitorivera.com';
const LANGS = [
  { code: 'ca', hreflang: 'ca-ES', prefix: '' },
  { code: 'es', hreflang: 'es-ES', prefix: 'es/' },
  { code: 'en', hreflang: 'en-US', prefix: 'en/' },
] as const;

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Entrada amb les alternatives d'idioma. `path` és el que va després del prefix d'idioma.
function entry(path: (prefix: string) => string, lastmod?: string) {
  const links = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${escapeXml(SITE + path(l.prefix))}" />`,
  ).join('\n');

  return LANGS.map(
    (l) => `  <url>
    <loc>${escapeXml(SITE + path(l.prefix))}</loc>${lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ''}
${links}
  </url>`,
  ).join('\n');
}

export const GET: APIRoute = async () => {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts('ca');
  } catch (error) {
    console.error('Sitemap: no s\'han pogut carregar els posts', error);
  }

  const urls = [
    entry((prefix) => `/${prefix}`),
    entry((prefix) => `/${prefix}blog`),
    ...posts.map((post) =>
      entry((prefix) => `/${prefix}blog/${post.slug}`, post.publishedAt ? post.publishedAt.slice(0, 10) : undefined),
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
};
