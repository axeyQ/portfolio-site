// src/app/page.tsx
import Scene from '@/components/three/Scene';
import Layout from '@/components/ui/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="relative h-screen">
        {/* ThreeJS scene as background */}
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            Creative Developer
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-center mb-10">
            Building immersive digital experiences with modern web technologies.
          </p>
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition-colors">
            View My Work
          </button>
        </div>
      </div>
    </Layout>
  );
}