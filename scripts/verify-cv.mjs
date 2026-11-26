#!/usr/bin/env node
// Verifica los PDF del CV (los 3 idiomas) con poppler-utils: pdffonts, pdftotext, pdfinfo, pdftoppm.
//   node scripts/verify-cv.mjs http://127.0.0.1:4321 [carpeta-de-salida]
// Comprueba: sin fuentes Type 3 · una página A4 · orden de secciones · habilidades separadas ·
// título/idioma · nombre de descarga · ningún texto de otro idioma · sin [PENDIENTE].
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const out = process.argv[3] ?? 'cv-verify';
mkdirSync(out, { recursive: true });

const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' });

const SECTIONS = {
  ca: ['Experiència professional', 'Projectes', 'Formació', 'Habilitats tècniques', 'Idiomes'],
  es: ['Experiencia profesional', 'Proyectos', 'Formación', 'Habilidades técnicas', 'Idiomas'],
  en: ['Professional experience', 'Projects', 'Education', 'Technical skills', 'Languages'],
};

// Vocabulario distintivo: una palabra de otro idioma que no exista también en el propio es un fallo.
const VOCAB = {
  ca: ['amb', 'els', 'dels', 'les', 'aquest', 'també', 'més', 'anys', 'gestió', 'tècniques', 'habilitats', 'tecnologies',
    'experiència', 'formació', 'projectes', 'desenvolupador', 'administració', 'estratègia', 'innovació', 'lideratge',
    'nadiu', 'català', 'castellà', 'anglès', 'idiomes', 'contacte', 'botiga', 'titulació', 'sènior', 'actualitat', 'per'],
  es: ['con', 'los', 'del', 'esta', 'también', 'años', 'gestión', 'técnicas', 'habilidades', 'tecnologías', 'experiencia',
    'formación', 'proyectos', 'desarrollador', 'administración', 'estrategia', 'innovación', 'liderazgo', 'nativo',
    'catalán', 'castellano', 'inglés', 'idiomas', 'contacto', 'tienda', 'titulación', 'actualidad', 'para', 'desarrollé'],
  en: ['with', 'the', 'and', 'years', 'management', 'technical', 'skills', 'technologies', 'experience', 'education',
    'projects', 'developer', 'public', 'strategy', 'innovation', 'leadership', 'native', 'catalan', 'spanish', 'english',
    'languages', 'contact', 'shop', 'degree', 'present', 'for', 'built', 'developed'],
};

let failures = 0;
const check = (ok, message) => {
  console.log(`  ${ok ? 'OK  ' : 'FAIL'} ${message}`);
  if (!ok) failures++;
};

for (const lang of ['ca', 'es', 'en']) {
  console.log(`\n=== ${lang.toUpperCase()} ===`);
  const res = await fetch(`${base}/api/cv/${lang}`);
  const pdfPath = path.join(out, `Aitor-Rivera-Garcia-CV-${lang.toUpperCase()}.pdf`);
  writeFileSync(pdfPath, Buffer.from(await res.arrayBuffer()));

  const disposition = res.headers.get('content-disposition') ?? '';
  check(disposition.includes(`filename="Aitor-Rivera-Garcia-CV-${lang.toUpperCase()}.pdf"`), `descarga: ${disposition}`);

  const info = run('pdfinfo', [pdfPath]);
  check(/Pages:\s+1\b/.test(info), `una página (${info.match(/Pages:\s+\d+/)?.[0]})`);
  check(/A4/.test(info), `tamaño A4 (${info.match(/Page size:.*/)?.[0].trim()})`);
  const title = info.match(/Title:\s+(.*)/)?.[1] ?? '';
  check(title.startsWith('Aitor Rivera Garcia - CV - '), `<title>: ${title}`);

  const fonts = run('pdffonts', [pdfPath]);
  console.log(fonts.split('\n').map((l) => '    ' + l).join('\n'));
  check(!/Type 3/i.test(fonts), 'pdffonts: ninguna fuente Type 3');

  const raw = run('pdftotext', [pdfPath, '-']);
  writeFileSync(path.join(out, `cv-${lang}.txt`), raw);
  const text = raw.toLowerCase(); // los títulos de sección salen en mayúsculas (text-transform)

  // Orden: nombre → titular → contacto → resumen → secciones (los títulos se buscan como línea completa)
  const lines = text.split('\n').map((l) => l.trim());
  const at = (pred) => lines.findIndex(pred);
  const sectionAt = SECTIONS[lang].map((s) => at((l) => l === s.toLowerCase()));
  const marks = [
    at((l) => l === 'aitor rivera garcia'),
    at((l) => l.includes('full stack') && l.includes('oracle')),
    at((l) => l.includes('@')),
    at((l) => l.startsWith('+34 625 947 211')),
    ...sectionAt,
  ];
  check(marks.every((p) => p >= 0) && marks.every((p, i) => i === 0 || p > marks[i - 1]),
    `orden del texto: nombre → titular → contacto → ${SECTIONS[lang].join(' → ')}`);
  check(marks[0] < sectionAt[0], 'el nombre sale antes que la sección de experiencia');

  const skillStart = raw.toLowerCase().split('\n').findIndex((l) => l.trim() === SECTIONS[lang][3].toLowerCase());
  const skillEnd = raw.toLowerCase().split('\n').findIndex((l) => l.trim() === SECTIONS[lang][4].toLowerCase());
  const skillsBlock = raw.split('\n').slice(skillStart, skillEnd).join('\n');
  check(/Python, Java/.test(skillsBlock) && /Django/.test(skillsBlock) && /Docker, Git/.test(skillsBlock),
    'habilidades separadas por comas (p. ej. "Python, Java, …")');
  console.log('    ' + skillsBlock.split('\n').filter(Boolean).slice(0, 7).join('\n    '));

  check(!/\[pendiente/.test(text), 'sin marcadores [PENDIENTE] en el PDF');

  // Idioma: palabras distintivas de otros idiomas
  const words = new Set(text.toLowerCase().match(/[a-zà-ÿ]+/g) ?? []);
  const own = new Set(VOCAB[lang]);
  const foreign = Object.entries(VOCAB)
    .filter(([l]) => l !== lang)
    .flatMap(([l, list]) => list.filter((w) => words.has(w) && !own.has(w)).map((w) => `${w} (${l})`));
  check(foreign.length === 0, `ningún texto en otro idioma${foreign.length ? ': ' + foreign.join(', ') : ''}`);

  run('pdftoppm', ['-r', '110', '-png', '-singlefile', pdfPath, path.join(out, `captura-${lang}`)]);
  console.log(`  captura: ${path.join(out, `captura-${lang}.png`)}`);
}

console.log(failures ? `\n${failures} comprobación(es) fallida(s)` : '\nTodo correcto');
process.exit(failures ? 1 : 0);
