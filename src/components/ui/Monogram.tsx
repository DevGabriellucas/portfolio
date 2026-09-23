import { cn } from "@/lib/utils";

/** Monograma "GL" com borda em gradiente (o mesmo desenho do favicon). */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-azul via-violeta to-ciano p-px",
        className,
      )}
    >
      <span className="flex h-full w-full items-center justify-center rounded-[11px] bg-ink font-display text-[13px] font-bold tracking-tight">
        GL
      </span>
    </span>
  );
}
