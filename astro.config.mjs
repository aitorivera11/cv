// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aitorivera.com',
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false
    }
  },
  
  integrations: [react(), sentry(), 
    spotlightjs(), 
    sitemap({
      i18n: {
        defaultLocale: 'ca', 
        locales: {
          en: 'en-US', 
          es: 'es-ES',
          ca: 'ca-ES',
        },
      },
    })],
  i18n: {
    // L'idioma per defecte no tindrà prefix a l'URL (p.ex. /)
    defaultLocale: 'ca',
    
    // La llista d'idiomes disponibles
    locales: ['ca', 'es', 'en'],
    
    routing: {
      // No afegeixis el prefix /ca/ a la URL per a l'idioma per defecte
      prefixDefaultLocale: false,
    }
  }
});