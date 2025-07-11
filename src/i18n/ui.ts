// src/i18n/ui.ts

export const languages = {
  en: 'English',
  es: 'Español',
  ca: 'Català',
};

export const defaultLang = 'ca';

export const ui = {
  ca: {
    'button.downloadCV': 'Descarregar CV',
    'nav.about': 'Sobre mi',
    'nav.experience': 'Experiència',
    'nav.skills': 'Habilitats',
    'skills.technical': 'Tècniques',
    'skills.soft': 'Competències clau',
    'nav.education': 'Formació',
    'footer.design': 'Dissenyat amb Astro, Tailwind CSS i React',
    'footer.content': 'Contingut gestionat amb Sanity.io',
  },
  es: {
    'button.downloadCV': 'Descargar CV',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Habilidades',
    'skills.technical': 'Técnicas',
    'skills.soft': 'Competencias claves',
    'nav.education': 'Formación',
    'footer.design': 'Diseñado con Astro, Tailwind CSS y React',
    'footer.content': 'Contenido gestionado con Sanity.io',
  },
  en: {
    'button.downloadCV': 'Download CV',
    'nav.about': 'About me',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'skills.technical': 'Technical',
    'skills.soft': 'Soft skills',
    'nav.education': 'Education',
    'footer.design': 'Designed with Astro, Tailwind CSS and React',
    'footer.content': 'Content managed with Sanity.io',
  },
} as const;