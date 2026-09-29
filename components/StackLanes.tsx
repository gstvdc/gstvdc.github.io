"use client";

import type { CSSProperties } from "react";
import type { StationId } from "@/components/ui/stack-machine-3d";
import { useI18n } from "@/lib/i18n";
import { TechLink, TechLogo } from "@/lib/techIcons";

type Lane = {
  id: StationId;
  items: string[];
};

// Same order as the machine: requirement → back-end → data → front-end → infra.
// Names are keys of the TECH catalog (lib/techIcons).
const LANES: Lane[] = [
  { id: "cabinet", items: ["Scrum", "Figma", "UI/UX", "Swagger", "Notion"] },
  {
    id: "engine",
    items: [
      "Laravel",
      "NestJS",
      "Node.js",
      "Express",
      "PHP",
      "Java",
      "Python",
      "C++",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "Claude",
      "Gemini",
      "Ollama",
      "n8n",
      "JWT",
    ],
  },
  {
    id: "admin",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "REST APIs", "integrations", "validations"],
  },
  {
    id: "storefront",
    items: [
      "SvelteKit",
      "Angular",
      "React",
      "Next.js",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Reactive Forms",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    id: "cashdesk",
    items: ["Git", "GitHub", "GitLab", "Docker", "Nginx", "Postman", "Vercel"],
  },
];

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
  const { t } = useI18n();
  const itemName = (name: string) =>
    (t.skills.items as Record<string, string>)[name] ?? name;

  return (
    <div className="stack-lanes" {...(reveal ? { "data-reveal": true } : {})}>
      <span className="stack-lanes-title">{t.skills.lanesTitle}</span>

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
              <strong>{t.skills.lanes[lane.id].label}</strong>
              <span className="stack-lane-text">{t.skills.lanes[lane.id].text}</span>
            </button>

            <div
              className={"stack-marquee-row " + (index % 2 ? "to-right" : "to-left")}
              style={{ "--dur": `${duration}s` } as CSSProperties}
            >
              <ul className="stack-marquee-track" aria-label={t.skills.lanes[lane.id].label}>
                {track.map((item, i) => (
                  <li
                    className="stack-tech"
                    key={`${item}-${i}`}
                    aria-hidden={i >= half.length ? true : undefined}
                  >
                    <TechLink name={item} hidden={i >= half.length}>
                      <TechLogo name={item} />
                      <span>{itemName(item)}</span>
                    </TechLink>
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
