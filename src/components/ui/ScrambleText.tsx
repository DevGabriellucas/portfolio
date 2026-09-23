"use client";

import { useEffect, useState } from "react";
import { clamp, cn } from "@/lib/utils";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEF$%";

type Props = {
  text: string;
  className?: string;
  /** Classes do texto visivel (ex.: text-gradient). Precisa ficar no span que desenha as letras. */
  textClassName?: string;
  delay?: number;
  duration?: number;
};

/**
 * Texto que "decodifica": comeca embaralhado e revela letra a letra. O HTML do
 * servidor ja vem com o texto final, entao buscador e leitor de tela nao
 * dependem da animacao.
 */
export function ScrambleText({ text, className, textClassName, delay = 0, duration = 1.3 }: Props) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const t = clamp((now - start) / (duration * 1000));
      const revealed = Math.floor(t * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        next += i < revealed || text[i] === " " ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {/* A copia invisivel segura a largura final; a embaralhada fica por cima. */}
      <span className="relative inline-block" aria-hidden>
        <span className="invisible">{text}</span>
        <span className={cn("absolute inset-0 whitespace-nowrap", textClassName)}>{output}</span>
      </span>
    </span>
  );
}
