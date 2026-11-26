// pdf/template.js
// Plantilla del CV en PDF. Pensada para que la lectura del PDF (ATS / IA de RRHH) sea fiel:
//  - Una sola columna en el DOM, en este orden: nombre → titular → contacto → resumen →
//    experiencia → proyectos → formación → habilidades → idiomas.
//  - Texto real con enlaces mailto:/tel:/https:, listas <ul><li> y sin texto oculto.

const LANGS = ['ca', 'es', 'en'];

const labels = {
  ca: {
    experience: 'Experiència professional',
    projects: 'Projectes',
    education: 'Formació',
    skills: 'Habilitats tècniques',
    languagesTitle: 'Idiomes',
    technologies: 'Tecnologies',
    contact: 'Contacte',
    languages: { ca: 'Català', es: 'Castellà', en: 'Anglès', native: 'Nadiu' },
    groups: {
      llenguatges: 'Llenguatges',
      frameworks: 'Frameworks',
      bbdd: 'Bases de dades',
      devops: 'DevOps',
      altres: 'Altres',
      gestio: 'Gestió',
      estils: 'Estils de programació',
    },
  },
  es: {
    experience: 'Experiencia profesional',
    projects: 'Proyectos',
    education: 'Formación',
    skills: 'Habilidades técnicas',
    languagesTitle: 'Idiomas',
    technologies: 'Tecnologías',
    contact: 'Contacto',
    languages: { ca: 'Catalán', es: 'Castellano', en: 'Inglés', native: 'Nativo' },
    groups: {
      llenguatges: 'Lenguajes',
      frameworks: 'Frameworks',
      bbdd: 'Bases de datos',
      devops: 'DevOps',
      altres: 'Otros',
      gestio: 'Gestión',
      estils: 'Estilos de programación',
    },
  },
  en: {
    experience: 'Professional experience',
    projects: 'Projects',
    education: 'Education',
    skills: 'Technical skills',
    languagesTitle: 'Languages',
    technologies: 'Technologies',
    contact: 'Contact',
    languages: { ca: 'Catalan', es: 'Spanish', en: 'English', native: 'Native' },
    groups: {
      llenguatges: 'Programming languages',
      frameworks: 'Frameworks',
      bbdd: 'Databases',
      devops: 'DevOps',
      altres: 'Other',
      gestio: 'Management',
      estils: 'Programming practices',
    },
  },
};

const GROUP_ORDER = ['llenguatges', 'frameworks', 'bbdd', 'devops', 'altres', 'gestio', 'estils'];

