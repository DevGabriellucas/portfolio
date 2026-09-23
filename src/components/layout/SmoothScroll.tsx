"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, HEADER_OFFSET, setLenis } from "@/lib/lenis";

/** Liga o scroll suave (Lenis), exceto para quem pediu menos movimento. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.95 });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  // Depois de trocar de pagina, sincroniza o Lenis com a posicao real
  // (o Next ja rolou para o topo ou para a ancora do link).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const lenis = getLenis();
      if (!lenis) return;
      lenis.resize();
      const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
      if (target) lenis.scrollTo(target, { offset: HEADER_OFFSET, immediate: true, force: true });
      else lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
