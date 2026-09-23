import type { Metadata } from "next";
import { EyeOff, ImageOff, Scale, ShieldCheck, Trash2, UserX } from "lucide-react";
import { CaseHero } from "@/components/case-study/CaseHero";
import { CaseSection, Code, DecisionCard } from "@/components/case-study/CaseSection";
import { CostTable } from "@/components/case-study/CostTable";
import { NextProject } from "@/components/case-study/NextProject";
import { PhoneGallery } from "@/components/case-study/PhoneGallery";
import { PipelineDiagram } from "@/components/case-study/PipelineDiagram";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "EcoHub — estudo de caso",
  description:
    "App Flutter de denúncias ambientais na Paraíba: LGPD desde o início, 149 testes unitários, 24 testes de regras do Firestore e a decisão de manter o Firebase.",
  alternates: { canonical: "/projetos/ecohub" },
};

const REPO = "https://github.com/DevGabriellucas/Eco_JP";

const SEGURANCA = [
  {
    icone: UserX,
    titulo: "Denúncia anônima de verdade",
    texto: "O documento público da denúncia anônima não guarda o UID de quem denunciou — e um teste de regra garante isso.",
  },
  {
    icone: ImageOff,
    titulo: "Fotos sem metadados EXIF",
    texto: "Os metadados saem da imagem para que a localização e o aparelho gravados nela não reidentifiquem o denunciante.",
  },
  {
    icone: Trash2,
    titulo: "Exclusão de conta",
    texto: "A pessoa apaga a conta e os dados; o consentimento vai junto.",
  },
  {
    icone: ShieldCheck,
    titulo: "Quem decide é o servidor",
    texto: "As regras do Firestore validam toda escrita, com negação por padrão. Denunciar exige e-mail verificado, e o App Check barra scripts.",
  },
  {
    icone: EyeOff,
    titulo: "Moderação só pela autoridade",
    texto: "Ocultar conteúdo e mudar o status oficial são ações exclusivas da autoridade, e usuário comum não consegue se dar esse papel.",
  },
  {
    icone: Scale,
    titulo: "Trilha de auditoria imutável",
    texto: "Cada ação da autoridade entra numa linha do tempo que não aceita edição nem exclusão.",
  },
];

// Nomes reais de testes em test/firestore_rules/firestore.rules.test.js.
const TESTES = [
  "usuario nao autenticado NAO le ocorrencias",
  "NAO cria ocorrencia forjando outro autor (usuarioId != uid)",
  "denuncia anonima NAO pode gravar usuarioId no documento publico (S2)",
  "usuario NAO consegue autoconceder papel de autoridade (roles/)",
  "evento de auditoria e imutavel (sem update/delete)",
];

