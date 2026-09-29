"use client";

import { useState, type FormEvent } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Split from "@/components/ui/Split";

export default function Contact() {
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

  return (
    <section id="contact" className="contact section">
        <div className="section-watermark" aria-hidden="true">CONTATO</div>
        <SectionTitle eyebrow="// VAMOS CONVERSAR" title="Contato" text="Se fizer sentido para sua equipe ou projeto, podemos conversar por e-mail, LinkedIn ou GitHub." />

        <div className="container" data-reveal>
          <div className="row align-items-stretch gy-4">
            <div className="col-lg-7">
              <div className="contact-form-container">
                <div className="form-intro">
                  <span className="contact-kicker">// VAMOS CONVERSAR</span>
                  <Split as="h2" text="Aberto a oportunidades em desenvolvimento" />
                  <p>
                    Use o formulário para entrar em contato sobre vagas,
                    projetos, freelas ou networking profissional.
                  </p>
                </div>

                <form className="contact-form" onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-field">
                        <input
                          type="text"
                          name="name"
                          className="form-input"
                          id="userName"
                          placeholder="Seu nome"
                          required
                        />
                        <label htmlFor="userName" className="field-label">Nome</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-field">
                        <input
                          type="email"
                          className="form-input"
                          name="email"
                          id="userEmail"
                          placeholder="Seu email"
                          required
                        />
                        <label htmlFor="userEmail" className="field-label">Email</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <input
                      type="text"
                      className="form-input"
                      name="subject"
                      id="messageSubject"
                      placeholder="Assunto"
                      required
                    />
                    <label htmlFor="messageSubject" className="field-label"
                      >Assunto</label
                    >
                  </div>

                  <div className="form-field message-field">
                    <textarea
                      className="form-input message-input"
                      name="message"
                      id="userMessage"
                      rows={5}
                      placeholder="Sua mensagem"
                      required
                    ></textarea>
                    <label htmlFor="userMessage" className="field-label"
                      >Mensagem</label
                    >
                  </div>

                  <div className="my-3">
                    <div className={"loading" + (status === "sending" ? " d-block" : "")}>Enviando</div>
                    <div className={"error-message" + (status === "error" ? " d-block" : "")}>Não foi possível enviar agora. Tente novamente ou use o e-mail.</div>
                    <div className={"sent-message" + (status === "sent" ? " d-block" : "")}>Sua mensagem foi enviada. Obrigado.</div>
                  </div>

                  <button type="submit" className="send-button" disabled={status === "sending"}>
                    Enviar mensagem
                    <span className="button-arrow">→</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <aside className="contact-sidebar" data-reveal>
                <div className="contact-header">
                  <span className="sidebar-badge">// CONTATO DIRETO</span>
                  <h3>Formas rápidas de falar comigo</h3>
                  <p>
                    Prefere ir direto ao ponto? Estes são os canais mais
                    rápidos.
                  </p>
                </div>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="contact-details">
                      <span className="method-label">Localização</span>
                      <p>Sombrio/SC · Brasil</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <span className="method-label">Email</span>
                      <p>
                        <a href="mailto:gustavo.cunha.constante@gmail.com">
                          gustavo.cunha.constante@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                </div>

                <div className="contact-quick-links">
                  <a
                    href="mailto:gustavo.cunha.constante@gmail.com"
                    className="quick-link"
                  >
                    <span>Enviar e-mail</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gstvdc"
                    target="_blank"
                    rel="noreferrer"
                    className="quick-link"
                  >
                    <span>LinkedIn</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                  <a
                    href="https://github.com/gstvdc"
                    target="_blank"
                    rel="noreferrer"
                    className="quick-link"
                  >
                    <span>GitHub</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
  );
}
