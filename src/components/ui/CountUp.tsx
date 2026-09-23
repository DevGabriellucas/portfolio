"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

type Props = { to: number; suffix?: string; duration?: number };

const format = (value: number, suffix: string) => `${Math.round(value).toLocaleString("pt-BR")}${suffix}`;

/** Conta de 0 ate o valor quando entra na tela. Sem JS, mostra o valor final. */
export function CountUp({ to, suffix = "", duration = 1.9 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = format(value, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>{format(to, suffix)}</span>;
}
