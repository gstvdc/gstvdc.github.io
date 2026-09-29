<div align="center">

<a href="https://gstvdc.github.io">
  <img src="public/img/logo.png" alt="Logo de Gustavo Constante" width="110" />
</a>

# Gustavo Constante · Portfólio

**Full stack developer** · SvelteKit · Laravel · Angular · NestJS · React

Personal portfolio built with Next.js, React and TypeScript, showcasing my projects, skills and experience.
Responsive, animated, and available in Portuguese, English and Spanish.

[![Deploy](https://github.com/gstvdc/gstvdc.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/gstvdc/gstvdc.github.io/actions/workflows/deploy.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-PT%20%C2%B7%20EN%20%C2%B7%20ES-e2554d)

[**Ver o site**](https://gstvdc.github.io) ·
[**Currículo (PDF)**](https://gstvdc.github.io/docs/gustavo-constante.pdf) ·
[**LinkedIn**](https://www.linkedin.com/in/gstvdc) ·
[**GitHub**](https://github.com/gstvdc) ·
[**Instagram**](https://www.instagram.com/gstvdc) ·
[**E-mail**](mailto:gustavo.cunha.constante@gmail.com)

</div>

---

## Sobre

Portfólio pessoal de **Gustavo Constante**, desenvolvedor full stack e estudante de Ciência da Computação na UNESC (Sombrio, SC). O site apresenta minha trajetória, os projetos em destaque, a stack que uso no dia a dia e um formulário de contato.

Publicado em [gstvdc.github.io](https://gstvdc.github.io) como site estático, gerado pelo Next.js e implantado no GitHub Pages.

## Destaques

- **Três idiomas:** português, inglês e espanhol, com seletor PT / EN / ES. A escolha fica salva no navegador e, na primeira visita, segue o idioma do navegador. Inclui até os textos desenhados dentro da cena 3D.
- **Projetos ordenados pelo último commit:** os dados (data do commit, site publicado) vêm da API do GitHub **durante o build**, sem chamadas no navegador. O deploy roda todo dia para manter a ordem atualizada.
- **Stack interativa em 3D:** máquina feita com three.js que mostra as camadas de uma funcionalidade, carregada só quando a seção se aproxima da tela.
- **Movimento cuidadoso:** scroll suave (Lenis), nome do hero que viaja pela tela, revelação de títulos por palavra, marquees e parallax. Animações pausam fora da tela e respeitam `prefers-reduced-motion`.
- **Mobile de verdade:** no celular e no tablet as seções presas ao scroll viram layouts empilhados (trajetória em lista vertical, sem efeitos que tremem no toque).
- **Contato:** formulário via Formspree e um globo interativo (d3-geo) centrado em Sombrio/SC.
- **Leve:** imagens em JPG de até 1200px, bibliotecas pesadas carregadas sob demanda e sem chamadas a APIs no navegador.

## Tecnologias

| Área | O que usei |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: "export"`), React 19, TypeScript |
| Estilo | CSS por seção, Bootstrap (grid e ícones) |
| Animação | GSAP (ScrollTrigger, SplitText), Lenis |
| 3D e mapas | three.js, Spline, d3-geo, topojson |
| Ícones | Bootstrap Icons, Simple Icons |
| Deploy | GitHub Actions + GitHub Pages |

## Como rodar

Requer Node.js 20 ou superior.

```bash
git clone https://github.com/gstvdc/gstvdc.github.io.git
cd gstvdc.github.io
npm install
npm run dev
```

O site abre em <http://localhost:3000>.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site estático na pasta `out/` |
| `npm start` | Serve a pasta `out/` localmente (rode o build antes) |
| `npm run typecheck` | Checagem de tipos com TypeScript |

## Estrutura

```text
app/                layout (metadados, fontes) e página
components/         seções (Hero, About, Projects, Skills, Resume, Contact, Footer) e efeitos
components/ui/      peças reutilizáveis: timeline, cena 3D, globo, Split...
lib/                dados dos projetos, GitHub (build), scroll, animação e ícones
lib/i18n/           idiomas: provider, hook useI18n e dicionários pt, en e es
styles/             CSS por seção, mais motion.css e theme.css
public/             imagens e o currículo em PDF
.github/workflows/  deploy no GitHub Pages
AGENTS.md           guia para agentes de código
```

## Conteúdo

| O que editar | Onde |
| --- | --- |
| Textos do site (PT, EN, ES) | `lib/i18n/pt.ts`, `en.ts` e `es.ts` (o `pt.ts` define a estrutura; os outros seguem o tipo) |
| Projetos (link, stack, imagem) | `lib/projects.ts`; o texto de cada um fica em `projects.items` nos dicionários |
| Experiência e formação | `resume.items` nos dicionários e os ids em `components/Resume.tsx` |
| Currículo em PDF | `public/docs/gustavo-constante.pdf` |
| Formulário de contato | Formspree, em `components/Contact.tsx` |

Para adicionar um projeto: inclua-o em `PROJECTS` (`lib/projects.ts`), coloque a imagem em `public/img/` (JPG de até 1200px de largura) e escreva `summary` e `category` em `projects.items` nos três idiomas. Projetos privados, sem repositório, aceitam `lastCommit` para definir a posição na lista.

## Deploy

O workflow [`deploy.yml`](.github/workflows/deploy.yml) roda `npm ci && npm run build` e publica a pasta `out/` no GitHub Pages a cada push na `main` e uma vez por dia (para atualizar a ordem por último commit).

Em **Settings → Pages**, a fonte precisa estar como **GitHub Actions**.

## Contato

- **LinkedIn:** [linkedin.com/in/gstvdc](https://www.linkedin.com/in/gstvdc)
- **GitHub:** [github.com/gstvdc](https://github.com/gstvdc)
- **Instagram:** [@gstvdc](https://www.instagram.com/gstvdc)
- **E-mail:** [gustavo.cunha.constante@gmail.com](mailto:gustavo.cunha.constante@gmail.com)
- **Currículo:** [gustavo-constante.pdf](https://gstvdc.github.io/docs/gustavo-constante.pdf)

<div align="center">

Feito por [Gustavo Constante](https://github.com/gstvdc) · Sombrio, SC · Brasil

</div>
