// src/components/three/EnhancedScene.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial,
  Text3D,
  Float 
} from '@react-three/drei';
import * as THREE from 'three';

// Mouse tracking for interactive elements
const MouseTracker = ({ children }: { children: React.ReactNode }) => {
  const { viewport } = useThree();
  const mouse = useRef([0, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to 3D space coordinates
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) *.5 + 0.3,
      ];
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <group position={[mouse.current[0] * viewport.width / 3, mouse.current[1] * viewport.height / 3, -5]}>
      {children}
    </group>
  );
};

// Floating particles component
const ParticleField = ({ count = 80 }) => {
  const particles = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      particles.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });
  
  // Generate random particle positions
  const particlePositions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 15;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 15;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 15;
  }
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3, false]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8352FD"
        sizeAttenuation
        transparent
      />
    </points>
  );
};

// Animated sphere with distortion
const AnimatedSphere = () => {
  const sphere = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (sphere.current) {
      sphere.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  return (
    <Sphere ref={sphere} args={[1, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.4}
        speed={2}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
};

// Scene component that contains all 3D elements
const Scene = () => {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8352FD" />
      
      <MouseTracker>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[0, 0, 0]}
        >
          <AnimatedSphere />
        </Float>
      </MouseTracker>
      
      <ParticleField count={200} />
      
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.2}
        position={[0, -2, -2]}
      >
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
        >
          Portfolio
          <meshNormalMaterial />
        </Text3D>
      </Float>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Main component export
const EnhancedScene = () => {
  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Handle context loss and recovery
    const handleContextLost = (event: Event) => {
      console.log('WebGL context lost. Attempting to recover...');
      event.preventDefault();
      setContextLost(true);
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored!');
      setContextLost(false);
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
      {contextLost && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          color: 'white',
          zIndex: 5
        }}>
          <p>3D rendering paused. Reloading...</p>
        </div>
      )}
      
      <Canvas
        ref={canvasRef}
        style={{ background: '#050505' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]} // Lower resolution for better performance
        gl={{ 
          powerPreference: 'high-performance',
          antialias: false, // Disable antialiasing for performance
          stencil: false,
          depth: true,
          preserveDrawingBuffer: true // Helps with context restoration
        }}
        onCreated={({ gl }) => {
          // Lower precision for better performance
          gl.shadowMap.enabled = false;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default EnhancedScene;