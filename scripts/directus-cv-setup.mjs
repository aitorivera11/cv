#!/usr/bin/env node
// Prepara Directus para el CV: campos nuevos (esquema) y contenido. Idempotente.
//
//   node scripts/directus-cv-setup.mjs                 # SIMULACRO: muestra qué haría, no toca nada
//   node scripts/directus-cv-setup.mjs --apply         # aplica
//   node scripts/directus-cv-setup.mjs --only=schema   # solo campos/colección  (o --only=content)
//   node scripts/directus-cv-setup.mjs --allow-pending # escribe también textos con [PENDIENTE] (no recomendado)
//
// Variables: DIRECTUS_URL y, opcional, DIRECTUS_ADMIN_TOKEN (permisos de administración; el token
// de solo lectura de la web NO sirve). Sin ella, se espera que un proxy inyecte Authorization.
//
// Garantías:
//  - Nunca borra nada: ni registros, ni campos, ni colecciones. Solo crea o actualiza.
//  - Antes de actualizar, guarda una copia de los registros afectados en scripts/directus/backup-<fecha>.json.
//  - Por defecto no escribe ningún campo cuyo texto contenga [PENDIENTE]: lo lista para que lo completes.
//  - Re-ejecutarlo no cambia nada si ya está aplicado.

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as seed from './directus/cv-content.mjs';

const args = new Set(process.argv.slice(2));
const APPLY = args.has('--apply');
const ALLOW_PENDING = args.has('--allow-pending');
const only = [...args].find((a) => a.startsWith('--only='))?.split('=')[1];
const doSchema = !only || only === 'schema';
const doContent = !only || only === 'content';

// DIRECTUS_URL es la raíz de la API (https://admin.aitorivera.com), SIN el "/admin" del panel.
const BASE = (process.env.DIRECTUS_URL || '').replace(/\/+$/, '').replace(/\/admin$/, '');
// DIRECTUS_ADMIN_TOKEN es opcional: si el token está guardado como secreto de red del entorno,
// el proxy añade la cabecera Authorization y el script no necesita verlo.
const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN || '';
if (!BASE) {
  console.error('Falta DIRECTUS_URL (p. ej. https://admin.aitorivera.com).');
  process.exit(1);
}

const LANGS = ['ca', 'es', 'en'];
const pendingItems = []; // { where, text }
const unresolved = []; // cosas que necesitan una decisión tuya
const backup = {}; // colección → { id: registro original }
let changes = 0;

