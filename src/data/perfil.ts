// Tudo o que e "quem eu sou" fica aqui. Trocar texto do site = editar este arquivo.

export const perfil = {
  nome: "Gabriel Lucas",
  nomeCompleto: "Gabriel Lucas de Araujo Bandeira",
  cargo: "Desenvolvedor Full-Stack",
  local: "João Pessoa, PB",
  email: "gabrielbandeira2527@gmail.com",
  linkedin: "https://www.linkedin.com/in/gabriellucasdados",
  github: "https://github.com/DevGabriellucas",
  curriculo: "/curriculo-gabriel-lucas.pdf",
  foto: "/foto-gabriel.webp",
  sistemaNoAr: {
    nome: "ADM4All",
    url: "https://adm4all.extensao-fs.com.br",
    rotulo: "adm4all.extensao-fs.com.br",
  },
  frasesDigitadas: [
    "do modelo de dados ao container.",
    "TypeScript · React · Node.js · PostgreSQL",
    "com sistema rodando em produção.",
  ],
  disponibilidade:
    "Aberto a oportunidades como desenvolvedor full‑stack ou back‑end — em João Pessoa ou remoto.",
  descricaoSeo:
    "Desenvolvedor full-stack em TypeScript, React, Next.js, Node.js, PostgreSQL e Docker. Ajudei a colocar o ADM4All, sistema de gestão acadêmica, em produção.",
} as const;

export const numeros = [
  { valor: 96, sufixo: "", rotulo: "endpoints REST", fonte: "API do ADM4All, em Express" },
  { valor: 18, sufixo: "", rotulo: "tabelas modeladas", fonte: "PostgreSQL 16 do ADM4All" },
  { valor: 149, sufixo: "", rotulo: "testes unitários", fonte: "app EcoHub, rodando no CI" },
  { valor: 432, sufixo: " h", rotulo: "certificadas", fonte: "Fábrica de Software do Unipê" },
] as const;

export const navegacao = [
  { id: "sobre", rotulo: "Sobre" },
  { id: "stack", rotulo: "Stack" },
  { id: "experiencia", rotulo: "Experiência" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "certificados", rotulo: "Certificados" },
  { id: "contato", rotulo: "Contato" },
] as const;
