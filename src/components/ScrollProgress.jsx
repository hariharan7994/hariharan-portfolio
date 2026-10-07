import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [section, setSection] = useState("");

  // GSAP ScrollTrigger for the top progress bar
  useEffect(() => {
    if (!barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    // Show/hide based on scroll position
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.15);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const observers = sections.map(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setSection(label);
        },
        { threshold: 0.45 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      {/* Thin glowing top bar */}
      <div
        ref={barRef}
        style={{
          transform: "translate3d(0,0,0) scaleX(0)",
          transformOrigin: "0%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 200,
          background:
            "linear-gradient(90deg, var(--accent), var(--accent2))",
          boxShadow: "0 0 8px var(--accent)",
          willChange: "transform",
        }}
      />

      {/* Minimal right-side dots */}
      <nav
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {sections.map(({ id, label }) => {
          const active = section === label;
          return (
            <button
              key={id}
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              title={label}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: active ? "20px" : "6px",
                  height: "6px",
                  borderRadius: active ? "3px" : "50%",
                  background: active
                    ? "var(--accent)"
                    : "var(--muted)",
                  boxShadow: active
                    ? "0 0 6px var(--accent)"
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* Back to top — bottom right, minimal */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "20px",
          zIndex: 100,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          fontSize: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translate3d(0,0,0) scale(1)"
            : "translate3d(0,0,0) scale(0.8)",
          transition: "all 0.3s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = "0 0 16px var(--shadow)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.2)";
        }}
        title="Back to top"
      >
        ↑
      </button>
    </>
  );
}