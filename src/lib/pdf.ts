import { chromium } from 'playwright';
import { cvTemplate } from '../../pdf/template.js';
import { getDirectusAssetOriginUrl } from './directus-content';

function getPhotoUrl(photo: unknown) {
  const photoUrl = getDirectusAssetOriginUrl(photo);
  return photoUrl ? `${photoUrl}?width=400&height=400&fit=cover` : '';
}

async function renderPdf(data: Record<string, any>, lang: string): Promise<Buffer> {
  const html = cvTemplate(data, getPhotoUrl(data.foto), lang);
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '8mm', right: '8mm' },
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
