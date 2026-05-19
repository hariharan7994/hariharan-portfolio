import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sphere,
  Stars,
} from "@react-three/drei";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Globe() {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.004;

      const pulse =
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;

      globeRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={globeRef}>
      {/* Main Globe */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#66fcf1"
          wireframe
          transparent
          opacity={0.22}
        />
      </Sphere>

      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.01, 16, 100]} />

        <meshBasicMaterial
          color="#00f5d4"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Floating Cubes */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;

        return (
          <Float
            key={i}
            speed={2}
            rotationIntensity={2}
            floatIntensity={2}
          >
            <mesh
              position={[
                Math.cos(angle) * 3,
                Math.sin(angle * 2),
                Math.sin(angle) * 3,
              ]}
            >
              <boxGeometry args={[0.25, 0.25, 0.25]} />

              <meshStandardMaterial
                color={
                  i % 2 === 0
                    ? "#00f5d4"
                    : "#7b5ea7"
                }
                emissive={
                  i % 2 === 0
                    ? "#00f5d4"
                    : "#7b5ea7"
                }
                emissiveIntensity={2}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function IntroScene({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);

      setTimeout(() => {
        onFinish();
      }, 1200);
    }, 3800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(20px)",
          }}
          transition={{ duration: 1.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            overflow: "hidden",
            background:
              "radial-gradient(circle at center, #07111f 0%, #020617 70%)",
          }}
        >
          {/* Grid Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              maskImage:
                "radial-gradient(circle at center, black 40%, transparent 85%)",
            }}
          />

          {/* LEFT CONTENT */}
          <div
            style={{
              position: "absolute",
              left: "8%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              maxWidth: "560px",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                color: "#00f5d4",
                fontSize: "0.85rem",
                letterSpacing: "0.35em",
                marginBottom: "20px",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              Full Stack Developer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 800,
                lineHeight: 1,
                color: "#ffffff",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.05em",
                marginBottom: "26px",
              }}
            >
              Hariharan
              <span
                style={{
                  color: "#00f5d4",
                  textShadow:
                    "0 0 25px rgba(0,255,212,0.5)",
                }}
              >
                .S
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                color: "#94a3b8",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: "34px",
              }}
            >
              Building immersive digital experiences
              with modern frontend technologies,
              scalable backend systems, and futuristic UI.
            </motion.p>

            {/* Loading Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "260px" }}
              transition={{ duration: 2.5 }}
              style={{
                height: "4px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #00f5d4, #7b5ea7)",
                boxShadow:
                  "0 0 20px rgba(0,255,212,0.5)",
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                marginTop: "14px",
                color: "#64748b",
                fontSize: "0.8rem",
                letterSpacing: "0.25em",
                fontFamily: "monospace",
              }}
            >
              LOADING EXPERIENCE...
            </motion.p>
          </div>

          {/* 3D GLOBE */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "55%",
              height: "100%",
            }}
          >
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
              <ambientLight intensity={1.2} />

              <pointLight
                position={[5, 5, 5]}
                intensity={3}
                color="#00f5d4"
              />

              <pointLight
                position={[-5, -5, -5]}
                intensity={2}
                color="#7b5ea7"
              />

              <Stars
                radius={80}
                depth={50}
                count={3000}
                factor={4}
                fade
              />

              <Globe />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
              />
            </Canvas>
          </div>

          {/* Scan Line */}
          <motion.div
            animate={{
              top: ["-10%", "110%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              height: "2px",
              background:
                "linear-gradient(to right, transparent, #00f5d4, transparent)",
              boxShadow: "0 0 20px #00f5d4",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}