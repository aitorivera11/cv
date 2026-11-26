import { readItems, readSingleton } from '@directus/sdk'
import { directus } from './directus'

export type SupportedLang = 'ca' | 'es' | 'en'

const LOCALIZED_FALLBACK_ORDER: Record<SupportedLang, SupportedLang[]> = {
  ca: ['ca', 'es', 'en'],
  es: ['es', 'ca', 'en'],
  en: ['en', 'ca', 'es'],
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getRawAssetId(value: unknown): string {
  if (!value) return ''

  if (typeof value === 'string') return value

  if (isRecord(value)) {
    const maybeId = value.id
    if (typeof maybeId === 'string') return maybeId

    const maybeDirectusFile = value.directus_files_id
    if (typeof maybeDirectusFile === 'string') return maybeDirectusFile

    if (isRecord(maybeDirectusFile) && typeof maybeDirectusFile.id === 'string') {
      return maybeDirectusFile.id
    }

    if (typeof value.filename_disk === 'string' && typeof value.id === 'string') {
      return value.id
    }
  }

  return ''
}

function getDirectusBaseUrl(): string {
  const rawUrl = typeof import.meta.env.DIRECTUS_URL === 'string' ? import.meta.env.DIRECTUS_URL : ''
  return rawUrl.replace(/\/+$/, '')
}

function getDirectusAssetProxyUrl(assetPath: string, search?: string): string {
  const encodedPath = encodeURIComponent(assetPath.replace(/^\/+/, ''))
  const query = search && search.trim() ? `?${search.replace(/^\?/, '')}` : ''
  return `/api/directus-assets/${encodedPath}${query}`
}

export function getDirectusAssetOriginUrl(file: unknown): string {
  const rawId = getRawAssetId(file)
  if (!rawId) return ''

  if (rawId.startsWith('http://') || rawId.startsWith('https://')) {
    return rawId
  }

  return `${getDirectusBaseUrl()}/assets/${rawId}`
}

export function getDirectusAssetUrl(file: unknown): string {
  const rawId = getRawAssetId(file)
  if (!rawId) return ''

  if (rawId.startsWith('http://') || rawId.startsWith('https://')) {
    try {
      const parsed = new URL(rawId)
      const assetPath = parsed.pathname.replace(/^\/+/, '')
      return getDirectusAssetProxyUrl(assetPath, parsed.search)
    } catch {
      return rawId
    }
  }

  return getDirectusAssetProxyUrl(`assets/${rawId}`)
}

function getLocalizedField(record: Record<string, unknown>, baseField: string, lang: SupportedLang): string {
  for (const fallbackLang of LOCALIZED_FALLBACK_ORDER[lang]) {
    const key = `${baseField}_${fallbackLang}`
    const value = record[key]

    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  return ''
}

// Avisos de traducción: una sola vez por campo, para no inundar el log.
const warned = new Set<string>()
function warnOnce(message: string) {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(`[cv] ${message}`)
}

// Igual que getLocalizedField, pero avisa en el log cuando hay que tirar de otro idioma.
function getLocalizedFieldWarn(record: Record<string, unknown>, baseField: string, lang: SupportedLang, where: string): string {
  const exact = record[`${baseField}_${lang}`]
  if (typeof exact === 'string' && exact.trim()) return exact

  for (const fallbackLang of LOCALIZED_FALLBACK_ORDER[lang]) {
    const value = record[`${baseField}_${fallbackLang}`]
    if (typeof value === 'string' && value.trim()) {
      warnOnce(`falta la traducción ${where}.${baseField}_${lang}; se usa ${fallbackLang}`)
      return value
    }
  }
  return ''
}

// Acepta un array JSON (etiquetas) o un texto con un elemento por línea (logros).
function asStringList(value: unknown): string[] {
  const list = typeof value === 'string' ? value.split(/\r?\n/) : Array.isArray(value) ? value : []
  return list
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.replace(/^\s*[-•*]\s*/, '').trim())
    .filter(Boolean)
}

function getLocalizedList(record: Record<string, unknown>, baseField: string, lang: SupportedLang, where: string): string[] {
  const exact = asStringList(record[`${baseField}_${lang}`])
  if (exact.length) return exact

  for (const fallbackLang of LOCALIZED_FALLBACK_ORDER[lang]) {
    const value = asStringList(record[`${baseField}_${fallbackLang}`])
    if (value.length) {
      warnOnce(`falta la traducción ${where}.${baseField}_${lang}; se usa ${fallbackLang}`)
      return value
    }
  }
  return []
}

// 'YYYY-MM' o 'YYYY-MM-DD' → 'MM/YYYY'. Devuelve '' si no hay mes.
function formatMonthYear(value: unknown): string {
  if (typeof value !== 'string') return ''
  const match = value.match(/^(\d{4})-(\d{2})/)
  return match ? `${match[2]}/${match[1]}` : ''
}

const PRESENT_LABEL: Record<SupportedLang, string> = { ca: 'actualitat', es: 'actualidad', en: 'present' }

function formatDateRange(start: unknown, end: unknown, lang: SupportedLang, legacy: string, where: string): string {
  const from = formatMonthYear(start)
  if (!from) {
    if (legacy) warnOnce(`${where} no tiene data_inici (mes/año); se usa el texto antiguo "${legacy}"`)
    return legacy
  }
  return `${from} – ${formatMonthYear(end) || PRESENT_LABEL[lang]}`
}

// Pide los campos nuevos; si el esquema aún no está aplicado en Directus, vuelve a los antiguos.
async function withSchemaFallback<T>(what: string, full: () => Promise<T>, legacy: () => Promise<T>): Promise<T> {
  try {
    return await full()
  } catch {
    warnOnce(`${what}: el esquema nuevo de Directus no está aplicado (scripts/directus-cv-setup.mjs); se usan los campos antiguos`)
    return legacy()
  }
}

export type TaxonomyItem = {
  title: string
  slug: string
}

function normalizeTaxonomy(item: unknown, lang: SupportedLang): TaxonomyItem | null {
  if (!isRecord(item)) return null

  const nested =
    (isRecord(item.category) && item.category) ||
    (isRecord(item.category_id) && item.category_id) ||
    (isRecord(item.tag) && item.tag) ||
    (isRecord(item.tag_id) && item.tag_id)

  const source = nested || item
  const slug = typeof source.slug === 'string' ? source.slug : ''
  const title = getLocalizedField(source, 'title', lang)

  if (!slug || !title) return null

  return { slug, title }
}

export type SiteSettings = {
  nom: string
  titol: string
  telefon: string
  ubicacio: string
  nivellAngles: string
  resumSidebar: string
  descripcioSobreMi: string
  foto: unknown
  fotoUrl: string
  linkedinUrl: string
  githubUrl: string
  email: string
}

export type BlogSettings = {
  title: string
  description: string
  defaultCover: unknown
  defaultCoverUrl: string
  seoKeywords: string[]
}

export type PostSummary = {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  coverImage: unknown
  coverImageUrl: string
  categories: TaxonomyItem[]
  tags: TaxonomyItem[]
}

export type PostDetail = PostSummary & {
  content: string
  relatedPosts: PostSummary[]
}

export type Category = TaxonomyItem & {
  count: number
}

export type Tag = TaxonomyItem

export type ExperienciaItem = {
  empresa: string
  dates: string
  tecnologies: string[]
  titol: string
  descripcio: string
  logros: string[]
  ordre: number
}

export type ProjecteItem = {
  nom: string
  descripcio: string
  tecnologies: string[]
  url: string
  ordre: number
}

export type FormacioItem = {
  centre: string
  dates: string
  titulacio: string
  ordre: number
}

export type HabilitatItem = {
  nom: string
  categoria: string
  grup: string
}

const SITE_SETTINGS_LEGACY_FIELDS = [
  'nom',
  'foto',
  'linkedin_url',
  'github_url',
  'email',
  'titol_ca',
  'titol_es',
  'titol_en',
  'resum_sidebar_ca',
  'resum_sidebar_es',
  'resum_sidebar_en',
  'descripcio_sobre_mi_ca',
  'descripcio_sobre_mi_es',
  'descripcio_sobre_mi_en',
]
const SITE_SETTINGS_CV_FIELDS = [
  'telefon',
  'ubicacio',
  'nivell_angles_ca',
  'nivell_angles_es',
  'nivell_angles_en',
]

async function getSiteSettingsUncached(lang: SupportedLang): Promise<SiteSettings | null> {
  const raw = await withSchemaFallback(
    'site_settings',
    () => directus.request(readSingleton('site_settings', { fields: [...SITE_SETTINGS_LEGACY_FIELDS, ...SITE_SETTINGS_CV_FIELDS] })),
    () => directus.request(readSingleton('site_settings', { fields: SITE_SETTINGS_LEGACY_FIELDS })),
  )

  if (!isRecord(raw)) return null

  return {
    nom: typeof raw.nom === 'string' ? raw.nom : '',
    titol: getLocalizedField(raw, 'titol', lang),
    telefon: typeof raw.telefon === 'string' ? raw.telefon : '',
    ubicacio: typeof raw.ubicacio === 'string' ? raw.ubicacio : '',
    nivellAngles: getLocalizedField(raw, 'nivell_angles', lang),
    resumSidebar: getLocalizedField(raw, 'resum_sidebar', lang),
    descripcioSobreMi: getLocalizedField(raw, 'descripcio_sobre_mi', lang),
    foto: raw.foto,
    fotoUrl: getDirectusAssetUrl(raw.foto),
    linkedinUrl: typeof raw.linkedin_url === 'string' ? raw.linkedin_url : '',
    githubUrl: typeof raw.github_url === 'string' ? raw.github_url : '',
    email: typeof raw.email === 'string' ? raw.email : '',
  }
}

async function getBlogSettingsUncached(lang: SupportedLang): Promise<BlogSettings | null> {
  const raw = await directus.request(
    readSingleton('blog_settings', {
      fields: [
        'title_ca',
        'title_es',
        'title_en',
        'description_ca',
        'description_es',
        'description_en',
        'default_cover',
        'seo_keywords',
      ],
    }),
  )

  if (!isRecord(raw)) return null

  const seoKeywords = Array.isArray(raw.seo_keywords)
    ? raw.seo_keywords.filter((keyword): keyword is string => typeof keyword === 'string')
    : []

  return {
    title: getLocalizedField(raw, 'title', lang),
    description: getLocalizedField(raw, 'description', lang),
    defaultCover: raw.default_cover,
    defaultCoverUrl: getDirectusAssetUrl(raw.default_cover),
    seoKeywords,
  }
}

function normalizePost(item: unknown, lang: SupportedLang): PostSummary | null {
  if (!isRecord(item)) return null

  const slug = typeof item.slug === 'string' ? item.slug : ''
  if (!slug) return null

  const categories = Array.isArray(item.categories)
    ? item.categories.map((category) => normalizeTaxonomy(category, lang)).filter((value): value is TaxonomyItem => Boolean(value))
    : []

  const tags = Array.isArray(item.tags)
    ? item.tags.map((tag) => normalizeTaxonomy(tag, lang)).filter((value): value is TaxonomyItem => Boolean(value))
    : []

  return {
    title: getLocalizedField(item, 'title', lang),
    excerpt: getLocalizedField(item, 'excerpt', lang),
    slug,
    publishedAt: typeof item.published_at === 'string' ? item.published_at : '',
    coverImage: item.cover_image,
    coverImageUrl: getDirectusAssetUrl(item.cover_image),
    categories,
    tags,
  }
}

async function getPostsUncached(lang: SupportedLang): Promise<PostSummary[]> {
  const items = await directus.request(
    readItems('post', {
      fields: [
        'slug',
        'published_at',
        'cover_image',
        'title_ca',
        'title_es',
        'title_en',
        'excerpt_ca',
        'excerpt_es',
        'excerpt_en',
        'categories.category.slug',
        'categories.category.title_ca',
        'categories.category.title_es',
        'categories.category.title_en',
        'categories.category_id.slug',
        'categories.category_id.title_ca',
        'categories.category_id.title_es',
        'categories.category_id.title_en',
        'tags.tag.slug',
        'tags.tag.title_ca',
        'tags.tag.title_es',
        'tags.tag.title_en',
        'tags.tag_id.slug',
        'tags.tag_id.title_ca',
        'tags.tag_id.title_es',
        'tags.tag_id.title_en',
      ],
      sort: ['-published_at'],
    }),
  )

  if (!Array.isArray(items)) return []

  return items.map((item) => normalizePost(item, lang)).filter((post): post is PostSummary => Boolean(post))
}

async function getPostBySlugUncached(slug: string, lang: SupportedLang): Promise<PostDetail | null> {
  const items = await directus.request(
    readItems('post', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: [
        'slug',
        'published_at',
        'cover_image',
        'title_ca',
        'title_es',
        'title_en',
        'excerpt_ca',
        'excerpt_es',
        'excerpt_en',
        'content_ca',
        'content_es',
        'content_en',
        'categories.category.slug',
        'categories.category.title_ca',
        'categories.category.title_es',
        'categories.category.title_en',
        'categories.category_id.slug',
        'categories.category_id.title_ca',
        'categories.category_id.title_es',
        'categories.category_id.title_en',
        'tags.tag.slug',
        'tags.tag.title_ca',
        'tags.tag.title_es',
        'tags.tag.title_en',
        'tags.tag_id.slug',
        'tags.tag_id.title_ca',
        'tags.tag_id.title_es',
        'tags.tag_id.title_en',
        'related_posts.post.slug',
        'related_posts.post.published_at',
        'related_posts.post.cover_image',
        'related_posts.post.title_ca',
        'related_posts.post.title_es',
        'related_posts.post.title_en',
        'related_posts.post.excerpt_ca',
        'related_posts.post.excerpt_es',
        'related_posts.post.excerpt_en',
        'related_posts.post_id.slug',
        'related_posts.post_id.published_at',
        'related_posts.post_id.cover_image',
        'related_posts.post_id.title_ca',
        'related_posts.post_id.title_es',
        'related_posts.post_id.title_en',
        'related_posts.post_id.excerpt_ca',
        'related_posts.post_id.excerpt_es',
        'related_posts.post_id.excerpt_en',
      ],
    }),
  )

  if (!Array.isArray(items) || items.length === 0) return null

  const normalized = normalizePost(items[0], lang)
  if (!normalized || !isRecord(items[0])) return null

  const relatedRaw = Array.isArray(items[0].related_posts) ? items[0].related_posts : []
  const relatedPosts = relatedRaw
    .map((related) => {
      if (!isRecord(related)) return null
      const nested = (isRecord(related.post) && related.post) || (isRecord(related.post_id) && related.post_id)
      return nested ? normalizePost(nested, lang) : null
    })
    .filter((post): post is PostSummary => Boolean(post))

  return {
    ...normalized,
    content: getLocalizedField(items[0], 'content', lang),
    relatedPosts,
  }
}

