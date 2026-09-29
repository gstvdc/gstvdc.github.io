import type { SimpleIcon } from "simple-icons";
import {
  siAngular,
  siClaude,
  siCplusplus,
  siCss,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGitlab,
  siGooglegemini,
  siHtml5,
  siJsonwebtokens,
  siLangchain,
  siLanggraph,
  siLaravel,
  siMongodb,
  siN8n,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNotion,
  siOllama,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siShadcnui,
  siSupabase,
  siSvelte,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

type TechIcon = {
  icon?: SimpleIcon;
  /** Bootstrap Icons class for items without a brand logo. */
  bi?: string;
  /** Overrides the brand colour (e.g. brands whose logo is black on dark). */
  color?: string;
  /** Official site; the logo links to it. */
  url?: string;
};

const LIGHT = "#f5f4f1";

/** Every technology shown as a logo, keyed by the name used in the content. */
export const TECH: Record<string, TechIcon> = {
  Scrum: { bi: "bi-arrow-repeat", color: "#e2554d", url: "https://scrumguides.org" },
  Figma: { icon: siFigma, url: "https://www.figma.com" },
  "UI/UX": { bi: "bi-bounding-box-circles", color: "#c084fc" },
  Swagger: { icon: siSwagger, url: "https://swagger.io" },
  Notion: { icon: siNotion, color: LIGHT, url: "https://www.notion.com" },
  Laravel: { icon: siLaravel, url: "https://laravel.com" },
  NestJS: { icon: siNestjs, url: "https://nestjs.com" },
  "Node.js": { icon: siNodedotjs, url: "https://nodejs.org" },
  Express: { icon: siExpress, color: LIGHT, url: "https://expressjs.com" },
  PHP: { icon: siPhp, url: "https://www.php.net" },
  Java: { icon: siOpenjdk, color: "#ed8b00", url: "https://www.java.com" },
  Python: { icon: siPython, url: "https://www.python.org" },
  "C++": { icon: siCplusplus, url: "https://isocpp.org" },
  LangChain: { icon: siLangchain, url: "https://www.langchain.com" },
  LangGraph: { icon: siLanggraph, url: "https://www.langchain.com/langgraph" },
  Claude: { icon: siClaude, url: "https://claude.ai" },
  Gemini: { icon: siGooglegemini, url: "https://gemini.google.com" },
  OpenAI: { bi: "bi-openai", color: LIGHT, url: "https://openai.com" },
  Ollama: { icon: siOllama, color: LIGHT, url: "https://ollama.com" },
  n8n: { icon: siN8n, url: "https://n8n.io" },
  JWT: { icon: siJsonwebtokens, color: "#d63aff", url: "https://jwt.io" },
  PostgreSQL: { icon: siPostgresql, url: "https://www.postgresql.org" },
  MySQL: { icon: siMysql, url: "https://www.mysql.com" },
  MongoDB: { icon: siMongodb, url: "https://www.mongodb.com" },
  Supabase: { icon: siSupabase, url: "https://supabase.com" },
  "REST APIs": { bi: "bi-diagram-3", color: "#38bdf8", url: "https://developer.mozilla.org/docs/Glossary/REST" },
  integrations: { bi: "bi-plug", color: "#fbbf24" },
  validations: { bi: "bi-patch-check", color: "#34d399" },
  SvelteKit: { icon: siSvelte, url: "https://svelte.dev" },
  Angular: { icon: siAngular, color: "#dd0031", url: "https://angular.dev" },
  React: { icon: siReact, url: "https://react.dev" },
  "Next.js": { icon: siNextdotjs, color: LIGHT, url: "https://nextjs.org" },
  TypeScript: { icon: siTypescript, url: "https://www.typescriptlang.org" },
  HTML5: { icon: siHtml5, url: "https://developer.mozilla.org/docs/Web/HTML" },
  CSS3: { icon: siCss, url: "https://developer.mozilla.org/docs/Web/CSS" },
  "Reactive Forms": { icon: siAngular, color: "#dd0031", url: "https://angular.dev/guide/forms/reactive-forms" },
  "Tailwind CSS": { icon: siTailwindcss, url: "https://tailwindcss.com" },
  "shadcn/ui": { icon: siShadcnui, color: LIGHT, url: "https://ui.shadcn.com" },
  Git: { icon: siGit, url: "https://git-scm.com" },
  GitHub: { icon: siGithub, color: LIGHT, url: "https://github.com" },
  GitLab: { icon: siGitlab, url: "https://gitlab.com" },
  Docker: { icon: siDocker, url: "https://www.docker.com" },
  Nginx: { icon: siNginx, url: "https://nginx.org" },
  Postman: { icon: siPostman, url: "https://www.postman.com" },
  Vercel: { icon: siVercel, color: LIGHT, url: "https://vercel.com" },
};

export function TechLogo({ name, size = 34 }: { name: string; size?: number }) {
  const tech = TECH[name];
  if (!tech) return null;
  const color = tech.color ?? `#${tech.icon?.hex ?? "f5f4f1"}`;
  if (tech.icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
        <path d={tech.icon.path} fill={color} />
      </svg>
    );
  }
  return (
    <i
      className={`bi ${tech.bi}`}
      style={{ color, fontSize: size }}
      aria-hidden="true"
    ></i>
  );
}

/** Wraps a logo/chip in a link to the technology's site; plain when there is none. */
export function TechLink({
  name,
  hidden,
  children,
}: {
  name: string;
  /** Duplicate marquee copies stay out of the tab order. */
  hidden?: boolean;
  children: React.ReactNode;
}) {
  const url = TECH[name]?.url;
  if (!url) return <>{children}</>;
  return (
    <a
      className="tech-link"
      href={url}
      target="_blank"
      rel="noreferrer"
      tabIndex={hidden ? -1 : undefined}
    >
      {children}
    </a>
  );
}
