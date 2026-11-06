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

function buildPdfResponse(file: Buffer, filename: string) {
  return new Response(file, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}

export const GET: APIRoute = async ({ params }) => {
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
  const cachedCv = await readCv(lang);
  const cachedMeta = await readCvMeta(lang);

  if (cachedCv && cachedMeta?.sourceHash === sourceHash) {
    return buildPdfResponse(cachedCv.file, cachedCv.filename);
  }

  const pdfBuffer = await generatePdfBuffer(html, lang);
  const savedCv = await saveCv(lang, pdfBuffer);
  await saveCvMeta(lang, { sourceHash });

  return buildPdfResponse(pdfBuffer, savedCv.filename || getCvFilename(lang));
};
