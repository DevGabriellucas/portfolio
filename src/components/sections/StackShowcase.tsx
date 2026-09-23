"use client";

import { Check } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { stackPrincipal } from "@/data/stack";
import { clamp, EASE_OUT } from "@/lib/utils";
import { isMobileViewport } from "@/components/three/sceneStore";
import { useSceneAnchor } from "@/components/three/useSceneAnchor";
import { SplitText } from "@/components/ui/SplitText";
import { TechIcon } from "@/components/ui/TechIcon";

const TOTAL = stackPrincipal.length;
/** Quanto de rolagem (em svh) cada tecnologia ocupa. */
const STEP_SVH = 60;

function Segment({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const scaleX = useTransform(progress, [index / TOTAL, (index + 1) / TOTAL], [0, 1], { clamp: true });
  return (
    <li className="h-1 flex-1 overflow-hidden rounded-full bg-line">
      <motion.span
        className="block h-full origin-left rounded-full bg-gradient-to-r from-azul via-violeta to-ciano"
        style={{ scaleX }}
      />
    </li>
  );
}

export function StackShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setIndex(Math.min(TOTAL - 1, Math.floor(p * TOTAL)));
  });

  // Mesma conta do texto: a particula forma o logo da tecnologia da vez.
  useSceneAnchor(ref, (rect, viewport) => {
    const p = clamp(-rect.top / Math.max(1, rect.height - viewport.h));
    const shape = stackPrincipal[Math.min(TOTAL - 1, Math.floor(p * TOTAL))].id;
    if (isMobileViewport(viewport)) return { shape, x: 0, y: 1.35, scale: 0.58, opacity: 1 };
    return { shape, x: 2.55, y: 0.05, scale: 1.02, opacity: 1 };
  });

  const tech = stackPrincipal[index];

  return (
    <section
      ref={ref}
      id="stack"
      aria-label="Stack principal"
      className="relative"
      style={{ height: `calc(100svh + ${TOTAL * STEP_SVH}svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden md:items-center">
        <div className="container-page grid w-full md:grid-cols-2">
          <div className="pb-12 md:pb-0">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-ciano">
              <span className="text-dim">02</span>
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-ciano to-transparent" />
              Stack principal
            </p>
            <SplitText
              as="h2"
              text="Ferramentas que eu uso em produção."
              gradient={["produção."]}
              className="max-w-lg font-display text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
            />

            <div className="relative mt-7 min-h-[200px] md:mt-12 md:min-h-[240px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] md:h-12 md:w-12">
                      <TechIcon name={tech.icone} colored className="h-6 w-6" />
                    </span>
                    <h3
                      className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.04em] md:text-6xl"
                      style={{ color: tech.cor }}
                    >
                      {tech.nome}
                    </h3>
                  </div>
                  <p className="mt-4 text-base text-fg/90 md:text-lg">{tech.frase}</p>
                  <ul className="mt-4 space-y-2">
                    {tech.provas.map((prova) => (
                      <li key={prova} className="flex gap-2.5 text-sm leading-relaxed text-muted md:text-[15px]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-verde" />
                        {prova}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-7 flex max-w-md items-center gap-4 md:mt-10">
              <span className="font-mono text-xs tabular-nums text-dim">
                {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
              </span>
              <ol aria-hidden className="flex flex-1 gap-1.5">
                {stackPrincipal.map((item, i) => (
                  <Segment key={item.id} progress={scrollYProgress} index={i} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Versao completa para leitor de tela e buscador. */}
      <ul className="sr-only">
        {stackPrincipal.map((item) => (
          <li key={item.id}>
            {item.nome}: {item.frase} {item.provas.join(". ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
