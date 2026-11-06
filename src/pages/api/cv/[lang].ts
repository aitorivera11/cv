import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import {
  getCvFilename,
  isSupportedLang,
  readCv,
  readCvMeta,
  saveCv,
  saveCvMeta,
} from '../../../lib/cv-storage';
import { getCvData, type SupportedLang } from '../../../lib/directus-content';
import { generatePdfBuffer, renderCvHtml } from '../../../lib/pdf';

function buildPdfResponse(file: Buffer, filename: string, etag: string) {
  return new Response(new Uint8Array(file), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      ETag: etag,
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}

export const GET: APIRoute = async ({ params, request }) => {
  const lang = params.lang;

  if (!lang || !isSupportedLang(lang)) {
    return new Response(JSON.stringify({ error: 'Idioma no soportado' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await getCvData(lang as SupportedLang)

  if (!data) {
    return new Response(JSON.stringify({ error: 'No hay datos del CV en Directus' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // El PDF només es regenera si canvia el contingut (o la plantilla): la clau és el hash del HTML.
  const html = renderCvHtml(data, lang);
  const sourceHash = createHash('sha256').update(html).digest('hex');
  const etag = `"${sourceHash.slice(0, 32)}"`;

  // El navegador ya tiene esta versión: no hace falta volver a enviar (ni tocar el disco).
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag, 'Cache-Control': 'public, max-age=300, must-revalidate' } });
  }

  const cachedCv = await readCv(lang);
  const cachedMeta = await readCvMeta(lang);

  if (cachedCv && cachedMeta?.sourceHash === sourceHash) {
    return buildPdfResponse(cachedCv.file, cachedCv.filename, etag);
  }

  const pdfBuffer = await generatePdfBuffer(data, lang);
  const savedCv = await saveCv(lang, pdfBuffer);
  await saveCvMeta(lang, { sourceHash });

  return buildPdfResponse(pdfBuffer, savedCv.filename || getCvFilename(lang), etag);
};
