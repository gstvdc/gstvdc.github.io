import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HorizontalSwap from "@/components/HorizontalSwap";
import { fetchProjectMeta } from "@/lib/github";

export default async function Home() {
  const projectMeta = await fetchProjectMeta();

  return (
    <>
      <Nav />
      <main id="main" className="main">
        <Hero />
        <About />
        <HorizontalSwap
          front={<Projects meta={projectMeta} />}
          next={<Skills />}
        />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
