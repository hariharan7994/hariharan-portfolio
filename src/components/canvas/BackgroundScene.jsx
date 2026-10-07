import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Grid = () => {
  const ref = useRef();
  const size = 20;
  const count = size * size;

  const positions = useRef((() => {
    const pos = new Float32Array(count * 3);
    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        pos[idx++] = (x - size / 2) * 1.2;
        pos[idx++] = -2.5;
        pos[idx++] = (z - size / 2) * 1.2;
      }
    }
    return pos;
  })()).current;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4;
    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        positions[idx + 1] =
          -2.5 +
          Math.sin(x * 0.5 + t) * 0.15 +
          Math.cos(z * 0.5 + t * 0.8) * 0.15;
        idx += 3;
      }
    }
    ref.current.geometry.attributes.position.array.set(positions);
    ref.current.geometry.attributes.position.needsUpdate = true;
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
      <pointsMaterial
        color="#00f5d4"
        size={0.03}
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const FloatingDots = () => {
  const ref = useRef();
  const count = 120;

  const positions = useRef((() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return pos;
  })()).current;

  const speeds = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.002,
      y: Math.random() * 0.003 + 0.001,
    }))
  ).current;

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      positions[i * 3]     += speeds[i].x;
      positions[i * 3 + 1] += speeds[i].y;
      if (positions[i * 3 + 1] > 5)  positions[i * 3 + 1] = -5;
      if (Math.abs(positions[i * 3]) > 9) speeds[i].x *= -1;
    }
    ref.current.geometry.attributes.position.array.set(positions);
    ref.current.geometry.attributes.position.needsUpdate = true;
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
      <pointsMaterial
        color="#7b5ea7"
        size={0.025}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default function BackgroundScene() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 55 }}>
        <Grid />
        <FloatingDots />
      </Canvas>
    </div>
  );
}