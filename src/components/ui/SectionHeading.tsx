import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  gradient?: readonly string[];
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, gradient, description, align = "left", className }: Props) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal>
        <p
          className={cn(
            "mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-ciano",
            centered && "justify-center",
          )}
        >
          <span className="text-dim">{index}</span>
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-ciano to-transparent" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        gradient={gradient}
        className="font-display text-[clamp(2.3rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance"
      />
      {description && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-muted", centered && "mx-auto")}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
