"use client";

import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { navegacao, perfil } from "@/data/perfil";
import { lockScroll, scrollToTarget } from "@/lib/lenis";
import { cn, EASE_OUT } from "@/lib/utils";
import { Monogram } from "@/components/ui/Monogram";
import { SocialLinks } from "@/components/ui/SocialLinks";

const SECTION_IDS = ["inicio", ...navegacao.map((item) => item.id)];

/** Qual secao esta no meio da tela (para destacar o item do menu). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "inicio" ? null : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(isHome);

  // A navbar acompanha o scroll o tempo todo; so ganha o fundo "glass" apos rolar um pouco.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!isHome) return; // fora da home, o Link navega para /#id normalmente
    event.preventDefault();
    // Espera o menu mobile destravar o scroll antes de rolar.
    requestAnimationFrame(() => scrollToTarget(`#${id}`));
  };

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header className="fixed inset-x-0 top-0 z-50">
        <div className="container-page pt-3 md:pt-4">
          <div
            className={cn(
              "flex h-14 items-center justify-between rounded-2xl pl-3 pr-2 transition-[background-color,border-color,box-shadow] duration-500",
              scrolled || open ? "glass shadow-[0_18px_50px_-20px_rgb(0_0_0/0.8)]" : "border border-transparent",
            )}
          >
            <Link
              href="/"
              aria-label="Gabriel Lucas — início"
              className="flex items-center gap-2.5"
              onClick={() => setOpen(false)}
            >
              <Monogram />
              <span className="font-display text-[15px] font-semibold tracking-tight">Gabriel Lucas</span>
            </Link>

            <nav aria-label="Seções" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {navegacao.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={hrefFor(item.id)}
                      onClick={goTo(item.id)}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        active === item.id ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {active === item.id && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full border border-line bg-white/[0.07]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.rotulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={perfil.curriculo}
                download
                className="hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
              >
                <Download className="h-4 w-4" />
                Currículo
              </a>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fora do header: um pai com transform quebraria o "fixed" do menu. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Menu" className="flex-1">
              <ul className="space-y-1">
                {navegacao.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.6, ease: EASE_OUT }}
                  >
                    <Link
                      href={hrefFor(item.id)}
                      onClick={goTo(item.id)}
                      className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold tracking-tight text-fg"
                    >
                      <span className="font-mono text-xs text-dim">0{i + 1}</span>
                      {item.rotulo}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <SocialLinks />
              <a href={perfil.curriculo} download className="inline-flex items-center gap-2 text-sm font-semibold text-fg">
                <Download className="h-4 w-4" />
                Baixar currículo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
