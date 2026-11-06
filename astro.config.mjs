// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://aitorivera.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },

  integrations: [
    react(),
  ],
  i18n: {
    // L'idioma per defecte no tindrà prefix a l'URL (p.ex. /)
    defaultLocale: 'ca',

    // La llista d'idiomes disponibles
    locales: ['ca', 'es', 'en'],

    routing: {
      // No afegeixis el prefix /ca/ a la URL per a l'idioma per defecte
      prefixDefaultLocale: false,
    },
  },
});
