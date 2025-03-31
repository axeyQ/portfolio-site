// src/app/about/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';
import { motion } from 'framer-motion';

// Helper function for checking if element is in view
const useInView = (ref: React.RefObject<HTMLElement | null>, threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold }
    );

    // Only observe if ref.current exists
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // Only unobserve if ref.current exists
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);
};

export default function About() {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  useInView(firstSectionRef);
  useInView(secondSectionRef);
  useInView(thirdSectionRef);

  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'ThreeJS', level: 75 },
    { name: 'TypeScript', level: 70 },
    { name: 'Node.js', level: 65 },
  ];

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-6 py-28">
          <h1 className="text-5xl font-bold mb-12 text-center">About Me</h1>

          <div 
            ref={firstSectionRef}
            className="fade-in mb-16 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-semibold mb-6">Who Am I</h2>
            <p className="text-gray-300 mb-4">
              I&apos;m a creative developer passionate about building immersive digital experiences that blend 
              artistry with technology. With a background in both design and development, I bring a unique 
              perspective to every project.
            </p>
            <p className="text-gray-300">
              My journey began with traditional web development, but I quickly became fascinated with interactive 
              3D experiences and animation. This led me to explore technologies like ThreeJS and WebGL, which have 
              become integral to my development toolkit.
            </p>
          </div>

          <div 
            ref={secondSectionRef}
            className="fade-in mb-16 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-semibold mb-6">Skills</h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={thirdSectionRef}
            className="fade-in bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-semibold mb-6">Experience</h2>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-indigo-600">
                <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-0" />
                <h3 className="text-xl font-semibold mb-1">Senior Frontend Developer</h3>
                <p className="text-indigo-400 mb-2">Acme Inc. • 2020 - Present</p>
                <p className="text-gray-300">
                  Leading the development of interactive web applications with a focus on 3D experiences and 
                  animations. Responsible for architecture decisions and implementing best practices.
                </p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-indigo-600">
                <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-0" />
                <h3 className="text-xl font-semibold mb-1">Web Developer</h3>
                <p className="text-indigo-400 mb-2">Digital Agency XYZ • 2018 - 2020</p>
                <p className="text-gray-300">
                  Developed responsive websites and web applications for various clients across different industries.
                  Collaborated with designers to bring creative concepts to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}