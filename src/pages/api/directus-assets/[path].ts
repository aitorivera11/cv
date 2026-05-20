import type { APIRoute } from 'astro'

function getDirectusBaseUrl(): string {
  const rawUrl = typeof import.meta.env.DIRECTUS_URL === 'string' ? import.meta.env.DIRECTUS_URL : ''
  return rawUrl.replace(/\/+$/, '')
}

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

  const requestUrl = new URL(request.url)
  const upstreamUrl = `${directusBaseUrl}/${decodedPath}${requestUrl.search}`

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
