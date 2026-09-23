import { Mail } from "lucide-react";
import { perfil } from "@/data/perfil";
import { cn } from "@/lib/utils";
import { iconButton } from "./styles";
import { TechIcon } from "./TechIcon";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a href={perfil.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconButton}>
        <TechIcon name="github" className="h-[18px] w-[18px]" />
      </a>
      <a href={perfil.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconButton}>
        <TechIcon name="linkedin" className="h-[17px] w-[17px]" />
      </a>
      <a href={`mailto:${perfil.email}`} aria-label="E-mail" className={iconButton}>
        <Mail className="h-[18px] w-[18px]" />
      </a>
    </div>
  );
}
