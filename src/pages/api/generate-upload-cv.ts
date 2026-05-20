import type { APIRoute } from 'astro';
import { chromium } from 'playwright';
import { cvTemplate } from '../../../pdf/template.js';
import { saveCv } from '../../lib/cv-storage';
import { getCvData, getDirectusAssetOriginUrl, type SupportedLang } from '../../lib/directus-content';

function getPhotoUrl(photo: unknown) {
  const photoUrl = getDirectusAssetOriginUrl(photo)
  if (!photoUrl) {
    return ''
  }

  return `${photoUrl}?width=400&height=400&fit=cover`
}

async function generatePdfBuffer(lang: SupportedLang): Promise<Buffer> {
  const data = await getCvData(lang)

  if (!data) {
    throw new Error(`No s'han trobat dades del CV per a ${lang}`)
  }

  const fotoUrl = getPhotoUrl(data.foto)
  const html = cvTemplate(data, fotoUrl, lang)

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '8mm', right: '8mm' },
  });

  await browser.close();
  return pdfBuffer as Buffer;
}

export const POST: APIRoute = async () => {
  const langs: SupportedLang[] = ['ca', 'es', 'en'];

  try {
    const results = [];

    for (const lang of langs) {
      const pdfBuffer = await generatePdfBuffer(lang);
      const saved = await saveCv(lang, pdfBuffer);
      results.push({ lang, ...saved });
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const ALL: APIRoute = async () => {
  return new Response(JSON.stringify({ error: 'Use POST' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      Allow: 'POST',
    },
  });
};
