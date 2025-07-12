export async function GET() {
  const pages = ['', 'es', 'en']; 

  const urls = pages.map(
    (page) => `
    <url>
      <loc>https://aitorivera.com/${page}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`
  );

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${urls.join('')}
     </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}
