// src/lib/sanity.ts

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Creem el client de connexió, agafant les dades del fitxer .env
const client = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2025-07-09',
    // Important: afegim el token si existeix per a les previsualitzacions
    token: import.meta.env.SANITY_TOKEN,
});

// Creem la nostra pròpia funció per a les imatges
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

// Exportem el client perquè la resta de la pàgina el pugui utilitzar
export default client;