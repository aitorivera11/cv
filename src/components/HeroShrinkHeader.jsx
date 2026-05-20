import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroShrinkHeader({ fotoUrl, nom, titol, t = {} }) {
  const [shrink, setShrink] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => setShrink(window.scrollY > 550);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`lg:hidden fixed top-0 inset-x-0 z-50 h-14 px-4
        flex items-center justify-between
        bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl
        border-b border-slate-200/80 dark:border-slate-800/80
        shadow-sm
        transition-transform transition-opacity duration-300 ease-in-out
        ${shrink ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      aria-hidden={!shrink}
      {...(!shrink ? { inert: "" } : {})}
    >
      {/* Foto + Nom */}
      <div className="flex items-center gap-3 min-w-0">
        {fotoUrl && (
          <img
            src={fotoUrl}
            alt={`Foto de ${nom}`}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/60 flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
            {nom}
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate leading-tight">
            {titol}
          </p>
        </div>
      </div>

      {/* Secció activa amb animació */}
      <div className="relative overflow-hidden h-5 w-28 text-right flex-shrink-0">
        <AnimatePresence mode="sync">
          {shrink && activeSection && (
            <motion.span
              key={activeSection}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap"
            >
              {formatSectionName(activeSection, t)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function formatSectionName(sectionId, t) {
  const mapping = {
    "sobre-mi": t["nav.about"],
    experiencia: t["nav.experience"],
    habilitats: t["nav.skills"],
    idiomes: t["nav.languages"],
    formacio: t["nav.education"],
  };
  return mapping[sectionId] || sectionId;
}
