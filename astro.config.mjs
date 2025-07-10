// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
        // Desactiva l'aplicació d'estils base d'Astro per evitar conflictes amb els de Tailwind.
        applyBaseStyles: false,
    }),
  ]
});