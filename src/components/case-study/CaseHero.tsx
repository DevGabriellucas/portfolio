"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { EASE_OUT } from "@/lib/utils";
import type { SceneState } from "@/components/three/sceneStore";
import { fixedState, useSceneAnchor, useSceneFallback } from "@/components/three/useSceneAnchor";
import { TechIcon } from "@/components/ui/TechIcon";
import { buttonGhost, buttonPrimary } from "@/components/ui/styles";
import type { BrandIconName } from "@/lib/brand-icons";

type Meta = { rotulo: string; valor: string };
type Metric = { valor: string; rotulo: string };
type HeroLink = { rotulo: string; href: string; tipo: "ao-vivo" | "codigo" };

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  meta: Meta[];
  metrics: Metric[];
  links: HeroLink[];
  stack: { nome: string; icone?: BrandIconName }[];
  scene: { desktop: SceneState; mobile: SceneState };
};

const FALLBACK: SceneState = { shape: "galaxy", x: 0, y: -0.3, scale: 1.3, opacity: 0.26 };

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export function CaseHero({ eyebrow, title, subtitle, meta, metrics, links, stack, scene }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSceneAnchor(ref, fixedState(scene.desktop, scene.mobile));
  useSceneFallback(FALLBACK);

  return (
    <section ref={ref} className="relative pb-16 pt-32 md:pb-24 md:pt-40">
      <motion.div
        className="container-page"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        <motion.div variants={item}>
          <Link href="/#projetos" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Voltar aos projetos
          </Link>
        </motion.div>
        <motion.p variants={item} className="mt-10 font-mono text-xs uppercase tracking-[0.24em] text-ciano">
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-4 font-display text-[clamp(3.4rem,11vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
        >
          <span className="text-gradient">{title}</span>
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {subtitle}
        </motion.p>

        <motion.dl variants={item} className="mt-10 grid max-w-3xl gap-x-10 gap-y-5 sm:grid-cols-2">
          {meta.map((entry) => (
            <div key={entry.rotulo} className="border-l border-line pl-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">{entry.rotulo}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-fg md:text-[15px]">{entry.valor}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.ul variants={item} className="mt-8 flex flex-wrap gap-2" aria-label="Tecnologias">
          {stack.map((tech) => (
            <li
              key={tech.nome}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
            >
              {tech.icone && <TechIcon name={tech.icone} colored className="h-3.5 w-3.5" />}
              {tech.nome}
            </li>
          ))}
        </motion.ul>

        {links.length > 0 && (
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={link.tipo === "ao-vivo" ? buttonPrimary : buttonGhost}
              >
                {link.tipo === "ao-vivo" ? (
                  <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_2px_rgb(255_255_255/0.6)]" />
                ) : (
                  <TechIcon name="github" className="h-4 w-4" />
                )}
                {link.rotulo}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </motion.div>
        )}

        <motion.dl variants={item} className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.rotulo} className="glass rounded-2xl p-5">
              <dt className="sr-only">{metric.rotulo}</dt>
              <dd className="font-display text-4xl font-semibold tracking-[-0.04em]">{metric.valor}</dd>
              <dd className="mt-2 text-sm text-muted">{metric.rotulo}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
