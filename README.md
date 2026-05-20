# CV Aitor - Deploy en VPS/Coolify

Este proyecto ya no depende de Vercel ni de `@vercel/blob`.

## Cambios clave

- Build en modo servidor (`@astrojs/node` + `output: server`) para poder exponer API routes en el VPS.
- Eliminadas integraciones de Vercel Analytics/Speed Insights.
- Eliminada dependencia de Font Awesome (icons SVG locals).
- Nueva generación y almacenamiento local de CV PDFs en el servidor.
- Descarga del botón de CV conectada al endpoint local del servidor.

## Endpoints API

### `POST /api/generate-upload-cv`
Genera los 3 CV (`ca`, `es`, `en`) y los guarda en disco.

Respuesta ejemplo:

```json
{
  "ok": true,
  "results": [
    { "lang": "ca", "filename": "cv-aitor-ca.pdf", "filePath": "...", "url": "/api/cv/ca" },
    { "lang": "es", "filename": "cv-aitor-es.pdf", "filePath": "...", "url": "/api/cv/es" },
    { "lang": "en", "filename": "cv-aitor-en.pdf", "filePath": "...", "url": "/api/cv/en" }
  ]
}
```

### `GET /api/cv/:lang`
Descarga el CV en PDF almacenado en el servidor.

Idiomas válidos: `ca`, `es`, `en`.

### `POST /api/upload-cv`
Guarda un CV enviado en base64.

Body JSON:

```json
{
  "lang": "es",
  "content": "<base64-pdf>"
}
```

## Almacenamiento de PDFs

Por defecto se guardan en:

- `./storage/cv`

Puedes cambiarlo con variable de entorno:

- `CV_STORAGE_DIR=/ruta/persistente/cv`

> Recomendación para Coolify: monta un volumen persistente y usa esa ruta en `CV_STORAGE_DIR`.

## Comandos

```bash
npm install
npm run build
npm run preview
```

Para generar los CV en servidor:

```bash
curl -X POST http://localhost:4321/api/generate-upload-cv
```


## Variables d'entorn CMS

Aquest projecte necessita Directus:

- `DIRECTUS_URL`: URL base de Directus (sense barra final)
- `DIRECTUS_TOKEN`: token estàtic amb permisos de lectura

Pots partir de `.env.example`.

## Analítica de visites (opcional)

Ara es pot injectar un script d’analítica sense dependre de llibreries externes.

Variables disponibles:

- `PUBLIC_ANALYTICS_PROVIDER`: `umami`, `plausible` o `custom`
- `PUBLIC_ANALYTICS_SRC`: URL completa del script (pots apuntar al teu servidor)
- `PUBLIC_ANALYTICS_WEBSITE_ID`: necessari en Umami
- `PUBLIC_ANALYTICS_DOMAIN`: recomanat en Plausible

### Exemple amb Umami autoallotjat

```env
PUBLIC_ANALYTICS_PROVIDER=umami
PUBLIC_ANALYTICS_SRC=https://stats.example.com/script.js
PUBLIC_ANALYTICS_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Exemple amb Plausible autoallotjat

```env
PUBLIC_ANALYTICS_PROVIDER=plausible
PUBLIC_ANALYTICS_SRC=https://analytics.example.com/js/script.js
PUBLIC_ANALYTICS_DOMAIN=aitorivera.com
```

Si no defineixes aquestes variables, no es carrega cap script d’analítica.

