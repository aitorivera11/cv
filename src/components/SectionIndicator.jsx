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
      className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5"
      aria-label="Navegació per seccions"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(i)}
          aria-label={section.label}
          title={section.label}
          aria-current={active === i ? 'true' : undefined}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
            ${
              active === i
                ? 'bg-indigo-500 scale-[2.2] shadow-[0_0_5px_rgba(99,102,241,0.6)]'
                : 'bg-slate-300/70 dark:bg-slate-600/70 hover:bg-indigo-400/80 hover:scale-[1.4]'
            }`}
        />
      ))}
    </nav>
  );
}
