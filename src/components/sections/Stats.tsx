"use client";

import { useRef } from "react";
import { numeros } from "@/data/perfil";
import { fixedState, useSceneAnchor } from "@/components/three/useSceneAnchor";
import { CountUp } from "@/components/ui/CountUp";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  useSceneAnchor(
    ref,
    fixedState(
      { shape: "sphere", x: 3.35, y: 0.95, scale: 0.72, opacity: 0.5 },
      { shape: "sphere", x: 0.6, y: 2.3, scale: 0.42, opacity: 0.35 },
    ),
  );

  return (
    <section ref={ref} aria-label="Números" className="relative py-14 md:py-24">
      <div className="container-page">
        <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {numeros.map((numero) => (
            <StaggerItem
              key={numero.rotulo}
              className="glass border-glow group rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1 md:p-7"
            >
              <p className="font-display text-[2.6rem] font-semibold leading-none tracking-[-0.04em] md:text-6xl">
                <CountUp to={numero.valor} suffix={numero.sufixo} />
              </p>
              <p className="mt-3 text-sm text-fg md:text-base">{numero.rotulo}</p>
              <p className="mt-1.5 font-mono text-[10.5px] leading-snug text-dim md:text-[11px]">{numero.fonte}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
