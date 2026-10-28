import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { useScrollContext } from "./SmoothScroll";
import cutoutImg from "../assets/hariharan.png";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import SplitTextReveal from "./SplitTextReveal";

/* ── Scroll-reactive Marquee ── */
function ScrollMarquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const { velocity, direction } = useScrollContext();

  const marqueeItems = [
    "DJANGO",
    "REACT",
    "PYTHON",
    "FULL STACK",
    "3+ YEARS",
    "REST APIs",
    "POSTGRESQL",
    "DOCKER",
    "AGILE",
    "TEAM LEAD",
  ];

  useEffect(() => {
    if (!trackRef.current) return;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "none",
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  // React to scroll velocity
  useEffect(() => {
    if (!tweenRef.current) return;
    const speed = 1 + Math.abs(velocity) * 3;
    const dir = direction < 0 ? -1 : 1;
    gsap.to(tweenRef.current, {
      timeScale: speed * dir,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  }, [velocity, direction]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "24px 0",
        marginTop: "48px",
      }}
    >
      <div ref={trackRef} className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: i % 2 === 0 ? "var(--muted)" : "var(--accent)",
              opacity: i % 2 === 0 ? 0.6 : 0.8,
            }}
          >
            {item} ·
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading letters
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".hero-char");
        gsap.fromTo(
          chars,
          { y: 120, opacity: 0, rotateX: -60 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.04,
            ease: "power4.out",
            delay: 0.3,
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const nameChars = "HARIHARAN".split("");

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >

      {/* Gradient blobs */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "15%",
          width: "400px",
          height: "400px",
          background: "var(--accent)",
          opacity: 0.04,
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "350px",
          height: "350px",
          background: "var(--accent2)",
          opacity: 0.05,
          borderRadius: "50%",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="max-w-7xl mx-auto px-6 w-full relative z-10"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* Subtitle */}
        <SplitTextReveal
          text="Full Stack Developer · 3+ Years"
          delay={0.2}
          style={{
            color: "var(--accent)",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "24px",
            textAlign: "center",
          }}
        />

        {/* Massive Name */}
        <div
          ref={headingRef}
          style={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            perspective: "600px",
          }}
        >
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="hero-char"
              style={{
                display: "inline-block",
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1,
                color: "var(--text)",
                willChange: "transform, opacity",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* CENTERPIECE SHOWCASE - Cutout with Ambient Glow & Floating Tech Badges */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "760px",
            minHeight: "480px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "48px",
            marginBottom: "36px",
            perspective: "1000px",
          }}
        >
          {/* Radial Ambient Glow behind cutout */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "440px",
              height: "440px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232, 210, 181, 0.22) 0%, rgba(165, 167, 155, 0.16) 45%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Futuristic Concentric Orbital Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px dashed rgba(232, 210, 181, 0.18)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              border: "1px solid rgba(165, 167, 155, 0.12)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Floating Orbiting Tech Badge - Left (Django/Python) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, y: [-8, 8, -8] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              left: "4%",
              top: "22%",
              zIndex: 3,
              background: "rgba(18, 18, 22, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Backend Architect
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                Python & Django
              </div>
            </div>
          </motion.div>

          {/* Floating Orbiting Tech Badge - Right (React & Modern UI) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: [8, -8, 8] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.7 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              right: "4%",
              bottom: "22%",
              zIndex: 3,
              background: "rgba(18, 18, 22, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#61dafb",
                boxShadow: "0 0 10px #61dafb",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Frontend & UI
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                React & Interactive
              </div>
            </div>
          </motion.div>

          {/* Floating Metric Pill - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [-4, 6, -4] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.9 },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              right: "12%",
              top: "14%",
              zIndex: 3,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              color: "var(--text)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            ⚡ 3+ Yrs Exp
          </motion.div>

          {/* Main Cutout Image with 3D Float Animation & Gradient Pedestal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 1, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.03 }}
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "360px",
              height: "440px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {/* Soft Elliptical Ground Shadow */}
            <div
              style={{
                position: "absolute",
                bottom: "6px",
                width: "220px",
                height: "22px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.55)",
                filter: "blur(12px)",
                zIndex: 1,
              }}
            />

            {/* Cutout Image with Drop Shadow & Bottom Mask Fade */}
            <img
              src={cutoutImg}
              alt="Hariharan S"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "bottom center",
                zIndex: 2,
                filter: "drop-shadow(0 20px 35px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 45px rgba(232, 210, 181, 0.22))",
                maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </div>

        {/* Description */}
        <SplitTextReveal
          text="Building scalable web apps with Python Django & React. From healthcare platforms to face-recognition systems."
          delay={0.6}
          style={{
            color: "var(--muted)",
            fontSize: "1.05rem",
            maxWidth: "520px",
            lineHeight: 1.7,
            textAlign: "center",
            marginBottom: "32px",
          }}
        />

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "28px",
            justifyContent: "center",
          }}
        >
          {[
            {
              icon: <FaGithub size={20} />,
              href: "https://github.com/",
              label: "GitHub",
            },
            {
              icon: <FaLinkedin size={20} />,
              href: "https://linkedin.com/in/hariharan-s-794064277",
              label: "LinkedIn",
            },
            {
              icon: <FaEnvelope size={20} />,
              href: "mailto:hariharan66461@gmail.com",
              label: "Email",
            },
            {
              icon: <FaPhone size={20} />,
              href: "tel:+917994052636",
              label: "Phone",
            },
          ].map((s) => (
            <Magnetic key={s.label} intensity={0.3}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                style={{
                  color: "var(--muted)",
                  transition: "color 0.2s",
                  display: "inline-block"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Magnetic intensity={0.2}>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "12px 28px",
                background: "var(--accent)",
                color: "#000",
                fontWeight: 600,
                borderRadius: "9999px",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              View Projects →
            </motion.a>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <motion.a
              href="#resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "12px 28px",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                textDecoration: "none",
                background: "transparent",
                transition: "all 0.3s",
                display: "inline-flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent)";
              }}
            >
              Download Resume
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll-reactive Marquee */}
      <ScrollMarquee />

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.7rem",
            fontFamily: "monospace",
          }}
        >
          scroll
        </p>
      </div>
    </section>
  );
}