import { FaHeart, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--muted)] text-sm">
          © 2024 <span className="text-[var(--accent)] font-semibold">Hariharan S</span> · Built with React + Three.js
        </p>
        <div className="flex gap-5">
          {[
            { icon: <FaGithub />, href: "https://github.com/" },
            { icon: <FaLinkedin />, href: "https://linkedin.com/in/hariharan-s-794064277" },
            { icon: <FaEnvelope />, href: "mailto:hariharan66461@gmail.com" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-lg">
              {s.icon}
            </a>
          ))}
        </div>
        <p className="text-[var(--muted)] text-sm flex items-center gap-1">
          Made with <FaHeart className="text-red-500 mx-1" /> in Kerala
        </p>
      </div>
    </footer>
  );
}