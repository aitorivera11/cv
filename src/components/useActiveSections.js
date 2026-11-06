import { useEffect, useState } from 'react';

// Qué secciones se están viendo, calculado por su posición real (no por una franja fija).
// - `active`: ids de las secciones con al menos la mitad visible (o que ocupan la mitad de la pantalla
//   si son más altas que ella). Varias a la vez cuando comparten página.
// - `current`: la última sección cuyo inicio ya pasó el 40 % de la pantalla (útil para una única etiqueta).
// En escritorio hace scroll `#main-content`; en móvil, la ventana.
export function useActiveSections(ids) {
  const [state, setState] = useState({ active: [], current: ids[0] ?? null });
  const key = ids.join(',');

  useEffect(() => {
    const main = document.getElementById('main-content');

    const compute = () => {
      const scrollsInside = main && main.scrollHeight > main.clientHeight + 1;
      const viewTop = scrollsInside ? main.getBoundingClientRect().top : 0;
      const viewHeight = scrollsInside ? main.clientHeight : window.innerHeight;
      const viewBottom = viewTop + viewHeight;

      const active = [];
      let current = ids[0] ?? null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.height <= 0) continue;

        const visible = Math.max(0, Math.min(rect.bottom, viewBottom) - Math.max(rect.top, viewTop));
        const needed = Math.min(rect.height * 0.5, viewHeight * 0.5);
        if (visible >= needed - 1) active.push(id);
        if (rect.top <= viewTop + viewHeight * 0.4) current = id;
      }

      setState((prev) => {
        const same = prev.current === current && prev.active.join(',') === active.join(',');
        return same ? prev : { active, current };
      });
    };

    compute();
    const targets = [window, main].filter(Boolean);
    targets.forEach((t) => t.addEventListener('scroll', compute, { passive: true }));
    window.addEventListener('resize', compute);
    return () => {
      targets.forEach((t) => t.removeEventListener('scroll', compute));
      window.removeEventListener('resize', compute);
    };
  }, [key]);

  return state;
}
