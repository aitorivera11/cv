// Contenido del CV que se carga en Directus (lo usa scripts/directus-cv-setup.mjs).
// Regla: NO se inventa nada. Lo que falta va como [PENDIENTE: …]; el script se niega a
// escribir cualquier texto que contenga [PENDIENTE] (salvo --allow-pending), así que nada
// de esto llega al CV público hasta que se rellenen las cifras.

export const PENDING = /\[PENDIENTE/;

// --- site_settings --------------------------------------------------------------------
export const siteSettings = {
  telefon: '+34 625 947 211',
  ubicacio: 'Barcelona',
  titol_ca: 'Desenvolupador Python sènior · Django · Oracle',
  titol_es: 'Desarrollador Python senior · Django · Oracle',
  titol_en: 'Senior Python Developer · Django · Oracle',
  resum_sidebar_ca:
    "Desenvolupador Full Stack sènior amb més de 7 anys en Python/Django, Java (Spring) i Oracle (SQL/PL/SQL) per al sector públic i educatiu: universitats i e-administració. " +
    "Experiència liderant projectes TIC (4 anys com a responsable d'Innovació i Tecnologies en un ajuntament), CI/CD i automatització de processos amb Power Platform.",
  resum_sidebar_es:
    'Desarrollador Full Stack senior con más de 7 años en Python/Django, Java (Spring) y Oracle (SQL/PL/SQL) para el sector público y educativo: universidades y e-administración. ' +
    'Experiencia liderando proyectos TIC (4 años como responsable de Innovación y Tecnologías en un ayuntamiento), CI/CD y automatización de procesos con Power Platform.',
  resum_sidebar_en:
    'Senior Full Stack Developer with 7+ years in Python/Django, Java (Spring) and Oracle (SQL/PL/SQL) for the public and education sectors: universities and e-government. ' +
    'Experience leading ICT projects (4 years as Head of Innovation and Technology at a city council), CI/CD and process automation with Power Platform.',
  // Nivel real de inglés: lo tienes que dar tú (p. ej. B2 / C1 / "Profesional").
  nivell_angles_ca: 'Nivell tècnic (lectura i escriptura de documentació)',
  nivell_angles_es: 'Nivel técnico (lectura y escritura de documentación)',
  nivell_angles_en: 'Technical working proficiency (reading and writing documentation)',
};

// --- experiencia ---------------------------------------------------------------------
// `match`: fragmento (minúsculas) del campo `empresa` para localizar el registro existente.
// `titol_*`: solo donde me lo has dado; en el resto no se toca el título actual.
// `inici`/`fi`: 'YYYY-MM'. fi = null → puesto actual. Fechas reales de LinkedIn.
const L = (ca, es, en) => ({ ca, es, en });
const P = (what) => `[PENDIENTE: ${what}]`;

export const experiencia = [
  {
    match: 'salle',
    inici: '2024-04',
    fi: null,
    techs: ['Django', 'Oracle', 'jQuery', 'Bootstrap 5', 'nginx', 'CI/CD', 'iCal', 'Power Automate', 'Power Apps'],
    logros: [], // de momento vacío
  },
  {
    match: 'audifilm',
    inici: '2023-11',
    fi: '2024-02',
    techs: ['Oracle SQL', 'PL/SQL'],
    logros: [], // de momento vacío
  },
  {
    match: 'ajuntament',
    inici: '2019-06',
    fi: '2023-06',
    techs: [],
    // Etiquetas no técnicas (se traducen con tagTranslations)
    tags: ['Administració pública', 'eAdministració', 'Gestió de Projectes', 'Estratègia TIC', 'Innovació'],
    logros: [], // de momento vacío
  },
  {
    match: 'glifing',
    titol: L('Desenvolupador Full Stack', 'Desarrollador Full Stack', 'Full Stack Developer'),
    inici: '2016-01',
    fi: '2019-06',
    techs: ['Java', 'Spring', 'Django', 'CakePHP', 'MySQL'],
    logros: [], // de momento vacío
  },
  {
    match: 'fihoca',
    titol: L('Desenvolupador Backend (Java)', 'Desarrollador Backend (Java)', 'Backend Developer (Java)'),
    inici: '2015-05',
    fi: '2016-01',
    techs: ['Java', 'API REST', 'MySQL', 'Oracle', 'PostgreSQL'],
    logros: [], // de momento vacío
  },
];

// --- formacio: fechas reales (LinkedIn), por id del registro -------------------------
// Verge de la Salut: LinkedIn solo da años → se usa enero (inicio) y diciembre (fin).
export const formacioDates = {
  34: ['2024-05', '2025-02'], // UOC · Smart Cities i Ciutadania
  35: ['2024-03', '2024-07'], // UOC · Direcció i Gestió de Projectes
  36: ['2011-09', '2014-06', '2011 - 2014'], // IES Esteve Terradas · DAM
  33: ['2009-01', '2011-12'], // Verge de la Salut · Batxillerat tecnològic
};

// --- projecte (colección nueva) ---------------------------------------------------------
// De momento sin proyectos: los añadirás tú en Directus (colección `projecte`).
export const projectes = [];

// --- habilitat (campo nuevo `grup`) -------------------------------------------------------
export const skillGroups = ['llenguatges', 'frameworks', 'bbdd', 'devops', 'altres', 'gestio', 'estils'];

// nom (en minúsculas) → grupo. Solo se clasifican las que reconozco; el resto se lista para que decidas.
export const skillGroupByName = {
  python: 'llenguatges', java: 'llenguatges', sql: 'llenguatges', 'pl/sql': 'llenguatges',
  javascript: 'llenguatges', php: 'llenguatges', html: 'llenguatges', css: 'llenguatges',
  django: 'frameworks', spring: 'frameworks', 'spring boot': 'frameworks', cakephp: 'frameworks',
  jquery: 'frameworks', 'bootstrap 5': 'frameworks', bootstrap: 'frameworks', tailwind: 'frameworks',
  oracle: 'bbdd', 'oracle sql': 'bbdd', mysql: 'bbdd', postgresql: 'bbdd',
  docker: 'devops', git: 'devops', linux: 'devops', nginx: 'devops', 'ci/cd': 'devops',
  coolify: 'devops', hetzner: 'devops',
  'api rest': 'altres', 'power platform': 'altres',
  'html & css': 'llenguatges', 'clean code': 'estils', dry: 'estils', 'disseny responsive': 'estils',
  'gestió de projectes': 'gestio', 'estratègia tic': 'gestio',
};

// Habilidades nuevas que pides añadir (se crean si no existen; nombre igual en los 3 idiomas).
export const newSkills = [
  ['Python', 'llenguatges'], ['PL/SQL', 'llenguatges'], ['PostgreSQL', 'bbdd'], ['MySQL', 'bbdd'],
  ['jQuery', 'frameworks'], ['Bootstrap 5', 'frameworks'], ['Linux', 'devops'],
  ['nginx', 'devops'], ['CI/CD', 'devops'], ['API REST', 'altres'], ['Power Platform', 'altres'],
];

// --- traducción de etiquetas (experiencia.tecnologies → tecnologies_ca/es/en) ---------------
// Las etiquetas técnicas (Django, Oracle…) no se traducen: no hace falta listarlas.
export const tagTranslations = {
  'administració pública': L('Administració pública', 'Administración pública', 'Public administration'),
  eadministració: L('e-Administració', 'e-Administración', 'e-Government'),
  'e-administració': L('e-Administració', 'e-Administración', 'e-Government'),
  'gestió de projectes': L('Gestió de projectes', 'Gestión de proyectos', 'Project management'),
  lideratge: L('Lideratge', 'Liderazgo', 'Leadership'),
  'estratègia tic': L('Estratègia TIC', 'Estrategia TIC', 'ICT strategy'),
  innovació: L('Innovació', 'Innovación', 'Innovation'),
};

// --- erratas (se corrigen en todos los campos de texto de las colecciones del CV) -------------
export const typoFixes = [
  [/\bTecnologias\b/g, 'Tecnologías'],
  [/\(CakePHP\)\s+(?=[A-ZÀ-ÝÑ])/g, '(CakePHP). '],
];

// Etiquetas de un puesto en un idioma: tecnologías propias + etiquetas no técnicas traducidas.
// `legacy` son las de Directus (campo antiguo `tecnologies`, un solo idioma, con etiquetas en catalán).
export function tagsFor(entry, lang, legacy = []) {
  const seen = new Set();
  const out = [];
  const push = (tag) => {
    const key = tag.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(tag);
    }
  };
  for (const tag of [...legacy, ...(entry.tags || [])]) {
    push(tagTranslations[tag.toLowerCase()]?.[lang] ?? tag);
  }
  for (const tag of entry.techs || []) push(tag);
  return out;
}
