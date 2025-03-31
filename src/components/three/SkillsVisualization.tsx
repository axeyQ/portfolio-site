// src/components/three/SkillsVisualization.tsx
'use client';

import { useRef, useState} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  Float, 
  PerspectiveCamera, 
  Environment, 
  useCursor 
} from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  level: number; // 0-100
  group: 'frontend' | 'backend' | '3d' | 'design';
}

const SKILLS: Skill[] = [
  { name: 'JavaScript', level: 90, group: 'frontend' },
  { name: 'React', level: 85, group: 'frontend' },
  { name: 'NextJS', level: 80, group: 'frontend' },
  { name: 'ThreeJS', level: 75, group: '3d' },
  { name: 'WebGL', level: 65, group: '3d' },
  { name: 'TypeScript', level: 82, group: 'frontend' },
  { name: 'Node.js', level: 78, group: 'backend' },
  { name: 'Express', level: 75, group: 'backend' },
  { name: 'MongoDB', level: 70, group: 'backend' },
  { name: 'CSS/SCSS', level: 88, group: 'frontend' },
  { name: 'Tailwind', level: 85, group: 'frontend' },
  { name: 'UI/UX', level: 80, group: 'design' },
  { name: 'Figma', level: 75, group: 'design' },
];

// Colors for different skill groups
const GROUP_COLORS = {
  frontend: '#4c75e6',
  backend: '#34c759',
  '3d': '#8352fd',
  design: '#ff9500',
};

// Individual skill sphere
const SkillSphere = ({ skill, index, totalSkills }: { skill: Skill, index: number, totalSkills: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Calculate position in a spiral pattern
  const angle = (index / totalSkills) * Math.PI * 2;
  const radius = 3 + (skill.level / 100) * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const y = (Math.sin(index * 0.5) * 0.5) - 1; // Slight vertical variation
  
  useCursor(hovered);
  
  // Size based on skill level
  const size = 0.2 + (skill.level / 100) * 0.4;
  
  // Color based on skill group
  const color = GROUP_COLORS[skill.group];
  
  useFrame(() => {
    if (meshRef.current) {
      // Subtle hover effect
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        hovered || clicked ? size * 1.4 : size,
        0.1
      );
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        hovered || clicked ? size * 1.4 : size,
        0.1
      );
      meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        hovered || clicked ? size * 1.4 : size,
        0.1
      );
    }
  });
  
  return (
    <group position={[x, y, z]}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.2} 
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered || clicked ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Only show text when hovered or clicked */}
      {(hovered || clicked) && (
        <Float floatIntensity={0.2} speed={2}>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
          <Text
            position={[0, 1.1, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill.level}%
          </Text>
        </Float>
      )}
    </group>
  );
};

// Legend component to show skill groups
const SkillsLegend = () => {
  return (
    <div className="absolute top-10 right-10 bg-black/30 backdrop-blur-md p-4 rounded-lg">
      <h3 className="text-white text-lg font-bold mb-3">Skills</h3>
      <div className="space-y-2">
        {Object.entries(GROUP_COLORS).map(([group, color]) => (
          <div key={group} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: color }}
            />
            <span className="text-white capitalize">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Scene with camera controls
const SkillsScene = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slowly rotate the entire skills cloud
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {SKILLS.map((skill, index) => (
        <SkillSphere 
          key={skill.name} 
          skill={skill} 
          index={index} 
          totalSkills={SKILLS.length} 
        />
      ))}
      
      <Environment preset="city" />
    </group>
  );
};

// Main component
const SkillsVisualization = () => {
  return (
    <div className="relative w-full h-[600px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        <SkillsScene />
      </Canvas>
      <SkillsLegend />
      
      <div className="absolute bottom-5 left-0 right-0 text-center text-white text-opacity-70">
        <p>Hover or click on skills to view details</p>
      </div>
    </div>
  );
};

export default SkillsVisualization;