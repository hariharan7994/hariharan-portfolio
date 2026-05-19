import { motion } from "framer-motion";
import { FaDownload, FaEye, FaGraduationCap, FaAward } from "react-icons/fa";

export default function Resume() {
  return (
    <section id="resume" style={{ padding: "96px 0" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>My CV</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            My <span style={{ color: "var(--accent)" }}>Resume</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            style={{ background: "var(--surface)", borderRadius: "24px", padding: "32px", border: "1px solid var(--border)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--glow)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaGraduationCap style={{ color: "var(--accent)", fontSize: "18px" }} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>Education</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { degree: "Bachelor of Computer Applications (BCA)", school: "Calicut University", year: "2020 – 2024" },
                { degree: "Higher Secondary Education", school: "Kerala State Board", year: "2018 – 2020" },
              ].map((edu, i) => (
                <div key={i} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "16px" }}>
                  <p style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{edu.degree}</p>
                  <p style={{ color: "var(--accent)", fontSize: "0.82rem", marginTop: "2px" }}>{edu.school}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.75rem", marginTop: "4px" }}>{edu.year}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: "var(--surface)", borderRadius: "24px", padding: "32px", border: "1px solid var(--border)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(123,94,167,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaAward style={{ color: "var(--accent2)", fontSize: "18px" }} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>Achievements</h3>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Led full stack dev for 2 major production applications.",
                "Delivered end-to-end caregiver booking platform with live payments.",
                "Built & deployed face-recognition gym software as PM + developer.",
                "Improved API response times via query optimization in Django ORM.",
                "Digitized workflows for healthcare and fitness industry clients.",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  <span style={{ color: "var(--accent2)", marginTop: "2px", flexShrink: 0 }}>▸</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Download buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}
        >
          <motion.a href="/Hariharan_S_Resume.pdf" download
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", background: "var(--accent)", color: "#000", fontWeight: 600, borderRadius: "9999px", textDecoration: "none", fontSize: "0.9rem" }}
          >
            <FaDownload /> Download Resume
          </motion.a>
          <motion.a href="/Hariharan_S_Resume.pdf" target="_blank" rel="noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", border: "1px solid var(--accent)", color: "var(--accent)", borderRadius: "9999px", textDecoration: "none", background: "transparent", fontSize: "0.9rem", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
          >
            <FaEye /> View Online
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}