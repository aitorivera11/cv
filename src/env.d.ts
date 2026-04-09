/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DIRECTUS_URL: string
  readonly DIRECTUS_TOKEN: string
  readonly PUBLIC_ANALYTICS_PROVIDER?: 'umami' | 'plausible' | 'custom'
  readonly PUBLIC_ANALYTICS_SRC?: string
  readonly PUBLIC_ANALYTICS_WEBSITE_ID?: string
  readonly PUBLIC_ANALYTICS_DOMAIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
