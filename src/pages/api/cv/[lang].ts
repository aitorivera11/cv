import type { APIRoute } from 'astro';
import { readCv } from '../../../lib/cv-storage';

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang;

  if (!lang) {
    return new Response(JSON.stringify({ error: 'Idioma requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cv = await readCv(lang);

  if (!cv) {
    return new Response(JSON.stringify({ error: 'CV no encontrado para este idioma' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(cv.file, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${cv.filename}"`,
      'Cache-Control': 'no-store',
    },
  });
};