async function getCategoriesUncached(lang: SupportedLang): Promise<Category[]> {
  const [categories, posts] = await Promise.all([
    directus.request(
      readItems('category', {
        fields: ['slug', 'title_ca', 'title_es', 'title_en'],
      }),
    ),
    directus.request(
      readItems('post', {
        fields: ['categories.category.slug', 'categories.category_id.slug'],
      }),
    ),
  ])

  if (!Array.isArray(categories)) return []

  const countBySlug = new Map<string, number>()

  if (Array.isArray(posts)) {
    for (const post of posts) {
      if (!isRecord(post) || !Array.isArray(post.categories)) continue

      const uniqueSlugs = new Set<string>()
      for (const relation of post.categories) {
        if (!isRecord(relation)) continue

        const nested =
          (isRecord(relation.category) && relation.category) ||
          (isRecord(relation.category_id) && relation.category_id) ||
          relation

        if (typeof nested.slug === 'string' && nested.slug) {
          uniqueSlugs.add(nested.slug)
        }
      }

      for (const slug of uniqueSlugs) {
        countBySlug.set(slug, (countBySlug.get(slug) || 0) + 1)
      }
    }
  }

  return categories
    .map((category) => {
      if (!isRecord(category)) return null

      const slug = typeof category.slug === 'string' ? category.slug : ''
      const title = getLocalizedField(category, 'title', lang)

      if (!slug || !title) return null

      return {
        slug,
        title,
        count: countBySlug.get(slug) || 0,
      }
    })
    .filter((item): item is Category => Boolean(item))
}

