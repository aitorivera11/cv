# CV de Aitor Rivera

Web personal con CV y blog en tres idiomas (catalán, español e inglés), construida con **Astro 7** (SSR con `@astrojs/node`), React para las islas interactivas y Tailwind 4. El contenido vive en **Directus** y los CV en PDF se generan en el servidor con Playwright.

- Producción: https://aitorivera.com
- Idiomas: `ca` (sin prefijo en la URL), `es` y `en`.

## Requisitos

- Node.js ≥ 22.23.4 (el Dockerfile usa Node 24).
- Una instancia de Directus con las colecciones `site_settings`, `blog_settings`, `post`, `category`, `tag`, `experiencia`, `formacio` y `habilitat`.

## Variables de entorno

Copia `.env.example` a `.env` para trabajar en local.

| Variable | Obligatoria | Build | Runtime | Descripción |
|---|---|---|---|---|
| `DIRECTUS_URL` | Sí | ✅ | ✅ | URL base de Directus, sin barra final. |
| `DIRECTUS_TOKEN` | Sí | ✅ | ✅ | Token estático de solo lectura. |
| `CV_ADMIN_TOKEN` | No | ❌ | ✅ | Protege los endpoints `POST`. Si no está definida, quedan desactivados (503). |
| `CV_STORAGE_DIR` | No | ❌ | ✅ | Carpeta donde se guardan los PDF. Por defecto `./storage/cv` (en Docker, `/app/storage/cv`). |
| `DIRECTUS_CACHE_TTL_MS` | No | ❌ | ✅ | TTL de la caché en memoria de Directus. Por defecto `60000`; con `0` se desactiva. |
| `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY` | Sí (formulario) | ✅ | ✅ | Configuración de EmailJS para el formulario de contacto. |
| `PUBLIC_ANALYTICS_PROVIDER`, `PUBLIC_ANALYTICS_SRC`, `PUBLIC_ANALYTICS_WEBSITE_ID`, `PUBLIC_ANALYTICS_DOMAIN` | No | ✅ | ✅ | Analítica opcional (Umami, Plausible o `custom`). |

> Las variables `PUBLIC_*` y `DIRECTUS_*` se leen durante el build (Astro prerenderiza el blog y las páginas `/es` y `/en`), así que deben estar disponibles en tiempo de build. `CV_ADMIN_TOKEN` solo se necesita en ejecución: no la marques como *Buildtime* en Coolify.

### Analítica (opcional)

```env
# Umami autoalojado
PUBLIC_ANALYTICS_PROVIDER=umami
PUBLIC_ANALYTICS_SRC=https://stats.example.com/script.js
PUBLIC_ANALYTICS_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Plausible autoalojado
PUBLIC_ANALYTICS_PROVIDER=plausible
PUBLIC_ANALYTICS_SRC=https://analytics.example.com/js/script.js
PUBLIC_ANALYTICS_DOMAIN=aitorivera.com
```

Sin estas variables no se carga ningún script de analítica. El origen de `PUBLIC_ANALYTICS_SRC` se añade automáticamente a la CSP.

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción (necesita Directus accesible)
node docker-entrypoint.mjs   # arranca el build (usa HOST y PORT)
```

## API

Los endpoints `POST` exigen la cabecera `Authorization: Bearer $CV_ADMIN_TOKEN`.

| Endpoint | Descripción |
|---|---|
| `GET /api/cv/:lang` | Descarga el CV en PDF (`ca`, `es`, `en`). Si el PDF guardado está desactualizado respecto a Directus, se regenera. Las peticiones simultáneas de un mismo idioma comparten un único render. |
| `POST /api/generate-upload-cv` | Genera los tres PDF desde Directus y los guarda en disco. |
| `POST /api/upload-cv` | Guarda un PDF enviado como `{ "lang": "es", "content": "<base64>" }`. Valida idioma, cabecera `%PDF-` y un máximo de 5 MB. |
| `GET /api/directus-assets/:path` | Proxy de imágenes de Directus (solo `assets/…`, solo parámetros de transformación conocidos). |

```bash
curl -X POST -H "Authorization: Bearer $CV_ADMIN_TOKEN" https://aitorivera.com/api/generate-upload-cv
```

También existe el workflow manual **Regenerate CVs** (`.github/workflows/generate-cv.yml`), que hace esa misma llamada y necesita el secreto `CV_ADMIN_TOKEN` en GitHub. Si el dominio está detrás de Cloudflare, comprueba que ninguna regla de WAF o de bots bloquee ese `POST`.

El script `npm run cv` genera los PDF en local (`cv-aitor-*.pdf`, ignorados por git) usando las variables `DIRECTUS_URL` y `DIRECTUS_TOKEN`.

## Despliegue (Coolify / Docker)

El `Dockerfile` tiene dos etapas:

1. **builder** (Node 24): `npm ci`, `npm run build` y `npm prune --omit=dev`. Limita la memoria de Node a 1,5 GB para no ahogar servidores pequeños.
2. **runtime** (imagen de Playwright, con Chromium): copia el binario de Node del builder, el `node_modules` podado y `dist/`. Arranca con `docker-entrypoint.mjs`, que atiende `SIGTERM` para que el contenedor se pare rápido.

Puntos a tener en cuenta:

- Monta un **volumen persistente** en `/app/storage/cv`; si no, los PDF se regeneran tras cada deploy.
- Hay un `HEALTHCHECK` sobre `/robots.txt` (no depende de Directus).
- En servidores con poca RAM (≈4 GB compartidos) conviene tener **swap** activado: un build sin swap puede dejar la máquina sin respuesta.
- Para evitar el corte entre versiones, Coolify necesita poder hacer *rolling update*, lo que no es posible con un nombre de contenedor fijo.

## Seguridad

- Cabeceras en todas las respuestas del servidor: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `Strict-Transport-Security`.
- `Content-Security-Policy` por cabecera (middleware) y como `<meta>` en el layout, porque las páginas prerenderizadas no pasan por el middleware. La política permite `'unsafe-inline'` en scripts (necesario para las islas de Astro y el script de tema) pero restringe el resto de orígenes, `object-src`, `base-uri` y `form-action`.
- Las páginas prerenderizadas solo reciben la CSP vía `<meta>`; el resto de cabeceras puede añadirlas Cloudflare (por ejemplo, HSTS).

## Estructura

```
src/
  components/   Islas React y componentes Astro
  layouts/      Layout principal (SEO, tema, CSP)
  lib/          Directus, PDF, almacenamiento de CV, auth y CSP
  pages/        Rutas (ca sin prefijo, [locale]/ para es/en) y API
  i18n/         Cadenas de interfaz
pdf/            Plantilla del CV y script para generarlo en local
docker-entrypoint.mjs
```
