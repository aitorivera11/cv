import { promises as fs } from 'node:fs';
import path from 'node:path';

const STORAGE_DIR = process.env.CV_STORAGE_DIR || path.join(process.cwd(), 'storage', 'cv');

const ALLOWED_LANGS = new Set(['ca', 'es', 'en']);

type CvMeta = {
  sourceUpdatedAt: string | null;
};

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

function getCvMetaPath(lang: string) {
  return path.join(STORAGE_DIR, `cv-aitor-${lang}.meta.json`);
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

export async function saveCvMeta(lang: string, meta: CvMeta) {
  if (!isSupportedLang(lang)) {
    throw new Error(`Idioma no soportado: ${lang}`);
  }

  await fs.mkdir(STORAGE_DIR, { recursive: true });
  await fs.writeFile(getCvMetaPath(lang), JSON.stringify(meta), 'utf-8');
}

export async function readCvMeta(lang: string): Promise<CvMeta | null> {
  if (!isSupportedLang(lang)) {
    return null;
  }

  try {
    const raw = await fs.readFile(getCvMetaPath(lang), 'utf-8');
    const parsed = JSON.parse(raw) as CvMeta;

    if (!Object.hasOwn(parsed, 'sourceUpdatedAt')) {
      return null;
    }

    return {
      sourceUpdatedAt: parsed.sourceUpdatedAt ?? null,
    };
  } catch {
    return null;
  }
}