async function getTagsUncached(lang: SupportedLang): Promise<Tag[]> {
  const items = await directus.request(
    readItems('tag', {
      fields: ['slug', 'title_ca', 'title_es', 'title_en'],
      sort: ['title_ca'],
    }),
  )

  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!isRecord(item)) return null
      const slug = typeof item.slug === 'string' ? item.slug : ''
      const title = getLocalizedField(item, 'title', lang)

      if (!slug || !title) return null

      return { slug, title }
    })
    .filter((item): item is Tag => Boolean(item))
}

const EXPERIENCIA_LEGACY_FIELDS = [
  'empresa', 'dates', 'tecnologies', 'ordre',
  'titol_ca', 'titol_es', 'titol_en',
  'descripcio_ca', 'descripcio_es', 'descripcio_en',
]
const EXPERIENCIA_CV_FIELDS = [
  'data_inici', 'data_fi',
  'logros_ca', 'logros_es', 'logros_en',
  'tecnologies_ca', 'tecnologies_es', 'tecnologies_en',
]

async function getExperienciaUncached(lang: SupportedLang): Promise<ExperienciaItem[]> {
  const items = await withSchemaFallback(
    'experiencia',
    () => directus.request(readItems('experiencia', { fields: [...EXPERIENCIA_LEGACY_FIELDS, ...EXPERIENCIA_CV_FIELDS], sort: ['ordre'] })),
    () => directus.request(readItems('experiencia', { fields: EXPERIENCIA_LEGACY_FIELDS, sort: ['ordre'] })),
  )

  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!isRecord(item)) return null
      const empresa = typeof item.empresa === 'string' ? item.empresa : ''
      const where = `experiencia[${empresa}]`

      // Etiquetas traducibles; si aún no hay tecnologies_<idioma>, se usa el campo antiguo (un solo idioma).
      let tecnologies = getLocalizedList(item, 'tecnologies', lang, where)
      if (!tecnologies.length) {
        tecnologies = asStringList(item.tecnologies)
        if (tecnologies.length && lang !== 'ca') {
          warnOnce(`${where}: solo hay etiquetas del campo antiguo "tecnologies" (sin traducir a ${lang})`)
        }
      }

      return {
        empresa,
        dates: formatDateRange(item.data_inici, item.data_fi, lang, typeof item.dates === 'string' ? item.dates : '', where),
        tecnologies,
        titol: getLocalizedField(item, 'titol', lang),
        descripcio: getLocalizedField(item, 'descripcio', lang),
        logros: getLocalizedList(item, 'logros', lang, where),
        ordre: typeof item.ordre === 'number' ? item.ordre : 0,
      }
    })
    .filter((item): item is ExperienciaItem => Boolean(item))
}

