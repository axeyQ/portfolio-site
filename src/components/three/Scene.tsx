// src/components/three/Scene.tsx
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface BoxProps {
  position?: [number, number, number];
  color?: string;
}

const Box = (props: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Simple animation - rotate the box
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#8352FD'} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Scene;