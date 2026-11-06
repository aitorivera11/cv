import { useActiveSections } from './useActiveSections.js';

const SECTIONS = [
  ['sobre-mi', 'nav.about'],
  ['experiencia', 'nav.experience'],
  ['formacio', 'nav.education'],
  ['habilitats', 'nav.skills'],
  ['idiomes', 'nav.languages'],
  ['contacte', 'nav.contact'],
];

export default function ScrollAwareNav({ t }) {
  const { active } = useActiveSections(SECTIONS.map(([id]) => id));

  const linkClass = (id) =>
    `whitespace-nowrap transition-colors hover:underline ${
      active.includes(id)
        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
    }`;

  return (
    <nav
      className="mt-10 hidden lg:flex justify-center gap-4 text-sm font-medium"
      aria-label={t['nav.mainSections'] || 'Seccions principals'}
    >
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {SECTIONS.map(([id, key]) => (
          <li key={id}>
            <a href={`#${id}`} className={linkClass(id)} aria-current={active[0] === id ? 'true' : undefined}>
              {t[key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
