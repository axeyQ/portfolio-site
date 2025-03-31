// src/app/projects/[slug]/page.tsx
'use client';

import { useState } from 'react';
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';
import ModelViewer from '@/components/three/ModelViewer';
import Link from 'next/link';
import { FadeUp, FadeIn, SlideIn } from '@/components/ui/ScrollAnimation';
import { motion } from 'framer-motion';

// Project data type
interface ProjectData {
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  technologies: string[];
  images: string[];
  link?: string;
  githubLink?: string;
  year: string;
  modelPath?: string;
}

// This is a dynamic route component that receives the slug parameter
export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | '3d-view'>('overview');
  
  // In a real project, you would fetch project data based on the slug
  // For now, we're using dummy data
  const project: ProjectData = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'This project showcases modern web development techniques including 3D visualizations, interactive animations, and responsive design.',
    longDescription: `
      This project was built to demonstrate the capabilities of modern web technologies, particularly in creating immersive and interactive user experiences. The application leverages cutting-edge frameworks and libraries to deliver a seamless, engaging interface that balances aesthetic appeal with functional practicality.
      
      The development process involved extensive research into user experience patterns, performance optimization techniques, and accessibility standards. Each feature was carefully designed to enhance user engagement while maintaining fast load times and responsive behavior across all devices.
      
      One of the key challenges was integrating 3D elements in a way that wouldn't compromise performance on lower-end devices. This was solved through adaptive rendering techniques that adjust detail levels based on the client's capabilities.
    `,
    features: [
      'Interactive 3D visualizations with ThreeJS',
      'Responsive design that works on all devices',
      'Animated transitions and micro-interactions',
      'Performance optimization with adaptive rendering',
      'Accessibility features for inclusive user experience',
      'Dark/light theme support'
    ],
    technologies: ['NextJS', 'ThreeJS', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    link: 'https://example.com',
    githubLink: 'https://github.com/example/project',
    year: '2023',
    modelPath: '', // We'll use the fallback for demonstration
  };

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-6 py-28">
          <FadeIn>
            <Link 
              href="/projects" 
              className="inline-flex items-center mb-8 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back to Projects
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-3">
              <SlideIn>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
                  <ModelViewer 
                    modelPath={project.modelPath} 
                    height="400px"
                    environmentPreset="city"
                    showZoom={true}
                  />
                </div>
              </SlideIn>
            </div>
            
            <div className="lg:col-span-2">
              <FadeUp>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8 h-full">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-indigo-900/50 text-indigo-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-8">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors inline-flex items-center"
                      >
                        <span>Visit Project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors inline-flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
          
          {/* Tab navigation */}
          <div className="mb-8">
            <div className="flex border-b border-gray-800">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'overview' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'features' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === '3d-view' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('3d-view')}
              >
                3D View
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-12">
            {activeTab === 'overview' && (
              <FadeIn>
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                  <div className="prose prose-lg prose-invert">
                    {project.longDescription?.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Project Details</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <div>
                          <span className="font-medium">Year:</span> {project.year}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <div>
                          <span className="font-medium">Role:</span> Lead Developer
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <div>
                          <span className="font-medium">Duration:</span> 3 months
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-400 mr-2">•</span>
                        <div>
                          <span className="font-medium">Team Size:</span> 3 people
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            )}
            
            {activeTab === 'features' && (
              <FadeIn>
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    {project.features?.map((feature, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">{feature}</h3>
                          <p className="text-gray-400">
                            Detailed explanation of how this feature benefits users and what technical challenges were overcome in its implementation.
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
            
            {activeTab === '3d-view' && (
              <FadeIn>
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Interactive 3D View</h2>
                  <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    Explore the project in 3D. Use your mouse to rotate and zoom. This interactive model showcases the key elements of the {project.title} project.
                  </p>
                  <div className="h-[600px] max-w-4xl mx-auto">
                    <ModelViewer 
                      modelPath={project.modelPath} 
                      height="100%"
                      environmentPreset="sunset"
                      controls={true}
                      autoRotate={true}
                      showZoom={true}
                    />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
          
          {/* More projects section */}
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">Explore More Projects</h2>
              <p className="text-gray-400 mb-8">Check out some of my other work</p>
              <Link
                href="/projects"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full inline-flex items-center transition-colors"
              >
                <span>View All Projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </PageTransition>
    </Layout>
  );
}