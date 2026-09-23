"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Projeto } from "@/data/projetos";
import { cn, EASE_OUT } from "@/lib/utils";

/** Logo oficial do projeto (tirado do repositorio) + nome do repositorio. */
export function LogoVisual({ projeto }: { projeto: Projeto }) {
  const logo = projeto.logo;
  if (!logo) return null;
  const repo = projeto.links.find((link) => link.tipo === "codigo")?.href.split("/").slice(-2).join("/");

  return (
    <div className="flex w-full flex-col items-center gap-6 py-4">
      <motion.div
        className={cn("rounded-2xl px-6 py-4", logo.fundoClaro && "bg-white shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)]")}
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <Image
          src={logo.src}
          alt={`Logo do ${projeto.titulo}`}
          width={logo.largura}
          height={logo.altura}
          sizes="260px"
          className="h-auto w-[220px] animate-float"
        />
      </motion.div>
      {repo && <p className="font-mono text-xs text-dim">github.com/{repo}</p>}
    </div>
  );
}
