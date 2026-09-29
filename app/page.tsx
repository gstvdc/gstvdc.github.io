import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HorizontalSwap from "@/components/HorizontalSwap";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="main">
        <Hero />
        <About />
        <HorizontalSwap
          front={<Projects />}
          next={<Skills />}
        />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
