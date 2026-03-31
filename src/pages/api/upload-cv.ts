import type { APIRoute } from 'astro';
import { saveCv } from '../../lib/cv-storage';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { lang, content } = body;

    if (!lang || !content) {
      return new Response(JSON.stringify({ error: 'lang o content faltante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const buffer = Buffer.from(content, 'base64');
    const result = await saveCv(lang, buffer);

    return new Response(JSON.stringify({ ok: true, ...result }), {
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
