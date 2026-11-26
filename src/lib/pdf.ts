import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { cvTemplate, findPendingText } from '../../pdf/template.js';
import { getDirectusAssetOriginUrl } from './directus-content';

function getPhotoUrl(photo: unknown) {
  const photoUrl = getDirectusAssetOriginUrl(photo);
  return photoUrl ? `${photoUrl}?width=400&height=400&fit=cover` : '';
}

// HTML "ligero" (la foto va como URL): sirve para calcular el hash de la caché sin tocar Directus.
export function renderCvHtml(data: Record<string, any>, lang: string): string {
  return cvTemplate(data, getPhotoUrl(data.foto), lang);
}

function directusToken(): string {
  return process.env.DIRECTUS_TOKEN || import.meta.env.DIRECTUS_TOKEN || '';
}

function directusOrigin(): string {
  try {
    return new URL(process.env.DIRECTUS_URL || import.meta.env.DIRECTUS_URL || '').origin;
  } catch {
    return '';
  }
}

// Descarga la foto desde el servidor (con el token de Directus, como hace el proxy de imágenes)
// y la devuelve como data URI. Si falla, devuelve '' y el CV sale sin foto en vez de con una imagen rota.
async function fetchPhotoDataUri(photoUrl: string): Promise<string> {
  if (!photoUrl) return '';

  try {
    const url = new URL(photoUrl);
    const headers: Record<string, string> = {};
    // El token solo se envía a Directus, nunca a otro dominio
    if (url.origin === directusOrigin() && directusToken()) {
      headers.Authorization = `Bearer ${directusToken()}`;
    }

    const response = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    const type = response.headers.get('content-type') ?? '';
    if (!response.ok || !type.startsWith('image/')) {
      throw new Error(`respuesta ${response.status} (${type || 'sin tipo'})`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    return `data:${type};base64,${bytes.toString('base64')}`;
  } catch (error) {
    console.warn('[cv] No se ha podido incrustar la foto en el PDF:', error);
    return '';
  }
}

// Space Grotesk en archivos ESTÁTICOS (un woff2 por peso, public/fonts/cv). La fuente variable de la web
// hace que Chromium incruste el PDF con fuentes Type 3 (texto no extraíble de forma fiable).
const CV_FONT_WEIGHTS = [400, 500, 600, 700];

async function fontFaceStyle(): Promise<string> {
  const dirs = [
    path.join(process.cwd(), 'dist/client/fonts/cv'),
    path.join(process.cwd(), 'public/fonts/cv'),
  ];

  const faces: string[] = [];
  for (const weight of CV_FONT_WEIGHTS) {
    let font: Buffer | null = null;
    for (const dir of dirs) {
      try {
        font = await readFile(path.join(dir, `SpaceGrotesk-${weight}.woff2`));
        break;
      } catch {
        // prueba la siguiente carpeta
      }
    }
    if (!font) {
      console.warn(`[cv] Falta la fuente SpaceGrotesk-${weight}.woff2: el PDF usará una fuente del sistema`);
      continue;
    }
    faces.push(
      `@font-face{font-family:'Space Grotesk';font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');}`,
    );
  }
  return faces.length ? `<style>${faces.join('')}</style>` : '';
}

async function renderPdf(data: Record<string, any>, lang: string): Promise<Buffer> {
  const photo = await fetchPhotoDataUri(getPhotoUrl(data.foto));
  const html = cvTemplate(data, photo, lang).replace('</head>', `${await fontFaceStyle()}</head>`);

  const pending = findPendingText(html);
  if (pending.length) {
    console.warn(`[cv] El CV (${lang}) contiene ${pending.length} texto(s) [PENDIENTE] sin resolver:`, pending);
  }

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '7mm', bottom: '7mm', left: '8mm', right: '8mm' },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

// Evita llançar diversos Chromium alhora per al mateix idioma.
const inFlight = new Map<string, Promise<Buffer>>();

export function generatePdfBuffer(data: Record<string, any>, lang: string): Promise<Buffer> {
  const existing = inFlight.get(lang);
  if (existing) return existing;

  const promise = renderPdf(data, lang).finally(() => inFlight.delete(lang));
  inFlight.set(lang, promise);
  return promise;
}
