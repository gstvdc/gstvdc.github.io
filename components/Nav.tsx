"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { useI18n } from "@/lib/i18n";

const LINKS = [
  { id: "hero", key: "home", icon: "bi-house" },
  { id: "about", key: "about", icon: "bi-person" },
  { id: "projects", key: "projects", icon: "bi-briefcase" },
  { id: "skills", key: "stack", icon: "bi-code-square" },
  { id: "resume", key: "experience", icon: "bi-file-earmark-text" },
  { id: "contact", key: "contact", icon: "bi-envelope" },
] as const;

// Every page section and the sidebar link that owns it. "Diferenciais" belongs to
// Experience, and the footer to Contact, so the highlight never falls back to Home.
const SECTIONS: { id: string; link: string }[] = [
  ...LINKS.map(({ id }) => ({ id, link: id })),
  { id: "resume-extra", link: "resume" },
  { id: "footer", link: "contact" },
];

export default function Nav() {
  const { t } = useI18n();
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function update() {
      const about = document.getElementById("about");
      if (about) {
        setVisible(window.scrollY > about.offsetTop + about.offsetHeight * 0.4);
      }
      setShowTop(window.scrollY > 100);

      const mid = window.innerHeight * 0.5;
      // Between two sections (pinned or sliding areas) nothing matches: keep the last one.
      let current: string | null = null;
      for (const { id, link } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) current = link;
      }
      if (current) setActive(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <nav
        id="navmenu"
        className={"navmenu-vertical" + (visible ? " nav-visible" : "")}
      >
        <ul>
          {LINKS.map(({ id, key, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={t.nav[key]}
                className={active === id ? "active" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget(`#${id}`);
                }}
              >
                <i className={`bi ${icon}`}></i>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="#hero"
        className={"scroll-top d-flex align-items-center justify-content-center" + (showTop ? " active" : "")}
        aria-label={t.nav.top}
        onClick={(event) => {
          event.preventDefault();
          scrollToTarget(0);
        }}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}
