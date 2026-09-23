import type { BrandIconName } from "@/lib/brand-icons";

export type LinkProjeto = {
  tipo: "estudo" | "ao-vivo" | "codigo";
  rotulo: string;
  href: string;
};

export type Projeto = {
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  contexto: string;
  selo?: { texto: string; tom: "verde" | "violeta" | "ambar" };
  metricas?: { valor: string; rotulo: string }[];
  contribuicao?: string;
  stack: { nome: string; icone?: BrandIconName }[];
  /** Logo oficial do projeto, usado no card quando não há print. */
  logo?: { src: string; largura: number; altura: number; fundoClaro?: boolean };
  links: LinkProjeto[];
  destaque: boolean;
};

export const projetos: Projeto[] = [
  {
    slug: "adm4all",
    titulo: "ADM4All",
    categoria: "Sistema de gestão acadêmica",
    resumo:
      "Plataforma de cursos de extensão com três perfis (coordenador, instrutor e aluno): matrícula, cronograma, frequência, materiais, certificados e relatórios em PDF e CSV.",
    contexto: "Fábrica de Software do Unipê · mar–set/2026",
    selo: { texto: "Em produção", tom: "verde" },
    metricas: [
      { valor: "96", rotulo: "endpoints REST" },
      { valor: "18", rotulo: "tabelas" },
      { valor: "50", rotulo: "meus commits" },
    ],
    stack: [
      { nome: "TypeScript", icone: "typescript" },
      { nome: "Next.js 16", icone: "nextjs" },
      { nome: "React 19", icone: "react" },
      { nome: "Express", icone: "express" },
      { nome: "PostgreSQL 16", icone: "postgresql" },
      { nome: "Docker", icone: "docker" },
    ],
    links: [
      { tipo: "estudo", rotulo: "Estudo de caso", href: "/projetos/adm4all" },
      { tipo: "ao-vivo", rotulo: "Sistema no ar", href: "https://adm4all.extensao-fs.com.br" },
      { tipo: "codigo", rotulo: "Código", href: "https://github.com/DevGabriellucas/FS_ADM4ALL" },
    ],
    destaque: true,
  },
  {
    slug: "ecohub",
    titulo: "EcoHub",
    categoria: "App de denúncias ambientais",
    resumo:
      "App Flutter para cidadãos denunciarem problemas ambientais na Paraíba — lixo, queimadas, buracos, enchentes — com mapa, denúncia anônima, painel de moderação para autoridades e LGPD.",
    contexto: "Autor principal · nasceu em disciplina e virou produto",
    selo: { texto: "Inscrito no Prêmio de Inovação CSED 2026", tom: "violeta" },
    metricas: [
      { valor: "149", rotulo: "testes unitários" },
      { valor: "24", rotulo: "testes de regras" },
      { valor: "33/36", rotulo: "meus commits" },
    ],
    stack: [
      { nome: "Flutter", icone: "flutter" },
      { nome: "Dart", icone: "dart" },
      { nome: "Firebase", icone: "firebase" },
      { nome: "Google Maps", icone: "googlemaps" },
      { nome: "GitHub Actions", icone: "githubactions" },
    ],
    links: [
      { tipo: "estudo", rotulo: "Estudo de caso", href: "/projetos/ecohub" },
      { tipo: "codigo", rotulo: "Código", href: "https://github.com/DevGabriellucas/Eco_JP" },
    ],
    destaque: true,
  },
  {
    slug: "gestor-academico",
    titulo: "Gestor Acadêmico",
    categoria: "Backend distribuído",
    resumo:
      "Gateway HTTP e microsserviços TCP por domínio, com cache Redis, mensageria RabbitMQ, WebSocket, Swagger e observabilidade com Prometheus e Grafana. CI no GitHub Actions e quality gate no SonarCloud.",
    contexto: "Projeto em equipe · Unipê",
    contribuicao:
      "Minha parte: módulos de avaliação e presença, CRUD e testes de aula e matrícula, documentação Swagger, ambiente Docker com banco, camada de cache e comunicação em tempo real.",
    stack: [
      { nome: "NestJS", icone: "nestjs" },
      { nome: "Prisma", icone: "prisma" },
      { nome: "PostgreSQL", icone: "postgresql" },
      { nome: "Redis", icone: "redis" },
      { nome: "RabbitMQ", icone: "rabbitmq" },
      { nome: "Grafana", icone: "grafana" },
    ],
    links: [{ tipo: "codigo", rotulo: "Código", href: "https://github.com/estermarreiro/gestor-academico" }],
    destaque: false,
  },
  {
    slug: "bemestar60mais",
    titulo: "BemEstar60+",
    categoria: "App mobile de saúde para o público 60+",
    resumo:
      "Aplicativo em React Native (Expo) para o público 60+ acompanhar a própria saúde, desenvolvido em equipe na Fábrica de Software, com PO e cliente real.",
    contexto: "Fábrica de Software do Unipê · ciclos 2025.2 e 2026.2",
    selo: { texto: "Em andamento · ciclo 2026.2", tom: "ambar" },
    contribuicao:
      "No ciclo 2025.2 atuei em requisitos com o PO, tarefas por sprint, telas e revisão de código. Agora sigo no projeto no ciclo 2026.2.",
    stack: [
      { nome: "React Native", icone: "react" },
      { nome: "Expo", icone: "expo" },
      { nome: "TypeScript", icone: "typescript" },
    ],
    logo: { src: "/projetos/bemestar/logo.webp", largura: 707, altura: 259 },
    links: [{ tipo: "codigo", rotulo: "Código", href: "https://github.com/DevGabriellucas/FS_BemEstar60Mais" }],
    destaque: false,
  },
  {
    slug: "jogos-empresariais",
    titulo: "Jogos Empresariais",
    categoria: "Plataforma de simulações empresariais",
    resumo:
      "Plataforma web de jogos e simulações empresariais para desenvolver decisão estratégica em ambiente controlado, com API em Django REST Framework e PostgreSQL.",
    contexto: "Fábrica de Software do Unipê · ciclo 2026.2",
    selo: { texto: "Em andamento · ciclo 2026.2", tom: "ambar" },
    contribuicao:
      "Projeto que estou desenvolvendo agora. Até aqui: tirei os segredos do repositório e documentei o setup com Docker.",
    stack: [
      { nome: "Django", icone: "django" },
      { nome: "Python", icone: "python" },
      { nome: "PostgreSQL", icone: "postgresql" },
      { nome: "Docker", icone: "docker" },
    ],
    links: [{ tipo: "codigo", rotulo: "Código", href: "https://github.com/DevGabriellucas/FS_Jogos_Empresariais" }],
    destaque: false,
  },
  {
    slug: "banco-matuto",
    titulo: "BancoMatuto",
    categoria: "Sistema bancário desktop",
    resumo:
      "Aplicação bancária em Python com interface gráfica em Tkinter: login, depósito, saque, transferência e consulta de saldo.",
    contexto: "Projeto acadêmico em equipe · Unipê",
    stack: [
      { nome: "Python", icone: "python" },
      { nome: "Tkinter" },
    ],
    logo: { src: "/projetos/bancomatuto/logo.webp", largura: 370, altura: 200, fundoClaro: true },
    links: [{ tipo: "codigo", rotulo: "Código", href: "https://github.com/DevGabriellucas/BancoMatuto_Python" }],
    destaque: false,
  },
];

