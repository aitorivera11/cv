// src/scripts/theme.js

// Funció per aplicar el tema
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};

// Funció per gestionar el clic del botó
const handleThemeToggle = () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
};

// Codi principal que s'executa
// 1. Apliquem el tema inicial només carregar l'script
const initialTheme = (() => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
})();
applyTheme(initialTheme);

// 2. Busquem el botó i li afegim la funcionalitat
const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', handleThemeToggle);
}