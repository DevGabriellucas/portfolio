"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Media query reativa, sem setState em effect e sem erro de hidratacao. */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Mouse de verdade (desktop). Em toque, efeitos de hover/tilt ficam desligados. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
