"use client";

import { useRef } from "react";
import { stackSecundaria, type TecnologiaSecundaria } from "@/data/stack";
import { fixedState, useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";

function Pill({ item }: { item: TecnologiaSecundaria }) {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white/[0.035] px-4 py-2.5 text-sm text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-fg">
      {item.icone ? (
        <TechIcon name={item.icone} colored className="h-4 w-4" />
      ) : (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violeta-claro" />
      )}
      {item.nome}
    </span>
  );
}

const firstRow = [...stackSecundaria[0].itens, ...stackSecundaria[1].itens];
const secondRow = [...stackSecundaria[2].itens, ...stackSecundaria[3].itens];

export function TechCloud() {
  const ref = useRef<HTMLElement>(null);
  useSceneAnchor(
    ref,
    fixedState(
      { shape: "galaxy", x: 0, y: -0.5, scale: 1.3, opacity: 0.4 },
      { shape: "galaxy", x: 0, y: 0, scale: 0.85, opacity: 0.3 },
    ),
  );

  return (
    <section ref={ref} aria-labelledby="tambem-uso" className="relative py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <h3 id="tambem-uso" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            E também, no dia a dia
          </h3>
          <p className="mt-3 max-w-xl text-muted">
            Ferramentas de back-end, infraestrutura, mobile, testes e dados que aparecem nos projetos da Fábrica e da
            faculdade.
          </p>
        </Reveal>
      </div>
      <div className="mt-10 space-y-3">
        <Marquee duration={52}>
          {firstRow.map((item) => (
            <Pill key={item.nome} item={item} />
          ))}
        </Marquee>
        <Marquee duration={46} reverse>
          {secondRow.map((item) => (
            <Pill key={item.nome} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
