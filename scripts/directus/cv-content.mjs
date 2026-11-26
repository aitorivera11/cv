// Contenido del CV que se carga en Directus (lo usa scripts/directus-cv-setup.mjs).
// Regla: NO se inventa nada. Lo que falta va como [PENDIENTE: …]; el script se niega a
// escribir cualquier texto que contenga [PENDIENTE] (salvo --allow-pending), así que nada
// de esto llega al CV público hasta que se rellenen las cifras.

export const PENDING = /\[PENDIENTE/;

// --- site_settings --------------------------------------------------------------------
export const siteSettings = {
  telefon: '+34 625 947 211',
  ubicacio: 'Barcelona',
  titol_ca: 'Desenvolupador Full Stack sènior · Python / Django · Oracle',
  titol_es: 'Desarrollador Full Stack senior · Python / Django · Oracle',
  titol_en: 'Senior Full Stack Developer · Python / Django · Oracle',
  resum_sidebar_ca:
    "Més de 8 anys desenvolupant amb Python/Django i Java per al sector públic: universitats i e-administració. " +
    "A més, 4 anys gestionant projectes TIC en una administració local.",
  resum_sidebar_es:
    'Más de 8 años desarrollando con Python/Django y Java para el sector público: universidades y e-administración. ' +
    'Además, 4 años gestionando proyectos TIC en una administración local.',
  resum_sidebar_en:
    'Over 8 years building with Python/Django and Java for the public sector: universities and e-Government. ' +
    'Plus 4 years managing ICT projects in local government.',
  // Nivel real de inglés: lo tienes que dar tú (p. ej. B2 / C1 / "Profesional").
  nivell_angles_ca: '[PENDIENTE: nivel real de inglés]',
  nivell_angles_es: '[PENDIENTE: nivel real de inglés]',
  nivell_angles_en: '[PENDIENTE: nivel real de inglés]',
};

// --- experiencia ---------------------------------------------------------------------
// `match`: fragmento (minúsculas) del campo `empresa` para localizar el registro existente.
// `titol_*`: solo donde me lo has dado; en el resto no se toca el título actual.
// `inici`/`fi`: 'YYYY-MM'. fi = null → puesto actual. Ahora todos [PENDIENTE]: no los conozco.
const L = (ca, es, en) => ({ ca, es, en });
const P = (what) => `[PENDIENTE: ${what}]`;

export const experiencia = [
  {
    match: 'salle',
    inici: P('mes/año de inicio'),
    fi: P('mes/año de fin, o vacío si es el puesto actual'),
    techs: ['Django', 'Oracle', 'jQuery', 'Bootstrap 5', 'nginx', 'CI/CD', 'iCal', 'Power Automate', 'Power Apps'],
    logros: [
      L(
        `Desenvolupar aplicacions web amb Django i Oracle, amb interfície en jQuery i Bootstrap 5 ${P('nº d\'aplicacions / usuaris')}.`,
        `Desarrollé aplicaciones web con Django y Oracle, con interfaz en jQuery y Bootstrap 5 ${P('nº de aplicaciones / usuarios')}.`,
        `Built web applications with Django and Oracle, with a jQuery and Bootstrap 5 front end ${P('no. of applications / users')}.`,
      ),
      L(
        `Configurar entorns de preproducció i CI/CD amb nginx per automatitzar els desplegaments ${P('xifra: desplegaments/mes o temps estalviat')}.`,
        `Configuré entornos de preproducción y CI/CD con nginx para automatizar los despliegues ${P('cifra: despliegues/mes o tiempo ahorrado')}.`,
        `Set up pre-production environments and CI/CD with nginx to automate deployments ${P('figure: deployments/month or time saved')}.`,
      ),
      L(
        `Integrar calendaris iCal a les aplicacions Django ${P('abast / xifra')}.`,
        `Integré calendarios iCal en las aplicaciones Django ${P('alcance / cifra')}.`,
        `Integrated iCal calendars into the Django applications ${P('scope / figure')}.`,
      ),
      L(
        `Automatitzar processos interns amb Power Automate i Power Apps ${P('nº de processos i hores estalviades')}.`,
        `Automaticé procesos internos con Power Automate y Power Apps ${P('nº de procesos y horas ahorradas')}.`,
        `Automated internal processes with Power Automate and Power Apps ${P('no. of processes and hours saved')}.`,
      ),
    ],
  },
  {
    match: 'audifilm',
    inici: P('mes/año de inicio'),
    fi: P('mes/año de fin'),
    techs: ['Oracle SQL', 'PL/SQL'],
    logros: [
      L(
        `Desenvolupar solucions d'e-administració per a administracions públiques amb Oracle SQL i PL/SQL ${P('nº d\'administracions / tràmits')}.`,
        `Desarrollé soluciones de e-administración para administraciones públicas con Oracle SQL y PL/SQL ${P('nº de administraciones / trámites')}.`,
        `Developed e-Government solutions for public administrations with Oracle SQL and PL/SQL ${P('no. of administrations / procedures')}.`,
      ),
      L(
        `Implementar lògica de negoci i consultes en PL/SQL sobre Oracle ${P('volum de dades / expedients')}.`,
        `Implementé lógica de negocio y consultas en PL/SQL sobre Oracle ${P('volumen de datos / expedientes')}.`,
        `Implemented business logic and queries in PL/SQL on Oracle ${P('data volume / case files')}.`,
      ),
      L(P('tercer logro'), P('tercer logro'), P('third achievement')),
    ],
  },
  {
    match: 'ajuntament',
    inici: P('mes/año de inicio'),
    fi: P('mes/año de fin'),
    techs: [],
    // Etiquetas no técnicas (se traducen con tagTranslations)
    tags: ['Administració pública', 'eAdministració', 'Gestió de Projectes', 'Estratègia TIC', 'Innovació'],
    logros: [
      L(
        `Definir l'estratègia TIC de l'àrea d'Innovació/TIC ${P('xifra: pressupost / nº de projectes')}.`,
        `Definí la estrategia TIC del área de Innovación/TIC ${P('cifra: presupuesto / nº de proyectos')}.`,
        `Defined the ICT strategy for the Innovation/ICT department ${P('figure: budget / no. of projects')}.`,
      ),
      L(
        `Gestionar projectes TIC a Joventut, Habitatge, Comerç i Turisme ${P('nº de projectes i pressupost')}.`,
        `Gestioné proyectos TIC en Juventud, Vivienda, Comercio y Turismo ${P('nº de proyectos y presupuesto')}.`,
        `Managed ICT projects across Youth, Housing, Commerce and Tourism ${P('no. of projects and budget')}.`,
      ),
      L(P('tercer logro'), P('tercer logro'), P('third achievement')),
    ],
  },
  {
    match: 'glifing',
    titol: L('Desenvolupador Full Stack', 'Desarrollador Full Stack', 'Full Stack Developer'),
    inici: P('mes/año de inicio'),
    fi: P('mes/año de fin'),
    techs: ['Java', 'Spring', 'Django', 'CakePHP', 'MySQL'],
    logros: [
      L(
        `Desenvolupar funcionalitats full stack amb Java Spring i Django sobre MySQL ${P('xifra: usuaris / centres')}.`,
        `Desarrollé funcionalidades full stack con Java Spring y Django sobre MySQL ${P('cifra: usuarios / centros')}.`,
        `Developed full stack features with Java Spring and Django on MySQL ${P('figure: users / schools')}.`,
      ),
      L(
        `Mantenir i evolucionar aplicacions en CakePHP ${P('abast / xifra')}.`,
        `Mantuve y evolucioné aplicaciones en CakePHP ${P('alcance / cifra')}.`,
        `Maintained and evolved CakePHP applications ${P('scope / figure')}.`,
      ),
      L(P('tercer logro'), P('tercer logro'), P('third achievement')),
    ],
  },
  {
    match: 'fihoca',
    titol: L('Desenvolupador Backend (Java)', 'Desarrollador Backend (Java)', 'Backend Developer (Java)'),
    inici: P('mes/año de inicio'),
    fi: P('mes/año de fin'),
    techs: ['Java', 'API REST', 'MySQL', 'Oracle', 'PostgreSQL'],
    logros: [
      L(
        `Desenvolupar APIs en Java ${P('nº d\'endpoints / clients')}.`,
        `Desarrollé APIs en Java ${P('nº de endpoints / clientes')}.`,
        `Developed Java APIs ${P('no. of endpoints / clients')}.`,
      ),
      L(
        `Treballar amb bases de dades MySQL, Oracle i PostgreSQL ${P('volum / rendiment')}.`,
        `Trabajé con bases de datos MySQL, Oracle y PostgreSQL ${P('volumen / rendimiento')}.`,
        `Worked with MySQL, Oracle and PostgreSQL databases ${P('volume / performance')}.`,
      ),
      L(P('tercer logro'), P('tercer logro'), P('third achievement')),
    ],
  },
];

// --- formacio: solo fechas (mes/año) pendientes --------------------------------------
// No conozco los registros; el script lista los que no tienen mes y espera tus datos.

// --- projecte (colección nueva) ---------------------------------------------------------
export const projectes = [
  {
    slug: 'pastisseria-botiga',
    ordre: 1,
    nom: L('Botiga en línia de la pastisseria', 'Tienda online de la pastelería', 'Online bakery shop'),
    descripcio: L(
      `Botiga en línia desplegada amb Docker i Coolify en un servidor Hetzner ${P('xifra: comandes/mes, URL')}.`,
      `Tienda online desplegada con Docker y Coolify en un servidor Hetzner ${P('cifra: pedidos/mes, URL')}.`,
      `Online shop deployed with Docker and Coolify on a Hetzner server ${P('figure: orders/month, URL')}.`,
    ),
    techs: ['Docker', 'Coolify', 'Hetzner'],
    url: null,
  },
  {
    slug: 'app-apoderats',
    ordre: 2,
    nom: L('App per a tutors legals', 'App de apoderados', 'Guardians app'),
    descripcio: L(
      `Aplicació per a tutors legals desenvolupada amb Django ${P('context, xifra i URL; confirma la traducció d\'"apoderados"')}.`,
      `Aplicación para apoderados desarrollada con Django ${P('contexto, cifra y URL')}.`,
      `Guardians app built with Django ${P('context, figure and URL; confirm the translation of "apoderados"')}.`,
    ),
    techs: ['Django'],
    url: null,
  },
];

// --- habilitat (campo nuevo `grup`) -------------------------------------------------------
export const skillGroups = ['llenguatges', 'frameworks', 'bbdd', 'devops', 'altres', 'gestio'];

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
  'gestió de projectes': 'gestio', 'estratègia tic': 'gestio',
};

// Habilidades nuevas que pides añadir (se crean si no existen; nombre igual en los 3 idiomas).
export const newSkills = [
  ['PL/SQL', 'llenguatges'], ['PostgreSQL', 'bbdd'], ['MySQL', 'bbdd'],
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
