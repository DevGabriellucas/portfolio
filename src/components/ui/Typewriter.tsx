"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = { phrases: readonly string[]; className?: string };

/** Digita, espera, apaga e passa para a proxima frase. */
export function Typewriter({ phrases, className }: Props) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phrase = 0;
    let chars = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[phrase];
      if (deleting) {
        chars -= 1;
        setText(full.slice(0, chars));
        if (chars <= 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          timer = setTimeout(tick, 380);
          return;
        }
        timer = setTimeout(tick, 22);
        return;
      }
      chars += 1;
      setText(full.slice(0, chars));
      if (chars >= full.length) {
        deleting = true;
        timer = setTimeout(tick, 2400);
        return;
      }
      timer = setTimeout(tick, 42 + Math.random() * 55);
    };

    timer = setTimeout(tick, 2800);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[0.95em] w-[3px] translate-y-[0.14em] rounded-full bg-ciano animate-blink"
      />
    </span>
  );
}
