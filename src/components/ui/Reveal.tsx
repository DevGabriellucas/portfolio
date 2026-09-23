"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/utils";

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = { children: ReactNode; className?: string; delay?: number; y?: number };

/** Sobe e aparece quando entra na tela (uma vez so). */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = { children: ReactNode; className?: string; delay?: number; stagger?: number };

/** Container que revela os filhos (StaggerItem) em sequencia. */
export function Stagger({ children, className, delay = 0, stagger = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 24 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
      }}
    >
      {children}
    </motion.div>
  );
}
