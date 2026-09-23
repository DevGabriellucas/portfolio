"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn, EASE_OUT } from "@/lib/utils";

const SHOTS = [
  { src: "/projetos/ecohub/fila-verificacao.webp", alt: "Fila de verificação de denúncias no EcoHub", w: 394, h: 854 },
  { src: "/projetos/ecohub/mapa.webp", alt: "Mapa de ocorrências do EcoHub em João Pessoa", w: 411, h: 849 },
  { src: "/projetos/ecohub/panorama.webp", alt: "Panorama da cidade com tipos e bairros mais afetados", w: 388, h: 854 },
];

/** Tres telas do app em leque; abrem mais no hover. */
export function PhoneFan({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("relative flex h-[340px] items-center justify-center md:h-[430px]", className)}
      initial="hidden"
      whileInView="show"
      whileHover="spread"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <div
        aria-hidden
        className="absolute h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153/0.28),transparent)] blur-2xl"
      />
      {SHOTS.map((shot, i) => {
        const offset = i - 1;
        return (
          <motion.div
            key={shot.src}
            className="absolute w-[132px] md:w-[172px]"
            style={{ zIndex: offset === 0 ? 2 : 1 }}
            variants={{
              hidden: { opacity: 0, y: 70, x: 0, rotate: 0 },
              show: {
                opacity: 1,
                y: Math.abs(offset) * 16,
                x: `${offset * 62}%`,
                rotate: offset * 8,
                transition: { duration: 1, delay: 0.1 + Math.abs(offset) * 0.12, ease: EASE_OUT },
              },
              spread: {
                opacity: 1,
                y: Math.abs(offset) * 8,
                x: `${offset * 82}%`,
                rotate: offset * 12,
                transition: { duration: 0.6, ease: EASE_OUT },
              },
            }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              sizes="(max-width: 768px) 132px, 172px"
              className="h-auto w-full rounded-[20px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
