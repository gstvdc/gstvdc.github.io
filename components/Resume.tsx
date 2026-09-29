"use client";

import Timeline, { type TimelineItem } from "@/components/ui/timeline";
import SectionTitle from "@/components/ui/SectionTitle";
import { SplineScene } from "@/components/ui/splite";
import { useI18n } from "@/lib/i18n";
import { useStillLayout } from "@/lib/motion";
import { TechLink, TechLogo } from "@/lib/techIcons";

// Career and education in order. Even positions sit above the line, odd ones below.
const ITEM_IDS = [
  "pip-2023",
  "unesc-2024",
  "hsports-2024",
  "emasel-2024",
  "simples-2025",
  "procer-2025",
  "cia-2026",
];

// Titles come from the dictionary (`resume.groups`), by position.
const GROUPS = [
  {
    tags: ["SvelteKit", "Laravel", "TypeScript", "MySQL", "Nginx", "Git", "PHP"],
  },
  {
    tags: [
      "Angular",
      "NestJS",
      "React",
      "Next.js",
      "shadcn/ui",
      "Node.js",
      "Express",
      "REST APIs",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "Supabase",
      "Java",
      "Python",
      "C++",
    ],
  },
  {
    tags: [
      "UI/UX",
      "Figma",
      "Scrum",
      "Notion",
      "Postman",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "Claude",
      "Gemini",
      "Ollama",
      "n8n",
      "@english",
      "@spanish",
    ],
  },
];

// First card of the timeline: the portrait with a short caption on top of it.
function PortraitCard() {
  const { t } = useI18n();
  return (
    <div className="tl-portrait">
      <img src="/img/profile/profile-6.jpg" alt="Gustavo Constante" draggable={false} loading="lazy" decoding="async" />
      <div className="tl-portrait-caption">
        <span className="tl-portrait-eyebrow">// GUSTAVO CONSTANTE</span>
        <strong>{t.resume.portraitCaption}</strong>
      </div>
    </div>
  );
}

export default function Resume() {
  const { lang, t } = useI18n();
  // Touch, narrow and reduced-motion layouts get the timeline as a plain vertical list.
  const vertical = useStillLayout();
  const r = t.resume;
  const items: TimelineItem[] = ITEM_IDS.map((id) => ({ id, ...r.items[id] }));
  // Chips show only the logo; the name stays as tooltip and accessible label.
  const tag = (name: string) =>
    name === "@english" ? r.english : name === "@spanish" ? r.spanish : name;
  const chip = (name: string, hidden: boolean) =>
    name === "@english" ? (
      <span className="dif-mrow-code">EN</span>
    ) : name === "@spanish" ? (
      <span className="dif-mrow-code">ES</span>
    ) : (
      <TechLink name={name} hidden={hidden}>
        <TechLogo name={name} size={28} />
      </TechLink>
    );

  return (
    <>
      {/* Remounted per language and layout: the timeline splits its text into animated lines. */}
      <Timeline
        key={`${lang}-${vertical}`}
        vertical={vertical}
        items={items}
        title={r.timelineTitle}
        periodLabel="2023 — 2026"
        lead={<PortraitCard />}
        cvHref="/docs/gustavo-constante.pdf"
        cvLabel={r.cv}
      />

      <section id="resume-extra" className="resume section dif-section">
        <div className="section-watermark" aria-hidden="true">
          {r.watermark}
        </div>
        <SectionTitle
          eyebrow={r.eyebrow}
          title={r.title}
          text={r.text}
        />

        <div className="container dif-wrap" data-reveal>
          <div className="dif-stage">
            <div className="dif-left">
              <span className="dif-tag">{r.difTag}</span>
              <ol className="dif-list">
                {r.differentials.map((d, i) => (
                  <li className="dif-item" key={i}>
                    <span className="dif-item-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="dif-robot" aria-hidden="true">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="dif-robot-scene"
              />
            </div>
          </div>

          <div className="dif-marquees">
            {GROUPS.map((group, i) => {
              const title = r.groups[i];
              const tags = group.tags;
              const half = tags.length < 8 ? [...tags, ...tags] : tags;
              const track = [...half, ...half];
              return (
                <div className="dif-mrow" key={i}>
                  <span className="dif-mrow-title">{title}</span>
                  <div className={"dif-mrow-view " + (i % 2 ? "to-right" : "to-left")}>
                    <ul className="dif-mrow-track" aria-label={title}>
                      {track.map((name, k) => (
                        <li
                          className="dif-mrow-chip"
                          key={`${name}-${k}`}
                          title={tag(name)}
                          aria-label={tag(name)}
                          aria-hidden={k >= half.length ? true : undefined}
                        >
                          {chip(name, k >= half.length)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
