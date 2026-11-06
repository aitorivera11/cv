// Redimensiona una imatge de Directus (via el proxy /api/directus-assets) a la mida
// que realment es mostra. `px` és la mida CSS; demanem el doble per a pantalles retina.
export function sizedImageUrl(url: string, px: number): string {
  if (!url) return '';
  const size = px * 2;
  const params = `width=${size}&height=${size}&fit=cover&format=webp&quality=80`;
  return `${url}${url.includes('?') ? '&' : '?'}${params}`;
}

// URL absoluta (los rastreadores de Facebook, LinkedIn o WhatsApp no resuelven rutas relativas).
export function absoluteUrl(url: string, siteUrl: string): string {
  if (!url) return '';
  return url.startsWith('/') ? `${siteUrl}${url}` : url;
}

// Imagen para og:image / twitter:image: absoluta, 1200x630 y en JPEG (el formato que aceptan todos los rastreadores).
export function ogImageUrl(url: string, siteUrl: string): string {
  if (!url) return '';
  const abs = absoluteUrl(url, siteUrl);
  if (!url.startsWith('/api/directus-assets/')) return abs;
  return `${abs}${abs.includes('?') ? '&' : '?'}width=1200&height=630&fit=cover&format=jpg&quality=80`;
}

// Imagen a ancho fijo (portadas de posts): evita servir el original a pantalla completa.
export function widthImageUrl(url: string, width: number): string {
  if (!url || !url.startsWith('/api/directus-assets/')) return url;
  return `${url}${url.includes('?') ? '&' : '?'}width=${width}&format=webp&quality=80`;
}
