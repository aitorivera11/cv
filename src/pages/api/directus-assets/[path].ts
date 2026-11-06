import type { APIRoute } from 'astro'

function getDirectusBaseUrl(): string {
  const rawUrl = typeof import.meta.env.DIRECTUS_URL === 'string' ? import.meta.env.DIRECTUS_URL : ''
  return rawUrl.replace(/\/+$/, '')
}

const ALLOWED_PARAMS = new Set(['width', 'height', 'fit', 'quality', 'format', 'withoutEnlargement'])
const NUMERIC_PARAMS = new Set(['width', 'height', 'quality'])
const MAX_DIMENSION = 3000
const MAX_ASSET_BYTES = 25 * 1024 * 1024

export const GET: APIRoute = async ({ params, request }) => {
  const encodedPath = params.path
  if (!encodedPath) {
    return new Response('Missing asset path', { status: 400 })
  }

  const decodedPath = decodeURIComponent(encodedPath).replace(/^\/+/, '')

  // Reject path traversal attempts and non-asset paths
  if (!decodedPath.startsWith('assets/') || decodedPath.includes('..') || /[<>"{}|\\^`]/.test(decodedPath)) {
    return new Response('Invalid asset path', { status: 400 })
  }

  const directusBaseUrl = getDirectusBaseUrl()
  if (!directusBaseUrl) {
    return new Response('Missing DIRECTUS_URL', { status: 500 })
  }

  // Només reenviem els paràmetres de transformació d'imatge coneguts, amb límits.
  const requestUrl = new URL(request.url)
  const query = new URLSearchParams()
  for (const [key, value] of requestUrl.searchParams) {
    if (!ALLOWED_PARAMS.has(key) || value.length > 20) continue
    if (NUMERIC_PARAMS.has(key)) {
      const n = Number(value)
      if (!Number.isFinite(n) || n < 1 || n > MAX_DIMENSION) continue
    }
    query.set(key, value)
  }
  const search = query.size > 0 ? `?${query.toString()}` : ''
  const upstreamUrl = `${directusBaseUrl}/${decodedPath}${search}`

  const token = typeof import.meta.env.DIRECTUS_TOKEN === 'string' ? import.meta.env.DIRECTUS_TOKEN : ''
  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const upstreamResponse = await fetch(upstreamUrl, { headers })

  if (!upstreamResponse.ok) {
    return new Response(`Failed to fetch asset (${upstreamResponse.status})`, {
      status: upstreamResponse.status,
    })
  }

  const contentLength = Number(upstreamResponse.headers.get('content-length') ?? 0)
  if (contentLength > MAX_ASSET_BYTES) {
    return new Response('Asset too large', { status: 413 })
  }

  const responseHeaders = new Headers()
  const contentType = upstreamResponse.headers.get('content-type')
  const cacheControl = upstreamResponse.headers.get('cache-control')

  if (contentType) {
    // Only allow safe media content types through the proxy
    const safeTypes = ['image/', 'video/', 'audio/', 'font/', 'application/pdf', 'application/octet-stream']
    if (!safeTypes.some(t => contentType.startsWith(t))) {
      return new Response('Unsupported asset type', { status: 400 })
    }
    responseHeaders.set('Content-Type', contentType)
  }

  responseHeaders.set('Cache-Control', cacheControl || 'public, max-age=3600')
  responseHeaders.set('X-Content-Type-Options', 'nosniff')

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  })
}
