import type { Dict } from "./pt";

export const en: Dict = {
  meta: {
    title: "Portfolio | Gustavo Constante",
    description:
      "Portfolio of Gustavo Constante, a full stack developer experienced with SvelteKit, Laravel, Angular, NestJS, React and enterprise systems.",
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    stack: "Stack",
    experience: "Experience",
    contact: "Contact",
    top: "Back to top",
    language: "Language",
  },
  hero: {
    contact: "Contact",
    index: "01 / Portfolio",
    role: "Full Stack Developer ·",
    phrases: [
      "building systems that make companies' work easier",
      "turning ideas into useful websites and applications",
      "automating tasks and connecting everyday tools",
      "evolving products with care for quality and people",
    ],
    scroll: "Scroll to see the portfolio",
    photoAlt: "Photo of Gustavo Constante",
    noteLeft: "Hi, I'm Gustavo. I build systems that solve real problems.",
    noteRight: "Open to opportunities and collaborations, anywhere.",
    location: "SC — Brazil",
    tagline: "Code with purpose. Delivery with consistency.",
  },
  bio: {
    aria: "About me",
    label: "ABOUT ME",
    tag: "FULL STACK DEVELOPER · SOMBRIO, SC",
    line1: "Code with purpose.",
    line2: "Delivery with consistency.",
    lead: "I'm <strong>Gustavo Constante</strong>, a Computer Science student at UNESC and a full stack developer. I build applications that solve real problems, <em>from the database to the interface</em>.",
    pathTitle: "BACKGROUND",
    pathText:
      "I started in graphic design, went through sales and administrative work, and today I build enterprise systems with SvelteKit and Laravel at CIA Engenharia Elétrica.",
    pathAccent: "From design to code, always thinking about the user.",
    focusTitle: "CURRENT FOCUS",
    focusText:
      "I learn and ship with Angular, NestJS, React and Next.js, handle APIs, databases and deployment, and maintain my own projects with AI, algorithms and hardware.",
  },
  about: {
    pill: "Focused on results",
    lines: [
      "Real applications.",
      "From the front end to the database.",
      "Delivery with consistency.",
    ],
    stats: [
      { label: "Professional experience", suffix: "+ year" },
      { label: "Featured projects", suffix: "" },
      { label: "Technologies and tools", suffix: "+" },
      { label: "Stack layers", suffix: "" },
    ],
    ctaExperience: "See experience",
    ctaContact: "Get in touch",
  },
  projects: {
    eyebrow: "// SELECTED WORK",
    title: "Featured projects",
    intro:
      "A curated selection of systems, websites and algorithms. From <strong>full stack</strong> to front end, focused on real problems and code that delivers.",
    scroll: "Scroll",
    open: "Open",
    impactPill: "Project impact",
    impactTitle: "Building what delivers results",
    impactText:
      "Ideas turned into production-ready solutions, with business rules, integrations and user experience done right.",
    impactStats: {
      featured: "Featured projects",
      live: "Live projects",
      repos: "Public repositories",
      techs: "Technologies used",
    },
    archive: "Project archive",
    search: "Search projects or technologies...",
    all: "All",
    badgePrivate: "Private",
    badgeLive: "Live",
    badgeRepo: "Repository",
    view: "view",
    empty: "No projects found.",
    allRepos: "See all repositories",
    items: {
      agentis: {
        summary:
          "Multi-account SaaS for Mercado Livre sellers with a squad of AI agents for customer support, analysis, pricing, listings and ADS, with human approval and auditing.",
        category: "Full Stack / AI",
      },
      cia: {
        summary:
          "Institutional platform and consulting engineering dashboard, with project metrics synced through the Notion API and a static snapshot fallback.",
        category: "Full Stack / Institutional",
        badge: "Live site",
      },
      tales: {
        summary:
          "Institutional website for an orthodontics and facial orthopedics clinic, focused on conversion: services, doctor profile, map location, WhatsApp booking and full SEO.",
        category: "Freelance / Next.js",
        badge: "Freelance",
      },
      organizai: {
        summary:
          "Financial education web app with generative AI: in minutes it produces a diagnosis with a financial health score, strengths and a personalized action plan.",
        category: "Full Stack / AI",
      },
      smartroute: {
        summary:
          "Calculates the lowest total cost route (fuel and tolls) between Brazilian capitals using Dijkstra's algorithm, mandatory stops and a real-time interactive map.",
        category: "Algorithms / Graphs",
      },
      driftlyzer: {
        summary:
          "Continuous consistency analyzer for repositories: detects drift between the NestJS backend, Angular frontend, README, comments and API contracts, with a CLI, diff scan and optional semantic review with local AI.",
        category: "Tool / DevTools",
      },
      grammarquest: {
        summary:
          "2D maze game that teaches regular grammar derivation: each door applies a real production, the stack drives the derivation and the result becomes a regular expression.",
        category: "Game / Rust",
      },
      tokendeck: {
        summary:
          "Real-time monitor of usage quotas and limits for Codex, Claude Code and Gemini, with a desktop app (Studio) and a physical ESP32 display connected over USB serial.",
        category: "Hardware / AI",
      },
      certificados: {
        summary:
          "Academic certificate generator built with Angular: creates, previews and manages certificates, with data in the browser and a page ready to print or save as PDF. Handmade, as an Angular learning project.",
        category: "Frontend / Angular",
      },
      universidade: {
        summary:
          "Java desktop system with PostgreSQL for academic management: courses, terms, subjects and teachers, with a Swing interface and the DAO pattern.",
        category: "Desktop / Java",
      },
      graus: {
        summary:
          "Finds the shortest connection between two actors with breadth-first search (BFS) over a graph of 8,905 actors and 1,470 movies: shortest path, all paths up to 8 edges and adjacency list. Graph Theory coursework at UNESC.",
        category: "Algorithms / Graphs",
      },
    },
    tags: {
      "IA Generativa": "Generative AI",
      Grafos: "Graphs",
      Autômatos: "Automata",
    },
  },
  skills: {
    watermark: "STACK",
    eyebrow: "// TOOLBOX",
    title: "Current stack",
    text: "A machine that shows the layers a feature goes through until it goes live.",
    bannerLabel: "// CURRENT FOCUS",
    bannerTitle: "SvelteKit + Laravel in real enterprise applications",
    bannerText:
      "Development and maintenance of systems, internal automations, integration between frontend, backend and MySQL, plus infrastructure with Nginx and collaboration through Git and code review.",
    lanesTitle: "Tech stack & ecosystem",
    lanes: {
      cabinet: {
        label: "Requirements",
        text: "Planning, prototypes and sprint deliveries.",
      },
      engine: {
        label: "Back-end",
        text: "APIs, business rules, automations and integration between layers.",
      },
      admin: {
        label: "Data & APIs",
        text: "Persistence, modeling and data integration with REST APIs.",
      },
      storefront: {
        label: "Front-end",
        text: "Component-based interfaces focused on maintainability and user experience.",
      },
      cashdesk: {
        label: "Infra & workflow",
        text: "Versioning, code review and deployment for organized deliveries.",
      },
    },
    items: { integrations: "Integrations", validations: "Validations" },
    loading: "Assembling the stack…",
  },
  resume: {
    timelineTitle: "Journey",
    cv: "Download résumé",
    portraitCaption: "Full Stack Developer",
    items: {
      "pip-2023": {
        period: "Jan – May 2023",
        content: "Graphic Designer at Pip Publicidade: print media pieces and visual composition.",
      },
      "unesc-2024": {
        period: "2024 – 2028",
        content: "Bachelor's degree in Computer Science at UNESC, in progress.",
      },
      "hsports-2024": {
        period: "Mar – Aug 2024",
        content: "Graphic Designer at HSports: visual materials and artwork for production.",
      },
      "emasel-2024": {
        period: "Nov 2024 – Jul 2025",
        content:
          "Office Assistant at Emasel Contabilidade: administrative routines and document organization.",
      },
      "simples-2025": {
        period: "Jul – Oct 2025",
        content: "SDR at Simples Dental: CRM data, automations and messaging flows.",
      },
      "procer-2025": {
        period: "Oct 2025 – Aug 2026",
        content: "Full Stack Intern at PROCER: Angular, NestJS, REST APIs, JWT, Git and Scrum.",
      },
      "cia-2026": {
        period: "Aug 2026 – Present",
        content:
          "Full Stack Developer at CIA Engenharia Elétrica: SvelteKit, Laravel, MySQL and Nginx.",
      },
    },
    watermark: "STRENGTHS",
    eyebrow: "// LEARNING IN FOCUS",
    title: "Strengths",
    text: "What supports the delivery: real experience, technical breadth and communication.",
    difTag: "// WHAT SETS ME APART",
    differentials: [
      {
        title: "Real software experience",
        text: "Currently working in a corporate environment with SvelteKit, Laravel, MySQL and Nginx, evolving systems that people actually use.",
      },
      {
        title: "Technical breadth",
        text: "Beyond the main stack, hands-on practice with Angular, NestJS, React, Next.js, Node.js, Java, Python, C++ and both relational and non-relational databases.",
      },
      {
        title: "Communication and product",
        text: "A background in UI/UX, design and sales, which helps me read context and build clearer interfaces.",
      },
    ],
    groups: ["Main stack", "Other technologies", "Methods, design and languages"],
    english: "Intermediate English",
    spanish: "Basic Spanish",
  },
  contact: {
    watermark: "CONTACT",
    eyebrow: "// LET'S TALK",
    title: "Contact",
    text: "If it makes sense for your team or project, we can talk by email, LinkedIn or GitHub.",
    kicker: "// LET'S TALK",
    formTitle: "Open to development opportunities",
    formText:
      "Use the form to get in touch about jobs, projects, freelance work or professional networking.",
    namePlaceholder: "Your name",
    name: "Name",
    emailPlaceholder: "Your email",
    email: "Email",
    subject: "Subject",
    messagePlaceholder: "Your message",
    message: "Message",
    sending: "Sending",
    error: "Could not send right now. Please try again or use email.",
    sent: "Your message was sent. Thank you.",
    submit: "Send message",
    sideBadge: "// DIRECT CONTACT",
    sideTitle: "Quick ways to reach me",
    sideText: "Prefer to get straight to the point? These are the fastest channels.",
    location: "Location",
    locationValue: "Sombrio/SC · Brazil",
    sendEmail: "Send email",
    globeLabel: "Interactive globe showing the location of Sombrio, SC",
    reply: "I usually reply within one business day.",
  },
  footer: {
    bio: "Full stack developer and Computer Science student, building systems that solve real problems, from the database to the interface. I work with SvelteKit, Laravel, Angular, NestJS and React, and keep my own projects with AI, algorithms and hardware. Code with purpose, delivery with consistency.",
    role: "Full Stack Developer",
    emailAria: "Send email",
  },
  machine: {
    aria: "Interactive 3D machine with five modules: Requirements, Back-end, Data and APIs, Front-end and Infra and deploy. Drag to rotate, use the wheel or pinch to zoom. Hover or tap a module to learn more.",
    title: "Current stack",
    subtitle: "Interactive workshop",
    running: "System running",
    paused: "System paused",
    serial: "SERIES 001",
    heading: "The stack behind the product",
    headingIndex: "5 MODULES / 1 SYSTEM",
    prototype: "PROTOTYPE 01 — FROM IDEA TO DEPLOY",
    modeLabel: "Machine mode",
    modes: ["Assembled", "Cutaway", "Modules", "One delivery"],
    cameraLabel: "Camera",
    view: "VIEW",
    cameras: ["Overview", "Side", "Top", "Module", "Flight"],
    pause: "Pause the animation",
    resume: "Resume the animation",
    wordmark: "Gustavo Constante · ",
    wordmarkSub: "production stack",
    hint: "Rotate. Zoom. Explore.",
    loading: "Assembling the stack",
    errorTitle: "Could not start the 3D scene",
    errorText: "Check that WebGL is enabled in your browser.",
    retry: "Try again",
    noWebgl:
      "WebGL is not available. Enable hardware acceleration in your browser and reload the page.",
    contextLost:
      "The graphics context was interrupted. The scene will recover on its own once WebGL is available again.",
    scene: {
      boardTags: "·  front  ·  back  ·  data  ·  deploy",
      boardSub: "FULL STACK    /    SVELTEKIT + LARAVEL IN PRODUCTION",
      codeA: "CODE",
      codeB: "WITH PURPOSE.",
      pitch: ["From idea —", "to real product.", "SvelteKit + Laravel", "in production."],
      queries: "QUERIES",
      queryNames: ["Persistence", "Modeling", "REST APIs"],
      running: "RUNNING",
      queued: "QUEUED",
      mockNav: "Home    Projects    Contact",
      mockA: "FROM IDEA",
      mockB: "TO PRODUCT.",
      mockC: "Fast",
      mockD: "interfaces.",
      mockE: "Clear components, focused",
      mockF: "on upkeep and use.",
      mockCta: "View projects  ↗",
      iface: "INTERFACE",
      reqs: "REQUIREMENTS",
      sprint: "Sprint · 3 items",
      tasks: ["Login and profile", "Orders API", "Admin panel"],
      taskState: ["New task", "In development", "Done"],
      newTask: "New task",
      reqPlus: "Requirement  +",
      deployDone: "DEPLOY COMPLETE",
      live: "● LIVE",
      liveShort: "LIVE",
      thanks: "Thank you!",
      rules: "RULES",
      business: "01 / Business",
      done: "DONE  ✓",
      newA: "NEW",
      newB: "TASK",
    },
    step: "Step",
    stations: {
      engine: {
        name: "Back-end",
        output: "business rule",
        desc: "Laravel, NestJS and Node.js: business rules, authentication and automations.",
      },
      admin: {
        name: "Data & APIs",
        output: "data",
        desc: "PostgreSQL, MySQL and MongoDB: persistence, modeling and REST APIs.",
      },
      storefront: {
        name: "Front-end",
        output: "interface",
        desc: "SvelteKit, Angular, React and Next.js: fast, easy-to-maintain interfaces.",
      },
      cabinet: {
        name: "Requirements",
        output: "requirement",
        desc: "Scrum, Figma and UI/UX: requirements, prototypes and sprint deliveries.",
      },
      cashdesk: {
        name: "Infra & Deploy",
        output: "deploy",
        desc: "Git, GitHub, Docker, Nginx and Vercel: versioning, code review and deployment.",
      },
    },
    journey: [
      ["New requirement", "Requirements · a task enters the sprint"],
      ["Business rule", "Back-end · the logic takes shape"],
      ["Data & APIs", "Data · persistence and REST contracts"],
      ["Interface", "Front-end · the screen reaches the user"],
      ["Deploy complete", "Infra · versioned, reviewed and live"],
    ],
  },
};