async function api(method, route, body) {
  const res = await fetch(`${BASE}${route}`, {
    method,
    headers: { ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}), 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (res.status === 204) return null;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${method} ${route} → ${res.status} ${JSON.stringify(json.errors ?? json).slice(0, 300)}`);
  }
  return json.data ?? null;
}

const log = (icon, message) => console.log(`${icon} ${message}`);
const plan = (message) => {
  changes++;
  log(APPLY ? '✎' : '→', `${APPLY ? '' : '[simulacro] '}${message}`);
};

// ---------------------------------------------------------------------------------------
// 1) ESQUEMA: crea solo lo que falta. No modifica ni borra campos existentes.
// ---------------------------------------------------------------------------------------
const str = (field, note, extra = {}) => ({
  field, type: 'string', meta: { interface: 'input', note, width: 'half', ...extra }, schema: {},
});
const text = (field, note) => ({
  field, type: 'text', meta: { interface: 'input-multiline', note }, schema: {},
});
const tags = (field, note) => ({
  field, type: 'json', meta: { interface: 'tags', special: ['cast-json'], note }, schema: {},
});
const date = (field, note) => ({
  field, type: 'date', meta: { interface: 'datetime', width: 'half', note }, schema: {},
});
const perLang = (make, base, note) => LANGS.map((l) => make(`${base}_${l}`, `${note} (${l.toUpperCase()})`));

const GROUP_CHOICES = [
  { text: 'Lenguajes', value: 'llenguatges' },
  { text: 'Frameworks', value: 'frameworks' },
  { text: 'Bases de datos', value: 'bbdd' },
  { text: 'DevOps', value: 'devops' },
  { text: 'Otros', value: 'altres' },
  { text: 'Gestión', value: 'gestio' },
  { text: 'Estilos de programación', value: 'estils' },
];

const schemaFields = {
  site_settings: [
    str('telefon', 'Teléfono del CV, con prefijo (+34 …)'),
    str('ubicacio', 'Ubicación mostrada en el CV (p. ej. Barcelona)'),
    ...perLang(str, 'nivell_angles', 'Nivel de inglés en el CV'),
  ],
  experiencia: [
    date('data_inici', 'Mes y año de inicio (el día se ignora)'),
    date('data_fi', 'Mes y año de fin; vacío = puesto actual'),
    ...perLang(text, 'logros', 'Logros: uno por línea, empezando por un verbo, con tecnologías y cifras'),
    ...perLang(tags, 'tecnologies', 'Etiquetas traducibles del puesto'),
  ],
  formacio: [date('data_inici', 'Mes y año de inicio'), date('data_fi', 'Mes y año de fin')],
  habilitat: [
    {
      field: 'grup', type: 'string',
      meta: { interface: 'select-dropdown', options: { choices: GROUP_CHOICES }, note: 'Grupo en el CV (PDF)', width: 'half' },
      schema: {},
    },
  ],
};

const projecteFields = [
  { field: 'id', type: 'integer', meta: { hidden: true }, schema: { is_primary_key: true, has_auto_increment: true } },
  { field: 'ordre', type: 'integer', meta: { interface: 'input', note: 'Orden de aparición', width: 'half' }, schema: {} },
  str('url', 'Enlace público (opcional, solo https://)'),
  ...perLang(str, 'nom', 'Nombre del proyecto'),
  ...perLang(text, 'descripcio', 'Descripción corta, con tecnologías y cifras'),
  ...perLang(tags, 'tecnologies', 'Tecnologías'),
];

async function applySchema() {
  console.log('\n== ESQUEMA ==');
  const collections = new Set((await api('GET', '/collections')).map((c) => c.collection));

  if (!collections.has('projecte')) {
    plan('crear colección "projecte" (proyectos del CV)');
    if (APPLY) {
      await api('POST', '/collections', {
        collection: 'projecte',
        meta: { icon: 'rocket_launch', note: 'Proyectos del CV' },
        schema: {},
        fields: projecteFields,
      });
    }
  }

  // El campo habilitat.grup ya existe: añade las opciones nuevas del desplegable si faltan.
  if (collections.has('habilitat')) {
    const grup = (await api('GET', '/fields/habilitat')).find((f) => f.field === 'grup');
    const have = new Set((grup?.meta?.options?.choices ?? []).map((c) => c.value));
    if (grup && GROUP_CHOICES.some((c) => !have.has(c.value))) {
      plan('actualizar opciones del desplegable habilitat.grup (añade «Estilos de programación»)');
      if (APPLY) await api('PATCH', '/fields/habilitat/grup', { meta: { options: { choices: GROUP_CHOICES } } });
    }
  }

  const targets = { ...schemaFields };
  if (collections.has('projecte')) targets.projecte = projecteFields.filter((f) => f.field !== 'id');

  for (const [collection, wanted] of Object.entries(targets)) {
    const existing = new Set((await api('GET', `/fields/${collection}`)).map((f) => f.field));
    for (const field of wanted) {
      if (existing.has(field.field)) continue;
      plan(`crear campo ${collection}.${field.field} (${field.type})`);
      if (APPLY) await api('POST', `/fields/${collection}`, field);
    }
  }

  console.log(
    '\nPermisos: da LECTURA al rol/política del token de la web sobre la colección "projecte" y sobre los campos nuevos\n' +
      '(Ajustes → Políticas de acceso → <política del token> → projecte → Leer). Sin eso la web ignora los campos nuevos\n' +
      'y avisa en el log ("el esquema nuevo de Directus no está aplicado").',
  );
}

// ---------------------------------------------------------------------------------------
// 2) CONTENIDO
// ---------------------------------------------------------------------------------------
const norm = (v) => String(v ?? '').trim().toLowerCase();
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

// Quita de un parche los campos que aún contienen [PENDIENTE] y los apunta para el informe.
function withoutPending(patch, where) {
  const out = {};
  for (const [key, value] of Object.entries(patch)) {
    const asText = typeof value === 'string' ? value : JSON.stringify(value);
    if (!ALLOW_PENDING && seed.PENDING.test(asText)) {
      pendingItems.push({ where: `${where}.${key}`, text: asText.match(/\[PENDIENTE[^\]]*\]/g)?.join(' ') ?? '' });
      continue;
    }
    out[key] = value;
  }
  return out;
}

async function patchItem(collection, item, patch, label) {
  const diff = Object.fromEntries(Object.entries(patch).filter(([k, v]) => !same(item[k], v)));
  if (!Object.keys(diff).length) return;

  for (const [k, v] of Object.entries(diff)) {
    const before = item[k] == null || item[k] === '' ? '(vacío)' : JSON.stringify(item[k]).slice(0, 70);
    plan(`${collection}[${label}].${k}: ${before} → ${JSON.stringify(v).slice(0, 90)}`);
  }
  if (!APPLY) return;

  (backup[collection] ??= {})[item.id ?? 'singleton'] = Object.fromEntries(Object.keys(diff).map((k) => [k, item[k] ?? null]));
  if (collection === 'site_settings') await api('PATCH', '/items/site_settings', diff);
  else await api('PATCH', `/items/${collection}/${item.id}`, diff);
}

const monthOrNull = (v) => (/^\d{4}-\d{2}(-\d{2})?$/.test(String(v)) ? `${String(v).slice(0, 7)}-01` : undefined);

async function applyContent() {
  console.log('\n== CONTENIDO ==');

  // site_settings (singleton)
  const settings = await api('GET', '/items/site_settings');
  await patchItem('site_settings', settings, withoutPending(seed.siteSettings, 'site_settings'), 'singleton');

  // experiencia: logros, etiquetas traducidas, títulos dados por ti, fechas si son válidas
  const jobs = await api('GET', '/items/experiencia?limit=-1');
  const matched = new Set();
  for (const entry of seed.experiencia) {
    const job = jobs.find((j) => norm(j.empresa).includes(entry.match));
    if (!job) {
      unresolved.push(`experiencia: no encuentro ningún puesto cuya empresa contenga "${entry.match}"; no se crea nada`);
      continue;
    }
    matched.add(job.id);

    // Etiquetas antiguas (un solo idioma, algunas en catalán) → una lista por idioma
    const legacy = Array.isArray(job.tecnologies) ? job.tecnologies : [];
    const unknownTags = legacy.filter((t) => !seed.tagTranslations[norm(t)] && !seed.skillGroupByName[norm(t)] && !entry.techs.some((x) => norm(x) === norm(t)));
    if (unknownTags.length) unresolved.push(`experiencia[${job.empresa}]: etiquetas sin traducción conocida (se copian tal cual a los 3 idiomas; confirma si son técnicas): ${unknownTags.join(', ')}`);

    const patch = {
      data_inici: monthOrNull(entry.inici),
      data_fi: monthOrNull(entry.fi),
    };
    if (entry.inici && patch.data_inici === undefined) pendingItems.push({ where: `experiencia[${job.empresa}].data_inici`, text: String(entry.inici) });
    if (entry.fi && patch.data_fi === undefined) pendingItems.push({ where: `experiencia[${job.empresa}].data_fi`, text: String(entry.fi) });
    for (const k of ['data_inici', 'data_fi']) if (patch[k] === undefined) delete patch[k];

    for (const l of LANGS) {
      patch[`tecnologies_${l}`] = seed.tagsFor(entry, l, legacy);
      if (entry.titol) patch[`titol_${l}`] = entry.titol[l];
      patch[`logros_${l}`] = entry.logros.map((x) => x[l]).join('\n');
    }
    await patchItem('experiencia', job, withoutPending(patch, `experiencia[${job.empresa}]`), job.empresa);
  }
  for (const job of jobs.filter((j) => !matched.has(j.id))) {
    unresolved.push(`experiencia[${job.empresa}]: existe en Directus pero no tiene logros en el contenido semilla (no se toca)`);
  }

  // formacio: fechas por id del registro (seed.formacioDates)
  const education = await api('GET', '/items/formacio?limit=-1');
  for (const f of education) {
    const range = seed.formacioDates[f.id];
    if (!range) {
      if (!f.data_inici) unresolved.push(`formacio[${f.centre}] (id ${f.id}): sin fechas en el contenido semilla; ahora "${f.dates}"`);
      continue;
    }
    await patchItem('formacio', f, { data_inici: monthOrNull(range[0]), data_fi: monthOrNull(range[1]), ...(range[2] ? { dates: range[2] } : {}) }, f.centre);
  }

  // habilitat: grupo + habilidades nuevas
  const skills = await api('GET', '/items/habilitat?limit=-1');
  const skillNames = (s) => LANGS.map((l) => norm(s[`nom_${l}`])).filter(Boolean);
  for (const s of skills.filter((s) => s.categoria === 'tecnica' && !s.grup)) {
    const group = skillNames(s).map((n) => seed.skillGroupByName[n]).find(Boolean);
    if (group) await patchItem('habilitat', s, { grup: group }, s.nom_ca || s.nom_es);
    else unresolved.push(`habilitat[${s.nom_ca || s.nom_es}]: sin grupo asignado (se mostrará en "Otros"); dime en cuál va`);
  }
  for (const [name, group, names] of seed.newSkills) {
    if (skills.some((s) => skillNames(s).includes(norm(name)))) continue;
    plan(`crear habilitat "${name}" (grupo ${group})`);
    if (APPLY) {
      await api('POST', '/items/habilitat', { categoria: 'tecnica', grup: group, nom_ca: names?.ca ?? name, nom_es: names?.es ?? name, nom_en: names?.en ?? name });
    }
  }

  // projecte (solo si la colección existe: en simulacro puede no existir todavía)
  const collections = new Set((await api('GET', '/collections')).map((c) => c.collection));
  if (collections.has('projecte')) {
    const projects = await api('GET', '/items/projecte?limit=-1');
    for (const p of seed.projectes) {
      const existing = projects.find((x) => norm(x.nom_ca) === norm(p.nom.ca));
      const patch = { ordre: p.ordre, url: p.url };
      for (const l of LANGS) {
        patch[`nom_${l}`] = p.nom[l];
        patch[`descripcio_${l}`] = p.descripcio[l];
        patch[`tecnologies_${l}`] = p.techs;
      }
      const clean = withoutPending(patch, `projecte[${p.nom.es}]`);
      if (existing) await patchItem('projecte', existing, clean, p.nom.es);
      else {
        plan(`crear projecte "${p.nom.es}" (${Object.keys(clean).length} campos)`);
        if (APPLY) await api('POST', '/items/projecte', clean);
      }
    }
  } else {
    log('ℹ', 'colección "projecte" aún no existe (aplica primero el esquema); sus proyectos se cargarán en la siguiente ejecución');
  }

  // erratas en todos los textos de las colecciones del CV
  for (const collection of ['experiencia', 'formacio', 'habilitat', ...(collections.has('projecte') ? ['projecte'] : [])]) {
    const items = await api('GET', `/items/${collection}?limit=-1`);
    for (const item of items) {
      const patch = {};
      for (const [k, v] of Object.entries(item)) {
        if (typeof v !== 'string') continue;
        const fixed = seed.typoFixes.reduce((acc, [re, to]) => acc.replace(re, to), v);
        if (fixed !== v) patch[k] = fixed;
      }
      if (Object.keys(patch).length) await patchItem(collection, item, patch, item.empresa || item.centre || item.nom_ca || item.id);
    }
  }
  const settingsFixed = Object.fromEntries(
    Object.entries(settings)
      .filter(([, v]) => typeof v === 'string')
      .map(([k, v]) => [k, seed.typoFixes.reduce((acc, [re, to]) => acc.replace(re, to), v)])
      .filter(([k, v]) => v !== settings[k]),
  );
  if (Object.keys(settingsFixed).length) await patchItem('site_settings', settings, settingsFixed, 'singleton');
}

// ---------------------------------------------------------------------------------------
try {
  console.log(`Directus: ${BASE}  ·  modo: ${APPLY ? 'APLICAR' : 'SIMULACRO (usa --apply para escribir)'}`);
  if (doSchema) await applySchema();
  if (doContent) await applyContent();

  if (APPLY && Object.keys(backup).length) {
    const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'directus');
    mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    writeFileSync(file, JSON.stringify(backup, null, 2));
    log('💾', `copia de los valores anteriores: ${file}`);
  }

  if (pendingItems.length) {
    console.log(`\n== [PENDIENTE] — ${pendingItems.length} campo(s) sin escribir hasta que des el dato ==`);
    for (const p of pendingItems) console.log(`  · ${p.where}: ${p.text}`);
  }
  if (unresolved.length) {
    console.log('\n== NECESITAN TU DECISIÓN ==');
    for (const u of unresolved) console.log(`  · ${u}`);
  }
  console.log(`\n${changes} cambio(s) ${APPLY ? 'aplicado(s)' : 'previsto(s)'}.${changes === 0 ? ' Directus ya está al día.' : ''}`);
} catch (error) {
  console.error('\nERROR:', error.message);
  process.exit(1);
}
