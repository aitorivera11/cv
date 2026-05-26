// src/components/ExperienciaTimeline.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ExperienciaTimeline({ experiencies, heading }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section id="experiencia" className="mb-24 scroll-mt-24">
      <h2 className="section-heading">{heading}</h2>

      <div ref={ref} className="relative">
        {/* Animated vertical gradient line */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[6px] top-2 bottom-2 w-0.5 rounded-full origin-top pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)' }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <ul className="space-y-3">
          {experiencies?.map((feina, i) => (
            <motion.li
              key={i}
              className="relative pl-7"
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{
                delay: i * 0.14 + 0.3,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Animated dot — border-circle over the gradient line */}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-[22px] block w-[14px] h-[14px] rounded-full
                  border-2 border-indigo-500 dark:border-indigo-400
                  bg-slate-100 dark:bg-slate-900 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  delay: i * 0.14 + 0.18,
                  duration: 0.45,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />

              <div className="experience-card group">
                <div className="grid sm:grid-cols-8 gap-4 sm:gap-6">
                  {/* Date badge */}
                  <div className="sm:col-span-2 flex sm:flex-col sm:items-start items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-relaxed">
                      {feina.dates}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="sm:col-span-6 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white
                      group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                      transition-colors duration-200 leading-snug">
                      {feina.titol}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {feina.empresa}
                    </p>
                    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none
                      prose-p:text-slate-600 dark:prose-p:text-slate-300
                      prose-p:leading-relaxed prose-p:my-0">
                      <p>{feina.descripcio}</p>
                    </div>
                    {feina.tecnologies?.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologies">
                        {feina.tecnologies.map((tag, j) => (
                          <li key={j} className="tag-pill">{tag}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
