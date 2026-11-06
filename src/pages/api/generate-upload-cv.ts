import type { APIRoute } from 'astro';
import { requireAdmin } from '../../lib/auth';
import { saveCv, saveCvMeta } from '../../lib/cv-storage';
import { getCvData, type SupportedLang } from '../../lib/directus-content';
import { generatePdfBuffer } from '../../lib/pdf';

export const prerender = false;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });

export const POST: APIRoute = async ({ request }) => {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const langs: SupportedLang[] = ['ca', 'es', 'en'];

  try {
    const results = [];

    for (const lang of langs) {
      const data = await getCvData(lang);
      if (!data) throw new Error(`No s'han trobat dades del CV per a ${lang}`);

      const pdfBuffer = await generatePdfBuffer(data, lang);
      const saved = await saveCv(lang, pdfBuffer);
      await saveCvMeta(lang, { sourceUpdatedAt: data._updatedAt ?? null });
      results.push({ lang, filename: saved.filename, url: saved.url });
    }

    return json({ ok: true, results });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: 'No s\'ha pogut generar el CV' }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Use POST' }, 405, { Allow: 'POST' });
