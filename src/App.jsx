import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import IntroScene from "./components/canvas/IntroScene";

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {/* Intro Animation */}
      {!introFinished && (
        <IntroScene
          onFinish={() => setIntroFinished(true)}
        />
      )}

      {/* Main Portfolio */}
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          overflowX: "hidden",
          opacity: introFinished ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </>
  );
}