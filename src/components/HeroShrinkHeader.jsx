import { useEffect, useState } from 'react';

export default function HeroShrinkHeader({ fotoUrl, nom, titol }) {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 550);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed top-0 inset-x-0 z-50 px-4 py-2 flex items-center gap-3 bg-white dark:bg-slate-950 shadow transition-all duration-300 ease-in-out ${
        shrink ? 'h-14 opacity-100' : 'h-[120px] opacity-0 pointer-events-none'
      }`}
    >
      <img
        src={fotoUrl}
        alt={`Foto de ${nom}`}
        className={`rounded-full object-cover transition-all duration-300 ${
          shrink ? 'w-10 h-10' : 'w-0 h-0'
        }`}
      />
      <div className={`transition-opacity duration-300 ${shrink ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{nom}</p>
        <p className="text-xs text-indigo-600 dark:text-indigo-400">{titol}</p>
      </div>
    </div>
  );
}
