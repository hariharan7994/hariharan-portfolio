import { useState } from "react";
import { motion } from "framer-motion";
import { SiPython, SiDjango, SiReact, SiJavascript, SiPostgresql, SiDocker, SiOpencv, SiFirebase, SiRedux, SiTailwindcss, SiGit } from "react-icons/si";
import { FaServer } from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython />, level: 90, category: "Backend", color: "#3776AB" },
  { name: "Django / DRF", icon: <SiDjango />, level: 90, category: "Backend", color: "#44B78B" },
  { name: "React.js", icon: <SiReact />, level: 85, category: "Frontend", color: "#61DAFB" },
  { name: "JavaScript", icon: <SiJavascript />, level: 85, category: "Frontend", color: "#F7DF1E" },
  { name: "PostgreSQL", icon: <SiPostgresql />, level: 80, category: "Database", color: "#336791" },
  { name: "Docker", icon: <SiDocker />, level: 65, category: "DevOps", color: "#2496ED" },
  { name: "OpenCV / DeepFace", icon: <SiOpencv />, level: 70, category: "AI/ML", color: "#5C3EE8" },
  { name: "Firebase FCM", icon: <SiFirebase />, level: 75, category: "Backend", color: "#FFCA28" },
  { name: "Redux", icon: <SiRedux />, level: 78, category: "Frontend", color: "#764ABC" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 85, category: "Frontend", color: "#06B6D4" },
  { name: "Git / GitHub", icon: <SiGit />, level: 88, category: "DevOps", color: "#F05032" },
  { name: "REST APIs", icon: <FaServer />, level: 92, category: "Backend", color: "#00f5d4" },
];

const categories = ["All", "Backend", "Frontend", "Database", "DevOps", "AI/ML"];

export default function Skills() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" style={{ padding: "96px 0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>What I Know</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            Technical <span style={{ color: "var(--accent)" }}>Arsenal</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "48px" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              style={{
                padding: "8px 20px", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                background: active === cat ? "var(--accent)" : "transparent",
                color: active === cat ? "#000" : "var(--muted)",
                border: active === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
              onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; } }}
              onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; } }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <motion.div key={skill.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              style={{ background: "var(--surface)", padding: "20px", borderRadius: "16px", border: "1px solid var(--border)", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ fontSize: "22px", color: skill.color }}>{skill.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{skill.name}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.72rem" }}>{skill.category}</p>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: skill.color, fontWeight: 600 }}>{skill.level}%</span>
              </div>
              <div style={{ height: "5px", background: "var(--surface2)", borderRadius: "9999px", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, delay: i * 0.05 }}
                  style={{ height: "100%", borderRadius: "9999px", background: `linear-gradient(90deg, ${skill.color}, var(--accent2))` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}