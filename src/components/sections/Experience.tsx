"use client";

import { ArrowRight, Award, GraduationCap } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { fabrica, formacao } from "@/data/experiencia";
import { cn, EASE_OUT } from "@/lib/utils";
import { fixedState, useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol ref={ref} className="relative space-y-6 pl-8 md:pl-12">
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[11px]" />
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-ciano via-violeta to-azul md:left-[11px]"
        style={{ scaleY }}
      />
      {fabrica.ciclos.map((ciclo, i) => (
        <motion.li
          key={ciclo.periodo}
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: EASE_OUT }}
        >
          <span
            aria-hidden
            className={cn(
              "absolute -left-8 top-6 flex h-4 w-4 items-center justify-center rounded-full border md:-left-12 md:h-6 md:w-6",
              ciclo.status === "atual" ? "border-verde/60 bg-verde/15" : "border-violeta/50 bg-ink",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full md:h-2 md:w-2",
                ciclo.status === "atual" ? "bg-verde shadow-[0_0_12px_2px_rgb(52_211_153/0.7)]" : "bg-violeta-claro",
              )}
            />
          </span>

          <article className="glass border-glow rounded-2xl p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-ciano">{ciclo.periodo}</span>
              {ciclo.status === "atual" && (
                <span className="rounded-full border border-verde/30 bg-verde/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-verde">
                  agora
                </span>
              )}
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">{ciclo.titulo}</h3>
            {ciclo.resumo && <p className="mt-3 leading-relaxed text-muted">{ciclo.resumo}</p>}
            {ciclo.itens && (
              <ul className="mt-4 space-y-2.5">
                {ciclo.itens.map((texto) => (
                  <li key={texto} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ciano" />
                    {texto}
                  </li>
                ))}
              </ul>
            )}
            {ciclo.link && (
              <Link
                href={ciclo.link.href}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg"
              >
                {ciclo.link.rotulo}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </article>
        </motion.li>
      ))}
    </ol>
  );
}

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  useSceneAnchor(
    ref,
    fixedState(
      { shape: "galaxy", x: 3.1, y: -0.2, scale: 1.1, opacity: 0.42 },
      { shape: "galaxy", x: 0, y: 0, scale: 0.8, opacity: 0.25 },
    ),
  );

  return (
    <section ref={ref} id="experiencia" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Experiência"
          title="Onde o código encontra cliente real."
          gradient={["cliente", "real."]}
          description={fabrica.descricao}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-3xl p-7">
              <p className="font-mono text-xs text-ciano">{fabrica.periodo}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{fabrica.cargo}</h3>
              <p className="mt-1.5 text-muted">{fabrica.empresa}</p>
              <p className="mt-1 text-sm text-dim">{fabrica.local}</p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ambar/20 bg-ambar/[0.06] p-4">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-ambar" />
                <div>
                  <p className="text-sm font-medium text-fg">{fabrica.destaque}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    e o certificado de destaque do Product Owner no ciclo 2026.1
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Timeline />
        </div>

        <div className="mt-24">
          <Reveal>
            <h3 className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight">
              <GraduationCap className="h-6 w-6 text-violeta-claro" />
              Formação
            </h3>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
            {formacao.map((item) => (
              <StaggerItem key={item.curso} className="glass border-glow rounded-2xl p-6">
                <p className="font-mono text-xs text-ciano">{item.periodo}</p>
                <p className="mt-3 font-display text-xl font-semibold tracking-tight">{item.curso}</p>
                <p className="mt-1 text-muted">{item.instituicao}</p>
                {item.detalhe && <p className="mt-3 text-sm text-dim">{item.detalhe}</p>}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
