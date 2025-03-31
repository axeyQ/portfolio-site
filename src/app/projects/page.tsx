// src/app/projects/page.tsx
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';
import Link from 'next/link';

// Sample project data - in a real project you'd fetch this from an API or CMS
const projects = [
  {
    id: 1,
    title: 'Interactive Dashboard',
    category: 'Web Development',
    image: '/placeholder.jpg',
    slug: 'interactive-dashboard',
  },
  {
    id: 2,
    title: '3D Product Configurator',
    category: 'ThreeJS / WebGL',
    image: '/placeholder.jpg',
    slug: '3d-product-configurator',
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    category: 'Full Stack',
    image: '/placeholder.jpg',
    slug: 'ecommerce-platform',
  },
  {
    id: 4,
    title: 'Mobile App UI',
    category: 'UI/UX Design',
    image: '/placeholder.jpg',
    slug: 'mobile-app-ui',
  },
];

export default function Projects() {
  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-6 py-28">
          <h1 className="text-5xl font-bold mb-12 text-center">My Projects</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                href={`/projects/${project.slug}`} 
                key={project.id}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg h-80 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <div className="w-full h-full bg-gray-800"></div>
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {project.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}