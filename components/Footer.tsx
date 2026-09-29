"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/scroll";

const EMAIL = "gustavo.cunha.constante@gmail.com";
const GITHUB = "https://github.com/gstvdc";
const LINKEDIN = "https://www.linkedin.com/in/gstvdc";
const INSTAGRAM = "https://www.instagram.com/gstvdc";

const SOCIALS = [
  { icon: "bi-envelope", href: `mailto:${EMAIL}`, label: "Email" },
  { icon: "bi-github", href: GITHUB, label: "GitHub" },
  { icon: "bi-linkedin", href: LINKEDIN, label: "LinkedIn" },
  { icon: "bi-instagram", href: INSTAGRAM, label: "Instagram" },
];

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  // Three links per column, like a sitemap.
  const columns: { label: string; href: string; external?: boolean }[][] = [
    [
      { label: t.nav.home, href: "#hero" },
      { label: t.nav.about, href: "#about" },
      { label: t.nav.projects, href: "#projects" },
    ],
    [
      { label: t.nav.stack, href: "#skills" },
      { label: t.nav.experience, href: "#resume" },
      { label: t.nav.contact, href: "#contact" },
    ],
    [
      { label: "GitHub", href: GITHUB, external: true },
      { label: "LinkedIn", href: LINKEDIN, external: true },
      { label: "Instagram", href: INSTAGRAM, external: true },
    ],
    [
      { label: t.resume.cv, href: "/docs/gustavo-constante.pdf", external: true },
      { label: t.contact.sendEmail, href: `mailto:${EMAIL}` },
      { label: t.projects.allRepos, href: `${GITHUB}?tab=repositories`, external: true },
    ],
  ];

  return (
    <footer id="footer" className="footer">
      <div className="ft-wrap">
        <div className="ft-brand">
          <a
            href="#hero"
            className="ft-logo"
            aria-label="Gustavo Constante"
            onClick={(event) => {
              event.preventDefault();
              scrollToTarget(0);
            }}
          >
            <Image src="/img/logo.png" alt="" width={44} height={44} />
          </a>
          <p>{f.bio}</p>
        </div>

        <div className="ft-rule" aria-hidden="true"></div>

        <nav className="ft-cols" aria-label="Footer">
          {columns.map((links, i) => (
            <ul key={i}>
              {links.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    onClick={
                      href.startsWith("#")
                        ? (event) => {
                            event.preventDefault();
                            scrollToTarget(href);
                          }
                        : undefined
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="ft-rule" aria-hidden="true"></div>

        <div className="ft-bottom">
          <p className="ft-copy">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            <strong>Gustavo Constante</strong> · {f.role}
          </p>
          <div className="ft-social">
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label === "Email" ? f.emailAria : label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <i className={`bi ${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
