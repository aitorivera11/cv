import { useEffect, useState } from 'react';
import ContactModal from './ContactModal.jsx';

// Botón flotante de contacto solo en móvil: aparece al bajar de la cabecera
// y se oculta cuando ya se ve la sección de contacto del final.
export default function StickyContact({ t }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > 480;
      const section = document.getElementById('contacte');
      const contactVisible = section ? section.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      setShow(pastHero && !contactVisible);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-4 z-30">
      <ContactModal
        t={t}
        source="sticky"
        triggerClassName="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      />
    </div>
  );
}
