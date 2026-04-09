import { createDirectus, rest, staticToken } from '@directus/sdk'

function requireEnv(name: 'DIRECTUS_URL' | 'DIRECTUS_TOKEN') {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const DIRECTUS_URL = requireEnv('DIRECTUS_URL')

export const directus = createDirectus(DIRECTUS_URL)
  .with(staticToken(requireEnv('DIRECTUS_TOKEN')))
  .with(rest())
