import type Lenis from "lenis";

// Instancia unica do Lenis (scroll suave). Fica nula quando o usuario pede
// menos movimento; nesse caso tudo cai no scroll nativo.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

export const HEADER_OFFSET = -84;

export function scrollToTarget(target: string | HTMLElement | number, offset = HEADER_OFFSET) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.5 });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }

  const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (element) {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + offset });
  }
}

export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
