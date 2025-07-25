import { ui, defaultLang } from './ui'

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  // ✅ Retorna directament l'objecte de traduccions amb fallback
  return ui[lang] || ui[defaultLang]
}

export function normalizeLocale(locale?: string): 'ca' | 'es' | 'en' {
  return locale === 'es' || locale === 'en' ? locale : 'ca'
}


export function localizedUrl(lang: string, path: string) {
  // Si la llengua és ca, torna la URL sense prefix
  if (lang === 'ca') {
    return path.startsWith('/') ? path : `/${path}`;
  }
  // Per altres idiomes, prefixa
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}
