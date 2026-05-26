import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

const LABELS = {
  ca: "Pujar a l'inici",
  es: 'Subir al inicio',
  en: 'Back to top',
};

export default function BackToTopRocketProgress() {
  const [show, setShow] = useState(false);
  const mainRef = useRef(null);
  const lang = typeof document !== 'undefined' ? (document.documentElement.lang || 'ca') : 'ca';
  const label = LABELS[lang] || LABELS.ca;

  // useScroll targets the main snap container on desktop, falls back to window
  const { scrollYProgress } = useScroll({ container: mainRef });
  const pathLength = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const mainEl = document.getElementById('main-content');
    mainRef.current = mainEl;

    const onScroll = () => {
      const pos = mainEl ? mainEl.scrollTop : window.scrollY;
      setShow(pos > 300);
    };

    mainEl?.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      mainEl?.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = () => {
    const mainEl = document.getElementById('main-content');
    if (mainEl && mainEl.scrollTop > 0) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 50, rotate: 15 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: 50, rotate: 15 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          whileHover={{
            y: [0, -8, 0],
            transition: { y: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } },
          }}
          onClick={handleClick}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-900 text-white shadow-lg flex items-center justify-center hover:bg-indigo-950"
          aria-label={label}
        >
          <RocketLaunchIcon className="w-5 h-5 md:w-6 md:h-6 z-10 rotate-315" aria-hidden="true" />

          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="50" cy="50" r="45" stroke="" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#4f39f6"
              strokeWidth="8"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ pathLength }}
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
