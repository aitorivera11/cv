import React, { useRef, useState, useEffect } from "react";
import { KeyIcon, HomeIcon } from "@heroicons/react/24/solid";

function getRandomPosition() {
  const top = Math.random() * 40 + 10;
  const left = Math.random() * 60 + 10;
  return { top: `${top}%`, left: `${left}%` };
}

export default function Escape404({ t, homePath }) {
  const [escaped, setEscaped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [keyPos, setKeyPos] = useState(getRandomPosition());
  const [doorBounce, setDoorBounce] = useState(false);
  const clauRef = useRef();
  const portaRef = useRef();

  useEffect(() => {
    setKeyPos(getRandomPosition());
  }, []);

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
      setDoorBounce(true);
      setTimeout(() => {
        setDoorBounce(false);
        window.location.href = homePath;
      }, 1600);
    }
  }

  return (
    <div className="bg-white/95 dark:bg-zinc-900/95 dark:text-zinc-100 relative overflow-hidden p-4 sm:p-10 flex flex-col items-center gap-6 sm:gap-8 rounded-3xl shadow-2xl max-w-xs w-full sm:max-w-lg mx-auto min-h-[420px] sm:min-h-[520px] border border-zinc-100 dark:border-zinc-800">
      <h1 className="text-3xl sm:text-5xl font-black text-indigo-700 dark:text-indigo-400 tracking-tight">{t['404.title'] || "404"}</h1>
      <h2 className="text-lg sm:text-2xl font-semibold mb-2">{t['404.escapeRoom'] || "Escape Room Digital"}</h2>
      <p className="text-base sm:text-lg mb-2">{t['404.escapeDesc'] || "Has entrat a una pàgina secreta del web. Només pots escapar si trobes la clau i obres la porta de casa."}</p>

      {/* Clau en posició random però ESTÀTICA */}
      {!escaped && (
        <div
          ref={clauRef}
          style={{
            ...keyPos,
            position: "absolute",
            transition: "top 0.5s, left 0.5s, transform 0.2s",
            zIndex: 10,
          }}
          className={
            "cursor-grab " + (dragging ? "scale-125 -rotate-6 opacity-80" : "")
          }
          draggable={!escaped}
          aria-grabbed="false"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          title={t['404.dragKey'] || "Arrossega'm fins a la casa!"}
          tabIndex={0}
          role="button"
        >
          <KeyIcon className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-500 dark:text-indigo-300 drop-shadow" />
        </div>
      )}

      {/* Porta */}
      <div className="flex items-center justify-center min-h-[120px]">
        <div
          ref={portaRef}
          className={
            "drop-zone inline-block rounded-3xl shadow-lg flex items-center justify-center p-8 min-w-[90px] min-h-[90px] sm:min-w-[100px] sm:min-h-[100px] transition-all relative bg-slate-100 dark:bg-zinc-800 " +
            (doorBounce ? "animate-bounce" : "")
          }
          aria-dropeffect="move"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          title={t['404.dropHere'] || "Deixa aquí la clau per escapar!"}
        >
          <HomeIcon className={`w-14 h-14 sm:w-20 sm:h-20 transition-transform duration-700 ${escaped ? "scale-110 text-green-500" : "text-indigo-400 dark:text-indigo-300"}`} />
          {escaped && (
            <KeyIcon className="w-8 h-8 absolute -bottom-2 left-1/2 -translate-x-1/2 text-green-400 transition-opacity duration-500" />
          )}
        </div>
      </div>

      <div className="grow" />

      {/* Pista molt discreta i centrada */}
      <div className="w-full flex justify-center mt-3">
        <span className="text-xs opacity-70 italic dark:text-zinc-300">
          {t['404.clue'] || "Pista: arrossega la clau fins a la porta de casa..."}
        </span>
      </div>
      
      <div
        className={
          "text-base sm:text-lg font-bold text-green-700 dark:text-green-400 transition-opacity duration-500 mt-2 text-center " +
          (escaped ? "opacity-100" : "opacity-0 pointer-events-none")
        }
        id="missatge"
      >
        {t['404.success'] || "Enhorabona! Has trobat el camí a casa. Redirigint..."}
      </div>
    </div>
  );
}
