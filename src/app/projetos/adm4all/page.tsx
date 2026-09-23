import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, LayoutDashboard, Presentation } from "lucide-react";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { CaseHero } from "@/components/case-study/CaseHero";
import { CaseSection, Code, DecisionCard } from "@/components/case-study/CaseSection";
import { CommitTimeline, type Commit } from "@/components/case-study/CommitTimeline";
import { ErDiagram } from "@/components/case-study/ErDiagram";
import { NextProject } from "@/components/case-study/NextProject";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SqlFixWindow } from "@/components/visuals/SqlFixWindow";

export const metadata: Metadata = {
  title: "ADM4All — estudo de caso",
  description:
    "Como ajudei a construir e colocar em produção o ADM4All: arquitetura limpa, 18 tabelas em PostgreSQL, autenticação JWT e o bug que podia autenticar o usuário errado.",
  alternates: { canonical: "/projetos/adm4all" },
};

const REPO = "https://github.com/DevGabriellucas/FS_ADM4ALL";

const PERFIS = [
  {
    icone: LayoutDashboard,
    nome: "Coordenador",
    itens: ["Dashboard com indicadores reais", "Cursos, turmas, alunos e instrutores", "Relatórios com exportação em PDF e CSV", "Período letivo editável sem deploy"],
  },
  {
    icone: Presentation,
    nome: "Instrutor",
    itens: ["Dashboard da turma", "Cronograma de aulas", "Registro de presença", "Materiais didáticos"],
  },
  {
    icone: GraduationCap,
    nome: "Aluno",
    itens: ["Progresso e frequência", "Download de materiais", "Certificado emitido pelo sistema"],
  },
];

const COMMITS: Commit[] = [
  {
    hash: "b65780b",
    data: "26/06/2026",
    mensagem: "fix: corrige bug em buscarUsuarioPorIdentificador que podia autenticar usuario errado",
    resumo: "A correção descrita acima: a comparação de CPF só roda quando o identificador tem dígitos.",
  },
  {
    hash: "ec64143",
    data: "26/06/2026",
    mensagem: "feat: implementa redefinicao de senha e corrige bugs de login",
    resumo: "Fluxo de redefinição de senha com token e e-mail transacional via SMTP.",
  },
  {
    hash: "a0392a8",
    data: "26/06/2026",
    mensagem: "feat: adiciona backend real da area do coordenador (dashboard, cursos, instrutores, turmas)",
    resumo: "A área do coordenador deixa de usar dados mockados e passa a falar com a API.",
  },
  {
    hash: "c0fe7aa",
    data: "01/09/2026",
    mensagem: "chore: remove codigo morto e dependencias nao utilizadas",
    resumo: "Faxina antes do go-live: menos código para manter e menos superfície de ataque.",
  },
  {
    hash: "aec0549",
    data: "02/09/2026",
    mensagem: "fix: corrige achados da auditoria e prepara o banco para producao",
    resumo: "Correções da auditoria de segurança e banco pronto para receber dados reais.",
  },
  {
    hash: "99ef36b",
    data: "18/09/2026",
    mensagem: "feat: separa excluir de bloquear, reforca LGPD e ajusta telas de senha",
    resumo: "Excluir e bloquear viram operações diferentes; CPF bloqueado passa a ser HMAC; duas tabelas sem uso saem do banco.",
  },
  {
    hash: "c3a137b",
    data: "21/09/2026",
    mensagem: "fix: destrava o deploy limpo e para de acusar a senha por erro do servidor",
    resumo: "O deploy do zero volta a funcionar, e erro de servidor deixa de aparecer como senha errada.",
  },
];

