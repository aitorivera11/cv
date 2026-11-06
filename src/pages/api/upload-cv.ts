import type { APIRoute } from 'astro';
import { requireAdmin } from '../../lib/auth';
import { isSupportedLang, saveCv } from '../../lib/cv-storage';

export const prerender = false;

const MAX_PDF_BYTES = 5 * 1024 * 1024;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

export const POST: APIRoute = async ({ request }) => {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const { lang, content } = await request.json();

    if (typeof lang !== 'string' || !isSupportedLang(lang) || typeof content !== 'string' || !content) {
      return json({ ok: false, error: 'lang o content invàlid' }, 400);
    }

    // Base64 ≈ 4/3 de la mida real: descartem abans de decodificar.
    if (content.length > Math.ceil((MAX_PDF_BYTES * 4) / 3) + 4) {
      return json({ ok: false, error: 'Fitxer massa gran' }, 413);
    }

    const buffer = Buffer.from(content, 'base64');

    if (buffer.length === 0 || buffer.length > MAX_PDF_BYTES || buffer.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return json({ ok: false, error: 'El contingut no és un PDF vàlid' }, 400);
    }

    const result = await saveCv(lang, buffer);
    return json({ ok: true, ...result });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: 'Error en desar el CV' }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Use POST' }, 405, { Allow: 'POST' });
