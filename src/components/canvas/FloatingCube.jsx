import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const techs = [
  "Python",
  "Django",
  "React",
  "PostgreSQL",
  "Docker",
  "JavaScript",
  "REST API",
  "Redux",
  "Firebase",
  "OpenCV",
  "Git",
  "Tailwind",
  "JWT",
  "Linux",
  "Postman",
  "DRF",
];

function fibonacciSphere(count, radius) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    points.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }

  return points;
}

const colors = [
  "#00f5d4",
  "#4cc9f0",
  "#7b5ea7",
  "#f72585",
  "#4361ee",
  "#7209b7",
];

const TechTag = ({ position, name, index }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  const color = colors[index % colors.length];

  return (
    <group position={position}>
      {/* Glass Card */}
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[1.55, 0.5]} />

        <meshPhysicalMaterial
          color={hovered ? color : "#ffffff"}
          transparent
          opacity={hovered ? 0.95 : 0.18}
          roughness={0.15}
          metalness={0.2}
          transmission={0.7}
          thickness={0.5}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border Glow */}
      <mesh ref={ref}>
        <planeGeometry args={[1.6, 0.55]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.4 : 0.15}
          wireframe
        />
      </mesh>

      {/* Text */}
      <Text
        fontSize={0.17}
        color={hovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#000"
      >
        {name}
      </Text>
    </group>
  );
};

const Globe = () => {
  const groupRef = useRef();
  const positions = fibonacciSphere(techs.length, 2.3);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.18;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Wire Globe */}
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial
          color="#4cc9f0"
          wireframe
          transparent
          opacity={0.22}
        />
      </Sphere>

      {/* Outer Glow Sphere */}
      <Sphere args={[2.05, 32, 32]}>
        <meshBasicMaterial
          color="#00f5d4"
          transparent
          opacity={0.03}
        />
      </Sphere>

      {/* Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#00f5d4"
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.25, 0.01, 16, 100]} />
        <meshBasicMaterial
          color="#7b5ea7"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Tech Tags */}
      {techs.map((tech, i) => (
        <TechTag
          key={tech}
          name={tech}
          position={positions[i]}
          index={i}
        />
      ))}
    </group>
  );
};

export default function FloatingCube() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{
        background: "transparent",
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={1.4} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, -5]} intensity={1.5} />

      <Globe />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
}