import { motion } from "framer-motion";
import { FaHospital, FaDumbbell, FaTag } from "react-icons/fa";

const projects = [
  {
    name: "Qliq Care",
    description: "Healthcare caregiver booking platform with real-time location tracking, FCM push notifications, payment gateway integration, and React admin dashboard.",
    tags: ["Django", "React", "PostgreSQL", "FCM", "Google Maps", "Payment Gateway"],
    color: "#00f5d4",
    icon: <FaHospital size={28} />,
    type: "Service-Based",
    role: "Full Stack Developer (Team Lead)",
  },
  {
    name: "Gym Management System",
    description: "Face-recognition attendance system using OpenCV/DeepFace. Includes member management, fee tracking, overdue alerts, and analytics dashboard.",
    tags: ["Django", "React", "OpenCV", "DeepFace", "PostgreSQL", "Bootstrap"],
    color: "#7b5ea7",
    icon: <FaDumbbell size={28} />,
    type: "Product-Based",
    role: "Project Manager & Full Stack Developer",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "96px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>What I've Built</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            Key <span style={{ color: "var(--accent)" }}>Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
              whileHover={{ y: -8 }}
              style={{ background: "var(--surface)", borderRadius: "24px", padding: "36px", border: "1px solid var(--border)", position: "relative", overflow: "hidden", transition: "border-color 0.3s, box-shadow 0.3s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "50"; e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Glow blob */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "160px", height: "160px", background: p.color, opacity: 0.06, filter: "blur(50px)", borderRadius: "50%", pointerEvents: "none" }} />

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: p.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: p.color, flexShrink: 0 }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: p.color, marginBottom: "4px" }}>{p.name}</h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: "9999px", background: p.color + "15", color: p.color, fontWeight: 500 }}>{p.type}</span>
                    <span style={{ fontSize: "0.7rem", padding: "2px 10px", borderRadius: "9999px", background: "var(--surface2)", color: "var(--muted)" }}>{p.role}</span>
                  </div>
                </div>
              </div>

              <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "24px", fontSize: "0.9rem" }}>{p.description}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {p.tags.map(tag => (
                  <span key={tag}
                    style={{ padding: "4px 12px", fontSize: "0.72rem", fontFamily: "monospace", borderRadius: "9999px", border: `1px solid ${p.color}35`, color: p.color, background: p.color + "08" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}