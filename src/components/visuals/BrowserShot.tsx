"use client";

import { Lock } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { cn, EASE_OUT } from "@/lib/utils";

type Props = { src: string; alt: string; url: string; width: number; height: number; className?: string; sizes?: string };

/** Print de um sistema real dentro de uma janela de navegador. */
export function BrowserShot({ src, alt, url, width, height, className, sizes = "(max-width: 768px) 90vw, 560px" }: Props) {
  return (
    <motion.div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-line bg-[#0b0e1d] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.9)]",
        className,
      )}
      initial={{ opacity: 0, y: 24, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      style={{ transformPerspective: 900 }}
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-vermelho/70" />
        <span className="h-2 w-2 rounded-full bg-ambar/70" />
        <span className="h-2 w-2 rounded-full bg-verde/70" />
        <span className="ml-2 flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[10.5px] text-muted">
          <Lock className="h-3 w-3 shrink-0 text-verde" />
          {url}
        </span>
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full" />
    </motion.div>
  );
}
