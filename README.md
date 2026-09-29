# Portfólio | Gustavo Constante

Portfólio pessoal de Gustavo Constante, publicado em [gstvdc.github.io](https://gstvdc.github.io).

Construído com **Next.js (App Router) + React + TypeScript**, exportado como site estático para o GitHub Pages.

## Comandos

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # gera o site estático em out/
npm start       # serve out/ localmente (após o build)
```

## Estrutura

```text
app/                layout, página e metadados
components/         seções (Hero, About, Projects, Skills, Resume, Contact...), Effects e a stack interativa
components/ui/      Split, SectionTitle, CountUp, timeline, spotlight e a cena 3D (three.js)
lib/                dados dos projetos, scroll (Lenis), helpers de animação e hook de digitação
styles/             CSS por seção + motion.css e theme.css (efeitos e ajustes finais)
public/             imagens e o currículo em PDF
AGENTS.md           guia para agentes de código
```

## Efeitos

- scroll suave com Lenis e navegação por âncoras
- preloader de entrada, cursor personalizado e botões magnéticos
- nome do hero que viaja até o centro conforme o scroll
- títulos com revelação por palavra, letreiro da stack e parallax nas marcas d'água
- stack interativa em 3D (three.js, carregada sob demanda)
- respeita `prefers-reduced-motion`

## Deploy

O workflow `.github/workflows/deploy.yml` builda e publica a pasta `out/` a cada push na `main`.
Em **Settings → Pages**, a fonte precisa estar como **GitHub Actions**.

## Conteúdo

- Projetos: `components/Projects.tsx` (lista `PROJECTS`; metadados do GitHub são buscados no navegador)
- Experiência e formação: `components/Resume.tsx`
- Currículo em PDF: `public/docs/gustavo-constante.pdf`
- Formulário de contato: Formspree, em `components/Contact.tsx`
