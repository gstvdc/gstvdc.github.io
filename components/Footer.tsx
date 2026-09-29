
export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <p className="footer-tagline">
          Código com propósito. Entrega com consistência.
        </p>
        <div className="copyright text-center">
          <p>
            © <strong className="px-1 sitename">Gustavo Constante</strong>
            <span
              >Desenvolvedor Full Stack · SvelteKit, Laravel, Angular e
              React.</span
            >
          </p>
        </div>
        <div className="social-links d-flex justify-content-center">
          <a
            href="https://www.linkedin.com/in/gstvdc"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://github.com/gstvdc"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="mailto:gustavo.cunha.constante@gmail.com"
            aria-label="Enviar email"
          >
            <i className="bi bi-envelope"></i>
          </a>
        </div>
        <div className="credits">
          Construído para destacar experiência, projetos e stack atual.
        </div>
      </div>
    </footer>
  );
}
