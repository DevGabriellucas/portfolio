import type { ShapeId } from "./shapes";

// Ponte entre o DOM e a cena 3D. Cada secao da pagina registra uma "ancora":
// quando a linha do meio da tela esta dentro dela, a ancora diz qual forma as
// particulas devem assumir e onde. A cena le isso a cada frame; nada aqui
// passa pelo estado do React, entao rolar a pagina nao causa re-render.

export type SceneState = {
  shape: ShapeId;
  /** Posicao do centro da forma, em unidades do mundo (plano z = 0). */
  x: number;
  y: number;
  scale: number;
  opacity: number;
  /** Sobrescreve a inclinacao padrao da forma (ver shapeMeta). */
  tilt?: number;
  /** Rotacao em Z, para deixar o anel na diagonal. */
  roll?: number;
  /** Quao rapido a forma segue a posicao alvo (0..1 por frame a 60 fps). */
  follow?: number;
};

export type Viewport = { w: number; h: number };
export type Resolver = (rect: DOMRect, viewport: Viewport) => SceneState;

type Anchor = { el: HTMLElement; resolver: () => Resolver };

export const CAMERA = { z: 7, fov: 45 } as const;

const DEFAULT_FALLBACK: SceneState = { shape: "galaxy", x: 0, y: -0.2, scale: 1.25, opacity: 0.3 };

const anchors = new Set<Anchor>();
let fallback: SceneState = DEFAULT_FALLBACK;

/** Posicao do mouse em coordenadas normalizadas (-1..1); active = 0 sem mouse. */
export const pointer = { x: 0, y: 0, active: 0 };

export function registerAnchor(anchor: Anchor) {
  anchors.add(anchor);
  return () => {
    anchors.delete(anchor);
  };
}

export function setFallback(state: SceneState | null) {
  fallback = state ?? DEFAULT_FALLBACK;
}

export function resolveScene(): SceneState {
  const viewport = { w: window.innerWidth, h: window.innerHeight };
  const line = viewport.h * 0.5;
  for (const anchor of anchors) {
    const rect = anchor.el.getBoundingClientRect();
    if (rect.top <= line && rect.bottom > line) return anchor.resolver()(rect, viewport);
  }
  return fallback;
}

/** Converte um ponto da tela (px) para o mundo 3D no plano z = 0. */
export function screenToWorld(px: number, py: number, viewport: Viewport) {
  const halfH = Math.tan((CAMERA.fov * Math.PI) / 360) * CAMERA.z;
  const halfW = halfH * (viewport.w / viewport.h);
  return {
    x: (px / viewport.w) * 2 * halfW - halfW,
    y: halfH - (py / viewport.h) * 2 * halfH,
    /** Unidades do mundo por pixel. */
    unit: (2 * halfH) / viewport.h,
  };
}

export const isMobileViewport = (viewport: Viewport) => viewport.w < 768;
