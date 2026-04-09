/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DIRECTUS_URL: string
  readonly DIRECTUS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
