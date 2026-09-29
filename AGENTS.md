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
- `components/ui/`: peças reutilizáveis (Split, SectionTitle, CountUp, timeline,
  splite e `stack-machine-3d`, a cena three.js carregada com `dynamic`).
- `lib/i18n/`: idiomas pt/en/es. `pt.ts` é a fonte da estrutura (`Dict`); `en.ts` e `es.ts` seguem o tipo. Provider em `index.tsx`, hook `useI18n()`, `rich()` para `<strong>`/`<em>` nos textos.
- `lib/`: `projects.ts` (dados dos projetos + metadados do GitHub), `scroll.ts` (Lenis),
  `motion.ts` (`clamp01`, `easeOutCubic`, `prefersReducedMotion`) e `useTyped.ts`.
- `styles/`: um CSS por seção, importados em `app/layout.tsx`; `motion.css` e `theme.css` sobrescrevem.
- `public/`: imagens (`img/`) e currículo (`docs/gustavo-constante.pdf`).

## Convenções

- Componentes com hooks/efeitos de navegador começam com `"use client"`.
- Animações guiadas por scroll usam `requestAnimationFrame` + variáveis CSS; toda animação deve
  respeitar `prefers-reduced-motion` (use `prefersReducedMotion()` de `@/lib/motion`).
- Todo texto visível vai nos três dicionários (`lib/i18n`), nunca fixo no componente. O HTML estático nasce em português e o idioma é aplicado após a hidratação. Seções que dividem o texto em linhas animadas (Timeline) são remontadas com `key={lang}`; a cena 3D reinicia ao trocar de idioma.
- Seções presas ao scroll (`HorizontalSwap`, `StackExpand`) só animam em tela larga com mouse (`useStillLayout` em `lib/motion.ts`); em toque, telas estreitas e reduced motion usam o layout empilhado, porque transforms via JS atrasam um frame em relação ao scroll nativo e tremem.
- Dados do GitHub (data do último commit, homepage) são buscados no build em `lib/github.ts`, nunca no navegador (limite de requisições da API).
- Animação contínua só roda com o elemento na tela. Animações CSS em loop ficam pausadas fora da viewport: adicione o seletor do elemento em `LOOPING` (`components/Effects.tsx`) e o CSS `.is-offscreen` pausa tudo dentro dele. Loops em JS (`requestAnimationFrame`, `setInterval`) e cenas 3D usam `IntersectionObserver` para parar (veja `Globe`, `SplineScene`, `Hero`); o loop do cursor e o do preview de projetos rodam só enquanto o mouse se move.
- Desempenho: imagens de projeto ficam em `public/img` como JPG de até 1200px de largura (~50 a 200 KB); não adicione originais grandes. Bibliotecas pesadas (three.js na cena da Stack, runtime do Spline) só carregam quando a seção está perto da tela. Evite `backdrop-filter` em elementos fixos ou animados.
- Não duplique helpers: utilitários compartilhados ficam em `lib/`.
- Links externos usam `target="_blank"` com `rel="noreferrer"`.
- Imagens são referenciadas por caminho absoluto (`/img/...`); ao remover uma referência, apague o arquivo.
- Classes CSS montadas dinamicamente (`bio-w--${tone}`, `wipe-line--${from}`) não aparecem como
  string literal no TSX; não as trate como código morto.
- Conteúdo: dados dos projetos em `lib/projects.ts` (textos em `projects.items[id]` dos dicionários), experiência e formação em `resume.items`, formulário de contato (Formspree) e globo (`components/ui/Globe.tsx`, canvas + d3-geo) em `components/Contact.tsx`.

## Deploy

`.github/workflows/deploy.yml` roda `npm ci && npm run build` e publica `out/` a cada push na `main`.
Em Settings → Pages a fonte deve ser **GitHub Actions**.
