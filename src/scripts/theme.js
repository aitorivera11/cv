// Applies saved or system theme immediately (prevents FOUT)
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

const applyTheme = () => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const handleThemeToggle = () => {
  document.documentElement.classList.add('theme-transition');
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setTimeout(() => document.documentElement.classList.remove('theme-transition'), 350);
};

// Re-apply on Astro View Transitions navigation
document.addEventListener('astro:after-swap', applyTheme);

// Theme toggle button
document.addEventListener('click', (e) => {
  if (e.target.closest('.theme-toggle')) handleThemeToggle();
});

// Sync with OS theme changes (only if user hasn't set a preference)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.toggle('dark', e.matches);
  }
});
