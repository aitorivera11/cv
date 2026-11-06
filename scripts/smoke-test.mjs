// Prueba de humo contra un servidor ya arrancado:  node scripts/smoke-test.mjs [http://localhost:4321]
const base = process.argv[2] ?? 'http://localhost:4321';

// [ruta, estado esperado]
const routes = [
  ['/', 200], ['/es', 200], ['/en', 200],
  ['/blog', 200], ['/es/blog', 200], ['/en/blog', 200],
  ['/blog/hola', 200], ['/es/blog/hola', 200], ['/en/blog/hola', 200],
  ['/blog/no-existe', 404], ['/es/blog/no-existe', 404],
  ['/fr', 404], ['/es/otra-cosa', 404], ['/404', 404],
  ['/robots.txt', 200], ['/sitemap.xml', 200],
];

let failures = 0;
const check = (ok, message) => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${message}`);
  if (!ok) failures++;
};

for (const [path, expected] of routes) {
  const res = await fetch(base + path, { redirect: 'manual' });
  check(res.status === expected, `${path} -> ${res.status} (esperado ${expected})`);
}

const home = await fetch(base + '/es');
const html = await home.text();
check(/<html lang="es"/.test(html), '/es declara lang="es"');
check(html.includes('rel="canonical" href="https://aitorivera.com/es/"'), '/es tiene canonical correcto');
check(Boolean(home.headers.get('content-security-policy')), '/es envía Content-Security-Policy');
check(Boolean(home.headers.get('strict-transport-security')), '/es envía Strict-Transport-Security');

check(html.includes('id="contacte"'), '/es incluye la sección de contacto final');
check(html.includes('href="mailto:'), '/es muestra el correo con enlace mailto');

const post = await (await fetch(base + '/es/blog/hola')).text();
const og = post.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? '';
check(og.startsWith('https://'), `og:image del post es una URL absoluta (${og.slice(0, 60)}…)`);

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
check(sitemap.includes('/es/blog/hola'), 'el sitemap incluye los posts en todos los idiomas');

const old = await fetch(base + '/sitemap-index.xml', { redirect: 'manual' });
check(old.status === 301, '/sitemap-index.xml redirige (301)');

const invalidLang = await fetch(base + '/api/cv/zz');
check(invalidLang.status === 400, '/api/cv con idioma inválido -> 400');

if (failures > 0) {
  console.error(`\n${failures} comprobación(es) fallida(s)`);
  process.exit(1);
}
console.log('\nTodo correcto');
