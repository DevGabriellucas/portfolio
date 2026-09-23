import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { perfil } from "@/data/perfil";
import { siteUrl } from "@/lib/site";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SceneLoader } from "@/components/three/SceneLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const title = `${perfil.nome} — ${perfil.cargo}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${perfil.nome}` },
  description: perfil.descricaoSeo,
  authors: [{ name: perfil.nomeCompleto, url: perfil.github }],
  keywords: [
    "desenvolvedor full-stack",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "João Pessoa",
    "portfólio",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: perfil.nome,
    title,
    description: perfil.descricaoSeo,
  },
  twitter: { card: "summary_large_image", title, description: perfil.descricaoSeo },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#05060d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SmoothScroll />
          <SceneLoader />
          <ScrollProgress />
          <Cursor />
          <Header />
          <main id="conteudo" className="relative z-10">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
