# AGENTS.md

Guia para agentes de código (Claude Code, Codex, etc.) trabalhando neste repositório.

## Visão geral

Portfólio pessoal estático em **Next.js (App Router) + React 19 + TypeScript**, exportado com
`output: "export"` e publicado no GitHub Pages (`gstvdc.github.io`). Não há backend nem rotas de API.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em out/
npx tsc --noEmit # checagem de tipos (não há linter configurado)
```

Rode `npx tsc --noEmit` e `npm run build` antes de concluir uma mudança.

## Estrutura

- `app/`: `layout.tsx` (metadados, fontes, imports de CSS) e `page.tsx` (ordem das seções).
- `components/`: uma seção por arquivo (Hero, About, Projects, Skills, Resume, Contact, Footer),
  mais `Effects` (Lenis, preloader, cursor), `HorizontalSwap`, `StackExpand` e `StackLanes`.
- `components/ui/`: peças reutilizáveis (Split, SectionTitle, CountUp, timeline, spotlight,
  splite e `stack-machine-3d`, a cena three.js carregada com `dynamic`).
- `lib/`: `projects.ts` (dados dos projetos + metadados do GitHub), `scroll.ts` (Lenis),
  `motion.ts` (`clamp01`, `easeOutCubic`, `prefersReducedMotion`) e `useTyped.ts`.
- `styles/`: um CSS por seção, importados em `app/layout.tsx`; `motion.css` e `theme.css` sobrescrevem.
- `public/`: imagens (`img/`) e currículo (`docs/gustavo-constante.pdf`).

## Convenções

- Componentes com hooks/efeitos de navegador começam com `"use client"`.
- Animações guiadas por scroll usam `requestAnimationFrame` + variáveis CSS; toda animação deve
  respeitar `prefers-reduced-motion` (use `prefersReducedMotion()` de `@/lib/motion`).
- Não duplique helpers: utilitários compartilhados ficam em `lib/`.
- Links externos usam `target="_blank"` com `rel="noreferrer"`.
- Imagens são referenciadas por caminho absoluto (`/img/...`); ao remover uma referência, apague o arquivo.
- Classes CSS montadas dinamicamente (`bio-w--${tone}`, `wipe-line--${from}`) não aparecem como
  string literal no TSX; não as trate como código morto.
- Conteúdo: projetos em `lib/projects.ts`, experiência/formação em `components/Resume.tsx`,
  formulário de contato (Formspree) em `components/Contact.tsx`.

## Deploy

`.github/workflows/deploy.yml` roda `npm ci && npm run build` e publica `out/` a cada push na `main`.
Em Settings → Pages a fonte deve ser **GitHub Actions**.