async function getFormacioUncached(lang: SupportedLang): Promise<FormacioItem[]> {
  const fields = ['centre', 'dates', 'ordre', 'titulacio_ca', 'titulacio_es', 'titulacio_en']
  const items = await withSchemaFallback(
    'formacio',
    () => directus.request(readItems('formacio', { fields: [...fields, 'data_inici', 'data_fi'], sort: ['ordre'] })),
    () => directus.request(readItems('formacio', { fields, sort: ['ordre'] })),
  )

  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!isRecord(item)) return null
      const centre = typeof item.centre === 'string' ? item.centre : ''
      return {
        centre,
        dates: formatDateRange(item.data_inici, item.data_fi, lang, typeof item.dates === 'string' ? item.dates : '', `formacio[${centre}]`),
        titulacio: getLocalizedField(item, 'titulacio', lang),
        ordre: typeof item.ordre === 'number' ? item.ordre : 0,
      }
    })
    .filter((item): item is FormacioItem => Boolean(item))
}

// Proyectos del CV. Si la colección aún no existe en Directus, simplemente no hay proyectos.
async function getProjectesUncached(lang: SupportedLang): Promise<ProjecteItem[]> {
  let items: unknown
  try {
    items = await directus.request(
      readItems('projecte', {
        fields: [
          'ordre', 'url',
          'nom_ca', 'nom_es', 'nom_en',
          'descripcio_ca', 'descripcio_es', 'descripcio_en',
          'tecnologies_ca', 'tecnologies_es', 'tecnologies_en',
        ],
        sort: ['ordre'],
      }),
    )
  } catch {
    warnOnce('la colección "projecte" no existe o no es legible en Directus; el CV sale sin sección de proyectos')
    return []
  }

  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!isRecord(item)) return null
      const nom = getLocalizedFieldWarn(item, 'nom', lang, 'projecte')
      if (!nom) return null
      return {
        nom,
        descripcio: getLocalizedFieldWarn(item, 'descripcio', lang, `projecte[${nom}]`),
        tecnologies: getLocalizedList(item, 'tecnologies', lang, `projecte[${nom}]`),
        url: typeof item.url === 'string' ? item.url : '',
        ordre: typeof item.ordre === 'number' ? item.ordre : 0,
      }
    })
    .filter((item): item is ProjecteItem => Boolean(item))
}

