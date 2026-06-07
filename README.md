# Portfólio | Gustavo Constante

Portfólio pessoal de Gustavo Constante, publicado em [gstvdc.github.io](https://gstvdc.github.io).

O projeto foi reorganizado para uma arquitetura mais simples e estável para GitHub Pages, mantendo o site leve e fácil de atualizar.

## Arquitetura atual

Hoje o site funciona de forma direta:

- o conteúdo principal fica em `index.html`
- os estilos são separados por seção em `components/css/`
- os comportamentos da página ficam em `assets/js/`
- bibliotecas externas ficam locais em `assets/vendor/`

Isso significa que o portfólio não depende de backend, build ou carregamento dinâmico de componentes HTML para funcionar.

## Estrutura do projeto

```text
.
├── index.html
├── assets/
│   ├── docs/
│   │   └── gustavo-constante.pdf
│   ├── img/
│   │   ├── projects/
│   │   ├── profile/
│   │   ├── OrganizAI.png
│   │   └── drtalesllantada.png
│   ├── js/
│   │   ├── main.js
│   │   └── github-projects.js
│   └── vendor/
└── components/
    └── css/
        ├── variables.css
        ├── base.css
        ├── nav.css
        ├── hero.css
        ├── about.css
        ├── projects.css
        ├── skills.css
        ├── resume.css
        ├── contact.css
        └── footer.css
```

## Como cada parte funciona

- `index.html`: estrutura principal do site e todas as seções da página
- `assets/js/main.js`: animações, navegação, scroll e efeito de digitação
- `assets/js/github-projects.js`: monta os cards de projetos e sincroniza metadados com a API pública do GitHub
- `assets/docs/gustavo-constante.pdf`: currículo disponível para download na seção de experiência
- `components/css/`: estilos organizados por seção do site
- `assets/vendor/`: Bootstrap, AOS e Typed.js

## O que o portfólio mostra

- apresentação profissional com efeito de digitação descrevendo atuação atual
- resumo de perfil e stack principal
- projetos em destaque — pessoais, freelance e acadêmicos
- tecnologias organizadas por categoria (front-end, back-end, dados, workflow)
- experiência profissional, formação e diferenciais
- download do currículo em PDF
- formas de contato

## Projetos em destaque

Os projetos são configurados em `PROJECTS_CONFIG` dentro de `github-projects.js`. Cada projeto define título, descrição, stack, preview, cor de acento e links.

- Projetos públicos: o script busca metadados na API do GitHub e exibe a data de atualização quando disponível
- Projetos privados (`private: true`): exibem apenas o link de deploy, sem referência ao repositório
- Projetos freelance recebem um badge visual (`badge: "Freelance"`) no card

As imagens de preview ficam salvas localmente em `assets/img/` para evitar previews quebrados.

## Rodando localmente

Para abrir o projeto localmente, basta iniciar um servidor simples:

```bash
python3 -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Publicação

O deploy é feito pelo GitHub Pages a partir da branch `main`.

```bash
git add .
git commit -m "Atualiza portfolio"
git push origin main
```

## Contato

- Email: gustavo.cunha.constante@gmail.com
- LinkedIn: [linkedin.com/in/gstvdc](https://www.linkedin.com/in/gstvdc)
- GitHub: [github.com/gstvdc](https://github.com/gstvdc)
