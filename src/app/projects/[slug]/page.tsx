// src/app/projects/[slug]/page.tsx
import React from 'react';
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';
import Link from 'next/link';

// This is a dynamic route component that receives the slug parameter
export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // In a real project, you would fetch project data based on the slug
  // For now, we're using dummy data
  const project = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: 'This is a detailed description of the project. It would contain information about the technologies used, the challenges faced, and the solutions implemented.',
    technologies: ['NextJS', 'ThreeJS', 'TypeScript', 'Tailwind CSS'],
    images: ['/placeholder.jpg', '/placeholder.jpg'],
    link: 'https://example.com',
    year: '2023',
  };

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-6 py-28">
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

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-12">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {project.images.map((image, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 h-64 rounded-lg"
                ></div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Year: {project.year}</span>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
              >
                Visit Project
              </a>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}