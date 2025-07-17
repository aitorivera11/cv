import React, { useEffect, useRef } from "react";

const BarraIdiomes = ({ percent }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.width = "0%";
      setTimeout(() => {
        ref.current.style.width = percent + "%";
      }, 100);
    }
  }, [percent]);

  return (
    <div
      ref={ref}
      className="h-2 rounded-full shadow-md transition-all duration-1000"
      style={{
        width: "0%",
        background: "linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",
        boxShadow: "0 0 8px #6366f1cc",
        position: "relative",
      }}
    />
  );
};

export default BarraIdiomes;
