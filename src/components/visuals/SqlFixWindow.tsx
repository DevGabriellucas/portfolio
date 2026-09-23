"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn, EASE_OUT } from "@/lib/utils";

// Diff real do commit b65780b no ADM4All (linhas longas quebradas para caber).
const LINES: { kind: " " | "-" | "+"; code: string }[] = [
  { kind: " ", code: "LEFT JOIN coordenadores c ON c.usuario_id = u.id" },
  { kind: " ", code: "WHERE lower(u.email) = lower($1)" },
  { kind: "-", code: "   OR regexp_replace(coalesce(a.cpf, ''), '[^0-9]', '', 'g')" },
  { kind: "-", code: "      = regexp_replace($1, '[^0-9]', '', 'g')" },
  { kind: "+", code: "   OR (" },
  { kind: "+", code: "     length(regexp_replace($1, '[^0-9]', '', 'g')) > 0" },
  { kind: "+", code: "     AND regexp_replace(a.cpf, '[^0-9]', '', 'g')" },
  { kind: "+", code: "       = regexp_replace($1, '[^0-9]', '', 'g')" },
  { kind: "+", code: "   )" },
  { kind: " ", code: "LIMIT 1" },
];

const TOKEN =
  /('(?:[^']|'')*')|(\$\d+)|\b(SELECT|FROM|LEFT|JOIN|ON|WHERE|OR|AND|LIMIT|AS)\b|\b(regexp_replace|coalesce|length|lower)\b/g;

function highlight(code: string) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(code.slice(last, index));
    const [text, str, param, keyword] = match;
    const color = str ? "text-verde" : param ? "text-ambar" : keyword ? "text-violeta-claro" : "text-ciano";
    parts.push(
      <span key={index} className={color}>
        {text}
      </span>,
    );
    last = index + text.length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

type Props = { className?: string; caption?: boolean };

export function SqlFixWindow({ className, caption = true }: Props) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-[#070914]/90 shadow-2xl", className)}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-vermelho/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-ambar/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-verde/70" />
        <span className="ml-3 truncate font-mono text-[11px] text-dim">PostgresAuthRepository.ts</span>
      </div>
      <motion.pre
        className="overflow-x-auto py-3 font-mono text-[10.5px] leading-[1.75] md:text-xs"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
      >
        <code>
          {LINES.map((line, i) => (
            <motion.span
              key={i}
              className={cn(
                "block whitespace-pre pl-3 pr-5",
                line.kind === "-" && "bg-vermelho/[0.09]",
                line.kind === "+" && "bg-verde/[0.08]",
              )}
              // So opacidade: deslocar em x criava barra de rolagem durante a animacao.
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
              }}
            >
              <span
                className={cn(
                  "mr-3 inline-block w-3 select-none",
                  line.kind === "-" ? "text-vermelho" : line.kind === "+" ? "text-verde" : "text-dim/50",
                )}
              >
                {line.kind}
              </span>
              <span className={line.kind === "-" ? "opacity-70" : undefined}>{highlight(line.code)}</span>
            </motion.span>
          ))}
        </code>
      </motion.pre>
      {caption && (
        <p className="border-t border-line px-4 py-3 font-mono text-[10.5px] leading-relaxed text-dim md:text-[11px]">
          <span className="text-ambar">b65780b</span> fix: busca por identificador podia autenticar o usuário errado
        </p>
      )}
    </div>
  );
}
