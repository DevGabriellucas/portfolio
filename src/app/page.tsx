import { perfil } from "@/data/perfil";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { StackShowcase } from "@/components/sections/StackShowcase";
import { Stats } from "@/components/sections/Stats";
import { TechCloud } from "@/components/sections/TechCloud";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nomeCompleto,
  alternateName: perfil.nome,
  jobTitle: perfil.cargo,
  email: `mailto:${perfil.email}`,
  address: { "@type": "PostalAddress", addressLocality: "João Pessoa", addressRegion: "PB", addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Unipê — Centro Universitário de João Pessoa" },
  knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker"],
  sameAs: [perfil.github, perfil.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Stats />
      <About />
      <StackShowcase />
      <TechCloud />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}
