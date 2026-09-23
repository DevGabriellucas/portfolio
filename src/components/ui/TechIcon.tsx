import { brandIcons, type BrandIconName } from "@/lib/brand-icons";
import { luminance } from "@/lib/utils";

type Props = {
  name: BrandIconName;
  className?: string;
  /** Usa a cor da marca; marcas pretas (Next.js, Express...) viram claras no fundo escuro. */
  colored?: boolean;
  title?: string;
};

export function TechIcon({ name, className, colored = false, title }: Props) {
  const icon = brandIcons[name];
  const fill = colored ? (luminance(icon.hex) < 0.06 ? "#e8eaf2" : icon.hex) : "currentColor";

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={icon.path} />
    </svg>
  );
}
