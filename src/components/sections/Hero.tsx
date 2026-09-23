"use client";

import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { perfil } from "@/data/perfil";
import { scrollToTarget } from "@/lib/lenis";
import { clamp, EASE_OUT } from "@/lib/utils";
import { isMobileViewport } from "@/components/three/sceneStore";
import { useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Magnetic } from "@/components/ui/Magnetic";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buttonGhost, buttonPrimary } from "@/components/ui/styles";
import { Typewriter } from "@/components/ui/Typewriter";

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Esfera a direita no desktop; no celular fica em cima, atras do espaco vazio.
  useSceneAnchor(ref, (rect, viewport) => {
    const p = clamp(-rect.top / rect.height);
    if (isMobileViewport(viewport)) {
      return { shape: "sphere", x: 0, y: 1.2 + p * 0.9, scale: 0.6, opacity: 0.95 - p * 0.3 };
    }
    return { shape: "sphere", x: 2.45 + p * 0.5, y: 0.05 + p * 0.7, scale: 1 - p * 0.18, opacity: 1 - p * 0.3 };
  });

  const goToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToTarget("#projetos");
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] flex-col justify-end pb-20 pt-28 md:justify-center md:pb-12"
    >
      <div className="container-page">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-verde opacity-75 animate-ping-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verde" />
            </span>
            Aberto a oportunidades · {perfil.local}
          </motion.p>

          <motion.p variants={item} className="font-mono text-sm text-ciano">
            &gt; Olá, eu sou
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 font-display text-[clamp(3.5rem,min(12.5vw,17svh),9.6rem)] font-semibold leading-[0.86] tracking-[-0.05em]"
          >
            <ScrambleText text="Gabriel" delay={0.3} />
            <br />
            <ScrambleText text="Lucas" delay={0.55} textClassName="text-gradient pr-[0.06em]" />
          </motion.h1>

          <motion.p variants={item} className="mt-7 font-display text-xl font-medium md:text-[1.7rem]">
            <span className="text-fg">Desenvolvedor Full-Stack</span>
            <span className="hidden text-dim sm:inline"> — </span>
            <br className="sm:hidden" />
            <Typewriter phrases={perfil.frasesDigitadas} className="text-muted" />
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Construo aplicações web de ponta a ponta. Ajudei a colocar um sistema de gestão acadêmica em produção,
            trabalhando do banco de dados à interface.
          </motion.p>

          <motion.a
            variants={item}
            href={perfil.sistemaNoAr.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-verde/25 bg-verde/[0.06] px-3 py-2 font-mono text-xs text-verde transition-colors hover:bg-verde/[0.12]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-verde shadow-[0_0_10px_2px_rgb(52_211_153/0.7)]" />
            {perfil.sistemaNoAr.nome} no ar — {perfil.sistemaNoAr.rotulo}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.a>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projetos" onClick={goToProjects} className={buttonPrimary}>
                Ver projetos
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={perfil.curriculo} download className={buttonGhost}>
                <Download className="h-4 w-4" />
                Baixar currículo
              </a>
            </Magnetic>
            <SocialLinks className="sm:ml-2" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 [@media(min-width:768px)_and_(min-height:860px)]:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">role</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5">
          <span className="h-2 w-1 rounded-full bg-fg/70 animate-scroll-dot" />
        </span>
      </motion.div>
    </section>
  );
}