export default function Adm4allPage() {
  return (
    <>
      <CaseHero
        eyebrow="Estudo de caso · Fábrica de Software do Unipê"
        title="ADM4All"
        subtitle="Sistema de gestão acadêmica que ajudei a construir nas três camadas — banco, API e interface — e a colocar em produção."
        meta={[
          { rotulo: "Período", valor: "mar–set/2026 · concluído" },
          { rotulo: "Papel", valor: "Desenvolvedor full-stack · 2º maior contribuidor (50 commits)" },
          { rotulo: "Equipe", valor: "Fábrica de Software do Unipê, com PO e cliente real" },
          { rotulo: "Status", valor: "Em produção em adm4all.extensao-fs.com.br" },
        ]}
        metrics={[
          { valor: "96", rotulo: "endpoints REST" },
          { valor: "18", rotulo: "tabelas no PostgreSQL" },
          { valor: "3", rotulo: "perfis de usuário" },
          { valor: "50", rotulo: "meus commits" },
        ]}
        stack={[
          { nome: "TypeScript", icone: "typescript" },
          { nome: "Next.js 16", icone: "nextjs" },
          { nome: "React 19", icone: "react" },
          { nome: "Express", icone: "express" },
          { nome: "PostgreSQL 16", icone: "postgresql" },
          { nome: "Docker Compose", icone: "docker" },
          { nome: "JWT", icone: "jwt" },
          { nome: "Jest", icone: "jest" },
        ]}
        links={[
          { tipo: "ao-vivo", rotulo: "Ver o sistema no ar", href: "https://adm4all.extensao-fs.com.br" },
          { tipo: "codigo", rotulo: "Código no GitHub", href: REPO },
        ]}
        scene={{
          desktop: { shape: "postgresql", x: 2.9, y: 0.35, scale: 0.8, opacity: 0.85 },
          mobile: { shape: "postgresql", x: 0.9, y: 2.1, scale: 0.36, opacity: 0.45 },
        }}
      />

      <CaseSection
        numero="01"
        titulo="O problema"
        intro={
          <>
            <p>
              O projeto de extensão <span className="text-fg">Administração para Todos</span> oferece cursos à
              comunidade e controlava matrícula, frequência e certificados sem um sistema.
            </p>
            <p>
              Eram três públicos com necessidades diferentes: a coordenação precisava de indicadores e relatórios; os
              instrutores, de chamada, cronograma e materiais; os alunos, de acompanhar o próprio progresso e baixar o
              certificado.
            </p>
          </>
        }
      />

      <CaseSection numero="02" titulo="Uma plataforma, três perfis" gradient={["três", "perfis"]}>
        <Stagger className="grid gap-4 md:grid-cols-3">
          {PERFIS.map((perfil) => (
            <StaggerItem key={perfil.nome} className="glass border-glow rounded-2xl p-6">
              <perfil.icone className="h-6 w-6 text-ciano" />
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{perfil.nome}</h3>
              <ul className="mt-4 space-y-2">
                {perfil.itens.map((texto) => (
                  <li key={texto} className="flex gap-2.5 text-[15px] text-muted">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violeta-claro" />
                    {texto}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <p className="mt-6 max-w-2xl text-muted">
            Minha parte: o banco, a autenticação, o backend e a integração da área do coordenador, o dashboard do
            instrutor e a preparação para produção.
          </p>
        </Reveal>
      </CaseSection>

      <CaseSection
        numero="03"
        titulo="Arquitetura"
        intro={
          <>
            <p>
              O front-end em Next.js fala com uma API em Express organizada em arquitetura limpa. O caso de uso depende
              da interface <Code>AuthRepository</Code>, não do Postgres: a implementação concreta,{" "}
              <Code>PostgresAuthRepository</Code>, mora na camada de infraestrutura.
            </p>
            <p>
              Na prática, trocar o banco seria escrever outro repositório — a regra de negócio não mudaria. O preço é
              mais arquivos e mais cerimônia; o ganho aparece nos testes: os casos de uso rodam com repositórios falsos
              (<Code>jest.Mocked&lt;AuthRepository&gt;</Code>), sem subir banco.
            </p>
          </>
        }
      >
        <Reveal>
          <ArchitectureDiagram />
        </Reveal>
      </CaseSection>

      <CaseSection
        numero="04"
        titulo="Modelagem: o banco antes do primeiro endpoint"
        gradient={["banco"]}
        intro={
          <>
            <p>
              <Code>usuarios</Code> centraliza a autenticação e cada perfil guarda só o que é dele. O status do curso
              não é coluna: ele é calculado a partir das turmas a cada consulta, para não existirem duas fontes da
              verdade.
            </p>
            <p>
              Em 18/09 removi duas tabelas que nenhuma linha de código lia ou escrevia. Uma delas guardaria documento
              pessoal de aluno — tirar tabela vazia também é minimização de dados, não só faxina.
            </p>
          </>
        }
      >
        <Reveal>
          <ErDiagram />
        </Reveal>
      </CaseSection>

      <CaseSection
        numero="05"
        titulo="Decisões técnicas e o que cada uma custou"
        gradient={["custou"]}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DecisionCard
            titulo="Login por e-mail ou CPF no mesmo campo"
            ganho="O aluno entra com o dado que lembra, sem precisar escolher o tipo de login."
            custo={
              <>
                A busca precisa normalizar o CPF, tirando pontos e traços. Foi exatamente essa normalização que criou o
                bug descrito na próxima seção.
              </>
            }
          />
          <DecisionCard
            delay={0.08}
            titulo="JWT próprio, sem sessão no banco"
            ganho="Cada requisição carrega um token assinado, guardado em cookie httpOnly pela rota do Next. O backend não precisa consultar sessão."
            custo="O logout apaga o cookie, não o token: um token assinado vale até expirar, e a validade fica em 8 horas."
          />
          <DecisionCard
            delay={0.16}
            titulo="Trava de força bruta por identificador, não por IP"
            ganho="O login passa pela rota do Next, então o backend enxerga o mesmo IP para todo mundo. Limitar por IP travaria o sistema inteiro depois de algumas senhas erradas somadas."
            custo="Limitar também por IP exige confiar no IP repassado pelo proxy, o que só é seguro quando a API aceita conexões apenas dele."
          />
          <DecisionCard
            delay={0.24}
            titulo="CPF bloqueado guardado como HMAC-SHA256"
            ganho={
              <>
                A lista de bloqueio guardava CPF, nome e e-mail para sempre, depois da exclusão — a exclusão não
                excluía. Agora ela responde só &ldquo;este CPF está bloqueado?&rdquo;.
              </>
            }
            custo="HMAC e não SHA-256 puro: CPF tem cerca de 10⁹ valores, e um hash sem segredo cairia por força bruta. O segredo precisa ficar no ambiente do backend e ser o mesmo em toda migração."
          />
        </div>
      </CaseSection>

      <CaseSection
        numero="06"
        titulo="O bug que autenticava o usuário errado"
        gradient={["usuário", "errado"]}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-7 text-[17px] leading-relaxed text-muted">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-vermelho">Sintoma</p>
              <p className="mt-2">
                A busca por e-mail ou CPF em <Code>buscarUsuarioPorIdentificador</Code> podia devolver uma conta
                diferente da que tentava entrar.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ambar">Causa</p>
              <ol className="mt-3 space-y-2.5">
                <li className="flex gap-3">
                  <span className="font-mono text-sm text-dim">1.</span>
                  <span>
                    Um e-mail sem números, depois de <Code>regexp_replace($1, &apos;[^0-9]&apos;, &apos;&apos;)</Code>,
                    vira string vazia.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-sm text-dim">2.</span>
                  <span>
                    Quem não tem aluno vinculado (instrutor, coordenador) tem CPF nulo, e{" "}
                    <Code>coalesce(a.cpf, &apos;&apos;)</Code> também vira string vazia.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-sm text-dim">3.</span>
                  <span>
                    Vazio igual a vazio é verdadeiro para todas essas linhas, e o <Code>LIMIT 1</Code> devolvia uma
                    qualquer — não necessariamente a dona do e-mail.
                  </span>
                </li>
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-verde">Correção</p>
              <p className="mt-2">
                Comparar CPF só quando o identificador tem dígitos, e sem o <Code>coalesce</Code>: CPF nulo não casa com
                nada.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="rounded-2xl border border-line bg-white/[0.03] p-5 text-base">
                <span className="text-fg">O que ficou:</span> normalização que transforma entrada inválida em string
                vazia precisa de guarda. Vazio sempre casa com vazio.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SqlFixWindow />
          </Reveal>
        </div>
      </CaseSection>

      <CaseSection
        numero="07"
        titulo="Go-live: do código à produção"
        gradient={["produção"]}
        intro={
          <p>
            Conduzi a preparação para produção: auditoria de segurança, adequação à LGPD, remoção de código morto,
            proteção de credenciais e limpeza dos dados de teste. Os commits abaixo são meus e estão no repositório.
          </p>
        }
      >
        <CommitTimeline commits={COMMITS} repo={REPO} />
      </CaseSection>

      <CaseSection
        numero="08"
        titulo="O reconhecimento"
        intro={
          <p>
            No fim do ciclo 2026.1, recebi da Fábrica de Software o certificado de destaque{" "}
            <span className="text-fg">Liderança & Produtividade</span>.
          </p>
        }
      >
        <Reveal>
          <figure className="glass overflow-hidden rounded-3xl p-3 md:p-4">
            <Image
              src="/certificados/lideranca-produtividade.jpg"
              alt="Certificado Liderança & Produtividade — Fábrica de Software do Unipê"
              width={1400}
              height={990}
              sizes="(max-width: 1024px) 92vw, 900px"
              className="h-auto w-full rounded-2xl"
            />
            <figcaption className="px-2 pb-2 pt-5 text-[15px] italic leading-relaxed text-muted">
              &ldquo;Destacou-se pela liderança servidora, visão técnica sólida e foco em entrega, conduzindo sua
              equipe a vencer barreiras e superar as expectativas do cliente.&rdquo;
            </figcaption>
          </figure>
        </Reveal>
      </CaseSection>

      <NextProject
        href="/projetos/ecohub"
        titulo="EcoHub"
        descricao="App de denúncias ambientais que nasceu em disciplina e virou produto — com 149 testes e LGPD desde o início."
      />
    </>
  );
}
