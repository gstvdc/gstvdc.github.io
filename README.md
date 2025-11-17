# Meu Portfólio Pessoal

Bem-vindo ao repositório do meu portfólio pessoal! Este projeto foi desenvolvido para apresentar minhas habilidades, projetos e minha jornada como desenvolvedor. Ele serve como um ponto central para recrutadores e colaboradores conhecerem meu trabalho.

Pode ser acessado em: (https://# Portfólio - Gustavo Constante

Portfolio pessoal hospedado no GitHub Pages: [gstvdc.github.io](https://gstvdc.github.io)

## 🏗️ Estrutura do Projeto

```
gstvdc.github.io/
├── index.html              # Página principal (carrega componentes)
├── assets/
│   ├── css/
│   │   └── main.css        # Estilos legados
│   ├── js/
│   │   ├── app.js          # Carregador de componentes
│   │   └── main.js         # Lógica principal da aplicação
│   ├── img/
│   │   └── profile/        # Imagens de perfil
│   └── vendor/             # Bibliotecas de terceiros
│       ├── bootstrap/
│       ├── aos/
│       ├── typed.js/
│       └── ...
└── components/
    ├── html/               # Componentes HTML separados
    │   ├── nav.html
    │   ├── hero.html
    │   ├── about.html
    │   ├── skills.html
    │   ├── resume.html
    │   ├── contact.html
    │   └── footer.html
    ├── css/                # Estilos modulares por componente
    │   ├── variables.css
    │   ├── base.css
    │   ├── nav.css
    │   ├── hero.css
    │   ├── about.css
    │   ├── skills.css
    │   ├── resume.css
    │   ├── contact.css
    │   └── footer.css
    └── js/                 # Módulos JS (referência)
        ├── animations.js
        ├── navigation.js
        ├── scroll.js
        └── ...
```

## 🚀 Como Funciona

### Sistema de Componentes

O `index.html` é mantido limpo e minimalista, carregando dinamicamente os componentes HTML:

1. **app.js** - Carrega os componentes HTML via fetch
2. **main.js** - Inicializa todas as funcionalidades (scroll, animações, typed, etc.)
3. **Componentes CSS** - Cada seção tem seu próprio arquivo CSS modular

### Fluxo de Carregamento

```
index.html
  ↓
app.js (carrega componentes HTML)
  ↓
main.js (inicializa funcionalidades)
  ↓
Página totalmente funcional
```

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modulares e variáveis CSS
- **JavaScript Vanilla** - Sem frameworks
- **Bootstrap 5** - Grid e componentes
- **AOS** - Animações on scroll
- **Typed.js** - Efeito de digitação
- **Waypoints** - Scroll tracking

## 📝 Desenvolvimento Local

### Teste Local

```bash
# Opção 1: Live Server (VS Code)
# Instale a extensão "Live Server" e clique com botão direito no index.html

# Opção 2: Python
python3 -m http.server 8000

# Opção 3: Node.js
npx http-server
```

Acesse: `http://localhost:8000`

### Estrutura de Componentes

Cada componente HTML em `/components/html/` é independente e pode ser editado separadamente:

- `nav.html` - Navegação lateral
- `hero.html` - Seção de apresentação
- `about.html` - Sobre mim
- `skills.html` - Habilidades técnicas
- `resume.html` - Experiência e educação
- `contact.html` - Formulário de contato
- `footer.html` - Rodapé e preloader

### CSS Modular

Cada componente possui seu próprio arquivo CSS em `/components/css/`:

- `variables.css` - Variáveis globais (cores, fontes, espaçamentos)
- `base.css` - Reset e estilos base
- Arquivos específicos por componente

## 🌐 Deploy

O site é automaticamente publicado no GitHub Pages quando você faz push para a branch `main`.

```bash
git add .
git commit -m "Atualização do portfólio"
git push origin main
```

O site estará disponível em: `https://gstvdc.github.io`

## 📦 Dependências

Todas as dependências estão incluídas localmente em `/assets/vendor/`:

- Bootstrap 5.3
- AOS (Animate On Scroll) 2.3.1
- Typed.js 2.0.12
- GLightbox 3.2.0
- Swiper 8.4.5
- Waypoints 4.0.1

## 🎨 Personalização

### Cores

Edite `/components/css/variables.css`:

```css
:root {
  --background-color: #ffffff;
  --default-color: #272829;
  --heading-color: #45505b;
  --accent-color: #0563bb;
  /* ... */
}
```

### Conteúdo

Edite os arquivos HTML em `/components/html/` para atualizar:

- Textos
- Links sociais
- Experiências
- Habilidades

## 📄 Licença

© 2024 Gustavo Constante. Todos os direitos reservados.

Design por [BootstrapMade](https://bootstrapmade.com/)

## 📧 Contato

- **Email**: gustavo.cunha.constante@gmail.com
- **LinkedIn**: [gustavo-constante](https://www.linkedin.com/in/gustavo-constante-621884313)
- **Instagram**: [@gstvdcc](https://www.instagram.com/gstvdcc)/)

---

## Funcionalidades Principais

O portfólio é uma aplicação de página única (Single Page Application) com as seguintes seções:

- **Início:** Uma seção de boas-vindas com uma animação de digitação que apresenta meu foco profissional.
- **Sobre Mim:** Uma breve introdução sobre minhas paixões, habilidades técnicas e objetivos de carreira.
- **Projetos:** Uma galeria interativa que exibe os projetos mais relevantes que desenvolvi, com links para suas versões online e repositórios de código.
- **Contato:** Links diretos para minhas redes profissionais e e-mail, facilitando o contato.
- **Design Responsivo:** A interface é totalmente adaptável a diferentes dispositivos, de desktops a celulares.

---

## Tecnologias Utilizadas

Este projeto foi construído do zero utilizando as seguintes tecnologias de front-end:

- **HTML5:** Para a estrutura semântica do conteúdo.
- **CSS3:** Para a estilização, layout (utilizando Flexbox/Grid) e animações.
- **JavaScript (Vanilla):** Para a interatividade da página, como a animação de digitação, a navegação suave (scroll) e a manipulação do DOM.
- **GitHub Pages:** Utilizado para a hospedagem e deploy gratuito da aplicação.

---

## 📞 Contato

Fique à vontade para entrar em contato!

- **LinkedIn:** (https://www.linkedin.com/in/gustavo-constante-621884313)
- **E-mail:** gustavo.cunha.constante@gmail.com
