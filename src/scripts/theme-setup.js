// src/scripts/theme.js

// Funció per llegir i aplicar el tema guardat o el del sistema.
const applyInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Funció per canviar el tema en fer clic.
const handleThemeToggle = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Apliquem el tema només carregar la pàgina.
applyInitialTheme();

// Afegim la funcionalitat al botó.
document.getElementById('theme-toggle')?.addEventListener('click', handleThemeToggle);