import { FaHeart, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
          © 2024 <span style={{ color: "var(--accent)", fontWeight: 600 }}>Hariharan S</span> · Built with React + Three.js
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {[
            { icon: <FaGithub size={18} />, href: "https://github.com/" },
            { icon: <FaLinkedin size={18} />, href: "https://linkedin.com/in/hariharan-s-794064277" },
            { icon: <FaEnvelope size={18} />, href: "mailto:hariharan66461@gmail.com" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              style={{ color: "var(--muted)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "4px" }}>
          Made with <FaHeart style={{ color: "#f87171", margin: "0 4px" }} /> in Kerala
        </p>
      </div>
    </footer>
  );
}