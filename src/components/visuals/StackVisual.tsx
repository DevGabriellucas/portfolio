"use client";

import { motion } from "motion/react";
import type { Projeto } from "@/data/projetos";
import { EASE_OUT } from "@/lib/utils";
import { TechIcon } from "@/components/ui/TechIcon";

/** Visual padrao dos cards sem ilustracao propria: icones da stack + nome do repositorio. */
export function StackVisual({ projeto }: { projeto: Projeto }) {
  const icones = projeto.stack.filter((tech) => tech.icone);
  const repo = projeto.links.find((link) => link.tipo === "codigo")?.href.split("/").slice(-2).join("/");

  return (
    <div className="flex w-full flex-col items-center gap-7 py-4">
      <div className="flex items-center justify-center gap-4">
        {icones.map((tech, i) => (
          <motion.span
            key={tech.nome}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-white/[0.04] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)]"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
          >
            <span className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
              <TechIcon name={tech.icone!} colored className="h-8 w-8" />
            </span>
          </motion.span>
        ))}
      </div>
      {repo && <p className="font-mono text-xs text-dim">github.com/{repo}</p>}
    </div>
  );
}
