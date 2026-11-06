// src/components/SectionIndicator.jsx
import { useActiveSections } from './useActiveSections.js';

export default function SectionIndicator({ sections, label = 'Navegació per seccions' }) {
  const { active } = useActiveSections(sections.map((s) => s.id));

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav
      className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5"
      aria-label={label}
    >
      {sections.map((section) => {
        const isActive = active.includes(section.id);
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={section.label}
            title={section.label}
            aria-current={active[0] === section.id ? 'true' : undefined}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              ${
                isActive
                  ? 'bg-indigo-500 scale-[2.2] shadow-[0_0_5px_rgba(99,102,241,0.6)]'
                  : 'bg-slate-300/70 dark:bg-slate-600/70 hover:bg-indigo-400/80 hover:scale-[1.4]'
              }`}
          />
        );
      })}
    </nav>
  );
}
