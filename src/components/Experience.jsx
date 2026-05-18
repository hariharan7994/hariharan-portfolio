import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { experience } from "../constants";

export default function Experience() {
  return (
    <section id="experience" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-3">Career</p>
        <h2 className="text-4xl lg:text-5xl font-bold font-display">
          Work <span className="text-[var(--accent)]">Experience</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />

        {experience.map((exp, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative pl-16 pb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.4)]">
              <FaBriefcase className="text-black text-lg" />
            </div>

            <div className="bg-[var(--surface)] rounded-3xl p-8 border border-white/5 hover:border-[var(--accent)]/30 transition-all">
              <h3 className="text-xl font-bold font-display text-white mb-1">{exp.title}</h3>
              <p className="text-[var(--accent)] font-semibold mb-3">{exp.company}</p>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[var(--accent)]" /> {exp.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-[var(--accent)]" /> {exp.period}
                </span>
              </div>

              <ul className="space-y-3">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-[var(--muted)] text-sm leading-relaxed">
                    <FaCheckCircle className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}