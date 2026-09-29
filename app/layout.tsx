import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "lenis/dist/lenis.css";
import "@/styles/variables.css";
import "@/styles/base.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/signature.css";
import "@/styles/bio.css";
import "@/styles/about.css";
import "@/styles/projects.css";
import "@/styles/skills.css";
import "@/styles/resume.css";
import "@/styles/timeline.css";
import "@/styles/differentials.css";
import "@/styles/contact.css";
import "@/styles/footer.css";
import "@/styles/theme.css";
import "@/styles/motion.css";
import Effects from "@/components/Effects";

export const metadata: Metadata = {
  title: "Portfólio | Gustavo Constante",
  description:
    "Portfólio de Gustavo Constante, desenvolvedor full stack com experiência em SvelteKit, Laravel, Angular, NestJS, React e sistemas corporativos.",
  keywords: [
    "Gustavo Constante",
    "Desenvolvedor Full Stack",
    "SvelteKit",
    "Laravel",
    "Angular",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "Portfólio",
  ],
  icons: { icon: "/img/logo_favicon.png", apple: "/img/logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@400;600;700;800&family=Fraunces:ital@1&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js-motion');history.scrollRestoration='manual';",
          }}
        />
      </head>
      <body className="index-page">
        <Effects />
        {children}
      </body>
    </html>
  );
}
