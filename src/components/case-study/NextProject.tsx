import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function NextProject({ href, titulo, descricao }: { href: string; titulo: string; descricao: string }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <Link
            href={href}
            className="glass border-glow group flex flex-col gap-6 rounded-[28px] p-8 md:flex-row md:items-center md:justify-between md:p-12"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-ciano">Próximo estudo de caso</p>
              <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{titulo}</p>
              <p className="mt-3 max-w-xl text-muted">{descricao}</p>
            </div>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/[0.06]">
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
