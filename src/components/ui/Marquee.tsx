import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; reverse?: boolean; duration?: number; className?: string };

/** Faixa infinita. A segunda copia e so visual (aria-hidden + inert). */
export function Marquee({ children, reverse = false, duration = 48, className }: Props) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 gap-3 pr-3" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
