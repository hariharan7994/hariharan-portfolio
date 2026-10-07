import { motion } from "framer-motion";

const projects = [
  {
    name: "Denze",
    description:
      "Dental Care & Appointment Management Software with WhatsApp-based appointment automation, step-by-step booking flow, and synchronized cancellation logic.",
    tags: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "WhatsApp API"
    ],
    color: "#00f5d4",
    type: "Product-Based",
    role: "Backend Developer",
  },
  {
    name: "Qliq Care",
    description:
      "Healthcare caregiver booking platform with real-time location tracking, FCM push notifications, payment gateway integration, and React admin dashboard.",
    tags: [
      "Django",
      "React",
      "PostgreSQL",
      "FCM",
      "Google Maps",
      "Payment Gateway",
    ],
    color: "#7b5ea7",
    type: "Service-Based",
    role: "Full Stack Developer (Team Lead)",
  },
  {
    name: "Gym Management System",
    description:
      "Face-recognition attendance system using OpenCV/DeepFace. Includes member management, fee tracking, overdue alerts, and analytics dashboard.",
    tags: [
      "Django",
      "React",
      "OpenCV",
      "DeepFace",
      "PostgreSQL",
      "Bootstrap",
    ],
    color: "#f4f4f5",
    type: "Product-Based",
    role: "Project Manager & Full Stack",
  },
  {
    name: "Offixo (HRMS)",
    description:
      "Employee management app featuring check-in/out, salary calculation, attendance marking, and office management. Includes camera-based face and location detection for automated check-ins.",
    tags: [
      "Django",
      "React",
      "DeepFace",
      "OpenCV",
      "Geolocation"
    ],
    color: "#ffbe0b",
    type: "Product-Based",
    role: "Backend / AI Integrator",
  },
  {
    name: "MR Fincorp",
    description:
      "Financial application to manage loans, calculate interest, and perform customer verification workflows.",
    tags: [
      "Django",
      "React",
      "PostgreSQL",
      "Financial Logic"
    ],
    color: "#3a86ff",
    type: "Service-Based",
    role: "Team Lead",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "96px 0", position: "relative" }}>
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <p
            style={{
              color: "var(--accent)",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            What I've Built
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            Key <span style={{ color: "var(--accent)" }}>Projects</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div style={{ position: "relative", padding: "20px 0" }}>
          
          {/* Center Line for Desktop */}
          <div 
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "2px",
              background: "var(--border2)",
              transform: "translateX(-50%)",
            }}
          />

          {projects.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={p.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "120px",
                  position: "relative",
                }}
                className={`flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="hidden md:flex"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: p.color,
                    border: "4px solid var(--surface)",
                    boxShadow: `0 0 20px ${p.color}80, 0 0 0 4px var(--bg)`,
                    zIndex: 2
                  }}
                />

                {/* Card Container */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    width: "100%",
                  }}
                  className="md:w-[45%] z-10"
                >
                  <div
                    style={{
                      background: "var(--surface2)",
                      borderRadius: "24px",
                      padding: "40px",
                      border: "1px solid var(--border)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 10px 40px var(--shadow)",
                      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                      e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 10px 40px var(--shadow)";
                    }}
                  >
                    {/* Animated Gradient Glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.1, 0.03],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        position: "absolute",
                        top: "-30%",
                        right: isEven ? "-30%" : "auto",
                        left: isEven ? "auto" : "-30%",
                        width: "80%",
                        height: "80%",
                        background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
                        filter: "blur(40px)",
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "6px 14px",
                            borderRadius: "9999px",
                            background: `${p.color}15`,
                            color: p.color,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {p.type}
                        </span>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "var(--muted)",
                            opacity: 0.5,
                          }}
                        >
                          0{i + 1}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: "var(--text)",
                          marginBottom: "8px",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.name}
                      </h3>
                      
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: p.color,
                          marginBottom: "24px",
                          fontWeight: 500,
                          fontFamily: "monospace",
                        }}
                      >
                        Role: {p.role}
                      </p>

                      <p
                        style={{
                          fontSize: "1rem",
                          color: "var(--text2)",
                          lineHeight: 1.6,
                          marginBottom: "32px",
                        }}
                      >
                        {p.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: "6px 14px",
                              fontSize: "0.8rem",
                              fontFamily: "monospace",
                              borderRadius: "8px",
                              border: "1px solid var(--border)",
                              color: "var(--text)",
                              background: "var(--surface)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Creative Empty Space Fill */}
                <div 
                  className="hidden md:flex md:w-[45%] items-center justify-center relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Giant Abstract Number */}
                  <motion.div
                    initial={{ opacity: 0, rotateY: isEven ? 45 : -45, z: -100 }}
                    whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    style={{
                      fontSize: "18rem",
                      fontWeight: 900,
                      fontFamily: "'Space Grotesk', sans-serif",
                      lineHeight: 0.8,
                      color: "transparent",
                      WebkitTextStroke: `2px ${p.color}20`,
                      userSelect: "none",
                      position: "absolute",
                    }}
                  >
                    0{i + 1}
                  </motion.div>

                  {/* Floating abstract element */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0], 
                      rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "30%",
                      background: `linear-gradient(135deg, ${p.color}20, transparent)`,
                      border: `1px solid ${p.color}40`,
                      backdropFilter: "blur(10px)",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 20px 40px ${p.color}10`,
                    }}
                  >
                    <span 
                      style={{ 
                        color: p.color, 
                        fontSize: "2rem", 
                        fontFamily: "monospace",
                        opacity: 0.7 
                      }}
                    >
                      {p.name.substring(0, 2).toUpperCase()}
                    </span>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}