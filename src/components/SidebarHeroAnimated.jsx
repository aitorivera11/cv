// src/components/SidebarHeroAnimated.jsx
import { sizedImageUrl } from "../lib/image";
import { LazyMotion, domAnimation, MotionConfig, m } from 'framer-motion';
import ContactModal from './ContactModal.jsx';
import ScrollAwareNav from './ScrollAwareNav.jsx';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SidebarHeroAnimatedInner({ fotoUrl, nom, titol, t }) {
  return (
    <m.div
      className="relative flex-grow flex flex-col justify-center items-center text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {fotoUrl && (
        <m.div className="mb-6" variants={photoVariants}>
          <img
            src={sizedImageUrl(fotoUrl, 96)}
            width={96}
            height={96}
            alt={(t?.['a11y.photoOf'] ?? 'Foto de {name}').replace('{name}', nom)}
            className="h-24 w-24 rounded-full object-cover pulse-ring-anim"
            fetchPriority="high"
          />
        </m.div>
      )}

      <m.h1
        className="text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight"
        variants={item}
      >
        {nom}
      </m.h1>

      <m.p
        className="mt-2 text-base font-semibold gradient-text tracking-wide"
        variants={item}
      >
        {titol}
      </m.p>

      <m.div
        className="mt-8 w-full flex justify-center"
        variants={item}
      >
        <ContactModal t={t} />
      </m.div>

      <m.div variants={item}>
        <ScrollAwareNav t={t} />
      </m.div>
    </m.div>
  );
}

// LazyMotion carga solo las animaciones básicas (mucho menos JS); `m` sustituye a `motion`.
// MotionConfig respeta prefers-reduced-motion también en las animaciones de JS.
export default function SidebarHeroAnimated(props) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SidebarHeroAnimatedInner {...props} />
      </MotionConfig>
    </LazyMotion>
  );
}
