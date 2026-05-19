import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import Stars from "./canvas/Stars";
import FloatingCube from "./canvas/FloatingCube";
import hariharanImg from "../assets/hari.jpeg";

export default function Hero() {
  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "80px" }}>
      <Stars />

      {/* Gradient blobs */}
      <div style={{ position: "absolute", top: "25%", left: "15%", width: "400px", height: "400px", background: "var(--accent)", opacity: 0.04, borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "15%", width: "350px", height: "350px", background: "var(--accent2)", opacity: 0.05, borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-6 py-16 w-full flex flex-col lg:flex-row items-center gap-12 relative z-10">

        {/* Left — Text */}
        <div className="flex-1 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: "var(--accent)", fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}
          >
            Full Stack Developer · 3+ Years
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1, marginBottom: "16px", color: "var(--text)" }}
          >
            Hariharan<br />
            <span style={{ color: "var(--accent)" }}></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "480px", marginBottom: "28px", lineHeight: 1.7 }}
          >
            Building scalable web apps with{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>Python Django</span> &amp;{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>React</span>.
            From healthcare platforms to face-recognition systems.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: "16px", marginBottom: "28px" }}
          >
            {[
              { icon: <FaGithub size={20} />, href: "https://github.com/", label: "GitHub" },
              { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/hariharan-s-794064277", label: "LinkedIn" },
              { icon: <FaEnvelope size={20} />, href: "mailto:hariharan66461@gmail.com", label: "Email" },
              { icon: <FaPhone size={20} />, href: "tel:+917994052636", label: "Phone" },
            ].map((s) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                style={{ color: "var(--muted)", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "12px 24px", background: "var(--accent)", color: "#000", fontWeight: 600, borderRadius: "9999px", fontSize: "0.875rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              View Projects →
            </motion.a>
            <motion.a href="#resume" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "12px 24px", border: "1px solid var(--accent)", color: "var(--accent)", borderRadius: "9999px", fontSize: "0.875rem", textDecoration: "none", background: "transparent", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Center — Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          style={{ position: "relative", flexShrink: 0, order: 1 }}
          className="lg:order-2"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: "-12px", borderRadius: "50%", border: "2px dashed var(--accent)", opacity: 0.35 }}
          />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: "-24px", borderRadius: "50%", border: "1px solid var(--accent2)", opacity: 0.2 }}
          />

          <div style={{ width: "220px", height: "220px", borderRadius: "50%", overflow: "hidden", border: "3px solid var(--accent)", boxShadow: "0 0 60px var(--shadow)", position: "relative", zIndex: 10 }}
            className="lg:w-72 lg:h-72"
          >
            <img src={hariharanImg} alt="Hariharan S" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Badges */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
            style={{ position: "absolute", bottom: "-16px", right: "-16px", background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: "16px", padding: "10px 14px", zIndex: 20, boxShadow: "0 8px 24px var(--shadow)" }}
          >
            <p style={{ color: "var(--muted)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Experience</p>
            <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Space Grotesk', sans-serif" }}>3+ Years</p>
          </motion.div>

          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}
            style={{ position: "absolute", top: "-16px", left: "-16px", background: "var(--surface)", border: "1px solid var(--accent2)", borderRadius: "16px", padding: "10px 14px", zIndex: 20, boxShadow: "0 8px 24px var(--shadow2)" }}
          >
            <p style={{ color: "var(--muted)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Projects</p>
            <p style={{ color: "var(--accent2)", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Space Grotesk', sans-serif" }}>10+</p>
          </motion.div>
        </motion.div>

        {/* Right — 3D Globe */}
        <div className="flex-1 order-3 hidden lg:block" style={{ height: "460px" }}>
          <FloatingCube />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 10 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
        <p style={{ color: "var(--muted)", fontSize: "0.7rem", fontFamily: "monospace" }}>scroll</p>
      </div>
    </section>
  );
}