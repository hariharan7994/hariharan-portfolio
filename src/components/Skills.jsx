import { motion } from "framer-motion";
import {
  SiPython, SiDjango, SiReact, SiJavascript, SiPostgresql,
  SiDocker, SiOpencv, SiFirebase, SiRedux, SiTailwindcss,
  SiGit, SiTypescript,
} from "react-icons/si";
import { FaServer } from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython />, level: 90, category: "Backend", color: "#3776AB" },
  { name: "Django / DRF", icon: <SiDjango />, level: 90, category: "Backend", color: "#092E20" },
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

import { useState } from "react";

export default function Skills() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-3">What I Know</p>
        <h2 className="text-4xl lg:text-5xl font-bold font-display">
          Technical <span className="text-[var(--accent)]">Arsenal</span>
        </h2>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? "bg-[var(--accent)] text-black"
                : "border border-white/10 text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((skill, i) => (
          <motion.div key={skill.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[var(--surface)] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl" style={{ color: skill.color }}>{skill.icon}</div>
              <div>
                <p className="font-semibold text-white">{skill.name}</p>
                <p className="text-xs text-[var(--muted)]">{skill.category}</p>
              </div>
              <span className="ml-auto font-mono text-sm" style={{ color: skill.color }}>{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: i * 0.05 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}, var(--accent2))` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}