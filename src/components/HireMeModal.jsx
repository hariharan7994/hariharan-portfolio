import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import {
  FaTimes, FaEnvelope, FaUser, FaBriefcase,
  FaPaperPlane, FaPhone, FaLinkedin, FaCheckCircle,
} from "react-icons/fa";

const SERVICE_ID = "service_0zagtfn";
const TEMPLATE_ID = "template_f1q7fgb";
const PUBLIC_KEY = "Dbhb1E2B4VEhsdnYL";

// ── Three.js floating particles inside modal ──
const ModalParticles = () => {
  const ref = useRef();
  const count = 120;

  const positions = useRef(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }).current;

  const velocities = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.003,
      y: (Math.random() - 0.5) * 0.003,
    }))
  ).current;

  useFrame(() => {
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      if (Math.abs(pos[i * 3]) > 4) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 4) velocities[i].y *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={typeof positions === "function" ? positions() : positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00f5d4" size={0.04} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

// Connecting lines between nearby particles
const ConnectionLines = () => {
  const ref = useRef();
  const count = 40;

  const positions = new Float32Array(count * 6);
  for (let i = 0; i < count; i++) {
    const x1 = (Math.random() - 0.5) * 8;
    const y1 = (Math.random() - 0.5) * 8;
    const x2 = x1 + (Math.random() - 0.5) * 2;
    const y2 = y1 + (Math.random() - 0.5) * 2;
    positions[i * 6] = x1; positions[i * 6 + 1] = y1; positions[i * 6 + 2] = 0;
    positions[i * 6 + 3] = x2; positions[i * 6 + 4] = y2; positions[i * 6 + 5] = 0;
  }

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.1 + Math.sin(clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count * 2} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#7b5ea7" transparent opacity={0.12} />
    </lineSegments>
  );
};

const ModalCanvas = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ position: "absolute", inset: 0 }}>
    <ModalParticles />
    <ConnectionLines />
  </Canvas>
);

