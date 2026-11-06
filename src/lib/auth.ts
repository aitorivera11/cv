import { timingSafeEqual } from 'node:crypto';

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/**
 * Comprova `Authorization: Bearer <CV_ADMIN_TOKEN>`.
 * Retorna una Response d'error si no està autoritzat, o null si és correcte.
 * Si CV_ADMIN_TOKEN no està definit, els endpoints d'administració queden desactivats.
 */
export function requireAdmin(request: Request): Response | null {
  const expected = process.env.CV_ADMIN_TOKEN || import.meta.env.CV_ADMIN_TOKEN;

  if (!expected) {
    return json({ ok: false, error: 'Admin endpoints disabled (CV_ADMIN_TOKEN not set)' }, 503);
  }

  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token || !safeEqual(token, expected)) {
    return json({ ok: false, error: 'Unauthorized' }, 401, { 'WWW-Authenticate': 'Bearer' });
  }

  return null;
}

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}
