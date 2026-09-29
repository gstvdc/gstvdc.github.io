"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/scroll";

const LINKS = [
  { id: "hero", label: "Início", icon: "bi-house" },
  { id: "about", label: "Sobre", icon: "bi-person" },
  { id: "projects", label: "Projetos", icon: "bi-briefcase" },
  { id: "skills", label: "Stack", icon: "bi-code-square" },
  { id: "resume", label: "Experiência", icon: "bi-file-earmark-text" },
  { id: "contact", label: "Contato", icon: "bi-envelope" },
];

export default function Nav() {
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
      let current = "hero";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) current = id;
      }
      setActive(current);
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
          {LINKS.map(({ id, label, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
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
        aria-label="Voltar ao topo"
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
