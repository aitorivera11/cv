// src/components/ThemeToggle.jsx
import { useState, useEffect } from 'react';

// Pots personalitzar aquests SVG com vulguis
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2m-6.07-1.41.4.4m10.26-10.26.4.4M2 12h2m16 0h2m-6.46 5.25-.4.4M7.46 6.34l-.4.4"></path></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>;

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none transition-colors"
      aria-label="Canviar tema"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;