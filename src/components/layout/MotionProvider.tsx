"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respeita o "reduzir movimento" do sistema em todas as animacoes do Motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
