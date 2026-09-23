export type Ciclo = {
  periodo: string;
  titulo: string;
  status?: "atual" | "concluido";
  resumo?: string;
  itens?: string[];
  link?: { href: string; rotulo: string };
};

export const fabrica = {
  cargo: "Desenvolvedor Full-Stack (Extensionista)",
  empresa: "Fábrica de Software — Unipê",
  periodo: "set/2025 — atual",
  local: "João Pessoa, PB · remoto",
  destaque: "432 h certificadas em dois ciclos",
  descricao:
    "Desenvolvimento em equipe com fluxo de fábrica de software: feature branches, develop/main, merge requests, sprints e entregas validadas por Product Owner e cliente real.",
  ciclos: [
    {
      periodo: "2026.2 · atual",
      titulo: "BemEstar60+ e Jogos Empresariais",
      status: "atual",
      resumo:
        "Dois projetos em paralelo: o BemEstar60+, app React Native (Expo) para o público 60+, e o Jogos Empresariais, sistema em Django com Docker.",
    },
    {
      periodo: "2026.1 · mar–set/2026",
      titulo: "ADM4All — gestão acadêmica, concluído e em produção",
      status: "concluido",
      itens: [
        "Modelei e implementei o banco PostgreSQL 16: hoje com 18 tabelas, migrations versionadas e ambiente em Docker Compose.",
        "Desenvolvi a autenticação: JWT, login por e-mail ou CPF, redefinição de senha e e-mails transacionais via SMTP.",
        "Corrigi uma falha na busca de usuário por identificador que podia autenticar a conta errada.",
        "Construí o backend e a integração da área do coordenador, trocando dados mockados pela API real.",
        "Entreguei o dashboard do instrutor: materiais, cronograma de aulas, registro de presença e avatar.",
        "Conduzi a preparação para produção: auditoria de segurança, adequação à LGPD, remoção de código morto e limpeza dos dados de teste.",
        "50 commits em banco, backend e front — segundo maior contribuidor do repositório.",
      ],
      link: { href: "/projetos/adm4all", rotulo: "Ler o estudo de caso" },
    },
    {
      periodo: "2025.2 · set–dez/2025",
      titulo: "BemEstar60+ — primeiro ciclo",
      status: "concluido",
      resumo:
        "Desenvolvedor full-stack em equipe: levantamento de requisitos com o PO, tarefas por sprint, desenvolvimento de telas e revisão de código. Ciclo concluído com 216 h certificadas.",
    },
  ] satisfies Ciclo[],
};

export const formacao = [
  {
    curso: "Ciência da Computação",
    instituicao: "Unipê — Centro Universitário de João Pessoa",
    periodo: "2023 — 2027",
  },
  {
    curso: "Técnico em Informática",
    instituicao: "Colégio da Polícia Militar Est. Rebeca Cristina Alves Simões",
    periodo: "2021 — 2023",
    detalhe: "TCC: sistema de boletim escolar em PHP e MySQL",
  },
];
