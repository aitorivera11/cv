// astro.config.mjs (VERSIÓ SIMPLIFICADA)
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Ja no necessitem la integració de Sanity aquí.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});