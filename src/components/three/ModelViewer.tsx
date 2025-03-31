// src/components/three/ModelViewer.tsx
'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  useGLTF, 
  Html, 
  useProgress,
  Float,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { withPerformanceMonitoring } from './PerformanceMonitor';

// Loading indicator
const Loader = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-4 border-t-indigo-600 border-gray-200 animate-spin mb-4" />
        <div className="text-xl text-white">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
};

// Model component that handles loading and displaying a 3D model
const Model = ({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  autoRotate = true
}) => {
  const group = useRef<THREE.Group>(null!);
  
  // Load the model (with error handling)
  let model;
  try {
    model = useGLTF(modelPath);
  } catch (error) {
    console.error('Error loading model:', error);
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
        <Html center>
          <div className="bg-red-900 text-white p-2 rounded">
            Error loading model
          </div>
        </Html>
      </mesh>
    );
  }
  
  // Auto-rotate the model
  useFrame((state) => {
    if (group.current && autoRotate) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group 
      ref={group} 
      position={position instanceof Array ? new THREE.Vector3(...position) : position} 
      rotation={rotation instanceof Array ? new THREE.Euler(...rotation) : rotation}
      scale={scale}
    >
      <primitive object={model.scene.clone()} />
    </group>
  );
};

// Fallback model when no specific model is provided
const FallbackModel = ({ complexity = 'high' }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Rotate the model
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  
  // Different complexities for performance optimization
  let geometry;
  switch (complexity) {
    case 'low':
      geometry = <icosahedronGeometry args={[1, 1]} />;
      break;
    case 'medium':
      geometry = <icosahedronGeometry args={[1, 2]} />;
      break;
    case 'high':
    default:
      geometry = <icosahedronGeometry args={[1, 4]} />;
      break;
  }
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial 
          color="#8352FD" 
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

// Main model viewer component
interface ModelViewerProps {
  modelPath?: string;
  environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  height?: string;
  autoRotate?: boolean;
  controls?: boolean;
  quality?: 'high' | 'medium' | 'low';
  showInfo?: boolean;
  showZoom?: boolean;
  backgroundColor?: string;
}

const ModelViewerScene = ({
  modelPath,
  environmentPreset = 'city',
  autoRotate = true,
  controls = true,
  quality = 'high',
  showInfo = true,
  showZoom = true,
  backgroundColor = '#000000',
}: ModelViewerProps) => {
  const { camera } = useThree();
  const [isZoomed, setIsZoomed] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  
  const handleZoom = () => {
    setIsZooming(true);
    
    // Calculate new camera position
    const newZ = isZoomed ? 4 : 2;
    const currentZ = camera.position.z;
    const startTime = Date.now();
    const duration = 1000; // ms
    
    const animateZoom = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Ease in-out
      
      camera.position.z = currentZ + (newZ - currentZ) * easeProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animateZoom);
      } else {
        setIsZoomed(!isZoomed);
        setIsZooming(false);
      }
    };
    
    requestAnimationFrame(animateZoom);
  };
  
  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Suspense fallback={<Loader />}>
        {modelPath ? (
          <Model 
            modelPath={modelPath} 
            autoRotate={autoRotate} 
          />
        ) : (
          <FallbackModel complexity={quality} />
        )}
        <Environment preset={environmentPreset} background={false} />
      </Suspense>
      
      <ContactShadows 
        opacity={0.4} 
        scale={10} 
        blur={1} 
        far={10} 
        resolution={256} 
        color="#000000" 
      />
      
      {controls && <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={2} 
        maxDistance={8}
        autoRotate={false}
      />}
      
      {/* UI elements */}
      {showZoom && (
        <Html position={[1.8, -1.5, 0]}>
          <button
            onClick={handleZoom}
            disabled={isZooming}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full disabled:opacity-50"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              {isZoomed ? (
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              ) : (
                <path 
                  fillRule="evenodd" 
                  d="M5 8a1 1 0 011-1h4V3a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 01-1-1z" 
                  clipRule="evenodd" 
                />
              )}
            </svg>
          </button>
        </Html>
      )}
      
      {showInfo && !modelPath && (
        <Html center position={[0, -2, 0]}>
          <div className="bg-gray-900/80 backdrop-blur-sm text-white text-center p-2 rounded">
            No model provided. Showing placeholder.
          </div>
        </Html>
      )}
    </>
  );
};

// Wrap with performance monitoring
const ModelViewerWithPerformance = withPerformanceMonitoring(ModelViewerScene, {
  lowerQualityThreshold: 25,
});

// The exported component wraps the scene in a Canvas
const ModelViewer = (props: ModelViewerProps) => {
  const { height = '500px', ...otherProps } = props;
  
  return (
    <div style={{ height }} className="w-full relative">
      <Canvas shadows dpr={[1, 2]}>
        <ModelViewerWithPerformance {...otherProps} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;