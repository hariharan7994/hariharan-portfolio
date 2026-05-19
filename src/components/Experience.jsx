import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const experience = [
  {
    title: "Full Stack Developer (Team Lead)",
    company: "Techfifo Innovations LLP",
    location: "Palakkad, Kerala",
    period: "March 2023 – Present",
    points: [
      "Led full stack development for 2 major client projects (React + Django).",
      "Built RESTful APIs using Django REST Framework for mobile and web clients.",
      "Implemented JWT auth, RBAC, FCM notifications, and payment integrations.",
      "Conducted code reviews and mentored junior developers in Agile sprints.",
      "Managed PostgreSQL/MySQL with schema design and query optimization.",
      "Deployed applications on cloud servers and managed production environments.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "96px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Career</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            Work <span style={{ color: "var(--accent)" }}>Experience</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: "24px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, var(--accent), transparent)" }} />

          {experience.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
              style={{ position: "relative", paddingLeft: "72px", paddingBottom: "48px" }}
            >
              {/* Dot */}
              <div style={{ position: "absolute", left: 0, top: 0, width: "48px", height: "48px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px var(--shadow)" }}>
                <FaBriefcase style={{ color: "#000", fontSize: "16px" }} />
              </div>

              <div
                style={{ background: "var(--surface)", borderRadius: "24px", padding: "32px", border: "1px solid var(--border)", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)", marginBottom: "4px" }}>{exp.title}</h3>
                <p style={{ color: "var(--accent)", fontWeight: 600, marginBottom: "14px", fontSize: "0.95rem" }}>{exp.company}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "0.82rem" }}>
                    <FaMapMarkerAlt style={{ color: "var(--accent)" }} /> {exp.location}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "0.82rem" }}>
                    <FaCalendarAlt style={{ color: "var(--accent)" }} /> {exp.period}
                  </span>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {exp.points.map((point, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                      <FaCheckCircle style={{ color: "var(--accent)", marginTop: "3px", flexShrink: 0 }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}