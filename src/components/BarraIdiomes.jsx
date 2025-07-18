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
      className="h-2 rounded-full transition-all duration-1000"
      style={{
        width: "0%",
        background: "linear-gradient(90deg, #4f46e5 0%, #818cf8 100%)", // més suau
        position: "relative",
      }}
    />
  );
};

export default BarraIdiomes;
