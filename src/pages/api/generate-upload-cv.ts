import type { APIRoute } from 'astro';
import { chromium } from 'playwright';
import { client } from '../../../pdf/sanity.js';
import { getCVQuery } from '../../../pdf/queries.js';
import { cvTemplate } from '../../../pdf/template.js';
import imageUrlBuilder from '@sanity/image-url';
import { saveCv } from '../../lib/cv-storage';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).width(400).height(400).fit('crop').url();
}

async function generatePdfBuffer(lang: string): Promise<Buffer> {
  const data = await client.fetch(getCVQuery(lang));
  const fotoUrl = data.foto ? urlFor(data.foto) : '';

  const html = cvTemplate(data, fotoUrl, lang);

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
  const langs = ['ca', 'es', 'en'];

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
