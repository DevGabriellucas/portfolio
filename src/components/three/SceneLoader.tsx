"use client";

import dynamic from "next/dynamic";

// O Three.js so carrega no navegador e depois do HTML: o texto da pagina
// aparece na hora e as particulas entram em seguida.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function SceneLoader() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Brilho de fundo: aparece antes do WebGL e segura o visual se ele falhar. */}
      <div className="absolute -top-1/4 right-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.16),transparent)]" />
      <div className="absolute bottom-[-30%] left-[-15%] h-[65vmax] w-[65vmax] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.13),transparent)]" />
      <Scene />
    </div>
  );
}
