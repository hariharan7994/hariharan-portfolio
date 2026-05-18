import { motion } from "framer-motion";
import { FaDownload, FaEye, FaGraduationCap, FaCode, FaAward } from "react-icons/fa";

export default function Resume() {
    return (
        <section id="resume" className="py-24 max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
                <p className="text-[var(--accent)] font-mono text-sm tracking-widest uppercase mb-3">My CV</p>
                <h2 className="text-4xl lg:text-5xl font-bold font-display">
                    My <span className="text-[var(--accent)]">Resume</span>
                </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Education */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    className="bg-[var(--surface)] rounded-3xl p-8 border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                            <FaGraduationCap className="text-[var(--accent)] text-lg" />
                        </div>
                        <h3 className="text-xl font-bold font-display">Education</h3>
                    </div>
                    <div className="space-y-6">
                        {[
                            { degree: "Bachelor of Computer Applications (BCA)", school: "Calicut University", year: "2020 – 2024" },
                            { degree: "Higher Secondary Education", school: "Kerala State Board", year: "2018 – 2020" },
                        ].map((edu, i) => (
                            <div key={i} className="border-l-2 border-[var(--accent)] pl-4">
                                <p className="font-semibold text-white">{edu.degree}</p>
                                <p className="text-[var(--accent)] text-sm">{edu.school}</p>
                                <p className="text-[var(--muted)] text-xs mt-1">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-[var(--surface)] rounded-3xl p-8 border border-white/5"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent2)]/20 flex items-center justify-center">
                            <FaAward className="text-[var(--accent2)] text-lg" />
                        </div>
                        <h3 className="text-xl font-bold font-display">Achievements</h3>
                    </div>
                    <ul className="space-y-3">
                        {[
                            "Led full stack dev for 2 major production applications.",
                            "Delivered end-to-end caregiver booking platform with live payments.",
                            "Built & deployed face-recognition gym software as PM + developer.",
                            "Improved API response times via query optimization in Django ORM.",
                            "Digitized workflows for healthcare and fitness industry clients.",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[var(--muted)] text-sm">
                                <span className="text-[var(--accent2)] mt-1">▸</span> {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Download / View buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <a
                    href="/Hariharan_S_Resume.pdf"
                    download="Hariharan_S_Resume.pdf"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-black font-semibold rounded-full hover:scale-105 transition-transform"
                >
                    <FaDownload /> Download Resume
                </a>
                <a
                    href="/Hariharan_S_Fullstack_Resume (3yr).pdf"
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-8 py-4 border border-[var(--accent)] text-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-black transition-all"
                >
                    <FaEye /> View Online
                </a>
            </motion.div>
        </section>
    );
}