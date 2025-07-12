import { useEffect, useState } from 'react';

export default function ScrollAwareNav({ t }) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      {
        threshold: 0.05,
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = id =>
    `transition-colors hover:underline ${
      activeSection === id
        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
    }`;

  return (
    <nav
      className="mt-10 hidden lg:flex justify-center gap-4 text-sm font-medium"
      aria-label="Seccions principals"
    >
      <ul className="flex gap-4">
        <li>
          <a href="#sobre-mi" className={linkClass('sobre-mi')} aria-current={activeSection === 'sobre-mi' ? 'page' : undefined}>
            {t['nav.about']}
          </a>
        </li>
        <li>
          <a href="#experiencia" className={linkClass('experiencia')} aria-current={activeSection === 'experiencia' ? 'page' : undefined}>
            {t['nav.experience']}
          </a>
        </li>
        <li>
          <a href="#habilitats" className={linkClass('habilitats')} aria-current={activeSection === 'habilitats' ? 'page' : undefined}>
            {t['nav.skills']}
          </a>
        </li>
        <li>
          <a href="#formacio" className={linkClass('formacio')} aria-current={activeSection === 'formacio' ? 'page' : undefined}>
            {t['nav.education']}
          </a>
        </li>
      </ul>
    </nav>
  );
}