export default function EcohubPage() {
  return (
    <>
      <CaseHero
        eyebrow="Estudo de caso · projeto autoral"
        title="EcoHub"
        subtitle="App para cidadãos denunciarem problemas ambientais na Paraíba — que nasceu como trabalho de disciplina e virou produto."
        meta={[
          { rotulo: "Papel", valor: "Autor principal · 33 dos 36 commits" },
          { rotulo: "Plataforma", valor: "Android e iOS, em Flutter" },
          { rotulo: "Situação", valor: "Inscrito no Prêmio de Inovação CSED 2026 · piloto com um escritório de advocacia" },
          { rotulo: "No repositório", valor: "EcoJP (Eco_JP no GitHub)" },
        ]}
        metrics={[
          { valor: "149", rotulo: "testes unitários" },
          { valor: "24", rotulo: "testes de regras do Firestore" },
          { valor: "3", rotulo: "jobs no CI" },
          { valor: "33/36", rotulo: "meus commits" },
        ]}
        stack={[
          { nome: "Flutter", icone: "flutter" },
          { nome: "Dart", icone: "dart" },
          { nome: "Firebase", icone: "firebase" },
          { nome: "Riverpod" },
          { nome: "Google Maps", icone: "googlemaps" },
          { nome: "Cloudinary", icone: "cloudinary" },
          { nome: "GitHub Actions", icone: "githubactions" },
        ]}
        links={[{ tipo: "codigo", rotulo: "Código no GitHub", href: REPO }]}
        scene={{
          desktop: { shape: "flutter", x: 2.9, y: 0.3, scale: 0.78, opacity: 0.9 },
          mobile: { shape: "flutter", x: 0.9, y: 2.1, scale: 0.36, opacity: 0.45 },
        }}
      />

      <CaseSection
        numero="01"
        titulo="O projeto que sobreviveu à nota"
        gradient={["sobreviveu"]}
        intro={
          <>
            <p>
              O EcoHub nasceu como projeto de disciplina no Unipê e deixou de ser exercício: está inscrito no{" "}
              <span className="text-fg">Prêmio de Inovação CSED 2026</span> e em fase de piloto com um escritório de
              advocacia.
            </p>
            <p>
              O cidadão fotografa o problema — lixo, queimada, buraco, enchente, esgoto, falta de iluminação —, marca no
              mapa e acompanha o status oficial. Do outro lado, a autoridade verifica, encaminha e resolve.
            </p>
          </>
        }
      />

      <CaseSection numero="02" titulo="O app">
        <PhoneGallery />
      </CaseSection>

      <CaseSection
        numero="03"
        titulo="LGPD e segurança desde a primeira versão"
        gradient={["LGPD"]}
        intro={
          <p>
            Um app de denúncia lida com gente que pode sofrer retaliação. Por isso a privacidade não ficou para depois:
            ela está nas regras do banco, no tratamento das fotos e nos testes.
          </p>
        }
      >
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEGURANCA.map((item) => (
            <StaggerItem key={item.titulo} className="glass border-glow rounded-2xl p-6">
              <item.icone className="h-6 w-6 text-verde" />
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{item.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.texto}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </CaseSection>

      <CaseSection
        numero="04"
        titulo="Qualidade que roda a cada push"
        gradient={["cada", "push"]}
        intro={
          <p>
            Os testes unitários cobrem models, services, utils, widgets e controllers. As regras do Firestore são
            testadas contra o emulador, com testes que tentam burlá-las: forjar o autor, se dar papel de autoridade,
            vazar o UID numa denúncia anônima.
          </p>
        }
      >
        <PipelineDiagram />
        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-[#070914]/90">
            <p className="border-b border-line px-5 py-3 font-mono text-[11px] text-dim">
              alguns dos testes em <span className="text-muted">test/firestore_rules/firestore.rules.test.js</span>
            </p>
            <ul className="space-y-2 overflow-x-auto px-5 py-4 font-mono text-[12.5px]">
              {TESTES.map((nome) => (
                <li key={nome} className="whitespace-nowrap">
                  <span className="text-verde">✓</span> <span className="text-muted">{nome}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </CaseSection>

      <CaseSection
        numero="05"
        titulo="Decisão registrada: manter o Firebase"
        gradient={["manter", "o", "Firebase"]}
        intro={
          <>
            <p>
              Diante de uma proposta de migrar para Supabase e Postgres, com meta declarada de 30 mil usuários,
              registrei a decisão num ADR (<Code>docs/adr/0001</Code>): o app continua no Firebase, com Cloud Functions
              em TypeScript como a camada de servidor que ainda falta.
            </p>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DecisionCard
            titulo="Offline decide"
            ganho="O caso de uso é fotografar descarte irregular na rua, às vezes sem sinal. O Firestore já entrega fila de escrita e cache offline sem código extra."
            custo="No Supabase, recuperar isso exigiria PowerSync ou ElectricSQL — custo e complexidade novos para algo que já funciona."
          />
          <DecisionCard
            delay={0.08}
            titulo="Reescrever não se paga"
            ganho="Ficar evita reescrever as 694 linhas de regras como RLS, além de serviços, repositórios, login e testes."
            custo="Perco PostGIS (busca por raio sai de graça) e JOIN nos relatórios. Contornos aceitos: geohash no mapa e export para o BigQuery no analítico."
          />
        </div>
        <div className="mt-6">
          <CostTable />
        </div>
        <Reveal>
          <div className="mt-6 rounded-2xl border border-ambar/25 bg-ambar/[0.05] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ambar">Dívidas medidas, não achadas</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
              <li>
                O teste de carga aceitou <span className="text-fg">150 denúncias em 30 segundos de um único usuário</span>
                : o limite de envio existia só no cliente. A correção leva a regra para o servidor.
              </li>
              <li>
                Curtidas guardadas num array dentro da denúncia saturam em cerca de uma escrita por segundo por
                documento. A correção é uma subcoleção de reações com contador mantido por Function.
              </li>
              <li>
                O ADR conclui que o que pesava era o padrão de leitura, não o banco: as mesmas telas caem de ~1.000
                para ~60 leituras por usuário por dia sem trocar de tecnologia.
              </li>
            </ul>
          </div>
        </Reveal>
      </CaseSection>

      <NextProject
        href="/projetos/adm4all"
        titulo="ADM4All"
        descricao="Sistema de gestão acadêmica em produção: arquitetura limpa, 18 tabelas e o bug que autenticava o usuário errado."
      />
    </>
  );
}