// ── Main Modal Component ──
export default function HireMeModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [step, setStep] = useState(1); // 2-step form

  useEffect(() => {
    if (open) { setStep(1); setStatus("idle"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      }, PUBLIC_KEY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = `w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 
    text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] 
    transition-all duration-300 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.1)] text-sm`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Three.js background canvas */}
              <div className="absolute inset-0 pointer-events-none opacity-60">
                <ModalCanvas />
              </div>

              {/* Glow blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{ background: "var(--accent)", filter: "blur(60px)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: "var(--accent2)", filter: "blur(50px)" }} />

              {/* Content */}
              <div className="relative z-10 p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-1"
                    >
                      Available for work
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                      className="text-2xl font-bold font-display text-[var(--text)]"
                    >
                      Let's Work Together
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                      className="text-[var(--muted)] text-sm mt-1"
                    >
                      Full Stack Developer · Django + React · 3+ Years
                    </motion.p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                  >
                    <FaTimes size={14} />
                  </motion.button>
                </div>

                {/* Quick contact row */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {[
                    { icon: <FaEnvelope size={12} />, label: "hariharan66461@gmail.com", href: "mailto:hariharan66461@gmail.com" },
                    { icon: <FaPhone size={12} />, label: "+91 7994052636", href: "tel:+917994052636" },
                    { icon: <FaLinkedin size={12} />, label: "LinkedIn", href: "https://linkedin.com/in/hariharan-s-794064277" },
                  ].map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                    >
                      <span className="text-[var(--accent)]">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </motion.div>

                {/* Step indicator */}
                {status !== "success" && (
                  <div className="flex items-center gap-2 mb-6">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: step === s ? 1.1 : 1 }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            step >= s
                              ? "bg-[var(--accent)] text-black"
                              : "border border-[var(--border)] text-[var(--muted)]"
                          }`}
                        >
                          {s}
                        </motion.div>
                        <span className={`text-xs ${step === s ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>
                          {s === 1 ? "Your Info" : "Your Message"}
                        </span>
                        {s < 2 && <div className="w-8 h-px bg-[var(--border)] mx-1" />}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Success State ── */}
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4"
                      >
                        <FaCheckCircle size={36} className="text-[var(--accent)]" />
                      </motion.div>
                      <h3 className="text-xl font-bold font-display text-[var(--text)] mb-2">Message Sent!</h3>
                      <p className="text-[var(--muted)] text-sm mb-6 max-w-xs">
                        Thanks for reaching out! I'll get back to you within 24 hours.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="px-8 py-3 bg-[var(--accent)] text-black font-semibold rounded-full text-sm"
                      >
                        Close
                      </motion.button>
                    </motion.div>

                  ) : (
                    <AnimatePresence mode="wait">
                      {/* ── Step 1: Personal Info ── */}
                      {step === 1 && (
                        <motion.form
                          key="step1"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.25 }}
                          onSubmit={handleNext}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <FaUser size={10} className="text-[var(--accent)]" /> Full Name
                              </label>
                              <input name="name" value={form.name} onChange={handleChange} required
                                placeholder="John Smith" className={inputClass} />
                            </div>
                            <div>
                              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <FaEnvelope size={10} className="text-[var(--accent)]" /> Email
                              </label>
                              <input name="email" type="email" value={form.email} onChange={handleChange} required
                                placeholder="you@company.com" className={inputClass} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <FaPhone size={10} className="text-[var(--accent)]" /> Phone (optional)
                              </label>
                              <input name="phone" value={form.phone} onChange={handleChange}
                                placeholder="+91 98765 43210" className={inputClass} />
                            </div>
                            <div>
                              <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <FaBriefcase size={10} className="text-[var(--accent)]" /> Subject
                              </label>
                              <select name="subject" value={form.subject} onChange={handleChange} required
                                className={inputClass + " cursor-pointer"}
                                style={{ background: "var(--surface2)" }}
                              >
                                <option value="">Select a topic</option>
                                <option value="Full-time Role">Full-time Role</option>
                                <option value="Freelance Project">Freelance Project</option>
                                <option value="Collaboration">Collaboration</option>
                                <option value="Consulting">Consulting</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 bg-[var(--accent)] text-black font-semibold rounded-xl text-sm hover:brightness-110 transition-all mt-2"
                          >
                            Next — Add Your Message →
                          </motion.button>
                        </motion.form>
                      )}

                      {/* ── Step 2: Message ── */}
                      {step === 2 && (
                        <motion.form
                          key="step2"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.25 }}
                          onSubmit={handleSubmit}
                          className="space-y-4"
                        >
                          {/* Preview of step 1 */}
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-white/3">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                              {form.name?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[var(--text)] truncate">{form.name}</p>
                              <p className="text-xs text-[var(--muted)] truncate">{form.email} · {form.subject}</p>
                            </div>
                            <button type="button" onClick={() => setStep(1)}
                              className="text-xs text-[var(--accent)] hover:underline flex-shrink-0">
                              Edit
                            </button>
                          </div>

                          <div>
                            <label className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2 block">
                              Your Message
                            </label>
                            <textarea name="message" value={form.message} onChange={handleChange} required
                              rows={5} placeholder="Tell me about your project, timeline, and budget..."
                              className={inputClass + " resize-none"}
                            />
                          </div>

                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)}
                              className="px-5 py-3.5 border border-[var(--border)] text-[var(--muted)] rounded-xl text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                            >
                              ← Back
                            </button>
                            <motion.button
                              type="submit"
                              disabled={status === "sending"}
                              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[var(--accent)] text-black font-semibold rounded-xl text-sm hover:brightness-110 transition-all disabled:opacity-60"
                            >
                              {status === "sending" ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                                  />
                                  Sending...
                                </>
                              ) : (
                                <><FaPaperPlane size={13} /> Send Message</>
                              )}
                            </motion.button>
                          </div>

                          {status === "error" && (
                            <p className="text-red-400 text-center text-xs">
                              Failed to send. <a href="mailto:hariharan66461@gmail.com" className="underline">Email directly</a>
                            </p>
                          )}
                        </motion.form>
                      )}
                    </AnimatePresence>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}