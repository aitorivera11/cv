// src/components/AnimateOnScroll.jsx
import { useState, useEffect, useRef } from 'react';

const AnimateOnScroll = ({ children, className = '', threshold = 0.1, delay = 0, triggerOnce = true }) => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [isVisible, setIsVisible] = useState(prefersReducedMotion);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Només deixem d'observar si triggerOnce és true
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else {
            // Si l'element surt de la pantalla i no és 'triggerOnce', el tornem a amagar
            if (!triggerOnce) {
              setIsVisible(false);
            }
          }
        });
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, triggerOnce]); // Afegim triggerOnce a les dependències del useEffect

  const classes = `
    ${prefersReducedMotion ? '' : 'transition-all duration-700 ease-out'}
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
    ${className}
  `;

  const style = prefersReducedMotion ? {} : { transitionDelay: `${delay}ms` };

  return (
    <div ref={elementRef} className={classes} style={style}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;