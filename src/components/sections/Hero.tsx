"use client";

import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { perfil } from "@/data/perfil";
import { usePrefersReducedMotion } from "@/lib/hooks";
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

/**
 * Lupa que fica varrendo o nome, de Gabriel (linha de cima) ate Lucas (linha de baixo).
 * A lente reaproveita o efeito do cursor (mix-blend-difference inverte as letras embaixo dela);
 * o cabo de madeira e a virola ficam em elementos separados, SEM blend, para nao inverter a cor.
 */
const LENTE = "clamp(3rem,8vw,6rem)"; // diametro da lente
const RAIO = "clamp(1.5rem,4vw,3rem)"; // metade do diametro
const CABO_COMP = "clamp(1.5rem,3.6vw,2.7rem)";
const CABO_LARG = "clamp(0.42rem,1vw,0.62rem)";
const MADEIRA = "linear-gradient(to bottom,#c89158,#8a5a2c 48%,#5c3a1c)";
const LATAO = "linear-gradient(to bottom,#f3dd95,#c69a3e 55%,#8a6a22)";

function NameLens() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute z-10"
      style={{ width: LENTE, height: LENTE, translateX: "-50%", translateY: "-50%" }}
      initial={{ left: "7%", top: "27%", opacity: 0 }}
      animate={{
        left: ["7%", "58%", "58%", "9%", "48%", "48%", "7%"],
        top: ["27%", "27%", "27%", "76%", "76%", "76%", "27%"],
        opacity: [0, 1, 1, 1, 1, 1, 0],
      }}
      transition={{
        duration: 6.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1.4,
        times: [0, 0.18, 0.34, 0.52, 0.68, 0.84, 1],
      }}
    >
      {/* Cabo + virola: giram 45deg a partir do centro da lente e apontam para baixo-direita. */}
      <span className="absolute left-1/2 top-1/2" style={{ transform: "rotate(45deg)", transformOrigin: "0 0" }}>
        {/* virola (encaixe metalico entre a lente e o cabo) */}
        <span
          className="absolute rounded-[2px]"
          style={{
            left: `calc(${RAIO} - 0.28rem)`,
            top: "calc(-0.5 * (0.42rem + 0.28rem))",
            width: "0.6rem",
            height: "calc(0.42rem + 0.28rem)",
            background: LATAO,
            boxShadow: "0 1px 2px rgb(0 0 0/0.45)",
          }}
        />
        {/* cabo de madeira */}
        <span
          className="absolute rounded-full"
          style={{
            left: `calc(${RAIO} + 0.28rem)`,
            top: `calc(${CABO_LARG} / -2)`,
            width: CABO_COMP,
            height: CABO_LARG,
            background: MADEIRA,
            boxShadow: "0 1px 3px rgb(0 0 0/0.45), inset 0 1px 1px rgb(255 255 255/0.25)",
          }}
        />
      </span>

      {/* Lente: o disco que inverte as letras (mesmo efeito da bolinha do cursor). */}
      <span className="absolute inset-0 rounded-full border border-white/80 bg-white/90 mix-blend-difference" />
    </motion.span>
  );
}

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
            className="relative mt-3 w-fit font-display text-[clamp(3.5rem,min(12.5vw,17svh),9.6rem)] font-semibold leading-[0.86] tracking-[-0.05em]"
          >
            <ScrambleText text="Gabriel" delay={0.3} />
            <br />
            <ScrambleText text="Lucas" delay={0.55} textClassName="text-gradient pr-[0.06em]" />
            <NameLens />
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