export const certificados = [
  {
    id: "lideranca",
    titulo: "Liderança & Produtividade",
    subtitulo: "Destaque do Product Owner",
    emissor: "Fábrica de Software — Unipê",
    data: "Ciclo 2026.1",
    imagem: "/certificados/lideranca-produtividade.jpg",
    largura: 1400,
    altura: 990,
    citacao:
      "Destacou-se pela liderança servidora, visão técnica sólida e foco em entrega, conduzindo sua equipe a vencer barreiras e superar as expectativas do cliente.",
    destaque: true,
  },
  {
    id: "extensionista-2026-1",
    titulo: "Extensionista — Fábrica de Software",
    subtitulo: "216 horas",
    emissor: "Unipê",
    data: "mar–jul/2026",
    imagem: "/certificados/extensionista-2026-1.jpg",
    largura: 1400,
    altura: 989,
    destaque: false,
  },
  {
    id: "extensionista-2025-2",
    titulo: "Extensionista — Fábrica de Software",
    subtitulo: "216 horas",
    emissor: "Unipê",
    data: "set–dez/2025",
    imagem: "/certificados/extensionista-2025-2.jpg",
    largura: 1400,
    altura: 989,
    destaque: false,
  },
] as const;

export type Certificado = (typeof certificados)[number];
