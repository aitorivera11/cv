// src/components/HabilitatsAnimated.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CommandLineIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const pillVariant = {
  hidden: { opacity: 0, scale: 0.72, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 18 },
  },
};

const headingVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HabilitatsAnimated({ tecniques, clau, t }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="habilitats" ref={ref} className="mb-24 scroll-mt-24">
      <h2 className="section-heading">{t['nav.skills']}</h2>

      <div className="space-y-10">
        {/* Technical skills */}
        <div>
          <motion.h3
            className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide"
            variants={headingVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <CommandLineIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
            {t['skills.technical']}
          </motion.h3>
          <motion.ul
            className="flex flex-wrap gap-2"
            aria-label={t['skills.technical']}
            variants={listContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {tecniques?.map((hab, i) => (
              <motion.li key={i} className="skill-pill-tech" variants={pillVariant}>
                {hab.nom}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Soft / key skills */}
        <div>
          <motion.h3
            className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide"
            variants={headingVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            <PuzzlePieceIcon className="w-4 h-4 text-violet-500 dark:text-violet-400" aria-hidden="true" />
            {t['skills.soft']}
          </motion.h3>
          <motion.ul
            className="flex flex-wrap gap-2"
            aria-label={t['skills.soft']}
            variants={listContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {clau?.map((hab, i) => (
              <motion.li key={i} className="skill-pill-soft" variants={pillVariant}>
                {hab.nom}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
