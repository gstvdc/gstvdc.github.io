import type { SimpleIcon } from "simple-icons";
import {
  siAngular,
  siCplusplus,
  siCss,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGitlab,
  siHtml5,
  siJsonwebtokens,
  siLangchain,
  siLanggraph,
  siLaravel,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
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
};

const LIGHT = "#f5f4f1";

/** Every technology shown as a logo, keyed by the name used in the content. */
export const TECH: Record<string, TechIcon> = {
  Scrum: { bi: "bi-arrow-repeat", color: "#e2554d" },
  Figma: { icon: siFigma },
  "UI/UX": { bi: "bi-bounding-box-circles", color: "#c084fc" },
  Swagger: { icon: siSwagger },
  Laravel: { icon: siLaravel },
  NestJS: { icon: siNestjs },
  "Node.js": { icon: siNodedotjs },
  Express: { icon: siExpress, color: LIGHT },
  PHP: { icon: siPhp },
  Java: { icon: siOpenjdk, color: "#ed8b00" },
  Python: { icon: siPython },
  "C++": { icon: siCplusplus },
  LangChain: { icon: siLangchain },
  LangGraph: { icon: siLanggraph },
  JWT: { icon: siJsonwebtokens, color: "#d63aff" },
  PostgreSQL: { icon: siPostgresql },
  MySQL: { icon: siMysql },
  MongoDB: { icon: siMongodb },
  "REST APIs": { bi: "bi-diagram-3", color: "#38bdf8" },
  integrations: { bi: "bi-plug", color: "#fbbf24" },
  validations: { bi: "bi-patch-check", color: "#34d399" },
  SvelteKit: { icon: siSvelte },
  Angular: { icon: siAngular, color: "#dd0031" },
  React: { icon: siReact },
  "Next.js": { icon: siNextdotjs, color: LIGHT },
  TypeScript: { icon: siTypescript },
  HTML5: { icon: siHtml5 },
  CSS3: { icon: siCss },
  "Reactive Forms": { icon: siAngular, color: "#dd0031" },
  "Tailwind CSS": { icon: siTailwindcss },
  Git: { icon: siGit },
  GitHub: { icon: siGithub, color: LIGHT },
  GitLab: { icon: siGitlab },
  Docker: { icon: siDocker },
  Nginx: { icon: siNginx },
  Postman: { icon: siPostman },
  Vercel: { icon: siVercel, color: LIGHT },
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
