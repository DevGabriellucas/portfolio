"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { perfil } from "@/data/perfil";
import { projetos, type LinkProjeto, type Projeto } from "@/data/projetos";
import { cn } from "@/lib/utils";
import { fixedState, useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonGhost, buttonSmall } from "@/components/ui/styles";
import { TechIcon } from "@/components/ui/TechIcon";
import { TiltCard } from "@/components/ui/TiltCard";
import { PhoneFan } from "@/components/visuals/PhoneFan";
import { ServicesGraph } from "@/components/visuals/ServicesGraph";
import { BrowserShot } from "@/components/visuals/BrowserShot";
import { LogoVisual } from "@/components/visuals/LogoVisual";
import { SqlFixWindow } from "@/components/visuals/SqlFixWindow";
import { StackVisual } from "@/components/visuals/StackVisual";

const VISUALS: Record<string, ReactNode> = {
  adm4all: (
    <div className="flex flex-col gap-4">
      <BrowserShot
        src="/projetos/adm4all/dashboard.webp"
        alt="Painel do coordenador do ADM4All em produção"
        url="adm4all.extensao-fs.com.br"
        width={1568}
        height={600}
      />
      <SqlFixWindow className="hidden md:block" />
    </div>
  ),
  ecohub: <PhoneFan />,
  "gestor-academico": <ServicesGraph />,
};

/** Sem ilustracao propria: logo do projeto, ou os icones da stack. */
const visualFor = (projeto: Projeto) =>
  VISUALS[projeto.slug] ?? (projeto.logo ? <LogoVisual projeto={projeto} /> : <StackVisual projeto={projeto} />);

const SELO_TOM = {
  verde: "border-verde/30 bg-verde/10 text-verde",
  violeta: "border-violeta/35 bg-violeta/10 text-violeta-claro",
  ambar: "border-ambar/30 bg-ambar/10 text-ambar",
} as const;

function ProjectLink({ link }: { link: LinkProjeto }) {
  if (link.tipo === "estudo") {
    return (
      <Link
        href={link.href}
        className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.04]"
      >
        {link.rotulo}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className={buttonSmall}>
      {link.tipo === "ao-vivo" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-verde shadow-[0_0_8px_2px_rgb(52_211_153/0.6)]" />
      ) : (
        <TechIcon name="github" className="h-3.5 w-3.5" />
      )}
      {link.rotulo}
      <ArrowUpRight className="h-3.5 w-3.5 text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function ProjectBody({ projeto, large }: { projeto: Projeto; large?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ciano">{projeto.categoria}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h3
          className={cn(
            "font-display font-semibold tracking-[-0.035em]",
            large ? "text-4xl md:text-5xl" : "text-3xl",
          )}
        >
          {projeto.titulo}
        </h3>
        {projeto.selo && (
          <span
            className={cn("rounded-full border px-2.5 py-1 font-mono text-[10.5px]", SELO_TOM[projeto.selo.tom])}
          >
            {projeto.selo.texto}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-dim">{projeto.contexto}</p>
      <p className={cn("mt-5 leading-relaxed text-muted", large && "md:text-lg")}>{projeto.resumo}</p>
      {projeto.contribuicao && <p className="mt-3 text-sm leading-relaxed text-muted/90">{projeto.contribuicao}</p>}

      {projeto.metricas && (
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
          {projeto.metricas.map((metrica) => (
            <div key={metrica.rotulo}>
              <dt className="sr-only">{metrica.rotulo}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{metrica.valor}</dd>
              <dd className="mt-1 text-xs text-dim">{metrica.rotulo}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias">
        {projeto.stack.map((tech) => (
          <li
            key={tech.nome}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted"
          >
            {tech.icone && <TechIcon name={tech.icone} colored className="h-3.5 w-3.5" />}
            {tech.nome}
          </li>
        ))}
      </ul>

      {projeto.links.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-2.5">
          {projeto.links.map((link) => (
            <ProjectLink key={link.href} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedProject({ projeto, reverse }: { projeto: Projeto; reverse?: boolean }) {
  return (
    <Reveal>
      <TiltCard max={3} className="glass border-glow overflow-hidden rounded-[28px]">
        <div
          className={cn(
            "grid items-center gap-10 p-6 md:grid-cols-2 md:gap-12 md:p-10",
            reverse && "md:[&>*:first-child]:order-2",
          )}
        >
          <ProjectBody projeto={projeto} large />
          <div className="relative z-10 min-w-0">{visualFor(projeto)}</div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function ProjectCard({ projeto, delay }: { projeto: Projeto; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard max={4} className="glass border-glow flex h-full flex-col overflow-hidden rounded-[28px] p-6 md:p-8">
        <div className="relative z-10 mb-8 flex min-h-[220px] items-center justify-center rounded-2xl border border-line bg-ink/40 p-4">
          {visualFor(projeto)}
        </div>
        <ProjectBody projeto={projeto} />
      </TiltCard>
    </Reveal>
  );
}

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  useSceneAnchor(
    ref,
    fixedState(
      { shape: "galaxy", x: -3.2, y: 0.4, scale: 1.2, opacity: 0.32 },
      { shape: "galaxy", x: 0, y: 0, scale: 0.8, opacity: 0.22 },
    ),
  );

  const destaques = projetos.filter((p) => p.destaque);
  const outros = projetos.filter((p) => !p.destaque);

  return (
    <section ref={ref} id="projetos" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Projetos"
          title="Projetos que saíram do papel."
          gradient={["papel."]}
          description="Dois estudos de caso com as decisões, o bug e os números por trás — e mais quatro projetos em equipe, dois deles em andamento na Fábrica de Software."
        />

        <div className="mt-16 space-y-6">
          {destaques.map((projeto, i) => (
            <FeaturedProject key={projeto.slug} projeto={projeto} reverse={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {outros.map((projeto, i) => (
            <ProjectCard key={projeto.slug} projeto={projeto} delay={i * 0.1} />
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <a href={perfil.github} target="_blank" rel="noreferrer" className={buttonGhost}>
            <TechIcon name="github" className="h-4 w-4" />
            Ver meu GitHub
            <ArrowUpRight className="h-4 w-4 text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
