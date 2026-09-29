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
import "@/styles/lang.css";
import Effects from "@/components/Effects";
import LangSwitch from "@/components/LangSwitch";
import { I18nProvider } from "@/lib/i18n";

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
  authors: [{ name: "Gustavo Constante", url: "https://gstvdc.github.io" }],
  metadataBase: new URL("https://gstvdc.github.io"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://gstvdc.github.io",
    siteName: "Gustavo Constante",
    title: "Portfólio | Gustavo Constante",
    description:
      "Portfólio de Gustavo Constante, desenvolvedor full stack com experiência em SvelteKit, Laravel, Angular, NestJS, React e sistemas corporativos.",
    images: [{ url: "/img/profile/profile-6.jpg", width: 1100, height: 825 }],
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Gustavo Constante",
    description:
      "Full stack developer: SvelteKit, Laravel, Angular, NestJS, React and enterprise systems.",
    images: ["/img/profile/profile-6.jpg"],
  },
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
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@400;600;700;800&family=Fraunces:ital@1&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js-motion');history.scrollRestoration='manual';",
          }}
        />
      </head>
      <body className="index-page">
        <I18nProvider>
          <Effects />
          <LangSwitch />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
