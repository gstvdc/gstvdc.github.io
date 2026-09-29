"use client";

import { useState, type FormEvent } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Split from "@/components/ui/Split";
import Globe from "@/components/ui/Globe";
import { useI18n } from "@/lib/i18n";

const EMAIL = "gustavo.cunha.constante@gmail.com";

export default function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xblkwlra", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const links = [
    { icon: "bi-envelope", label: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: "bi-linkedin",
      label: "linkedin.com/in/gstvdc",
      href: "https://www.linkedin.com/in/gstvdc",
    },
    { icon: "bi-github", label: "github.com/gstvdc", href: "https://github.com/gstvdc" },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="section-watermark" aria-hidden="true">
        {c.watermark}
      </div>
      <SectionTitle eyebrow={c.eyebrow} title={c.title} text={c.text} />

      <div className="container">
        <div className="ct-grid">
          <div className="ct-info" data-reveal>
            <div className="ct-info-head">
              <span className="ct-kicker">{c.sideBadge}</span>
              <h3>{c.sideTitle}</h3>
              <p>
                {c.sideText} {c.reply}
              </p>
            </div>

            <ul className="ct-links">
              {links.map(({ icon, label, href }) => (
                <li key={href}>
                  <a
                    className="ct-link"
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <span className="ct-link-icon">
                      <i className={`bi ${icon}`}></i>
                    </span>
                    <span className="ct-link-label">{label}</span>
                    <i className="bi bi-arrow-up-right ct-link-arrow"></i>
                  </a>
                </li>
              ))}
              <li>
                <div className="ct-link is-static">
                  <span className="ct-link-icon">
                    <i className="bi bi-geo-alt"></i>
                  </span>
                  <span className="ct-link-label">{c.locationValue}</span>
                </div>
              </li>
            </ul>

            <Globe className="ct-globe" label={c.globeLabel} />
          </div>

          <div className="ct-card" data-reveal>
            <div className="ct-card-head">
              <Split as="h3" text={c.formTitle} />
              <p>{c.formText}</p>
            </div>

            <div className="ct-dots" aria-hidden="true"></div>

            <form className="ct-form" onSubmit={onSubmit}>
              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="userName">{c.name}</label>
                  <input
                    type="text"
                    name="name"
                    id="userName"
                    autoComplete="name"
                    placeholder={c.namePlaceholder}
                    required
                  />
                </div>
                <div className="ct-field">
                  <label htmlFor="userEmail">{c.email}</label>
                  <input
                    type="email"
                    name="email"
                    id="userEmail"
                    autoComplete="email"
                    placeholder={c.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              <div className="ct-field">
                <label htmlFor="messageSubject">{c.subject}</label>
                <input
                  type="text"
                  name="subject"
                  id="messageSubject"
                  placeholder={c.subject}
                  required
                />
              </div>

              <div className="ct-field">
                <label htmlFor="userMessage">{c.message}</label>
                <textarea
                  name="message"
                  id="userMessage"
                  rows={5}
                  placeholder={c.messagePlaceholder}
                  required
                ></textarea>
              </div>

              <div className="ct-status" role="status" aria-live="polite">
                {status === "sending" && <span className="is-sending">{c.sending}</span>}
                {status === "error" && <span className="is-error">{c.error}</span>}
                {status === "sent" && <span className="is-sent">{c.sent}</span>}
              </div>

              <button type="submit" className="ct-submit" disabled={status === "sending"}>
                {c.submit}
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
