// Redimensiona una imatge de Directus (via el proxy /api/directus-assets) a la mida
// que realment es mostra. `px` és la mida CSS; demanem el doble per a pantalles retina.
export function sizedImageUrl(url: string, px: number): string {
  if (!url) return '';
  const size = px * 2;
  const params = `width=${size}&height=${size}&fit=cover&format=webp&quality=80`;
  return `${url}${url.includes('?') ? '&' : '?'}${params}`;
}
