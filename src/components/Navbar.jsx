import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => { setActive(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
            <span className="text-black font-bold font-display text-lg">H</span>
          </div>
          <span className="font-display font-bold text-white text-lg tracking-wide">
            HARIHARAN<span className="text-[var(--accent)]">.S</span>
          </span>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`relative text-sm font-medium transition-colors duration-200 group ${
                  active === link.id
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                {link.title}
                {/* Underline animation */}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                    active === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.a
          href="mailto:hariharan66461@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-[var(--accent)] text-black text-sm font-semibold rounded-full hover:brightness-110 transition-all"
        >
          Hire Me
          <span className="text-base">→</span>
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white rounded-full origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0d1117]/95 backdrop-blur-md border-t border-white/5 overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`text-lg font-medium transition-colors ${
                      active === link.id
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)] hover:text-white"
                    }`}
                  >
                    <span className="text-[var(--accent)] font-mono text-sm mr-2">
                      0{i + 1}.
                    </span>
                    {link.title}
                  </button>
                </motion.li>
              ))}

              {/* Mobile CTA */}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="mailto:hariharan66461@gmail.com"
                  className="inline-block mt-2 px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-full text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Hire Me →
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}