"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { cn, EASE_OUT } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Palavras (exatamente como aparecem no texto) que recebem o gradiente. */
  gradient?: readonly string[];
};

/** Titulo que sobe palavra por palavra, cada uma saindo de uma "mascara". */
export function SplitText({ text, as: Tag = "h2", className, delay = 0, gradient = [] }: Props) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <motion.span
              className={cn("inline-block origin-bottom-left", gradient.includes(word) && "text-gradient")}
              initial={{ y: "108%", rotate: 5 }}
              whileInView={{ y: "0%", rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.95, delay: delay + i * 0.055, ease: EASE_OUT }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
