"use client";

import { useSceneFallback } from "./useSceneAnchor";

/** Na pagina 404 as particulas ficam espalhadas pela tela. */
export function NotFoundScene() {
  useSceneFallback({ shape: "scatter", x: 0, y: 0, scale: 1, opacity: 0.85 });
  return null;
}
