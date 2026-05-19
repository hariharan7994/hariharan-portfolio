import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import ParticleRing from "./canvas/ParticleRing";

const SERVICE_ID = "service_0zagtfn";       // ← replace
const TEMPLATE_ID = "template_f1q7fgb";     // ← replace
const PUBLIC_KEY = "Dbhb1E2B4VEhsdnYL";       // ← replace

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      }, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", background: "var(--input-bg)", border: "1px solid var(--border)",
    borderRadius: "12px", padding: "12px 16px", color: "var(--text)",
    fontSize: "0.875rem", outline: "none", transition: "border-color 0.3s, box-shadow 0.3s",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <section id="contact" style={{ padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}>
        <ParticleRing />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Get In Touch</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            Let's <span style={{ color: "var(--accent)" }}>Connect</span>
          </h2>
          <p style={{ color: "var(--muted)", marginTop: "12px", maxWidth: "480px", margin: "12px auto 0" }}>
            Open to freelance projects, full-time roles, and interesting collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {[
              { icon: <FaEnvelope />, label: "Email", value: "hariharan66461@gmail.com", href: "mailto:hariharan66461@gmail.com" },
              { icon: <FaPhone />, label: "Phone", value: "+91 7994052636", href: "tel:+917994052636" },
              { icon: <FaMapMarkerAlt />, label: "Location", value: "Palakkad, Kerala, India", href: null },
              { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/hariharan-s-794064277", href: "https://linkedin.com/in/hariharan-s-794064277" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "var(--glow)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0, border: "1px solid var(--border)" }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: "var(--muted)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer"
                      style={{ color: "var(--text)", fontWeight: 500, textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
                    >{item.value}</a>
                  ) : (
                    <p style={{ color: "var(--text)", fontWeight: 500, fontSize: "0.9rem" }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            style={{ background: "var(--surface)", borderRadius: "24px", padding: "32px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Your Name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith"
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--muted)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: "none" }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            <motion.button type="submit" disabled={status === "sending"}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", background: "var(--accent)", color: "#000", fontWeight: 600, borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "0.9rem", opacity: status === "sending" ? 0.6 : 1, transition: "opacity 0.2s" }}
            >
              <FaPaperPlane size={14} />
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

            {status === "success" && <p style={{ color: "#4ade80", textAlign: "center", fontSize: "0.85rem" }}>✓ Message sent successfully!</p>}
            {status === "error" && <p style={{ color: "#f87171", textAlign: "center", fontSize: "0.85rem" }}>✗ Failed to send. Try emailing directly.</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
}