// src/components/SectionIndicator.jsx
import { useState, useEffect } from 'react';

export default function SectionIndicator({ sections }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mainEl = document.getElementById('main-content');
    if (!mainEl) return;

    const handleScroll = () => {
      const h = mainEl.clientHeight;
      if (h === 0) return;
      const index = Math.round(mainEl.scrollTop / h);
      setActive(Math.min(index, sections.length - 1));
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // detect initial position
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollTo = (i) => {
    const mainEl = document.getElementById('main-content');
    if (!mainEl) return;
    mainEl.scrollTo({ top: i * mainEl.clientHeight, behavior: 'smooth' });
  };

  return (
    <nav
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      aria-label="Navegació per seccions"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(i)}
          aria-label={section.label}
          title={section.label}
          aria-current={active === i ? 'true' : undefined}
          className={`w-2 h-2 rounded-full transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
            ${
              active === i
                ? 'bg-indigo-500 scale-[2] shadow-[0_0_6px_rgba(99,102,241,0.7)]'
                : 'bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:scale-[1.5]'
            }`}
        />
      ))}
    </nav>
  );
}
