"use client";

import { Maximize2, Quote, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { certificados, type Certificado } from "@/data/projetos";
import { lockScroll } from "@/lib/lenis";
import { cn, EASE_OUT } from "@/lib/utils";
import { fixedState, useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

const noopSubscribe = () => () => {};

function CertificateCard({ cert, onOpen, large }: { cert: Certificado; onOpen: () => void; large?: boolean }) {
  return (
    <TiltCard max={5} className="glass border-glow h-full rounded-[26px] p-3 md:p-4">
      <button
        type="button"
        onClick={onOpen}
        className="group/cert relative z-10 block w-full overflow-hidden rounded-[18px] text-left"
        aria-label={`Ampliar certificado: ${cert.titulo}`}
      >
        <motion.div layoutId={`cert-${cert.id}`} className="relative overflow-hidden rounded-[18px] bg-white">
          <Image
            src={cert.imagem}
            alt={`Certificado ${cert.titulo} — ${cert.emissor}`}
            width={cert.largura}
            height={cert.altura}
            sizes={large ? "(max-width: 1024px) 92vw, 640px" : "(max-width: 1024px) 92vw, 420px"}
            className="h-auto w-full transition-transform duration-700 group-hover/cert:scale-[1.03]"
          />
          {/* Brilho que atravessa o certificado no hover. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/cert:translate-x-full"
          />
        </motion.div>
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover/cert:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
      <div className="relative z-10 px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className={cn("font-display font-semibold tracking-tight", large ? "text-2xl" : "text-lg")}>
            {cert.titulo}
          </h3>
          <span className="font-mono text-xs text-dim">{cert.data}</span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {cert.subtitulo} · {cert.emissor}
        </p>
        {"citacao" in cert && cert.citacao && (
          <blockquote className="mt-5 flex gap-3 border-l border-ambar/40 pl-4 text-[15px] italic leading-relaxed text-muted">
            <Quote aria-hidden className="h-4 w-4 shrink-0 -scale-x-100 text-ambar" />
            {cert.citacao}
          </blockquote>
        )}
      </div>
    </TiltCard>
  );
}

function Lightbox({ cert, onClose }: { cert: Certificado; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={cert.titulo}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Fechar"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/85 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        layoutId={`cert-${cert.id}`}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)]"
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <Image
          src={cert.imagem}
          alt={`Certificado ${cert.titulo} — ${cert.emissor}`}
          width={cert.largura}
          height={cert.altura}
          sizes="(max-width: 1100px) 100vw, 1024px"
          quality={90}
          className="h-auto w-full"
        />
      </motion.div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink/80 text-fg backdrop-blur md:right-8 md:top-8"
        aria-label="Fechar certificado"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

export function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = certificados.find((cert) => cert.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [principal, ...demais] = certificados;

  useSceneAnchor(
    ref,
    fixedState(
      { shape: "galaxy", x: 0.4, y: -0.6, scale: 1.45, opacity: 0.3 },
      { shape: "galaxy", x: 0, y: 0, scale: 0.8, opacity: 0.22 },
    ),
  );

  return (
    <section ref={ref} id="certificados" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="05"
          eyebrow="Certificados"
          title="Reconhecimento que dá para verificar."
          gradient={["verificar."]}
          description="Clique em um certificado para ver o documento inteiro."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="h-full">
            <CertificateCard cert={principal} large onOpen={() => setOpenId(principal.id)} />
          </Reveal>
          <div className="grid gap-6">
            {demais.map((cert, i) => (
              <Reveal key={cert.id} delay={0.1 + i * 0.1}>
                <CertificateCard cert={cert} onOpen={() => setOpenId(cert.id)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Portal no body: dentro do <main> o overlay ficaria abaixo do cabecalho. */}
      {isClient &&
        createPortal(<AnimatePresence>{open && <Lightbox cert={open} onClose={close} />}</AnimatePresence>, document.body)}
    </section>
  );
}
