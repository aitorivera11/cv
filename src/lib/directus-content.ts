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

export function getDirectusAssetUrl(file: unknown): string {
  const rawId = getRawAssetId(file)
  if (!rawId) return ''

  if (rawId.startsWith('http://') || rawId.startsWith('https://')) {
    return rawId
  }

  return `${import.meta.env.DIRECTUS_URL}/assets/${rawId}`
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

type TaxonomyItem = {
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
  resumSidebar: string
  descripcioSobreMi: string
  foto: unknown
  fotoUrl: string
  cvPdf: unknown
  cvPdfUrl: string
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
}

export async function getSiteSettings(lang: SupportedLang): Promise<SiteSettings | null> {
  const raw = await directus.request(
    readSingleton('site_settings', {
      fields: [
        'nom',
        'foto',
        'cv_pdf',
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
      ],
    }),
  )

  if (!isRecord(raw)) return null

  return {
    nom: typeof raw.nom === 'string' ? raw.nom : '',
    titol: getLocalizedField(raw, 'titol', lang),
    resumSidebar: getLocalizedField(raw, 'resum_sidebar', lang),
    descripcioSobreMi: getLocalizedField(raw, 'descripcio_sobre_mi', lang),
    foto: raw.foto,
    fotoUrl: getDirectusAssetUrl(raw.foto),
    cvPdf: raw.cv_pdf,
    cvPdfUrl: getDirectusAssetUrl(raw.cv_pdf),
    linkedinUrl: typeof raw.linkedin_url === 'string' ? raw.linkedin_url : '',
    githubUrl: typeof raw.github_url === 'string' ? raw.github_url : '',
    email: typeof raw.email === 'string' ? raw.email : '',
  }
}

export async function getBlogSettings(lang: SupportedLang): Promise<BlogSettings | null> {
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

export async function getPosts(lang: SupportedLang): Promise<PostSummary[]> {
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

export async function getPostBySlug(slug: string, lang: SupportedLang): Promise<PostDetail | null> {
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

export async function getCategories(lang: SupportedLang): Promise<Category[]> {
  const [categories, posts] = await Promise.all([
    directus.request(
      readItems('category', {
        fields: ['slug', 'title_ca', 'title_es', 'title_en'],
      }),
    ),
    directus.request(
      readItems('post', {
        fields: ['categories.category.slug', 'categories.category_id.slug', 'categories.slug'],
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

export async function getTags(lang: SupportedLang): Promise<Tag[]> {
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

export async function getExperiencia(lang: SupportedLang): Promise<ExperienciaItem[]> {
  const items = await directus.request(
    readItems('experiencia', {
      fields: [
        'empresa',
        'dates',
        'tecnologies',
        'ordre',
        'titol_ca',
        'titol_es',
        'titol_en',
        'descripcio_ca',
        'descripcio_es',
        'descripcio_en',
      ],
      sort: ['ordre'],
    }),
  )

  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!isRecord(item)) return null
      return {
        empresa: typeof item.empresa === 'string' ? item.empresa : '',
        dates: typeof item.dates === 'string' ? item.dates : '',
        tecnologies: Array.isArray(item.tecnologies)
          ? item.tecnologies.filter((tecnologia): tecnologia is string => typeof tecnologia === 'string')
          : [],
        titol: getLocalizedField(item, 'titol', lang),
        descripcio: getLocalizedField(item, 'descripcio', lang),
        ordre: typeof item.ordre === 'number' ? item.ordre : 0,
      }
    })
    .filter((item): item is ExperienciaItem => Boolean(item))
}

export async function getFormacio(lang: SupportedLang): Promise<FormacioItem[]> {
  const items = await directus.request(
    readItems('formacio', {
      fields: ['centre', 'dates', 'ordre', 'titulacio_ca', 'titulacio_es', 'titulacio_en'],
      sort: ['ordre'],
    }),
  )

  if (!Array.isArray(items)) return []

  return items
    .map((item) => {
      if (!isRecord(item)) return null
      return {
        centre: typeof item.centre === 'string' ? item.centre : '',
        dates: typeof item.dates === 'string' ? item.dates : '',
        titulacio: getLocalizedField(item, 'titulacio', lang),
        ordre: typeof item.ordre === 'number' ? item.ordre : 0,
      }
    })
    .filter((item): item is FormacioItem => Boolean(item))
}

export async function getHabilitats(lang: SupportedLang): Promise<{ tecniques: HabilitatItem[]; clau: HabilitatItem[] }> {
  const items = await directus.request(
    readItems('habilitat', {
      fields: ['categoria', 'nom_ca', 'nom_es', 'nom_en'],
      sort: ['nom_ca'],
    }),
  )

  if (!Array.isArray(items)) {
    return { tecniques: [], clau: [] }
  }

  const normalized = items
    .map((item) => {
      if (!isRecord(item)) return null
      return {
        categoria: typeof item.categoria === 'string' ? item.categoria : '',
        nom: getLocalizedField(item, 'nom', lang),
      }
    })
    .filter((item): item is HabilitatItem => Boolean(item && item.nom))

  return {
    tecniques: normalized.filter((item) => item.categoria === 'tecnica'),
    clau: normalized.filter((item) => item.categoria === 'clau'),
  }
}

export async function getCvData(lang: SupportedLang) {
  const [settings, experiencies, formacions, habilitats] = await Promise.all([
    getSiteSettings(lang),
    getExperiencia(lang),
    getFormacio(lang),
    getHabilitats(lang),
  ])

  if (!settings) return null

  return {
    _updatedAt: new Date().toISOString(),
    nom: settings.nom,
    foto: settings.foto,
    fotoUrl: settings.fotoUrl,
    cvPdf: settings.cvPdfUrl,
    linkedinUrl: settings.linkedinUrl,
    githubUrl: settings.githubUrl,
    email: settings.email,
    titol: settings.titol,
    resumSidebar: settings.resumSidebar,
    descripcioSobreMi: settings.descripcioSobreMi,
    experiencies,
    formacions,
    habilitatsTecniques: habilitats.tecniques,
    habilitatsClau: habilitats.clau,
  }
}
