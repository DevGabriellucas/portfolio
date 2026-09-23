"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/utils";

/**
 * Ilustracao do fluxo de pedido: o site monta a mensagem e abre o WhatsApp.
 * Os itens entre colchetes deixam claro que e um exemplo, nao um pedido real.
 */
export function OrderBubble() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] rounded-[26px] border border-line bg-[#0b141a] p-4 shadow-2xl">
      <div className="mb-4 flex items-center gap-2.5 border-b border-white/5 pb-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f9a8d4]/20 font-display text-xs font-bold text-[#f9a8d4]">
          PC
        </span>
        <div>
          <p className="text-xs font-semibold text-fg">Patrícia S. Araújo Cake</p>
          <p className="text-[10px] text-verde">online</p>
        </div>
      </div>
      <motion.div
        className="ml-auto w-[88%] rounded-2xl rounded-tr-sm bg-[#005c4b] px-3.5 py-2.5 text-[12px] leading-relaxed text-white/95"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
      >
        Olá! Quero fazer uma encomenda:
        <br />• 1x [item do cardápio]
        <br />• 1x [outro item]
        <br />
        Pode me passar o valor?
        <span className="mt-1 block text-right text-[9px] text-white/50">mensagem gerada pelo site</span>
      </motion.div>
      <motion.div
        className="mt-2 flex w-16 items-center gap-1 rounded-2xl rounded-tl-sm bg-[#202c33] px-3 py-2.5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-white/50"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
