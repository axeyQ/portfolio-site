// src/components/ui/ProjectCard.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    slug: string;
    image?: string;
    technologies: string[];
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for the 3D effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the card center
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x, y });
    }
  };
  
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        ref={cardRef}
        className="group relative w-full h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) scale3d(1.05, 1.05, 1.05)`
            : 'perspective(1000px) rotateX(0) rotateY(0)',
          transition: isHovered
            ? 'transform 0.1s ease'
            : 'transform 0.5s ease',
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/50 to-blue-900/80 opacity-80 z-10" />
        
        {/* Card background */}
        <div 
          className="absolute inset-0 bg-gray-800 z-0"
          style={{
            // Simulate box shadow for 3D effect
            boxShadow: isHovered
              ? '0 30px 60px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.5)'
              : '0 10px 30px rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Particles effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 z-20 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-indigo-600/70 text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-sm text-gray-300">
              {project.category}
            </p>
            
            <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300 mt-2">
              <span className="inline-flex items-center text-indigo-300 text-sm">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;