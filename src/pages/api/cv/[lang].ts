import type { APIRoute } from 'astro';
import { chromium } from 'playwright';
import imageUrlBuilder from '@sanity/image-url';
import { getCVQuery } from '../../../../pdf/queries.js';
import { client } from '../../../../pdf/sanity.js';
import { cvTemplate } from '../../../../pdf/template.js';
import {
  getCvFilename,
  isSupportedLang,
  readCv,
  readCvMeta,
  saveCv,
  saveCvMeta,
} from '../../../lib/cv-storage';

const builder = imageUrlBuilder(client);

function getPhotoUrl(photo: unknown) {
  if (!photo) {
    return '';
  }

  return builder.image(photo).width(400).height(400).fit('crop').url();
}

async function generatePdfBuffer(data: Record<string, any>, lang: string): Promise<Buffer> {
  const fotoUrl = getPhotoUrl(data.foto);
  const html = cvTemplate(data, fotoUrl, lang);

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '8mm', right: '8mm' },
    });

    return pdfBuffer as Buffer;
  } finally {
    await browser.close();
  }
}

function buildPdfResponse(file: Buffer, filename: string) {
  return new Response(file, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
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

  const data = await client.fetch<Record<string, any> | null>(getCVQuery(lang));

  if (!data) {
    return new Response(JSON.stringify({ error: 'No hay datos del CV en Sanity' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const sourceUpdatedAt = data._updatedAt ?? null;
  const cachedCv = await readCv(lang);
  const cachedMeta = await readCvMeta(lang);

  if (cachedCv && cachedMeta?.sourceUpdatedAt === sourceUpdatedAt) {
    return buildPdfResponse(cachedCv.file, cachedCv.filename);
  }

  const pdfBuffer = await generatePdfBuffer(data, lang);
  const savedCv = await saveCv(lang, pdfBuffer);
  await saveCvMeta(lang, { sourceUpdatedAt });

  return buildPdfResponse(pdfBuffer, savedCv.filename || getCvFilename(lang));
};
