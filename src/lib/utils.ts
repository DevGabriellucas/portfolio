export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Curva de easing padrao do site (expo out), no formato que o Motion aceita. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Luminancia relativa de uma cor hex (#rrggbb), de 0 (preto) a 1 (branco). */
export function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}
