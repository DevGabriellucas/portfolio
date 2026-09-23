"use client";

import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { perfil } from "@/data/perfil";
import { isMobileViewport, screenToWorld } from "@/components/three/sceneStore";
import { useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { buttonGhost, buttonPrimary } from "@/components/ui/styles";
import { TechIcon } from "@/components/ui/TechIcon";

function EmailCopy() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(perfil.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${perfil.email}`;
    }
  };

  return (
    <div className="glass mx-auto mt-10 flex w-full max-w-lg items-center gap-2 rounded-full p-1.5 pl-4 sm:pl-5">
      <a
        href={`mailto:${perfil.email}`}
        className="min-w-0 flex-1 truncate text-left font-mono text-[11.5px] text-fg transition-colors hover:text-ciano sm:text-[13px] md:text-sm"
      >
        {perfil.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="relative inline-flex h-10 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-fg px-4 text-sm font-semibold text-ink"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "ok" : "copy"}
            className="inline-flex items-center gap-2"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {copied ? <Check className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copiado!" : "Copiar"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Anel de particulas em volta do titulo, como uma orbita.
  useSceneAnchor(sectionRef, (_rect, viewport) => {
    const title = titleRef.current;
    if (!title) return { shape: "ring", x: 0, y: 0, scale: 1, opacity: 0 };
    const r = title.getBoundingClientRect();
    const center = screenToWorld(r.left + r.width / 2, r.top + r.height / 2, viewport);
    const mobile = isMobileViewport(viewport);
    const radius = (Math.min(r.width, viewport.w * (mobile ? 0.62 : 0.5)) / 2) * center.unit * (mobile ? 1.35 : 1.18);
    return {
      shape: "ring",
      x: center.x,
      y: center.y,
      scale: radius / 2.25,
      opacity: 0.9,
      tilt: mobile ? 1.1 : 0.62,
      roll: -0.12,
      follow: 0.2,
    };
  });

  return (
    <section ref={sectionRef} id="contato" className="relative flex min-h-[100svh] items-center py-28">
      <div className="container-page text-center">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-ciano">
            <span className="text-dim">06</span>
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-ciano to-transparent" />
            Contato
          </p>
        </Reveal>
        <div ref={titleRef} className="mx-auto max-w-4xl">
          <SplitText
            as="h2"
            text="Vamos construir algo juntos?"
            gradient={["juntos?"]}
            className="font-display text-[clamp(2.8rem,8.4vw,6.8rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          />
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">{perfil.disponibilidade}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <EmailCopy />
        </Reveal>
        <Reveal delay={0.4} className="mt-8 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <a href={perfil.linkedin} target="_blank" rel="noreferrer" className={buttonPrimary}>
              <TechIcon name="linkedin" className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={perfil.github} target="_blank" rel="noreferrer" className={buttonGhost}>
              <TechIcon name="github" className="h-4 w-4" />
              GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a href={perfil.curriculo} download className={buttonGhost}>
              <Download className="h-4 w-4" />
              Currículo em PDF
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
