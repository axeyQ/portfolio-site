// src/components/three/ProjectShowcase.tsx
'use client';

import { useState, useRef} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  MeshDistortMaterial,
  useCursor,
  Text,
  ScrollControls,
  Scroll,
  useScroll
} from '@react-three/drei';
import * as THREE from 'three';

// Project data interface
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  position: [number, number, number];
}

// Sample project data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Interactive Dashboard",
    description: "Real-time data visualization with customizable widgets",
    technologies: ["React", "D3.js", "WebSockets"],
    slug: "interactive-dashboard",
    position: [-2, 0, 0],
  },
  {
    id: 2,
    title: "3D Product Configurator",
    description: "Customize products in real-time with ThreeJS",
    technologies: ["ThreeJS", "React", "NextJS"],
    slug: "3d-product-configurator",
    position: [0, 0, 0],
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "A complete online shopping experience",
    technologies: ["NextJS", "Stripe", "Tailwind"],
    slug: "ecommerce-platform",
    position: [2, 0, 0],
  },
];

// Project card rendered in 3D space
const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const mesh = useRef<THREE.Mesh>(null!);
  const { position, title, technologies } = project;
  
  useCursor(hovered);
  
  useFrame((state) => {
    if (mesh.current) {
      // Subtle floating animation
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Rotate slightly towards the camera when hovered
      if (hovered) {
        mesh.current.rotation.y = THREE.MathUtils.lerp(
          mesh.current.rotation.y,
          Math.PI * 0.05,
          0.1
        );
      } else {
        mesh.current.rotation.y = THREE.MathUtils.lerp(
          mesh.current.rotation.y,
          0,
          0.1
        );
      }
    }
  });
  
  return (
    <group
      position={position}
      ref={mesh}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card background */}
      <mesh position={[0, 0, -0.05]} scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}>
        <planeGeometry args={[1.5, 2]} />
        <MeshDistortMaterial
          color={hovered ? "#8352FD" : "#1a1a1a"}
          speed={5}
          distort={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Project title */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.1}
        maxWidth={1.3}
        textAlign="center"
        color="white"
      >
        {title}
      </Text>
      
      {/* Project technologies */}
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.06}
        maxWidth={1.3}
        textAlign="center"
        color="#cccccc"
      >
        {technologies.join(' • ')}
      </Text>
      
      {/* Placeholder for project image */}
      <mesh position={[0, -0.3, 0]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial color={hovered ? "#6930c3" : "#333333"} />
      </mesh>
    </group>
  );
};

// Scene with scroll controls for projects
const ProjectsScene = ({ onSelectProject }: { onSelectProject: (slug: string) => void }) => {
  const scroll = useScroll();
  const { camera } = useThree();
  
  useFrame(() => {
    // Move camera based on scroll
    const targetX = THREE.MathUtils.lerp(
      -2,
      2,
      scroll.offset
    );
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
  });
  
  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
      <pointLight position={[-5, -5, -5]} intensity={1} />
      
      {PROJECTS.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelectProject(project.slug)}
        />
      ))}
      
      <Environment preset="city" />
    </group>
  );
};

// Main component export
const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const handleSelectProject = (slug: string) => {
    setSelectedProject(slug);
    // In a real app, you would navigate to the project page
    // window.location.href = `/projects/${slug}`;
    console.log(`Selected project: ${slug}`);
  };
  
  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ScrollControls pages={PROJECTS.length} distance={1}>
          <Scroll>
            <ProjectsScene onSelectProject={handleSelectProject} />
          </Scroll>
        </ScrollControls>
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-10 left-0 right-0 text-center text-white">
        <p className="text-xl">Scroll to explore projects</p>
        <div className="mt-2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;