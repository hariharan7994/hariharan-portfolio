import { motion } from "framer-motion";
import { projects } from "../constants";

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        className="text-4xl font-bold font-display mb-16 text-center"
      >
        Key <span className="text-[var(--accent)]">Projects</span>
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div key={p.name}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -8 }}
            className="bg-[var(--surface)] rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
          >
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: p.color, filter: "blur(40px)" }}
            />
            <div className="text-5xl mb-4">{p.icon}</div>
            <h3 className="text-2xl font-bold font-display mb-3" style={{ color: p.color }}>{p.name}</h3>
            <p className="text-[var(--muted)] mb-6 leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full border"
                  style={{ borderColor: p.color + "40", color: p.color }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}