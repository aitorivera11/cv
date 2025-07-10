// src/scripts/theme-setup.js

// Aquesta funció defineix el tema inicial per evitar el parpadeig.
const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Apliquem el tema inicial a l'etiqueta <html>
const theme = getInitialTheme();
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}

// Guardem el tema a la memòria del navegador per a la sessió actual.
localStorage.setItem('theme', theme);

// Aquesta funció s'executarà quan la pàgina hagi carregat completament.
// Assignarà la funcionalitat al botó.
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle');
  
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      // Obtenim el tema actual, el canviem i el guardem.
      let currentTheme = localStorage.getItem('theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      localStorage.setItem('theme', newTheme);
      
      // Apliquem el canvi de classe a l'HTML.
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }
});