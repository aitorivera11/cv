import React, { useRef, useState } from "react";

export default function Escape404({ t, homePath }) {
  const [escaped, setEscaped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const clauRef = useRef();
  const portaRef = useRef();

  function handleDragStart(e) {
    setDragging(true);
    e.dataTransfer.setData("text/plain", "clau");
  }
  function handleDragEnd() {
    setDragging(false);
  }
  function handleDragOver(e) {
    e.preventDefault();
    portaRef.current.classList.add("ring-4", "ring-indigo-400");
  }
  function handleDragLeave() {
    portaRef.current.classList.remove("ring-4", "ring-indigo-400");
  }
  function handleDrop(e) {
    e.preventDefault();
    portaRef.current.classList.remove("ring-4", "ring-indigo-400");
    const data = e.dataTransfer.getData("text/plain");
    if (data === "clau") {
      setEscaped(true);
      setTimeout(() => {
        window.location.href = homePath;
      }, 1700);
    }
  }

  return (
    <div className="escape-door bg-white/95 p-10 flex flex-col items-center gap-8 rounded-3xl shadow-2xl max-w-lg w-full">
      <h1 className="text-6xl font-black text-indigo-700 tracking-tight">{t['404.title'] || "404"}</h1>
      <h2 className="text-2xl font-semibold mb-2">{t['404.escapeRoom'] || "Escape Room Digital"}</h2>
      <p className="text-lg mb-2">{t['404.escapeDesc'] || "Has entrat a una pàgina secreta del web. Només pots escapar si trobes la clau i obres la porta de casa."}</p>
      <div className="flex flex-row items-center justify-center gap-10 my-4">
        {!escaped && (
          <div
            ref={clauRef}
            className={
              "select-none cursor-grab text-5xl transition-transform escape-emoji " +
              (dragging ? "scale-125 -rotate-6 opacity-80" : "")
            }
            draggable={!escaped}
            aria-grabbed="false"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            title={t['404.dragKey'] || "Arrossega'm fins a la casa!"}
          >
            🗝️
          </div>
        )}
        <div
          ref={portaRef}
          className={
            "drop-zone inline-block rounded-3xl bg-slate-100 shadow-lg p-8 min-w-[100px] min-h-[100px] text-5xl transition-all relative " +
            (dragging ? "ring-2 ring-indigo-300" : "")
          }
          aria-dropeffect="move"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          title={t['404.dropHere'] || "Deixa aquí la clau per escapar!"}
        >
          {escaped ? "🏠🔓" : "🏠"}
        </div>
      </div>
      <pre className="bg-gray-100 text-gray-800 rounded px-4 py-2 text-left text-sm shadow-inner max-w-md mx-auto mb-4">
        {t['404.clue'] || "// Pista: Arrossega la clau fins a la porta de casa..."}
      </pre>
      <div
        className={
          "text-lg font-bold text-green-700 transition-opacity duration-500 mt-2 " +
          (escaped ? "opacity-100" : "opacity-0 pointer-events-none")
        }
        id="missatge"
      >
        {t['404.success'] || "Enhorabona! Has trobat el camí a casa. Redirigint..."}
      </div>
    </div>
  );
}
