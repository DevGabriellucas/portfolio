"use client";

import { Award, GraduationCap, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { perfil } from "@/data/perfil";
import { cn, EASE_OUT } from "@/lib/utils";
import { isMobileViewport, screenToWorld } from "@/components/three/sceneStore";
import { useSceneAnchor } from "@/components/three/useSceneAnchor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Token = [text: string, kind: "kw" | "var" | "key" | "str" | "p"];

const CODE: Token[][] = [
  [["const ", "kw"], ["gabriel", "var"], [" = {", "p"]],
  [["  cargo", "key"], [": ", "p"], ['"Desenvolvedor Full-Stack"', "str"], [",", "p"]],
  [["  local", "key"], [": ", "p"], ['"João Pessoa, PB"', "str"], [",", "p"]],
  [["  formacao", "key"], [": ", "p"], ['"Ciência da Computação @ Unipê"', "str"], [",", "p"]],
  [["  fabrica", "key"], [": ", "p"], ['"2 ciclos · 432 h certificadas"', "str"], [",", "p"]],
  [["  destaque", "key"], [": ", "p"], ['"Liderança & Produtividade — PO"', "str"], [",", "p"]],
  [["  agora", "key"], [": [", "p"], ['"BemEstar60+"', "str"], [", ", "p"], ['"Jogos Empresariais"', "str"], ["],", "p"]],
  [["  buscando", "key"], [": ", "p"], ['"full-stack ou back-end"', "str"], [",", "p"]],
  [["};", "p"]],
];

const TOKEN_CLASS: Record<Token[1], string> = {
  kw: "text-violeta-claro",
  var: "text-azul-claro",
  key: "text-ciano",
  str: "text-verde",
  p: "text-dim",
};

function CodeCard() {
  return (
    <Reveal delay={0.1} className="mt-10">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-vermelho/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ambar/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-verde/70" />
          <span className="ml-3 font-mono text-xs text-dim">gabriel.ts</span>
        </div>
        <motion.pre
          className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 md:text-[13px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
        >
          <code>
            {CODE.map((line, i) => (
              <motion.span
                key={i}
                className="block whitespace-pre"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                }}
              >
                <span className="mr-4 inline-block w-4 select-none text-right text-dim/60">{i + 1}</span>
                {line.map(([text, kind], j) => (
                  <span key={j} className={TOKEN_CLASS[kind]}>
                    {text}
                  </span>
                ))}
              </motion.span>
            ))}
          </code>
        </motion.pre>
      </div>
    </Reveal>
  );
}

function FloatingChip({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("absolute z-10", className)}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 + delay, duration: 0.7, ease: EASE_OUT }}
    >
      <div
        className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-ink/85 px-3.5 py-2 text-xs text-fg shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md animate-float"
        style={{ animationDelay: `${delay * 2}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // O anel de particulas "orbita" a foto: a cena le a posicao dela a cada frame.
  useSceneAnchor(sectionRef, (_rect, viewport) => {
    const photo = photoRef.current;
    if (!photo) return { shape: "ring", x: 0, y: 0, scale: 1, opacity: 0 };
    const r = photo.getBoundingClientRect();
    const center = screenToWorld(r.left + r.width / 2, r.top + r.height / 2, viewport);
    const radius = (r.width / 2) * center.unit * (isMobileViewport(viewport) ? 1.32 : 1.5);
    return {
      shape: "ring",
      x: center.x,
      y: center.y,
      scale: radius / 2.25,
      opacity: 0.95,
      tilt: 0.42,
      roll: -0.38,
      follow: 0.22,
    };
  });

  return (
    <section ref={sectionRef} id="sobre" className="relative pb-16 pt-24 md:pb-20 md:pt-32">
      <div className="container-page grid items-center gap-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div className="relative mx-auto w-[min(76vw,360px)]">
          <motion.div
            ref={photoRef}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] p-[2px]"
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
          >
            {/* Borda em gradiente girando atras da foto. */}
            <div
              aria-hidden
              className="absolute inset-[-60%] animate-spin-slow bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#22d3ee,#3b82f6)]"
            />
            <div className="group relative h-full w-full overflow-hidden rounded-[calc(2rem-2px)] bg-panel">
              <Image
                src={perfil.foto}
                alt="Foto de Gabriel Lucas"
                fill
                sizes="(max-width: 768px) 76vw, 360px"
                className="object-cover object-[50%_30%] grayscale-[30%] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-violeta/10 mix-blend-multiply"
              />
            </div>
          </motion.div>

          <FloatingChip className="-left-5 top-8 md:-left-10" delay={0}>
            <MapPin className="h-3.5 w-3.5 text-ciano" />
            {perfil.local}
          </FloatingChip>
          <FloatingChip className="-right-2 top-[46%] md:-right-12" delay={0.15}>
            <Award className="h-3.5 w-3.5 text-ambar" />
            Destaque do PO · 2026.1
          </FloatingChip>
          <FloatingChip className="-bottom-5 left-4" delay={0.3}>
            <GraduationCap className="h-3.5 w-3.5 text-violeta-claro" />
            Ciência da Computação · Unipê
          </FloatingChip>
        </div>

        {/* min-w-0: sem isso o card de codigo alarga a coluna no celular. */}
        <div className="min-w-0">
          <SectionHeading
            index="01"
            eyebrow="Sobre"
            title="Do modelo de dados ao container."
            gradient={["container."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Sou desenvolvedor full-stack e estudo Ciência da Computação no Unipê. Na Fábrica de Software da
              faculdade concluí dois ciclos, com <span className="text-fg">432 horas certificadas</span>, e no ciclo
              2026.1 recebi o certificado de destaque do Product Owner por liderança e foco em entrega.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Venho do desenvolvimento web clássico, com PHP e MySQL desde o curso técnico, e da análise de dados com
              Python, SQL e Power BI. Hoje meu foco é TypeScript no full-stack, e essa bagagem virou diferencial:{" "}
              <span className="text-fg">modelo o banco antes de escrever o primeiro endpoint.</span>
            </p>
          </Reveal>
          <CodeCard />
        </div>
      </div>
    </section>
  );
}
