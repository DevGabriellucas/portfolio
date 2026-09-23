"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { EASE_OUT } from "@/lib/utils";

const SCREENS = [
  {
    src: "/projetos/ecohub/mapa.webp",
    w: 411,
    h: 849,
    titulo: "Mapa de ocorrências",
    texto: "Denúncias sobre o mapa de João Pessoa, com filtro por status.",
  },
  {
    src: "/projetos/ecohub/nova-denuncia.webp",
    w: 404,
    h: 854,
    titulo: "Nova denúncia",
    texto: "Até 3 fotos, vídeo de 30 s, categoria e localização.",
  },
  {
    src: "/projetos/ecohub/panorama.webp",
    w: 388,
    h: 854,
    titulo: "Panorama da cidade",
    texto: "Tipos mais reportados e bairros mais afetados.",
  },
  {
    src: "/projetos/ecohub/fila-verificacao.webp",
    w: 394,
    h: 854,
    titulo: "Fila de verificação",
    texto: "A autoridade confirma as denúncias, da mais antiga para a mais nova.",
  },
  {
    src: "/projetos/ecohub/painel-autoridade.webp",
    w: 395,
    h: 609,
    titulo: "Painel da autoridade",
    texto: "Funil de triagem, tempos médios e relatório em PDF.",
  },
];

export function PhoneGallery() {
  return (
    // No celular a galeria rola na horizontal; no desktop as 5 telas cabem e o
    // overflow fica visivel (senao a animacao de entrada criava barras de rolagem).
    <div className="-mx-5 overflow-x-auto overflow-y-hidden px-5 pb-4 pt-3 md:mx-0 md:overflow-visible md:px-0 md:pt-0">
      <ul className="flex snap-x snap-mandatory gap-5 md:grid md:grid-cols-5 md:gap-4">
        {SCREENS.map((screen, i) => (
          <motion.li
            key={screen.src}
            className="w-[62vw] max-w-[240px] shrink-0 snap-center md:w-auto md:max-w-none"
            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_OUT }}
          >
            <motion.div whileHover={{ y: -8, rotate: i % 2 === 0 ? -1.5 : 1.5 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <Image
                src={screen.src}
                alt={`${screen.titulo}: ${screen.texto}`}
                width={screen.w}
                height={screen.h}
                sizes="(max-width: 768px) 62vw, 220px"
                className="h-auto w-full rounded-[22px] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.9)]"
              />
            </motion.div>
            <p className="mt-4 font-display text-[15px] font-semibold tracking-tight">{screen.titulo}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{screen.texto}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
