import type { Dict } from "./pt";

export const es: Dict = {
  meta: {
    title: "Portafolio | Gustavo Constante",
    description:
      "Portafolio de Gustavo Constante, desarrollador full stack con experiencia en SvelteKit, Laravel, Angular, NestJS, React y sistemas corporativos.",
  },
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Proyectos",
    stack: "Stack",
    experience: "Experiencia",
    contact: "Contacto",
    top: "Volver arriba",
    language: "Idioma",
  },
  hero: {
    contact: "Contacto",
    index: "01 / Portafolio",
    role: "Full Stack Developer ·",
    phrases: [
      "creando sistemas que facilitan el trabajo de las empresas",
      "transformando ideas en sitios y aplicaciones útiles",
      "automatizando tareas y conectando herramientas del día a día",
      "evolucionando productos con atención a la calidad y a las personas",
    ],
    scroll: "Desplázate para ver el portafolio",
    photoAlt: "Foto de Gustavo Constante",
    noteLeft: "Hola, soy Gustavo. Construyo sistemas que resuelven problemas reales.",
    noteRight: "Abierto a oportunidades y colaboraciones, en cualquier lugar.",
    location: "SC — Brasil",
    tagline: "Código con propósito. Entrega con consistencia.",
  },
  bio: {
    aria: "Sobre mí",
    label: "SOBRE MÍ",
    tag: "FULL STACK DEVELOPER · SOMBRIO, SC",
    line1: "Código con propósito.",
    line2: "Entrega con consistencia.",
    lead: "Soy <strong>Gustavo Constante</strong>, estudiante de Ciencias de la Computación en la UNESC y desarrollador full stack. Construyo aplicaciones que resuelven problemas reales, <em>de la base de datos a la interfaz</em>.",
    pathTitle: "TRAYECTORIA",
    pathText:
      "Empecé en el diseño gráfico, pasé por ventas y rutinas administrativas y hoy desarrollo sistemas corporativos con SvelteKit y Laravel en CIA Engenharia Elétrica.",
    pathAccent: "Del diseño al código, pensando siempre en el usuario.",
    focusTitle: "ENFOQUE ACTUAL",
    focusText:
      "Aprendo y entrego con Angular, NestJS, React y Next.js, me encargo de APIs, bases de datos y despliegue, y mantengo proyectos propios con IA, algoritmos y hardware.",
  },
  about: {
    pill: "Enfocado en resultados",
    lines: [
      "Aplicaciones reales.",
      "Del front-end a la base de datos.",
      "Entrega con consistencia.",
    ],
    stats: [
      { label: "Experiencia profesional", suffix: "+ año" },
      { label: "Proyectos destacados", suffix: "" },
      { label: "Tecnologías y herramientas", suffix: "+" },
      { label: "Capas del stack", suffix: "" },
    ],
    ctaExperience: "Ver experiencia",
    ctaContact: "Ponerse en contacto",
  },
  projects: {
    eyebrow: "// TRABAJO SELECCIONADO",
    title: "Proyectos destacados",
    intro:
      "Una selección de sistemas, sitios y algoritmos. Del <strong>full stack</strong> al front-end, con foco en problemas reales y código que entrega.",
    scroll: "Scroll",
    open: "Abrir",
    impactPill: "Impacto de los proyectos",
    impactTitle: "Construyendo lo que entrega resultados",
    impactText:
      "Ideas convertidas en soluciones listas para producción, con reglas de negocio, integración y experiencia de uso bien resueltas.",
    impactStats: {
      featured: "Proyectos destacados",
      live: "Proyectos en línea",
      repos: "Repositorios públicos",
      techs: "Tecnologías usadas",
    },
    archive: "Archivo de proyectos",
    search: "Buscar proyectos o tecnologías...",
    all: "Todos",
    badgePrivate: "Privado",
    badgeLive: "En línea",
    badgeRepo: "Repositorio",
    view: "ver",
    empty: "Ningún proyecto encontrado.",
    allRepos: "Ver todos los repositorios",
    items: {
      agentis: {
        summary:
          "SaaS multicuenta para vendedores de Mercado Libre con un equipo de agentes de IA para atención al cliente, análisis, precios, anuncios y ADS, con aprobación humana y auditoría.",
        category: "Full Stack / IA",
      },
      cia: {
        summary:
          "Plataforma institucional y panel de ingeniería consultiva, con métricas de proyectos sincronizadas mediante la API de Notion y contingencia con snapshot estático.",
        category: "Full Stack / Institucional",
        badge: "Sitio en línea",
      },
      tales: {
        summary:
          "Sitio institucional para una clínica de ortodoncia y ortopedia facial, enfocado en conversión: servicios, perfil del doctor, ubicación con mapas, reservas por WhatsApp y SEO completo.",
        category: "Freelance / Next.js",
        badge: "Freelance",
      },
      organizai: {
        summary:
          "Aplicación web de educación financiera con IA generativa: en minutos genera un diagnóstico con puntaje de salud financiera, puntos fuertes y un plan de acción personalizado.",
        category: "Full Stack / IA",
      },
      smartroute: {
        summary:
          "Calcula la ruta de menor costo total (combustible y peajes) entre capitales brasileñas con el algoritmo de Dijkstra, paradas obligatorias y mapa interactivo en tiempo real.",
        category: "Algoritmos / Grafos",
      },
      driftlyzer: {
        summary:
          "Analizador de consistencia continua para repositorios: detecta drift entre backend NestJS, frontend Angular, README, comentarios y contratos de API, con CLI, escaneo por diff y revisión semántica opcional con IA local.",
        category: "Herramienta / DevTools",
      },
      grammarquest: {
        summary:
          "Juego 2D de laberinto que enseña la derivación de gramáticas regulares: cada puerta aplica una producción real, la pila controla la derivación y el resultado se convierte en una expresión regular.",
        category: "Juego / Rust",
      },
      tokendeck: {
        summary:
          "Monitor en tiempo real de las cuotas y límites de uso de Codex, Claude Code y Gemini, con app de escritorio (Studio) y pantalla física ESP32 conectada por USB serial.",
        category: "Hardware / IA",
      },
      certificados: {
        summary:
          "Generador de certificados académicos con Angular: crea, visualiza y gestiona certificados, con datos en el navegador y una página lista para imprimir o guardar en PDF. Hecho a mano, como proyecto de aprendizaje de Angular.",
        category: "Frontend / Angular",
      },
      universidade: {
        summary:
          "Sistema de escritorio en Java con PostgreSQL para la gestión académica: cursos, fases, asignaturas y profesores, con interfaz Swing y patrón DAO.",
        category: "Escritorio / Java",
      },
      graus: {
        summary:
          "Encuentra la conexión más corta entre dos actores con búsqueda en anchura (BFS) sobre un grafo de 8.905 actores y 1.470 películas: camino mínimo, todos los caminos de hasta 8 aristas y lista de adyacencia. Trabajo de Teoría de Grafos en la UNESC.",
        category: "Algoritmos / Grafos",
      },
    },
    tags: {
      "IA Generativa": "IA Generativa",
      Grafos: "Grafos",
      Autômatos: "Autómatas",
    },
  },
  skills: {
    watermark: "STACK",
    eyebrow: "// CAJA DE HERRAMIENTAS",
    title: "Stack actual",
    text: "Una máquina que muestra las capas que atraviesa una funcionalidad hasta llegar a producción.",
    bannerLabel: "// ENFOQUE ACTUAL",
    bannerTitle: "SvelteKit + Laravel en aplicaciones corporativas reales",
    bannerText:
      "Desarrollo y mantenimiento de sistemas, automatizaciones internas, integración entre frontend, backend y MySQL, además de infraestructura con Nginx y colaboración con Git y code review.",
    lanesTitle: "Tech stack y ecosistema",
    lanes: {
      cabinet: {
        label: "Requisitos",
        text: "Planificación, prototipos y entregas en sprints.",
      },
      engine: {
        label: "Back-end",
        text: "APIs, reglas de negocio, automatizaciones e integración entre capas.",
      },
      admin: {
        label: "Datos y APIs",
        text: "Persistencia, modelado e integración de datos con APIs REST.",
      },
      storefront: {
        label: "Front-end",
        text: "Interfaces componentizadas con foco en mantenimiento y experiencia de uso.",
      },
      cashdesk: {
        label: "Infra y workflow",
        text: "Versionado, code review y despliegue para entregas organizadas.",
      },
    },
    items: { integrations: "Integraciones", validations: "Validaciones" },
    loading: "Montando el stack…",
  },
  resume: {
    timelineTitle: "Trayectoria",
    cv: "Descargar currículum",
    portraitCaption: "Full Stack Developer",
    items: {
      "pip-2023": {
        period: "Ene – May 2023",
        content: "Diseñador Gráfico en Pip Publicidade: piezas para medios impresos y composición visual.",
      },
      "unesc-2024": {
        period: "2024 – 2028",
        content: "Licenciatura en Ciencias de la Computación en la UNESC, en curso.",
      },
      "hsports-2024": {
        period: "Mar – Ago 2024",
        content: "Diseñador Gráfico en HSports: materiales visuales y artes para producción.",
      },
      "emasel-2024": {
        period: "Nov 2024 – Jul 2025",
        content:
          "Auxiliar de Oficina en Emasel Contabilidade: rutinas administrativas y organización documental.",
      },
      "simples-2025": {
        period: "Jul – Oct 2025",
        content: "SDR en Simples Dental: datos en CRM, automatizaciones y flujos de mensajes.",
      },
      "procer-2025": {
        period: "Oct 2025 – Ago 2026",
        content: "Practicante Full Stack en PROCER: Angular, NestJS, APIs REST, JWT, Git y Scrum.",
      },
      "cia-2026": {
        period: "Ago 2026 – Actual",
        content:
          "Desarrollador Full Stack en CIA Engenharia Elétrica: SvelteKit, Laravel, MySQL y Nginx.",
      },
    },
    watermark: "DIFERENCIALES",
    eyebrow: "// APRENDIZAJE EN FOCO",
    title: "Diferenciales",
    text: "Lo que sostiene la entrega: experiencia real, amplitud técnica y comunicación.",
    difTag: "// LO QUE ME DIFERENCIA",
    differentials: [
      {
        title: "Experiencia real en software",
        text: "Trabajo actual en un entorno corporativo con SvelteKit, Laravel, MySQL y Nginx, evolucionando sistemas que las personas usan de verdad.",
      },
      {
        title: "Amplitud técnica",
        text: "Además del stack principal, práctica con Angular, NestJS, React, Next.js, Node.js, Java, Python, C++ y bases de datos relacionales y no relacionales.",
      },
      {
        title: "Comunicación y producto",
        text: "Base en UI/UX, diseño y experiencia comercial, que ayuda a leer el contexto y a construir interfaces más claras.",
      },
    ],
    groups: ["Stack principal", "Otras tecnologías", "Métodos, diseño e idiomas"],
    english: "Inglés intermedio",
    spanish: "Español básico",
  },
  contact: {
    watermark: "CONTACTO",
    eyebrow: "// HABLEMOS",
    title: "Contacto",
    text: "Si tiene sentido para tu equipo o proyecto, podemos conversar por correo, LinkedIn o GitHub.",
    kicker: "// HABLEMOS",
    formTitle: "Abierto a oportunidades en desarrollo",
    formText:
      "Usa el formulario para contactarme sobre vacantes, proyectos, trabajos freelance o networking profesional.",
    namePlaceholder: "Tu nombre",
    name: "Nombre",
    emailPlaceholder: "Tu correo",
    email: "Correo",
    subject: "Asunto",
    messagePlaceholder: "Tu mensaje",
    message: "Mensaje",
    sending: "Enviando",
    error: "No se pudo enviar ahora. Inténtalo de nuevo o usa el correo.",
    sent: "Tu mensaje fue enviado. Gracias.",
    submit: "Enviar mensaje",
    sideBadge: "// CONTACTO DIRECTO",
    sideTitle: "Formas rápidas de hablar conmigo",
    sideText: "¿Prefieres ir directo al grano? Estos son los canales más rápidos.",
    location: "Ubicación",
    locationValue: "Sombrio/SC · Brasil",
    sendEmail: "Enviar correo",
    globeLabel: "Globo interactivo con la ubicación de Sombrio, SC",
    reply: "Suelo responder en un día hábil.",
  },
  footer: {
    bio: "Desarrollador full stack y estudiante de Ciencias de la Computación, construyendo sistemas que resuelven problemas reales, de la base de datos a la interfaz. Trabajo con SvelteKit, Laravel, Angular, NestJS y React, y mantengo proyectos propios con IA, algoritmos y hardware. Código con propósito, entrega con consistencia.",
    role: "Desarrollador Full Stack",
    emailAria: "Enviar correo",
  },
  machine: {
    aria: "Máquina 3D interactiva con cinco módulos: Requisitos, Back-end, Datos y APIs, Front-end e Infra y despliegue. Arrastra para girar, usa la rueda o el gesto de pellizco para ampliar. Pasa el cursor o toca un módulo para ver más.",
    title: "Stack actual",
    subtitle: "Taller interactivo",
    running: "Sistema en marcha",
    paused: "Sistema en pausa",
    serial: "SERIE 001",
    heading: "El stack que sostiene el producto",
    headingIndex: "5 MÓDULOS / 1 SISTEMA",
    prototype: "PROTOTIPO 01 — DE LA IDEA AL DESPLIEGUE",
    modeLabel: "Modo de la máquina",
    modes: ["Montada", "Corte", "Módulos", "Una entrega"],
    cameraLabel: "Cámara",
    view: "VISTA",
    cameras: ["General", "Lateral", "Superior", "Módulo", "Vuelo"],
    pause: "Pausar la animación",
    resume: "Reanudar la animación",
    wordmark: "Gustavo Constante · ",
    wordmarkSub: "stack de producción",
    hint: "Gira. Amplía. Explora.",
    loading: "Montando el stack",
    errorTitle: "No se pudo iniciar la escena 3D",
    errorText: "Verifica que WebGL esté activado en tu navegador.",
    retry: "Intentar de nuevo",
    noWebgl:
      "WebGL no está disponible. Activa la aceleración por hardware en el navegador y recarga la página.",
    contextLost:
      "El contexto gráfico se interrumpió. La escena se recupera sola cuando WebGL vuelva a estar disponible.",
    scene: {
      boardTags: "·  front  ·  back  ·  datos  ·  deploy",
      boardSub: "FULL STACK    /    SVELTEKIT + LARAVEL EN PRODUCCIÓN",
      codeA: "CÓDIGO",
      codeB: "CON PROPÓSITO.",
      pitch: ["De la idea —", "al producto real.", "SvelteKit + Laravel", "en producción."],
      queries: "CONSULTAS",
      queryNames: ["Persistencia", "Modelado", "APIs REST"],
      running: "EJECUTANDO",
      queued: "EN COLA",
      mockNav: "Inicio    Proyectos    Contacto",
      mockA: "DE LA IDEA",
      mockB: "AL PRODUCTO.",
      mockC: "Interfaces",
      mockD: "rápidas.",
      mockE: "Componentes claros, foco",
      mockF: "en mantenimiento y uso.",
      mockCta: "Ver proyectos  ↗",
      iface: "INTERFAZ",
      reqs: "REQUISITOS",
      sprint: "Sprint · 3 ítems",
      tasks: ["Login y perfil", "API de pedidos", "Panel admin"],
      taskState: ["Nueva tarea", "En desarrollo", "Listo"],
      newTask: "Nueva tarea",
      reqPlus: "Requisito  +",
      deployDone: "DEPLOY COMPLETADO",
      live: "● ONLINE",
      liveShort: "ONLINE",
      thanks: "¡Gracias!",
      rules: "REGLAS",
      business: "01 / Negocio",
      done: "LISTO  ✓",
      newA: "NUEVA",
      newB: "TAREA",
    },
    step: "Etapa",
    stations: {
      engine: {
        name: "Back-end",
        output: "regla de negocio",
        desc: "Laravel, NestJS y Node.js: reglas de negocio, autenticación y automatizaciones.",
      },
      admin: {
        name: "Datos y APIs",
        output: "datos",
        desc: "PostgreSQL, MySQL y MongoDB: persistencia, modelado y APIs REST.",
      },
      storefront: {
        name: "Front-end",
        output: "interfaz",
        desc: "SvelteKit, Angular, React y Next.js: interfaces rápidas y fáciles de mantener.",
      },
      cabinet: {
        name: "Requisitos",
        output: "requisito",
        desc: "Scrum, Figma y UI/UX: requisitos, prototipos y entregas en sprints.",
      },
      cashdesk: {
        name: "Infra y Deploy",
        output: "deploy",
        desc: "Git, GitHub, Docker, Nginx y Vercel: versionado, code review y despliegue.",
      },
    },
    journey: [
      ["Nuevo requisito", "Requisitos · una tarea entra al sprint"],
      ["Regla de negocio", "Back-end · la lógica toma forma"],
      ["Datos y APIs", "Datos · persistencia y contratos REST"],
      ["Interfaz", "Front-end · la pantalla llega al usuario"],
      ["Despliegue completo", "Infra · versionado, revisado y en línea"],
    ],
  },
};
