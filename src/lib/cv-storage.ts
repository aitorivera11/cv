import { promises as fs } from 'node:fs';
import path from 'node:path';

const STORAGE_DIR = process.env.CV_STORAGE_DIR || path.join(process.cwd(), 'storage', 'cv');

const ALLOWED_LANGS = new Set(['ca', 'es', 'en']);

export function isSupportedLang(lang: string) {
  return ALLOWED_LANGS.has(lang);
}

export function getCvFilename(lang: string) {
  return `cv-aitor-${lang}.pdf`;
}

export function getCvPublicUrl(lang: string) {
  return `/api/cv/${lang}`;
}

function getCvFilePath(lang: string) {
  return path.join(STORAGE_DIR, getCvFilename(lang));
}

export async function saveCv(lang: string, pdfBuffer: Buffer) {
  if (!isSupportedLang(lang)) {
    throw new Error(`Idioma no soportado: ${lang}`);
  }

  await fs.mkdir(STORAGE_DIR, { recursive: true });
  const filePath = getCvFilePath(lang);
  await fs.writeFile(filePath, pdfBuffer);

  return {
    filename: getCvFilename(lang),
    filePath,
    url: getCvPublicUrl(lang),
  };
}

export async function readCv(lang: string) {
  if (!isSupportedLang(lang)) {
    return null;
  }

  const filePath = getCvFilePath(lang);

  try {
    const file = await fs.readFile(filePath);
    return {
      filename: getCvFilename(lang),
      file,
    };
  } catch {
    return null;
  }
}
