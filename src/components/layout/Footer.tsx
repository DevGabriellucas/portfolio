import { perfil } from "@/data/perfil";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink/60 backdrop-blur">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-fg">
            {perfil.nomeCompleto} · {perfil.local}
          </p>
          <p className="text-sm text-dim">Feito com Next.js, React Three Fiber, Motion e Tailwind CSS.</p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
