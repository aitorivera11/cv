// src/scripts/theme.js


const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Canvi manual amb transició suau
const handleThemeToggle = () => {
  // Afegim classe per activar animació
  document.documentElement.classList.add('theme-transition');

  // Canviem el tema realment
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Després de 400ms traiem la classe
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 400);
};

const applyTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const themeToApply = savedTheme || getSystemTheme();

  if (themeToApply === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};


applyTheme(); // Per la càrrega inicial
document.addEventListener('astro:after-swap', applyTheme); // Per a les navegacions amb View Transitions

document.addEventListener('click', (event) => {
  if (event.target.closest('.theme-toggle')) {
    handleThemeToggle();
  }
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    document.documentElement.classList.toggle("dark", e.matches);
  }
});