async function getHabilitatsUncached(lang: SupportedLang): Promise<{ tecniques: HabilitatItem[]; clau: HabilitatItem[] }> {
  const fields = ['categoria', 'nom_ca', 'nom_es', 'nom_en']
  const items = await withSchemaFallback(
    'habilitat',
    () => directus.request(readItems('habilitat', { fields: [...fields, 'grup'], sort: ['nom_ca'] })),
    () => directus.request(readItems('habilitat', { fields, sort: ['nom_ca'] })),
  )

  if (!Array.isArray(items)) {
    return { tecniques: [], clau: [] }
  }

  const normalized = items
    .map((item) => {
      if (!isRecord(item)) return null
      return {
        categoria: typeof item.categoria === 'string' ? item.categoria : '',
        grup: typeof item.grup === 'string' ? item.grup : '',
        nom: getLocalizedFieldWarn(item, 'nom', lang, 'habilitat'),
      }
    })
    .filter((item): item is HabilitatItem => Boolean(item && item.nom))

  return {
    tecniques: normalized.filter((item) => item.categoria === 'tecnica'),
    clau: normalized.filter((item) => item.categoria === 'clau'),
  }
}

async function getCvDataUncached(lang: SupportedLang) {
  const [settings, experiencies, formacions, habilitats, projectes] = await Promise.all([
    getSiteSettings(lang),
    getExperiencia(lang),
    getFormacio(lang),
    getHabilitats(lang),
    getProjectes(lang),
  ])

  if (!settings) return null

  return {
    nom: settings.nom,
    foto: settings.foto,
    fotoUrl: settings.fotoUrl,
    linkedinUrl: settings.linkedinUrl,
    githubUrl: settings.githubUrl,
    email: settings.email,
    telefon: settings.telefon,
    ubicacio: settings.ubicacio,
    nivellAngles: settings.nivellAngles,
    titol: settings.titol,
    resumSidebar: settings.resumSidebar,
    descripcioSobreMi: settings.descripcioSobreMi,
    experiencies,
    projectes,
    formacions,
    habilitatsTecniques: habilitats.tecniques,
    habilitatsClau: habilitats.clau,
  }
}

