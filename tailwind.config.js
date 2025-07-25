// tailwind.config.mjs
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        slate: {
          css: {
            '--tw-prose-bold': theme('colors.indigo.600'),
            '--tw-prose-invert-bold': theme('colors.indigo.400'),
            p: {
              marginBottom: '1.5rem',
              textAlign: 'justify',
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
