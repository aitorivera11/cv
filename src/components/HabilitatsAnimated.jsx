// src/components/HabilitatsAnimated.jsx
import { useRef } from 'react';
import { LazyMotion, domAnimation, MotionConfig, m, useInView } from 'framer-motion';
import { CommandLineIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';

// Las primeras habilidades técnicas (orden de Directus) se muestran destacadas.
const MAIN_SKILLS = 4;

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

function HabilitatsAnimatedInner({ tecniques, clau, t }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="habilitats" ref={ref} className="mb-24 scroll-mt-24">
      <h2 className="section-heading">{t['nav.skills']}</h2>

      <div className="space-y-10">
        {/* Technical skills */}
        <div>
          <m.h3
            className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide"
            variants={headingVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <CommandLineIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
            {t['skills.technical']}
          </m.h3>
          <m.ul
            className="flex flex-wrap gap-2"
            aria-label={t['skills.technical']}
            variants={listContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {tecniques?.map((hab, i) => (
              <m.li
                key={i}
                className={i < MAIN_SKILLS ? 'skill-pill-tech skill-pill-main' : 'skill-pill-tech'}
                variants={pillVariant}
              >
                {hab.nom}
              </m.li>
            ))}
          </m.ul>
        </div>

        {/* Soft / key skills */}
        <div>
          <m.h3
            className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide"
            variants={headingVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            <PuzzlePieceIcon className="w-4 h-4 text-violet-500 dark:text-violet-400" aria-hidden="true" />
            {t['skills.soft']}
          </m.h3>
          <m.ul
            className="flex flex-wrap gap-2"
            aria-label={t['skills.soft']}
            variants={listContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {clau?.map((hab, i) => (
              <m.li key={i} className="skill-pill-soft" variants={pillVariant}>
                {hab.nom}
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}

// LazyMotion carga solo las animaciones básicas (mucho menos JS); `m` sustituye a `motion`.
// MotionConfig respeta prefers-reduced-motion también en las animaciones de JS.
export default function HabilitatsAnimated(props) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <HabilitatsAnimatedInner {...props} />
      </MotionConfig>
    </LazyMotion>
  );
}
