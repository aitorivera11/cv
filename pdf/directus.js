const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
  throw new Error('Missing DIRECTUS_URL or DIRECTUS_TOKEN environment variables');
}

async function directusRequest(path, search = '') {
  const response = await fetch(`${DIRECTUS_URL}${path}${search}`, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Directus request failed (${response.status}): ${text}`);
  }

  const json = await response.json();
  return json.data;
}

function localized(record, base, lang) {
  const order = lang === 'es' ? ['es', 'ca', 'en'] : lang === 'en' ? ['en', 'ca', 'es'] : ['ca', 'es', 'en'];
  for (const locale of order) {
    const value = record?.[`${base}_${locale}`];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return '';
}

function assetUrl(file) {
  if (!file) return '';
  if (typeof file === 'string') return `${DIRECTUS_URL}/assets/${file}`;
  if (typeof file === 'object' && typeof file.id === 'string') return `${DIRECTUS_URL}/assets/${file.id}`;
  return '';
}

export async function getCvData(lang = 'ca') {
  const [siteSettings, experiencies, formacions, habilitats] = await Promise.all([
    directusRequest('/items/site_settings'),
    directusRequest('/items/experiencia', '?sort=ordre'),
    directusRequest('/items/formacio', '?sort=ordre'),
    directusRequest('/items/habilitat', '?sort=nom_ca'),
  ]);

  if (!siteSettings) return null;

  return {
    _updatedAt: new Date().toISOString(),
    nom: siteSettings.nom || '',
    foto: siteSettings.foto,
    fotoUrl: assetUrl(siteSettings.foto),
    cvPdf: assetUrl(siteSettings.cv_pdf),
    linkedinUrl: siteSettings.linkedin_url || '',
    githubUrl: siteSettings.github_url || '',
    email: siteSettings.email || '',
    titol: localized(siteSettings, 'titol', lang),
    resumSidebar: localized(siteSettings, 'resum_sidebar', lang),
    descripcioSobreMi: localized(siteSettings, 'descripcio_sobre_mi', lang),
    experiencies: (experiencies || []).map((item) => ({
      empresa: item.empresa || '',
      dates: item.dates || '',
      tecnologies: Array.isArray(item.tecnologies) ? item.tecnologies : [],
      titol: localized(item, 'titol', lang),
      descripcio: localized(item, 'descripcio', lang),
    })),
    formacions: (formacions || []).map((item) => ({
      centre: item.centre || '',
      dates: item.dates || '',
      titulacio: localized(item, 'titulacio', lang),
    })),
    habilitatsTecniques: (habilitats || [])
      .filter((item) => item.categoria === 'tecnica')
      .map((item) => ({ nom: localized(item, 'nom', lang) })),
    habilitatsClau: (habilitats || [])
      .filter((item) => item.categoria === 'clau')
      .map((item) => ({ nom: localized(item, 'nom', lang) })),
  };
}

export function getPhotoUrl(photo) {
  const base = assetUrl(photo);
  return base ? `${base}?width=400&height=400&fit=cover` : '';
}
