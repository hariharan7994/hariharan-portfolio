import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Grid = () => {
  const ref = useRef();
  const size = 30;
  const count = size * size;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        pos[idx++] = (x - size / 2) * 0.5;
        pos[idx++] = 0;
        pos[idx++] = (z - size / 2) * 0.5;
      }
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array;
    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        pos[idx + 1] = Math.sin(x * 0.5 + t) * 0.3 + Math.cos(z * 0.5 + t) * 0.3;
        idx += 3;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#7b5ea7" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
};

export default function WaveGrid() {
  return (
    <Canvas camera={{ position: [0, 4, 8], fov: 60 }}>
      <Grid />
    </Canvas>
  );
}