import React, { useEffect, useRef } from "react";

const BarraIdiomes = ({ percent, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    // Inicia width a 0 i anima cap al percentatge final
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.width = percent + "%";
      }
    }, 100); // petit delay per trigger l'animació CSS
  }, [percent]);

  return (
    <div
      ref={ref}
      className="h-2 rounded-full shadow-md transition-all duration-1000"
      style={{
        width: 0,
        background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
        boxShadow: "0 0 8px #6366f1cc",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default BarraIdiomes;