// --- Caché en memòria amb TTL i "stale-if-error" ---
// Si Directus falla, es serveix l'últim valor bo en lloc de trencar la pàgina.
const CACHE_TTL_MS = Number(process.env.DIRECTUS_CACHE_TTL_MS ?? import.meta.env.DIRECTUS_CACHE_TTL_MS ?? 60_000)
const ERROR_RETRY_MS = 10_000

type CacheEntry = { expires: number; hasValue: boolean; value?: unknown; pending?: Promise<unknown> }
const cache = new Map<string, CacheEntry>()

function cached<A extends unknown[], R>(name: string, fn: (...args: A) => Promise<R>) {
  return (...args: A): Promise<R> => {
    if (CACHE_TTL_MS <= 0) return fn(...args)

    const key = `${name}:${JSON.stringify(args)}`
    const entry = cache.get(key)

    if (entry?.hasValue && entry.expires > Date.now()) return Promise.resolve(entry.value as R)
    if (entry?.pending) return entry.pending as Promise<R>

    const pending = fn(...args).then(
      (value) => {
        cache.set(key, { expires: Date.now() + CACHE_TTL_MS, hasValue: true, value })
        return value
      },
      (error) => {
        if (entry?.hasValue) {
          console.warn(`[directus] ${name} ha fallat, es serveix l'últim valor bo`, error)
          cache.set(key, { expires: Date.now() + ERROR_RETRY_MS, hasValue: true, value: entry.value })
          return entry.value as R
        }
        cache.delete(key)
        throw error
      },
    )

    // Mentre es carrega, conservem el valor antic per si falla
    cache.set(key, { ...entry, expires: entry?.expires ?? 0, hasValue: entry?.hasValue ?? false, pending })
    return pending
  }
}

export const getSiteSettings = cached('getSiteSettings', getSiteSettingsUncached)
export const getBlogSettings = cached('getBlogSettings', getBlogSettingsUncached)
export const getPosts = cached('getPosts', getPostsUncached)
export const getPostBySlug = cached('getPostBySlug', getPostBySlugUncached)
export const getCategories = cached('getCategories', getCategoriesUncached)
export const getTags = cached('getTags', getTagsUncached)
export const getExperiencia = cached('getExperiencia', getExperienciaUncached)
export const getFormacio = cached('getFormacio', getFormacioUncached)
export const getHabilitats = cached('getHabilitats', getHabilitatsUncached)
export const getProjectes = cached('getProjectes', getProjectesUncached)
export const getCvData = cached('getCvData', getCvDataUncached)
