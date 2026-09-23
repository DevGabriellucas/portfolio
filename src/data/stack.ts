import type { BrandIconName } from "@/lib/brand-icons";
import type { ShapeId } from "@/components/three/shapes";

export type TecnologiaPrincipal = {
  id: ShapeId;
  icone: BrandIconName;
  nome: string;
  cor: string;
  frase: string;
  provas: string[];
};

// A ordem aqui e a ordem em que as particulas formam cada logo ao rolar a pagina.
export const stackPrincipal: TecnologiaPrincipal[] = [
  {
    id: "typescript",
    icone: "typescript",
    nome: "TypeScript",
    cor: "#4a90e2",
    frase: "Minha linguagem principal, do banco à interface.",
    provas: [
      "ADM4All escrito em TypeScript nas duas pontas: API e front-end",
      "Gestor Acadêmico em NestJS com TypeScript",
    ],
  },
  {
    id: "react",
    icone: "react",
    nome: "React",
    cor: "#61dafb",
    frase: "Interfaces em componentes, ligadas a dados reais.",
    provas: [
      "Dashboards do coordenador e do instrutor no ADM4All, em React 19",
      "React Native (Expo) no BemEstar60+, ciclo atual da Fábrica",
    ],
  },
  {
    id: "nextjs",
    icone: "nextjs",
    nome: "Next.js",
    cor: "#f5f7ff",
    frase: "App Router, rotas de servidor e deploy sem atrito.",
    provas: [
      "Front-end do ADM4All em Next.js 16",
      "Landing page da Patrícia S. Araújo Cake",
      "Este portfólio — o código é Next.js 16 + Three.js",
    ],
  },
  {
    id: "nodejs",
    icone: "nodejs",
    nome: "Node.js",
    cor: "#6cc24a",
    frase: "APIs REST organizadas para durar.",
    provas: [
      "96 endpoints em Express no ADM4All",
      "Arquitetura limpa: domain, application e infrastructure",
      "Autenticação JWT implementada do zero, com trava contra força bruta",
    ],
  },
  {
    id: "postgresql",
    icone: "postgresql",
    nome: "PostgreSQL",
    cor: "#6b93f0",
    frase: "Modelo o banco antes de escrever o primeiro endpoint.",
    provas: [
      "18 tabelas modeladas no ADM4All, com migrations versionadas",
      "CPF bloqueado guardado como HMAC-SHA256, não em texto puro",
    ],
  },
  {
    id: "docker",
    icone: "docker",
    nome: "Docker",
    cor: "#2ea8ff",
    frase: "O ambiente inteiro sobe com um comando.",
    provas: [
      "ADM4All em Docker Compose: banco, API e front",
      "Gestor Acadêmico com Redis, RabbitMQ, Prometheus e Grafana em containers",
    ],
  },
];

export type TecnologiaSecundaria = { nome: string; icone?: BrandIconName };

export const stackSecundaria: { grupo: string; itens: TecnologiaSecundaria[] }[] = [
  {
    grupo: "Back-end",
    itens: [
      { nome: "Express", icone: "express" },
      { nome: "NestJS", icone: "nestjs" },
      { nome: "Django", icone: "django" },
      { nome: "Prisma", icone: "prisma" },
      { nome: "Swagger", icone: "swagger" },
      { nome: "JWT", icone: "jwt" },
      { nome: "Zod", icone: "zod" },
      { nome: "WebSocket", icone: "socketdotio" },
    ],
  },
  {
    grupo: "Dados e infra",
    itens: [
      { nome: "MySQL", icone: "mysql" },
      { nome: "Redis", icone: "redis" },
      { nome: "RabbitMQ", icone: "rabbitmq" },
      { nome: "Firebase", icone: "firebase" },
      { nome: "GitHub Actions", icone: "githubactions" },
      { nome: "Prometheus", icone: "prometheus" },
      { nome: "Grafana", icone: "grafana" },
      { nome: "SonarQube Cloud", icone: "sonarqubecloud" },
      { nome: "Git", icone: "git" },
    ],
  },
  {
    grupo: "Front, mobile e qualidade",
    itens: [
      { nome: "JavaScript", icone: "javascript" },
      { nome: "Tailwind CSS", icone: "tailwindcss" },
      { nome: "Flutter", icone: "flutter" },
      { nome: "Dart", icone: "dart" },
      { nome: "React Native", icone: "expo" },
      { nome: "Jest", icone: "jest" },
      { nome: "Playwright" },
      { nome: "HTML5", icone: "html5" },
      { nome: "CSS", icone: "css" },
    ],
  },
  {
    grupo: "Dados e análise",
    itens: [
      { nome: "Python", icone: "python" },
      { nome: "pandas", icone: "pandas" },
      { nome: "Power BI" },
      { nome: "SQL analítico" },
      { nome: "ETL" },
      { nome: "PHP", icone: "php" },
    ],
  },
];
