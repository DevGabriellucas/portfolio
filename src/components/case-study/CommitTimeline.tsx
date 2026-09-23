import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type Commit = { hash: string; data: string; mensagem: string; resumo: string };

/** Commits reais, com link para o GitHub: qualquer um pode conferir. */
export function CommitTimeline({ commits, repo }: { commits: Commit[]; repo: string }) {
  return (
    <ol className="relative space-y-3 border-l border-line pl-6 md:pl-8">
      {commits.map((commit, i) => (
        <li key={commit.hash} className="relative">
          <span
            aria-hidden
            className="absolute -left-[29px] top-5 h-2.5 w-2.5 rounded-full border border-ambar/60 bg-ink md:-left-[37px]"
          />
          <Reveal delay={i * 0.04}>
            <a
              href={`${repo}/commit/${commit.hash}`}
              target="_blank"
              rel="noreferrer"
              className="glass border-glow group block rounded-2xl p-5 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                <span className="rounded-md bg-ambar/10 px-2 py-0.5 text-ambar">{commit.hash}</span>
                <span className="text-dim">{commit.data}</span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </div>
              <p className="mt-3 break-words font-mono text-[13px] text-fg">{commit.mensagem}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{commit.resumo}</p>
            </a>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
