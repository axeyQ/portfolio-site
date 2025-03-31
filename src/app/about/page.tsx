// src/app/about/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';
import SkillsVisualization from '@/components/three/SkillsVisualization';
import { FadeUp, SlideIn, FadeIn } from '@/components/ui/ScrollAnimation';
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
  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-6 py-28">
          <FadeUp>
            <h1 className="text-5xl font-bold mb-12 text-center">About Me</h1>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <SlideIn>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8 h-full">
                <h2 className="text-3xl font-semibold mb-6">Who Am I</h2>
                <p className="text-gray-300 mb-4">
                  I&apos;m a creative developer passionate about building immersive digital experiences that blend 
                  artistry with technology. With a background in both design and development, I bring a unique 
                  perspective to every project.
                </p>
                <p className="text-gray-300 mb-4">
                  My journey began with traditional web development, but I quickly became fascinated with interactive 
                  3D experiences and animation. This led me to explore technologies like ThreeJS and WebGL, which have 
                  become integral to my development toolkit.
                </p>
                <p className="text-gray-300">
                  I believe that the intersection of design and technology is where the most exciting innovations happen.
                  My goal is to create digital experiences that are not only visually stunning but also intuitive and 
                  meaningful for users.
                </p>
              </div>
            </SlideIn>
            
            <FadeIn>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8 h-full flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow" />
                  <div className="absolute inset-1 rounded-full bg-gray-900" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Creative Developer
                      </h3>
                      <p className="text-gray-400 mt-2">Based in San Francisco</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeUp className="mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <h2 className="text-3xl font-semibold mb-6 text-center">My Skills</h2>
              <p className="text-gray-300 max-w-3xl mx-auto text-center mb-8">
                I specialize in creating interactive web experiences using modern technologies.
                My expertise spans from frontend development to 3D graphics programming.
              </p>
              
              <SkillsVisualization />
            </div>
          </FadeUp>

          <FadeUp>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8">
              <h2 className="text-3xl font-semibold mb-6 text-center">Experience</h2>
              
              <div className="max-w-3xl mx-auto">
                <div className="space-y-12">
                  <SlideIn>
                    <div className="relative pl-8 border-l-2 border-indigo-600">
                      <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-0" />
                      <div className="mb-1 flex items-center">
                        <h3 className="text-xl font-semibold">Senior Frontend Developer</h3>
                        <div className="ml-auto flex items-center text-indigo-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          2020 - Present
                        </div>
                      </div>
                      <p className="text-indigo-400 mb-2">Acme Inc.</p>
                      <p className="text-gray-300">
                        Leading the development of interactive web applications with a focus on 3D experiences and 
                        animations. Responsible for architecture decisions and implementing best practices.
                      </p>
                    </div>
                  </SlideIn>
                  
                  <SlideIn delay={0.2}>
                    <div className="relative pl-8 border-l-2 border-indigo-600">
                      <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-0" />
                      <div className="mb-1 flex items-center">
                        <h3 className="text-xl font-semibold">Web Developer</h3>
                        <div className="ml-auto flex items-center text-indigo-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          2018 - 2020
                        </div>
                      </div>
                      <p className="text-indigo-400 mb-2">Digital Agency XYZ</p>
                      <p className="text-gray-300">
                        Developed responsive websites and web applications for various clients across different industries.
                        Collaborated with designers to bring creative concepts to life.
                      </p>
                    </div>
                  </SlideIn>
                  
                  <SlideIn delay={0.4}>
                    <div className="relative pl-8 border-l-2 border-indigo-600">
                      <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-0" />
                      <div className="mb-1 flex items-center">
                        <h3 className="text-xl font-semibold">Junior Developer</h3>
                        <div className="ml-auto flex items-center text-indigo-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          2016 - 2018
                        </div>
                      </div>
                      <p className="text-indigo-400 mb-2">StartUp Co.</p>
                      <p className="text-gray-300">
                        Worked on frontend development tasks for a startup building a SaaS platform.
                        Gained experience with React, CSS animations, and responsive design techniques.
                      </p>
                    </div>
                  </SlideIn>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </PageTransition>
    </Layout>
  );
}