import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import ParticleRing from "./canvas/ParticleRing";

const SERVICE_ID = "service_0zagtfn";       // ← replace
const TEMPLATE_ID = "template_f1q7fgb";     // ← replace
const PUBLIC_KEY = "Dbhb1E2B4VEhsdnYL";       // ← replace

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

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

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Particle ring background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ParticleRing />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-display">
            Let's <span className="text-[var(--accent)]">Connect</span>
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-lg mx-auto">Open to freelance projects, full-time roles, and interesting collaborations.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
            {[
              { icon: <FaEnvelope />, label: "Email", value: "hariharan66461@gmail.com", href: "mailto:hariharan66461@gmail.com" },
              { icon: <FaPhone />, label: "Phone", value: "+91 7994052636", href: "tel:+917994052636" },
              { icon: <FaMapMarkerAlt />, label: "Location", value: "Palakkad, Kerala, India", href: null },
              { icon: <FaLinkedin />, label: "LinkedIn", value: "linkedin.com/in/hariharan-s-794064277", href: "https://linkedin.com/in/hariharan-s-794064277" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[var(--muted)] text-xs uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-white hover:text-[var(--accent)] transition-colors font-medium">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-[var(--surface)] rounded-3xl p-8 border border-white/5 space-y-5"
          >
            <div>
              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 block">Your Name</label>
              <input name="name" value={form.name} onChange={handleChange} required
                placeholder="Hariharan S"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 block">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 block">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              />
            </div>

            <button type="submit" disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--accent)] text-black font-semibold rounded-xl hover:brightness-110 transition-all disabled:opacity-60"
            >
              <FaPaperPlane />
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-center text-sm">✓ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm">✗ Failed to send. Try emailing directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}