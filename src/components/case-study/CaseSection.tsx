import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type Props = {
  numero: string;
  titulo: string;
  gradient?: readonly string[];
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Secao numerada dos estudos de caso: titulo grande, texto de abertura e conteudo livre. */
export function CaseSection({ numero, titulo, gradient, intro, children, className }: Props) {
  return (
    <section className={cn("relative py-16 md:py-24", className)}>
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-[120px_1fr] md:gap-10">
          <Reveal>
            <p className="font-mono text-sm text-dim">
              <span className="text-ciano">{numero}</span> /
            </p>
          </Reveal>
          <div className="min-w-0">
            <SplitText
              as="h2"
              text={titulo}
              gradient={gradient}
              className="max-w-3xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-balance"
            />
            {intro && (
              <Reveal delay={0.1}>
                <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">{intro}</div>
              </Reveal>
            )}
            {children && <div className="mt-10">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Card de decisao tecnica: o que escolhi, o que ganhei e o que custou. */
export function DecisionCard({
  titulo,
  ganho,
  custo,
  delay = 0,
}: {
  titulo: string;
  ganho: ReactNode;
  custo: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="glass border-glow flex h-full flex-col rounded-2xl p-6 md:p-7">
        <h3 className="font-display text-xl font-semibold tracking-tight">{titulo}</h3>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-verde">Ganho</p>
            <p className="mt-1.5 text-muted">{ganho}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ambar">Custo</p>
            <p className="mt-1.5 text-muted">{custo}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Trecho de codigo inline com o estilo do site. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.86em] text-fg">
      {children}
    </code>
  );
}
