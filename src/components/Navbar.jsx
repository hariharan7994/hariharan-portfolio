import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import HireMeModal from "./HireMeModal";

const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "resume", title: "Resume" },
  { id: "contact", title: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { dark, toggle } = useTheme();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto highlight active section while scrolling
  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b shadow-lg"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          background: "var(--surface)",
          borderColor: "var(--border)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setActive("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer flex items-center gap-2 flex-shrink-0"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 15px var(--shadow)",
              }}
            >
              <span className="text-black font-bold font-display text-lg">H</span>
            </div>
            <span
              className="font-display font-bold text-lg tracking-wide"
              style={{ color: "var(--text)" }}
            >
              HARIHARAN<span style={{ color: "var(--accent)" }}>.S</span>
            </span>
          </motion.div>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                  style={{
                    color: active === link.id ? "var(--accent)" : "var(--muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== link.id)
                      e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    if (active !== link.id)
                      e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {/* Active background pill */}
                  {active === link.id && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "var(--accent)", opacity: 0.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.title}</span>

                  {/* Underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      active === link.id
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
                    }`}
                    style={{ background: "var(--accent)" }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* ── Desktop Right: Theme Toggle + Hire Me ── */}
          <div className="hidden md:flex items-center gap-3">

            {/* Theme Toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={dark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Hire Me Button */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-black text-sm font-semibold rounded-full transition-all"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 20px var(--shadow)",
              }}
            >
              Hire Me
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>

          {/* ── Mobile Right: Theme Toggle + Hamburger ── */}
          <div className="md:hidden flex items-center gap-3">

            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={dark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <FaSun size={13} /> : <FaMoon size={13} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 rounded-full origin-center"
                style={{ background: "var(--text)" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-6 h-0.5 rounded-full"
                style={{ background: "var(--text)" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 rounded-full origin-center"
                style={{ background: "var(--text)" }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
              style={{
                background: "var(--surface)",
                borderTop: "1px solid var(--border)",
              }}
            >
              {/* Top glow line */}
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--accent), transparent)",
                  opacity: 0.4,
                }}
              />

              <ul className="flex flex-col px-6 py-6 gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center gap-3"
                      style={{
                        background:
                          active === link.id
                            ? "rgba(0,245,212,0.08)"
                            : "transparent",
                        color:
                          active === link.id
                            ? "var(--accent)"
                            : "var(--muted)",
                      }}
                    >
                      <span
                        className="font-mono text-xs w-5"
                        style={{ color: "var(--accent)" }}
                      >
                        0{i + 1}
                      </span>
                      {link.title}
                      {active === link.id && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)" }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}

                {/* Mobile Hire Me */}
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 mt-2"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setModalOpen(true);
                    }}
                    className="w-full py-3.5 text-black font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                    style={{ background: "var(--accent)" }}
                  >
                    Hire Me →
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hire Me Modal ── */}
      <HireMeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}