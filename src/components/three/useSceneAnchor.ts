"use client";

import { useEffect, useRef, type RefObject } from "react";
import { isMobileViewport, registerAnchor, setFallback, type Resolver, type SceneState } from "./sceneStore";

/**
 * Registra a secao como ancora da cena 3D. O resolver roda a cada frame
 * enquanto o meio da tela estiver dentro da secao.
 */
export function useSceneAnchor(ref: RefObject<HTMLElement | null>, resolver: Resolver) {
  const latest = useRef(resolver);

  useEffect(() => {
    latest.current = resolver;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerAnchor({ el, resolver: () => latest.current });
  }, [ref]);
}

/** Atalho para secoes com um estado fixo, com variante para celular. */
export function fixedState(desktop: SceneState, mobile: SceneState = desktop): Resolver {
  return (_rect, viewport) => (isMobileViewport(viewport) ? mobile : desktop);
}

/** Define o estado da cena quando nenhuma ancora esta ativa (paginas internas). */
export function useSceneFallback(state: SceneState) {
  const { shape, x, y, scale, opacity } = state;
  useEffect(() => {
    setFallback({ shape, x, y, scale, opacity });
    return () => setFallback(null);
  }, [shape, x, y, scale, opacity]);
}
