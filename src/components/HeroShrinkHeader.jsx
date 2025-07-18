import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroShrinkHeader({ fotoUrl, nom, titol }) {
  const [shrink, setShrink] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

useEffect(() => {
  const handleScroll = () => setShrink(window.scrollY > 550);
  window.addEventListener("scroll", handleScroll);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // centre del viewport
      threshold: 0,
    }
  );

  document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

  return () => {
    window.removeEventListener("scroll", handleScroll);
    observer.disconnect();
  };
}, []);


  return (
    <div
      className={`lg:hidden fixed top-0 inset-x-0 z-50 px-4 py-2 flex items-center justify-between bg-white dark:bg-slate-950 shadow transition-all duration-300 ease-in-out ${
        shrink ? "h-14 opacity-100" : "h-[120px] opacity-0 pointer-events-none"
      }`}
    >
      {/* FOTO + NOM */}
      <div className="flex items-center gap-3">
        <img
          src={fotoUrl}
          alt={`Foto de ${nom}`}
          className={`rounded-full object-cover transition-all duration-300 ${
            shrink ? "w-10 h-10" : "w-0 h-0"
          }`}
        />
        <div className={`transition-opacity duration-300 ${shrink ? "opacity-100" : "opacity-0"}`}>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{nom}</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400">{titol}</p>
        </div>
      </div>

      {/* SECCIÓ ACTIVA AMB ANIMACIÓ */}
      <div className="relative overflow-hidden h-5 w-32 text-right">
        <AnimatePresence mode="sync">
          {shrink && activeSection && (
            <motion.span
              key={activeSection}
              // La nova entra des de baix...
              initial={{ y: "100%", opacity: 0.6 }}
              // ...es col·loca al centre
              animate={{ y: "0%", opacity: 1 }}
              // ...i la vella surt cap amunt
              exit={{ y: "-100%", opacity: 0.6 }}
              transition={{
                duration: 0.45,
                ease: [0.4, 0, 0.2, 1], // suau i natural
              }}
              className="absolute right-0 text-xs font-medium text-indigo-600 dark:text-indigo-400"
            >
              {formatSectionName(activeSection)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function formatSectionName(sectionId) {
  const mapping = {
    "sobre-mi": "Sobre mi",
    experiencia: "Experiència",
    habilitats: "Habilitats",
    idiomes: "Idiomes",
    formacio: "Formació",
  };
  return mapping[sectionId] || sectionId;
}
