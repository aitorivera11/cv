// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  
  integrations: [react(), sentry({
      dsn: "https://28fef328bd65b94006b5de793feb4749@o4509706578165760.ingest.de.sentry.io/4509706581966928",
      // Setting this option to true will send default PII data to Sentry.
      // For example, automatic IP address collection on events
      sendDefaultPii: true,
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }), spotlightjs()],
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
