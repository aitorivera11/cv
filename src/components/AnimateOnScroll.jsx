// src/components/AnimateOnScroll.jsx
import { useState, useEffect, useRef } from 'react';

const AnimateOnScroll = ({ children, className = '', threshold = 0.1, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
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
  }, [threshold]);

  const classes = `
    transition-all duration-700 ease-out
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
    ${className}
  `;
  
  const style = {
      transitionDelay: `${delay}ms`
  };

  return (
    <div ref={elementRef} className={classes} style={style}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;