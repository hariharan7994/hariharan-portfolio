import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StackSpreadDemo from "./components/ui/demo";

import ScrollProgress from "./components/ScrollProgress";
import SectionReveal from "./components/SectionReveal";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <SmoothScroll>
          <ScrollProgress />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Navbar />
            <Hero />
            <SectionReveal>
              <About />
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Skills />
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Projects />
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Experience />
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Resume />
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <Contact />
            </SectionReveal>
            <Footer />
          </div>
        </SmoothScroll>
      </main>
    </>
  );
}