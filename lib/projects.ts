/** Texts (summary, category, badge) live in lib/i18n under `projects.items[id]`. */
type ProjectConfig = {
  id: string;
  owner?: string;
  repo?: string;
  title: string;
  stack: string[];
  accent: string;
  year: string;
  liveUrl?: string;
  previewImage?: string;
  private?: boolean;
  /**
   * ISO date of the last commit. Public repos get it from GitHub at build time
   * (lib/github.ts); set it by hand for private projects, otherwise `year` is used.
   */
  lastCommit?: string;
};

export type Project = ProjectConfig & { htmlUrl: string };

/** Data fetched from GitHub at build time for one repository. */
export type RepoMeta = { htmlUrl?: string; liveUrl?: string; lastCommit?: string };

export const PROJECTS: ProjectConfig[] = [
  {
    id: "agentis",
    owner: "gstvdc",
    repo: "Agentis",
    title: "Agentis",
    stack: ["React", "TypeScript", "Express", "Supabase", "LangGraph"],
    accent: "#f5c518",
    year: "2026",
    previewImage: "/img/agentis.jpg",
  },
  {
    id: "cia",
    title: "CIA Engenharia Elétrica",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    accent: "#e8b530",
    year: "2026",
    liveUrl: "https://www.ciaengenhariaeletrica.com.br",
    previewImage: "/img/cia-engenharia.jpg",
    private: true,
  },
  {
    id: "tales",
    title: "Dr. Tales Llantada",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#2bb6a3",
    year: "2026",
    liveUrl: "https://drtalesllantada.com",
    previewImage: "/img/drtalesllantada.jpg",
    private: true,
  },
  {
    id: "organizai",
    owner: "gstvdc",
    repo: "OrganizaAI",
    title: "OrganizAI",
    stack: ["React", "TypeScript", "IA Generativa", "Vercel"],
    accent: "#c5f82a",
    year: "2026",
    liveUrl: "https://organiz-ai.vercel.app",
    previewImage: "/img/organizai.jpg",
  },
  {
    id: "smartroute",
    owner: "gstvdc",
    repo: "SmartRoute",
    title: "SmartRoute",
    stack: ["JavaScript", "Vite", "Leaflet", "OSRM", "Dijkstra"],
    accent: "#f5a30f",
    year: "2026",
    liveUrl: "https://smart-route-tau.vercel.app",
    previewImage: "/img/smartroute.jpg",
  },
  {
    id: "driftlyzer",
    owner: "gstvdc",
    repo: "Driftlyzer",
    title: "Driftlyzer",
    stack: ["TypeScript", "NestJS", "Angular", "PostgreSQL", "Ollama"],
    accent: "#38bdf8",
    year: "2026",
  },
  {
    id: "grammarquest",
    owner: "gstvdc",
    repo: "Grammar-Quest",
    title: "Grammar Quest",
    stack: ["Rust", "Macroquad", "egui", "Autômatos"],
    accent: "#34d399",
    year: "2026",
    previewImage: "/img/grammar-quest.jpg",
  },
  {
    id: "tokendeck",
    owner: "gstvdc",
    repo: "TokenDeck",
    title: "TokenDeck",
    stack: ["Python", "WebView2", "ESP32", "PlatformIO"],
    accent: "#10a37f",
    year: "2026",
    previewImage: "/img/tokendeck.jpg",
  },
  {
    id: "certificados",
    owner: "gstvdc",
    repo: "Gerador-de-certificados",
    title: "Gerador de Certificados",
    stack: ["Angular 19", "TypeScript", "Bootstrap", "localStorage"],
    accent: "#dd0031",
    year: "2025",
    previewImage: "/img/gerador-certificados.jpg",
  },
  {
    id: "universidade",
    owner: "gstvdc",
    repo: "Gerenciamento-de-Universidade",
    title: "Gerenciamento de Universidade",
    stack: ["Java", "Swing", "PostgreSQL", "JDBC", "DAO"],
    accent: "#ffd166",
    year: "2025",
    previewImage: "/img/universidade.jpg",
  },
  {
    id: "graus",
    owner: "gstvdc",
    repo: "8-Graus-de-Network",
    title: "8 Graus de Network",
    stack: ["JavaScript", "BFS", "Grafos", "ES Modules"],
    accent: "#3fae49",
    year: "2026",
    previewImage: "/img/8-graus-network.jpg",
  },
];

function baseProject(config: ProjectConfig): Project {
  return {
    ...config,
    htmlUrl:
      config.private || !config.owner || !config.repo
        ? ""
        : `https://github.com/${config.owner}/${config.repo}`,
  };
}

/** Merges build-time GitHub data into a project. */
export function withMeta(config: ProjectConfig, meta?: RepoMeta): Project {
  const base = baseProject(config);
  if (!meta) return base;
  return {
    ...base,
    htmlUrl: meta.htmlUrl || base.htmlUrl,
    liveUrl: meta.liveUrl || config.liveUrl,
    lastCommit: meta.lastCommit || config.lastCommit,
  };
}

const sortKey = (p: Project) => Date.parse(p.lastCommit || `${p.year}-01-01`) || 0;

/** Most recently committed first. */
export function sortByLastCommit(list: Project[]): Project[] {
  return [...list].sort((a, b) => sortKey(b) - sortKey(a));
}
