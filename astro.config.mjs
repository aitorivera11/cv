// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import sanity from '@sanity/astro';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  
  integrations: [react(), sentry(), spotlightjs(), sanity({
      projectId: 'l4g6ncle',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
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