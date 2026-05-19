import { motion } from "framer-motion";
import { FaCode, FaServer, FaBrain, FaUsers } from "react-icons/fa";
import WaveGrid from "./canvas/WaveGrid";

const cards = [
  { icon: <FaServer size={22} />, title: "Backend Expert", desc: "Python Django & DRF — REST APIs, JWT auth, RBAC, PostgreSQL optimization." },
  { icon: <FaCode size={22} />, title: "Frontend Dev", desc: "React.js, Redux, Tailwind — responsive UIs and admin dashboards." },
  { icon: <FaBrain size={22} />, title: "AI Integration", desc: "OpenCV & DeepFace for real-world face recognition systems." },
  { icon: <FaUsers size={22} />, title: "Team Leader", desc: "Led teams in Agile sprints, code reviews, and client delivery." },
];

export default function About() {
  return (
    <section id="about" style={{ position: "relative", padding: "96px 0", overflow: "hidden" }}>
      {/* Wave grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
        <WaveGrid />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Who I Am</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            About <span style={{ color: "var(--accent)" }}>Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {[
              <>I'm a <span style={{ color: "var(--text)", fontWeight: 500 }}>Full Stack Developer</span> with 3+ years of professional experience building scalable web applications, REST APIs, and modern frontend interfaces based in <span style={{ color: "var(--accent)" }}>Palakkad, Kerala</span>.</>,
              <>I specialize in <span style={{ color: "var(--text)", fontWeight: 500 }}>Python Django</span> backend and <span style={{ color: "var(--text)", fontWeight: 500 }}>React</span> frontend development, delivering complete end-to-end solutions for real users — from a healthcare caregiver platform to a face-recognition gym system.</>,
              <>Experienced in team leadership, Agile workflows, and integrating payment gateways, Google Maps, and Firebase.</>,
            ].map((text, i) => (
              <p key={i} style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "16px" }}>{text}</p>
            ))}

            {/* Stats row */}
            <div style={{ display: "flex", gap: "32px", marginTop: "32px", flexWrap: "wrap" }}>
              {[
                { num: "3+", label: "Years Experience" },
                { num: "10+", label: "Projects Delivered" },
                { num: "2", label: "Major Products" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--accent)" }}>{stat.num}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{ background: "var(--surface)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border)", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ color: "var(--accent)", marginBottom: "12px" }}>{card.icon}</div>
                <h3 style={{ fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "8px", color: "var(--text)", fontSize: "0.95rem" }}>{card.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.6 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}