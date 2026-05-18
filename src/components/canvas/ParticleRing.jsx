import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Ring = () => {
  const ref = useRef();
  const count = 2000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2 + (Math.random() - 0.5) * 0.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00f5d4" size={0.015} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

export default function ParticleRing() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <Ring />
    </Canvas>
  );
}