// Resposta per a quan Directus no està disponible i no hi ha cap valor en caché.
export function serviceUnavailable(): Response {
  return new Response('Servei no disponible temporalment. Torna-ho a provar en uns instants.', {
    status: 503,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Retry-After': '30',
      'Cache-Control': 'no-store',
    },
  });
}
