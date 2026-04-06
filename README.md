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
│   ├── img/
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
- `assets/js/github-projects.js`: monta a seção de projetos em destaque e tenta sincronizar dados com o GitHub
- `components/css/`: arquivos de estilo organizados por área do site
- `assets/vendor/`: dependências visuais e scripts de apoio usados no front-end

## O que o portfólio mostra

- apresentação profissional na tela inicial
- resumo sobre perfil e stack atual
- projetos em destaque com links para GitHub
- tecnologias organizadas por categoria
- experiência profissional e formação
- formas de contato

## Projetos em destaque

Os cards de projeto usam uma base local para garantir que a seção continue funcionando no GitHub Pages. Quando possível, o site também busca dados públicos do GitHub para mostrar informações como a última atualização do repositório.

As imagens dos projetos ficam salvas localmente para evitar previews quebrados.

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
