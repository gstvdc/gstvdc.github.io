"use client";

import type { CSSProperties } from "react";
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
import type { StationId } from "@/components/ui/stack-machine-3d";

type Item = {
  name: string;
  icon?: SimpleIcon;
  /** Bootstrap Icons class for items without a brand logo. */
  bi?: string;
  /** Overrides the brand colour (e.g. brands whose logo is black on dark). */
  color?: string;
};

type Lane = {
  id: StationId;
  label: string;
  text: string;
  items: Item[];
};

const LIGHT = "#f5f4f1";

// Same order as the machine: requirement → back-end → data → front-end → infra.
const LANES: Lane[] = [
  {
    id: "cabinet",
    label: "Requisitos",
    text: "Planejamento, protótipos e entregas em sprints.",
    items: [
      { name: "Scrum", bi: "bi-arrow-repeat", color: "#e2554d" },
      { name: "Figma", icon: siFigma },
      { name: "UI/UX", bi: "bi-bounding-box-circles", color: "#c084fc" },
      { name: "Swagger", icon: siSwagger },
    ],
  },
  {
    id: "engine",
    label: "Back-end",
    text: "APIs, regras de negócio, automações e integração entre camadas.",
    items: [
      { name: "Laravel", icon: siLaravel },
      { name: "NestJS", icon: siNestjs },
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress, color: LIGHT },
      { name: "PHP", icon: siPhp },
      { name: "Java", icon: siOpenjdk, color: "#ed8b00" },
      { name: "Python", icon: siPython },
      { name: "C++", icon: siCplusplus },
      { name: "LangChain", icon: siLangchain },
      { name: "LangGraph", icon: siLanggraph },
      { name: "JWT", icon: siJsonwebtokens, color: "#d63aff" },
    ],
  },
  {
    id: "admin",
    label: "Dados & APIs",
    text: "Persistência, modelagem e integração de dados com APIs REST.",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MySQL", icon: siMysql },
      { name: "MongoDB", icon: siMongodb },
      { name: "REST APIs", bi: "bi-diagram-3", color: "#38bdf8" },
      { name: "Integrações", bi: "bi-plug", color: "#fbbf24" },
      { name: "Validações", bi: "bi-patch-check", color: "#34d399" },
    ],
  },
  {
    id: "storefront",
    label: "Front-end",
    text: "Interfaces componentizadas com foco em manutenção e experiência de uso.",
    items: [
      { name: "SvelteKit", icon: siSvelte },
      { name: "Angular", icon: siAngular, color: "#dd0031" },
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs, color: LIGHT },
      { name: "TypeScript", icon: siTypescript },
      { name: "HTML5", icon: siHtml5 },
      { name: "CSS3", icon: siCss },
      { name: "Reactive Forms", icon: siAngular, color: "#dd0031" },
      { name: "Tailwind CSS", icon: siTailwindcss },
    ],
  },
  {
    id: "cashdesk",
    label: "Infra & workflow",
    text: "Versionamento, code review e deploy para entregas organizadas.",
    items: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub, color: LIGHT },
      { name: "GitLab", icon: siGitlab },
      { name: "Docker", icon: siDocker },
      { name: "Nginx", icon: siNginx },
      { name: "Postman", icon: siPostman },
      { name: "Vercel", icon: siVercel, color: LIGHT },
    ],
  },
];

function Logo({ item }: { item: Item }) {
  const color = item.color ?? `#${item.icon?.hex ?? "f5f4f1"}`;
  if (item.icon) {
    return (
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" focusable="false">
        <path d={item.icon.path} fill={color} />
      </svg>
    );
  }
  return <i className={`bi ${item.bi}`} style={{ color }} aria-hidden="true"></i>;
}

export default function StackLanes({
  active,
  onPick,
  reveal = true,
}: {
  active: StationId;
  onPick: (id: StationId) => void;
  /** Fade in when scrolled into view (off inside the expanding card). */
  reveal?: boolean;
}) {
  return (
    <div className="stack-lanes" {...(reveal ? { "data-reveal": true } : {})}>
      <span className="stack-lanes-title">Tech stack &amp; ecossistema</span>

      {LANES.map((lane, index) => {
        // Enough copies per half that the strip is always wider than the screen.
        const reps = Math.max(1, Math.ceil(14 / lane.items.length));
        const half = Array.from({ length: reps }, () => lane.items).flat();
        const track = [...half, ...half];
        const duration = Math.max(38, lane.items.length * reps * 3.2);

        return (
          <section
            key={lane.id}
            className={"stack-lane" + (active === lane.id ? " is-active" : "")}
          >
            <button
              type="button"
              className="stack-lane-head"
              onClick={() => onPick(lane.id)}
              aria-pressed={active === lane.id}
            >
              <span className="stack-lane-num">{String(index + 1).padStart(2, "0")}</span>
              <strong>{lane.label}</strong>
              <span className="stack-lane-text">{lane.text}</span>
            </button>

            <div
              className={"stack-marquee-row " + (index % 2 ? "to-right" : "to-left")}
              style={{ "--dur": `${duration}s` } as CSSProperties}
            >
              <ul className="stack-marquee-track" aria-label={lane.label}>
                {track.map((item, i) => (
                  <li
                    className="stack-tech"
                    key={`${item.name}-${i}`}
                    aria-hidden={i >= half.length ? true : undefined}
                  >
                    <Logo item={item} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
