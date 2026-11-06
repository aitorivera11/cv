import type { APIRoute } from 'astro';

// URL antiga (generada per @astrojs/sitemap): redirigim al sitemap actual.
export const GET: APIRoute = ({ redirect }) => redirect('/sitemap.xml', 301);
