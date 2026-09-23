# Portfólio — Gabriel Lucas

Portfólio pessoal com uma cena 3D de partículas que muda de forma conforme a página rola: uma esfera na abertura,
um anel orbitando a foto, os logos da stack (TypeScript → React → Next.js → Node.js → PostgreSQL → Docker) e uma
galáxia ao fundo. Inclui dois estudos de caso (ADM4All e EcoHub) com números conferidos no histórico do Git.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Three.js + React Three Fiber ·
Motion · Lenis

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

```bash
npm run build   # build de produção
npx eslint src  # lint
npx tsc --noEmit
```

## Onde editar o conteúdo

Todo o texto do site está em arquivos de dados — não é preciso mexer nos componentes:

| Arquivo | O que tem |
|---|---|
| `src/data/perfil.ts` | nome, links, e-mail, frases digitadas no topo e os 4 números em destaque |
| `src/data/stack.ts` | as 6 tecnologias que as partículas formam e a faixa de "também uso" |
| `src/data/experiencia.ts` | ciclos da Fábrica de Software e formação |
| `src/data/projetos.ts` | projetos e certificados |
| `src/app/projetos/*/page.tsx` | textos dos estudos de caso |

Arquivos em `public/`: foto (`foto-gabriel.webp`), currículo (`curriculo-gabriel-lucas.pdf`), certificados e telas do EcoHub.

## Como a cena 3D funciona

- `src/components/three/shapes.ts` gera nuvens de pontos com o mesmo número de partículas: esfera, galáxia, anel e os
  logos, amostrando os pixels de cada ícone num canvas escondido.
- `ParticleSystem.ts` move cada partícula em direção à forma atual com velocidade própria (é o que deixa o morph
  orgânico). Ruído, brilho e repulsão do cursor ficam no shader (`shaders.ts`).
- Cada seção registra uma "âncora" (`useSceneAnchor`) dizendo qual forma mostrar e onde. A cena lê isso a cada frame,
  sem passar pelo estado do React — rolar a página não causa re-render.
- O Three.js só carrega no navegador, depois do HTML, e quem ativa "reduzir movimento" no sistema recebe a versão
  estática (sem scroll suave, sem ruído, sem morph animado).

## Deploy na Vercel

No ar em **https://gabriellucas.vercel.app** (projeto `gabriellucas` na Vercel). A pasta já está vinculada ao
projeto (`.vercel/`, fora do git), então para publicar de novo basta:

```bash
npx vercel deploy --prod
```

O `vercel.json` declara `"framework": "nextjs"`: sem isso, um projeto criado pela CLI fica com o preset "Other" e
publica só a pasta `public/` (todas as rotas davam 404). A URL de produção entra sozinha nas meta tags e no sitemap;
em outro host, defina `NEXT_PUBLIC_SITE_URL`.

Para publicar a cada `git push`, conecte o repositório do GitHub em Vercel → projeto `gabriellucas` → Settings → Git.

## Nota sobre o ambiente Windows desta máquina

A variável de sistema `ComSpec` está apontando para `C:\msys64\ucrt64\bin` (uma pasta), e o npm usa essa variável
para rodar scripts — por isso `npm run dev` e `npx` falham com `spawn C:\msys64\ucrt64\bin ENOENT`. A correção
(PowerShell como administrador):

```powershell
[Environment]::SetEnvironmentVariable('ComSpec', 'C:\Windows\system32\cmd.exe', 'Machine')
```

Depois feche e abra o terminal. Enquanto isso, dá para rodar com a variável corrigida só na sessão:

```powershell
$env:ComSpec = 'C:\Windows\system32\cmd.exe'; npm run dev
```
