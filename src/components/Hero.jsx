import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import Stars from "./canvas/Stars";
import FloatingCube from "./canvas/FloatingCube";
import hariharanImg from "../assets/hari.jpeg"; // ← uncomment when you add your photo

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">
      <Stars />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent2)] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 w-full py-16">

        {/* Left — Text */}
        <div className="flex-1 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-[var(--accent)] text-sm font-mono tracking-widest uppercase mb-3"
          >
            Full Stack Developer · 3+ Years
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-5xl lg:text-7xl font-bold font-display leading-tight mb-4"
          >
            HARIHARAN<br />
            <span className="text-[var(--accent)]"></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-[var(--muted)] text-lg max-w-lg mb-8 leading-relaxed"
          >
            Building scalable web apps with{" "}
            <span className="text-white font-medium">Python Django</span> &amp;{" "}
            <span className="text-white font-medium">React</span>. From healthcare platforms to face-recognition systems.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex gap-4 mb-8"
          >
            {[
              { icon: <FaGithub />, href: "https://github.com/", label: "GitHub" },
              { icon: <FaLinkedin />, href: "https://linkedin.com/in/hariharan-s-794064277", label: "LinkedIn" },
              { icon: <FaEnvelope />, href: "mailto:hariharan66461@gmail.com", label: "Email" },
              { icon: <FaPhone />, href: "tel:+917994052636", label: "Phone" },
            ].map((s) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.2, color: "#00f5d4" }}
                className="text-[var(--muted)] text-xl hover:text-[var(--accent)] transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex gap-4 flex-wrap"
          >
            <a href="#projects"
              className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-full hover:scale-105 transition-transform text-sm">
              View Projects →
            </a>
            <a href="#resume"
              className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-black transition-all text-sm">
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Center — Your Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="order-1 lg:order-2 relative flex-shrink-0"
        >
          {/* Rotating ring behind photo */}
          <motion.div
            animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--accent)] opacity-40 scale-110"
          />
          <motion.div
            animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-[var(--accent2)] opacity-30 scale-125"
          />

          {/* Photo container */}
          <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-[var(--accent)] shadow-[0_0_60px_rgba(0,245,212,0.3)] relative z-10">
            {/* Replace this div with your actual image below */}
            <img src={hariharanImg} alt="Hariharan S" className="w-full h-full object-cover" />

            {/* Placeholder — remove when you add your photo */}
            <div className="w-full h-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center">
              <span className="text-8xl font-bold font-display text-black">H</span>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-4 -right-4 bg-[var(--surface)] border border-[var(--accent)] rounded-2xl px-4 py-2 z-20"
          >
            <p className="text-xs text-[var(--muted)]">Experience</p>
            <p className="text-[var(--accent)] font-bold font-display text-lg">3+ Years</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -left-4 bg-[var(--surface)] border border-[var(--accent2)] rounded-2xl px-4 py-2 z-20"
          >
            <p className="text-xs text-[var(--muted)]">Projects</p>
            <p className="text-[var(--accent2)] font-bold font-display text-lg">10+</p>
          </motion.div>
        </motion.div>

        {/* Right — 3D Object */}
        <div className="flex-1 h-64 lg:h-[450px] w-full order-3 hidden lg:block">
          <FloatingCube />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
        <p className="text-xs text-[var(--muted)] font-mono">scroll</p>
      </div>
    </section>
  );
}