// Directus simulado para probar el proyecto sin una instancia real (CI y pruebas locales).
//   node scripts/mock-directus.mjs            # escucha en el puerto 8055 (o MOCK_DIRECTUS_PORT)
// Usa DIRECTUS_URL=http://127.0.0.1:8055 y un DIRECTUS_TOKEN cualquiera.
import http from 'node:http';

const PORT = Number(process.env.MOCK_DIRECTUS_PORT ?? 8055);

const loc = (base, value) => ({
  [`${base}_ca`]: `${value} CA`,
  [`${base}_es`]: `${value} ES`,
  [`${base}_en`]: `${value} EN`,
});

const data = {
  site_settings: {
    foto: 'abc123',
    nom: 'Aitor Test',
    ...loc('titol', 'Dev'),
    ...loc('resum_sidebar', 'Resum'),
    ...loc('descripcio_sobre_mi', 'Sobre mi'),
    linkedin_url: 'https://linkedin.com/in/x',
    github_url: 'https://github.com/x',
    email: 'a@b.c',
  },
  blog_settings: { ...loc('title', 'Blog'), ...loc('description', 'Desc') },
  post: [
    {
      slug: 'hola',
      cover_image: 'cover123',
      published_at: '2026-01-01T00:00:00Z',
      ...loc('title', 'Hola'),
      ...loc('excerpt', 'Extracto'),
      body_ca: 'Text',
      categories: [],
      tags: [],
    },
  ],
  category: [],
  tag: [],
  experiencia: [{ id: 1, ...loc('titol', 'Feina'), empresa: 'ACME', data_inici: '2020-01-01', ...loc('descripcio', 'd') }],
  formacio: [{ id: 1, ...loc('titol', 'Grau'), centre: 'UPC', ...loc('descripcio', 'd') }],
  habilitat: [
    { categoria: 'tecnica', ...loc('nom', 'Django') },
    { categoria: 'tecnica', ...loc('nom', 'SQL') },
    { categoria: 'clau', ...loc('nom', 'Lideratge') },
  ],
};

http
  .createServer((req, res) => {
    // Imágenes: un fichero mínimo con tipo image/webp
    if (req.url.startsWith('/assets/')) {
      res.writeHead(200, { 'content-type': 'image/webp' });
      return res.end(Buffer.from('RIFFxxxxWEBP'));
    }

    const name = req.url.split('?')[0].split('/').pop();
    let out = data[name] ?? [];

    // Filtro por slug (?filter[slug][_eq]=x o filter={"slug":{"_eq":"x"}})
    const url = decodeURIComponent(req.url);
    const slug = url.match(/slug\]?\[_eq\]=([^&]+)/) || url.match(/"slug":\{"_eq":"([^"]+)"/);
    if (name === 'post' && slug) out = out.filter((post) => post.slug === slug[1]);

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ data: out }));
  })
  .listen(PORT, () => console.log(`Directus simulado en el puerto ${PORT}`));
