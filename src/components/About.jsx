import { motion } from "framer-motion";
import { FaCode, FaServer, FaBrain, FaUsers } from "react-icons/fa";
import WaveGrid from "./canvas/WaveGrid";

const cards = [
  { icon: <FaServer size={24} />, title: "Backend Expert", desc: "Python Django & DRF — REST APIs, JWT auth, RBAC, PostgreSQL." },
  { icon: <FaCode size={24} />, title: "Frontend Dev", desc: "React.js, Redux, Tailwind — responsive UIs and admin dashboards." },
  { icon: <FaBrain size={24} />, title: "AI Integration", desc: "OpenCV & DeepFace for real-world face recognition systems." },
  { icon: <FaUsers size={24} />, title: "Team Leader", desc: "Led teams in Agile sprints, code reviews, and client delivery." },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Wave grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <WaveGrid />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-display">About <span className="text-[var(--accent)]">Me</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
              I'm a <span className="text-white font-medium">Full Stack Developer</span> with 3+ years of professional experience
              building scalable web applications, REST APIs, and modern frontend interfaces based in{" "}
              <span className="text-[var(--accent)]">Palakkad, Kerala</span>.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
              I specialize in <span className="text-white font-medium">Python Django</span> backend development and{" "}
              <span className="text-white font-medium">React</span> frontend development, delivering complete end-to-end
              solutions for real users — from a healthcare caregiver platform to a face-recognition gym system.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              Experienced in team leadership, Agile workflows, and integrating third-party services like payment gateways,
              Google Maps, and Firebase.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: "var(--accent)" }}
                className="bg-[var(--surface)] p-6 rounded-2xl border border-white/5 transition-all duration-300"
              >
                <div className="text-[var(--accent)] mb-3">{card.icon}</div>
                <h3 className="font-bold font-display mb-2 text-white">{card.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}