const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const themeToApply = savedTheme || getSystemTheme();

  if (themeToApply === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

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

// Detecta canvis del sistema en temps real (opcional)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    document.documentElement.classList.toggle("dark", e.matches);
  }
});

// Apliquem el tema només carregar la pàgina
applyInitialTheme();

// Afegim el listener al botó
document.querySelectorAll(".theme-toggle").forEach((el) => {
  el.addEventListener("click", handleThemeToggle);
});