// Textos del CV que aún son un marcador [PENDIENTE…] no deben salir en un PDF público.
const PENDING = /\[PENDIENTE/;

const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// "Actual" (texto antiguo de Directus) → palabra del idioma. Las fechas nuevas ya vienen formateadas.
const PRESENT = { ca: 'actualitat', es: 'actualidad', en: 'present' };
const localizeDates = (value, lang) =>
  String(value || '').replace(/\b(Actual|Present|Actualidad|Actualitat)\b/gi, PRESENT[lang] || '$1');

const asciiSlug = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;
const displayUrl = (url) => String(url).replace(/^https?:\/\/(www\.)?/i, '').replace(/\/+$/, '');
const safeUrl = (url) => (/^https?:\/\//i.test(url) ? url : '');

export function cvLang(lang) {
  return LANGS.includes(lang) ? lang : 'ca';
}

export function cvTitle(data, lang) {
  return `${data.nom} - CV - ${data.titol}`;
}

export function cvDownloadFilename(data, lang) {
  return `${asciiSlug(data.nom) || 'CV'}-CV-${cvLang(lang).toUpperCase()}.pdf`;
}

// Devuelve los textos aún pendientes ([PENDIENTE…]) para avisar en el log.
export function findPendingText(html) {
  return [...new Set(html.match(/\[PENDIENTE[^\]]*\]/g) || [])];
}

// Lista de habilidades: una <li> por habilidad y la coma dentro del propio <li> ("Python," "Django"),
// de modo que el texto extraído sea "Python, Django, Docker" y no "PythonDjangoDocker".
// La coma es visible a propósito: el texto oculto (clip, transparente, fuera de pantalla) o bien no
// llega al PDF o bien se extrae descolocado, y además los detectores de ATS lo penalizan.
function skillList(items) {
  return `<ul class="skill-list">${items
    .map((name, i) => `<li>${esc(name)}${i < items.length - 1 ? ',' : ''}</li>`)
    .join('')}</ul>`;
}

function groupSkills(habilitats) {
  const groups = new Map();
  for (const h of habilitats) {
    const key = GROUP_ORDER.includes(h.grup) ? h.grup : 'altres';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(h.nom);
  }
  return GROUP_ORDER.filter((key) => groups.has(key)).map((key) => [key, groups.get(key)]);
}

export function cvTemplate(data, fotoUrl, rawLang = 'ca') {
  const lang = cvLang(rawLang);
  const t = labels[lang];
  const {
    nom,
    titol,
    resumSidebar = '',
    experiencies = [],
    projectes = [],
    formacions = [],
    habilitatsTecniques = [],
    email,
    telefon = '',
    ubicacio = '',
    linkedinUrl = '',
    githubUrl = '',
    nivellAngles = '',
  } = data;

  // El titular no se repite en el resumen
  const summary = String(resumSidebar).trim();
  const summaryText = summary.toLowerCase().startsWith(String(titol).trim().toLowerCase())
    ? summary.slice(String(titol).trim().length).replace(/^[\s.:·–-]+/, '')
    : summary;

  const contactItems = [
    email && `<li><a href="mailto:${esc(email)}">${esc(email)}</a></li>`,
    telefon && `<li><a href="${esc(telHref(telefon))}">${esc(telefon)}</a></li>`,
    safeUrl(linkedinUrl) && `<li><a href="${esc(linkedinUrl)}">${esc(displayUrl(linkedinUrl))}</a></li>`,
    safeUrl(githubUrl) && `<li><a href="${esc(githubUrl)}">${esc(displayUrl(githubUrl))}</a></li>`,
    ubicacio && `<li>${esc(ubicacio)}</li>`,
  ].filter(Boolean);

  const level = nivellAngles && !PENDING.test(nivellAngles) ? ` – ${esc(nivellAngles)}` : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>${esc(cvTitle(data, lang))}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Space Grotesk', Arial, sans-serif;
      margin: 0;
      color: #1f2937;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.34;
    }
    ul { margin: 0; padding: 0; list-style: none; }
    a { color: inherit; text-decoration: none; }

    .page {
      position: relative;
      padding: 14px 24px 20px;
      min-height: 283mm;
    }
    .page::before, .page::after {
      content: "";
      position: absolute;
      left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4f46e5, #8b5cf6);
    }
    .page::before { top: 0; }
    .page::after { bottom: 0; }

    /* Cabecera: foto a la izquierda, nombre / titular / contacto a la derecha */
    header { display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: center; }
    .photo {
      width: 76px; height: 76px; border-radius: 9999px; object-fit: cover;
      border: 3px solid #4f46e5;
    }
    h1 { margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 700; color: #111827; line-height: 1.15; }
    .headline { margin: 2px 0 0; font-size: 13px; font-weight: 500; color: #4f46e5; }
    .contact { display: flex; flex-wrap: wrap; margin-top: 6px; font-size: 11px; color: #374151; }
    .contact li + li { margin-left: 8px; padding-left: 8px; border-left: 1px solid #c7d2fe; }

    h2 {
      font-size: 11px; margin: 10px 0 5px; font-weight: 700; color: #4f46e5;
      letter-spacing: .08em; text-transform: uppercase;
      border-bottom: 1px solid #e5e7eb; padding-bottom: 2px;
    }
    h3 { margin: 0; font-size: 12.5px; font-weight: 600; color: #111827; }

    .summary { margin: 8px 0 0; font-size: 11.5px; color: #374151; }

    .entry { margin-bottom: 6px; break-inside: avoid; }
    .entry-head { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
    .dates { font-size: 11px; color: #6b7280; white-space: nowrap; }
    .company { font-size: 11px; color: #4b5563; font-weight: 500; }
    .achievements { margin-top: 2px; }
    .achievements li { position: relative; padding-left: 11px; margin-bottom: 1px; }
    .achievements li::before {
      content: ""; position: absolute; left: 1px; top: 0.62em;
      width: 4px; height: 4px; border-radius: 9999px; background: #6366f1;
    }
    .tech { margin-top: 2px; font-size: 10.5px; color: #4b5563; }
    .tech strong, .skill-group strong { font-weight: 600; color: #3730a3; }

    .skill-group { margin-bottom: 2px; display: flex; gap: 4px; }
    .skill-list { display: flex; flex-wrap: wrap; }
    .skill-list li { white-space: nowrap; margin-right: 4px; color: #374151; }

    .languages { display: flex; flex-wrap: wrap; gap: 4px 16px; }
    .languages strong { font-weight: 600; }
  </style>
</head>
<body>
  <div class="page">
    <header>
      ${fotoUrl ? `<img class="photo" src="${esc(fotoUrl)}" alt="" />` : '<span></span>'}
      <div>
        <h1>${esc(nom)}</h1>
        <p class="headline">${esc(titol)}</p>
        <ul class="contact" aria-label="${esc(t.contact)}">${contactItems.join('')}</ul>
      </div>
    </header>

    ${summaryText ? `<p class="summary">${esc(summaryText)}</p>` : ''}

    <section>
      <h2>${esc(t.experience)}</h2>
      ${experiencies
        .map((e) => {
          const logros = (e.logros || []).filter(Boolean);
          const techs = (e.tecnologies || []).filter(Boolean);
          return `
      <article class="entry">
        <div class="entry-head">
          <h3>${esc(e.titol)}<span class="company"> · ${esc(e.empresa)}</span></h3>
          <span class="dates">${esc(localizeDates(e.dates, lang))}</span>
        </div>
        ${
          logros.length
            ? `<ul class="achievements">${logros.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`
            : e.descripcio
              ? `<p style="margin:2px 0 0">${esc(e.descripcio)}</p>`
              : ''
        }
        ${techs.length ? `<div class="tech"><strong>${esc(t.technologies)}:</strong> ${esc(techs.join(', '))}</div>` : ''}
      </article>`;
        })
        .join('')}
    </section>

    ${
      projectes.length
        ? `<section>
      <h2>${esc(t.projects)}</h2>
      ${projectes
        .map((p) => {
          const href = safeUrl(p.url);
          const techs = (p.tecnologies || []).filter(Boolean);
          return `
      <article class="entry">
        <h3>${href ? `<a href="${esc(href)}">${esc(p.nom)}</a>` : esc(p.nom)}</h3>
        ${p.descripcio ? `<p style="margin:1px 0 0">${esc(p.descripcio)}</p>` : ''}
        ${techs.length ? `<div class="tech"><strong>${esc(t.technologies)}:</strong> ${esc(techs.join(', '))}</div>` : ''}
      </article>`;
        })
        .join('')}
    </section>`
        : ''
    }

    <section>
      <h2>${esc(t.education)}</h2>
      ${formacions
        .map(
          (f) => `
      <article class="entry">
        <div class="entry-head">
          <h3>${esc(f.titulacio)}<span class="company"> · ${esc(f.centre)}</span></h3>
          <span class="dates">${esc(localizeDates(f.dates, lang))}</span>
        </div>
      </article>`,
        )
        .join('')}
    </section>

    <section>
      <h2>${esc(t.skills)}</h2>
      <ul>
        ${groupSkills(habilitatsTecniques)
          .map(([key, items]) => `<li class="skill-group"><strong>${esc(t.groups[key])}:</strong> ${skillList(items)}</li>`)
          .join('')}
      </ul>
    </section>

    <section>
      <h2>${esc(t.languagesTitle)}</h2>
      <ul class="languages">
        <li><strong>${esc(t.languages.ca)}</strong> – ${esc(t.languages.native)}</li>
        <li><strong>${esc(t.languages.es)}</strong> – ${esc(t.languages.native)}</li>
        <li><strong>${esc(t.languages.en)}</strong>${level}</li>
      </ul>
    </section>
  </div>
</body>
</html>`;
}
