import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const techs = [
  "Python", "Django", "React", "PostgreSQL",
  "Docker", "JavaScript", "REST API", "Redux",
  "Firebase", "OpenCV", "Git", "Tailwind",
  "JWT", "Linux", "Postman", "DRF",
];

// Distribute points evenly on a sphere (Fibonacci spiral)
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

const TechTag = ({ position, name, index }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  // Colors cycle through accent palette
  const colors = ["#00f5d4", "#7b5ea7", "#00b4d8", "#f72585", "#4cc9f0", "#7209b7"];
  const color = colors[index % colors.length];

  return (
    <group position={position}>
      {/* Background pill */}
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[1.4, 0.45]} />
        <meshBasicMaterial
          color={hovered ? color : "#0d1117"}
          transparent
          opacity={hovered ? 0.95 : 0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border ring using line */}
      <Text
        fontSize={0.18}
        color={hovered ? "#000000" : color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {name}
      </Text>
    </group>
  );
};

const Globe = () => {
  const groupRef = useRef();
  const positions = fibonacciSphere(techs.length, 2.2);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.25;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe globe */}
      <Sphere args={[2, 16, 16]}>
        <meshBasicMaterial
          color="#00f5d4"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.008, 8, 80]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.2} />
      </mesh>

      {/* Meridian ring */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.2, 0.008, 8, 80]} />
        <meshBasicMaterial color="#7b5ea7" transparent opacity={0.15} />
      </mesh>

      {/* Tech tags */}
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
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={1} />
      <Globe />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
}