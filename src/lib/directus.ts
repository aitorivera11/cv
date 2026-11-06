import { createDirectus, rest, staticToken } from '@directus/sdk'

function requireEnv(name: 'DIRECTUS_URL' | 'DIRECTUS_TOKEN') {
  const value = import.meta.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

function createClient() {
  return createDirectus(requireEnv('DIRECTUS_URL'))
    .with(staticToken(requireEnv('DIRECTUS_TOKEN')))
    .with(rest())
}

let client: ReturnType<typeof createClient> | undefined

// El client es crea en la primera petició, no en importar el mòdul:
// així un build o un import sense variables no peta abans d'hora.
export const directus = {
  request: ((...args: Parameters<ReturnType<typeof createClient>['request']>) => {
    client ??= createClient()
    return client.request(...args)
  }) as ReturnType<typeof createClient>['request'],
}
