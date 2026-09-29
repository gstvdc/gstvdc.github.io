export type ProjectConfig = {
  owner?: string;
  repo?: string;
  title: string;
  summary: string;
  stack: string[];
  accent: string;
  year: string;
  liveUrl?: string;
  previewImage?: string;
  private?: boolean;
  badge?: string;
  category: string;
};

export type Project = ProjectConfig & { htmlUrl: string };

export const PROJECTS: ProjectConfig[] = [
  {
    owner: "gstvdc",
    repo: "Agentis",
    title: "Agentis",
    summary:
      "SaaS multi-conta para sellers do Mercado Livre com squad de agentes de IA para SAC, análise, precificação, anúncios e ADS, com aprovação humana e auditoria.",
    stack: ["React", "TypeScript", "Express", "Supabase", "LangGraph"],
    accent: "#f5c518",
    year: "2026",
    previewImage: "/img/agentis.png",
    category: "Full Stack / IA",
  },
  {
    title: "CIA Engenharia Elétrica",
    summary:
      "Plataforma institucional e painel de engenharia consultiva, com métricas de projetos sincronizadas via API do Notion e contingência por snapshot estático.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    accent: "#e8b530",
    year: "2026",
    liveUrl: "https://www.ciaengenhariaeletrica.com.br",
    previewImage: "/img/cia-engenharia.jpg",
    private: true,
    badge: "Site no ar",
    category: "Full Stack / Institucional",
  },
  {
    title: "Dr. Tales Llantada",
    summary:
      "Website institucional para clínica de ortodontia e ortopedia facial, com foco em conversão: serviços, perfil do doutor, localização com mapas, agendamento via WhatsApp e SEO completo.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#2bb6a3",
    year: "2026",
    liveUrl: "https://drtalesllantada.com",
    previewImage: "/img/drtalesllantada.jpg",
    private: true,
    badge: "Freelance",
    category: "Freelance / Next.js",
  },
  {
    owner: "gstvdc",
    repo: "OrganizaAI",
    title: "OrganizAI",
    summary:
      "Aplicação web de educação financeira com IA generativa: em minutos gera um diagnóstico com score de saúde financeira, pontos fortes e um plano de ação personalizado.",
    stack: ["React", "TypeScript", "IA Generativa", "Vercel"],
    accent: "#c5f82a",
    year: "2026",
    liveUrl: "https://organiz-ai.vercel.app",
    previewImage: "/img/organizai.jpg",
    category: "Full Stack / IA",
  },
  {
    owner: "gstvdc",
    repo: "SmartRoute",
    title: "SmartRoute",
    summary:
      "Calcula a rota de menor custo total (combustível e pedágios) entre capitais brasileiras com o algoritmo de Dijkstra, paradas obrigatórias e mapa interativo em tempo real.",
    stack: ["JavaScript", "Vite", "Leaflet", "OSRM", "Dijkstra"],
    accent: "#f5a30f",
    year: "2026",
    liveUrl: "https://smart-route-tau.vercel.app",
    previewImage: "/img/smartroute.jpg",
    category: "Algoritmos / Grafos",
  },
  {
    owner: "gstvdc",
    repo: "Driftlyzer",
    title: "Driftlyzer",
    summary:
      "Analisador de consistência contínua para repositórios: detecta drift entre backend NestJS, frontend Angular, README, comentários e contratos de API, com CLI, scan por diff e revisão semântica opcional com IA local.",
    stack: ["TypeScript", "NestJS", "Angular", "PostgreSQL", "Ollama"],
    accent: "#38bdf8",
    year: "2026",
    category: "Ferramenta / DevTools",
  },
  {
    owner: "gstvdc",
    repo: "Grammar-Quest",
    title: "Grammar Quest",
    summary:
      "Jogo 2D em labirinto que ensina derivação de gramáticas regulares: cada porta aplica uma produção real, a pilha controla a derivação e o resultado vira expressão regular.",
    stack: ["Rust", "Macroquad", "egui", "Autômatos"],
    accent: "#34d399",
    year: "2026",
    previewImage: "/img/grammar-quest.png",
    category: "Jogo / Rust",
  },
  {
    owner: "gstvdc",
    repo: "TokenDeck",
    title: "TokenDeck",
    summary:
      "Monitor em tempo real das cotas e limites de uso de Codex, Claude Code e Gemini, com app desktop (Studio) e display físico ESP32 conectado por USB serial.",
    stack: ["Python", "WebView2", "ESP32", "PlatformIO"],
    accent: "#10a37f",
    year: "2026",
    previewImage: "/img/tokendeck.jpg",
    category: "Hardware / IA",
  },
  {
    owner: "gstvdc",
    repo: "Gerador-de-certificados",
    title: "Gerador de Certificados",
    summary:
      "Gerador de certificados acadêmicos com Angular: cria, visualiza e gerencia certificados, com dados no navegador e página pronta para imprimir ou salvar em PDF. Feito à mão, como projeto de aprendizado em Angular.",
    stack: ["Angular 19", "TypeScript", "Bootstrap", "localStorage"],
    accent: "#dd0031",
    year: "2025",
    previewImage: "/img/gerador-certificados.jpg",
    category: "Frontend / Angular",
  },
  {
    owner: "gstvdc",
    repo: "Gerenciamento-de-Universidade",
    title: "Gerenciamento de Universidade",
    summary:
      "Sistema desktop em Java com PostgreSQL para gerenciamento acadêmico: cursos, fases, disciplinas e professores, com interface Swing e padrão DAO.",
    stack: ["Java", "Swing", "PostgreSQL", "JDBC", "DAO"],
    accent: "#ffd166",
    year: "2025",
    previewImage: "/img/universidade.jpg",
    category: "Desktop / Java",
  },
  {
    owner: "gstvdc",
    repo: "8-Graus-de-Network",
    title: "8 Graus de Network",
    summary:
      "Encontra a conexão mais curta entre dois atores com busca em largura (BFS) sobre um grafo de 8.905 atores e 1.470 filmes: caminho mínimo, todos os caminhos até 8 arestas e lista de adjacências. Trabalho de Teoria de Grafos na UNESC.",
    stack: ["JavaScript", "BFS", "Grafos", "ES Modules"],
    accent: "#3fae49",
    year: "2026",
    previewImage: "/img/8-graus-network.jpg",
    category: "Algoritmos / Grafos",
  },
];

export function baseProject(config: ProjectConfig): Project {
  return {
    ...config,
    htmlUrl:
      config.private || !config.owner || !config.repo
        ? ""
        : `https://github.com/${config.owner}/${config.repo}`,
  };
}

/** Completes a project with live GitHub metadata (homepage, canonical URL). */
export async function withMetadata(config: ProjectConfig): Promise<Project> {
  const base = baseProject(config);
  if (config.private || !config.owner || !config.repo) return base;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${config.owner}/${config.repo}`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!response.ok) throw new Error(String(response.status));
    const repo = await response.json();
    const homepage: string = repo.homepage || "";
    const liveUrl = homepage
      ? homepage.startsWith("http")
        ? homepage
        : `https://${homepage}`
      : config.liveUrl;
    return { ...base, htmlUrl: repo.html_url || base.htmlUrl, liveUrl };
  } catch {
    return base;
  }
}
