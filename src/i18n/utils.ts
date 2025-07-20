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
