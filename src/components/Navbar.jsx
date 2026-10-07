import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import HireMeModal from "./HireMeModal";
import gsap from "gsap";

const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "resume", title: "Resume" },
  { id: "contact", title: "Contact" },
];

/* ── Magnetic Link Component ── */
function MagneticLink({ children, onClick, isActive, style }) {
  const ref = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    quickX.current = gsap.quickTo(ref.current, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(ref.current, "y", {
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || !quickX.current || !quickY.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    quickX.current(dx);
    quickY.current(dy);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (quickX.current) quickX.current(0);
    if (quickY.current) quickY.current(0);
  }, []);

  return (
    <div
      className="magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={ref}
        onClick={onClick}
        style={{
          position: "relative",
          padding: "8px 20px",
          fontSize: "0.85rem",
          fontWeight: 500,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
          transition: "color 0.3s ease",
          ...style,
        }}
      >
        {/* Active dot indicator */}
        {isActive && (
          <motion.span
            layoutId="navDot"
            style={{
              position: "absolute",
              bottom: "-2px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
        {children}
      </button>
    </div>
  );
}

/* ── Floating Menu Button ── */
function FloatingMenuButton({ visible, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: visible ? 1 : 0,
      opacity: visible ? 1 : 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }, [visible]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        position: "fixed",
        top: "32px",
        right: "32px",
        zIndex: 60,
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "var(--accent)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        fontWeight: 700,
        fontSize: "0.7rem",
        fontFamily: "'DM Sans', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        boxShadow: "0 0 30px var(--shadow)",
        transform: "scale(0)",
        opacity: 0,
      }}
    >
      Menu
    </button>
  );
}

/* ── Fullscreen Overlay Nav ── */
function OverlayNav({ open, onClose, onNavClick, active }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "circle(0% at calc(100% - 64px) 64px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 64px) 64px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 64px) 64px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "var(--surface)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: "32px",
              right: "32px",
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "var(--accent)",
              border: "none",
              cursor: "pointer",
              color: "#000",
              fontSize: "1.5rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </motion.button>

          {navLinks.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => {
                onNavClick(link.id);
                onClose();
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color:
                  active === link.id ? "var(--accent)" : "var(--text)",
                padding: "8px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  active === link.id ? "var(--accent)" : "var(--text)")
              }
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  color: "var(--muted)",
                  fontWeight: 400,
                  width: "24px",
                }}
              >
                0{i + 1}
              </span>
              {link.title}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [active, setActive] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { dark, toggle } = useTheme();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto highlight active section while scrolling
  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
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

  // Prevent body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Top Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: pastHero ? 0 : 1,
          pointerEvents: pastHero ? "none" : "auto",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b shadow-lg"
            : "bg-transparent"
        }`}
        style={
          scrolled
            ? {
                background: "var(--surface)",
                borderColor: "var(--border)",
              }
            : {}
        }
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
              <span className="text-black font-bold font-display text-lg">
                H
              </span>
            </div>
            <span
              className="font-display font-bold text-lg tracking-wide"
              style={{ color: "var(--text)" }}
            >
              HARIHARAN
              <span style={{ color: "var(--accent)" }}>.S</span>
            </span>
          </motion.div>

          {/* ── Desktop Nav Links (Magnetic) ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <MagneticLink
                  onClick={() => handleNavClick(link.id)}
                  isActive={active === link.id}
                  style={{
                    color:
                      active === link.id
                        ? "var(--accent)"
                        : "var(--muted)",
                  }}
                >
                  {link.title}
                </MagneticLink>
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
                animate={
                  menuOpen
                    ? { rotate: 45, y: 8 }
                    : { rotate: 0, y: 0 }
                }
                className="block w-6 h-0.5 rounded-full origin-center"
                style={{ background: "var(--text)" }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                className="block w-6 h-0.5 rounded-full"
                style={{ background: "var(--text)" }}
              />
              <motion.span
                animate={
                  menuOpen
                    ? { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0 }
                }
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

      {/* ── Floating Sticky Menu Button (appears after scrolling past Hero) ── */}
      <FloatingMenuButton
        visible={pastHero && !overlayOpen}
        onClick={() => setOverlayOpen(true)}
      />

      {/* ── Fullscreen Overlay Navigation ── */}
      <OverlayNav
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        onNavClick={handleNavClick}
        active={active}
      />

      {/* ── Hire Me Modal ── */}
      <HireMeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}