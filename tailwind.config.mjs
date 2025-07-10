// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
        // Aquí podríem afegir colors o fonts personalitzades en el futur
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Afegeix aquest plugin per millorar l'estil del PortableText
  ],
}