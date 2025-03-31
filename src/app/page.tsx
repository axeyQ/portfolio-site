// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';

// Use dynamic import for the ThreeJS component to avoid SSR issues
const EnhancedScene = dynamic(
  () => import('@/components/three/EnhancedScene'),
  { ssr: false }
);

export default function Home() {
  return (
    <Layout>
      <PageTransition>
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          {/* ThreeJS scene as background */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <EnhancedScene />
          </div>
          
          {/* Content overlay */}
          <div style={{ 
            position: 'relative', 
            zIndex: 10, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%', 
            color: 'white', 
            padding: '0 1rem'
          }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              textAlign: 'center' 
            }}>
              Creative Developer
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', 
              maxWidth: '36rem', 
              textAlign: 'center', 
              marginBottom: '2.5rem' 
            }}>
              Building immersive digital experiences with modern web technologies.
            </p>
            <button style={{ 
              padding: '0.75rem 2rem', 
              backgroundColor: '#4f46e5', 
              borderRadius: '9999px', 
              fontWeight: '500', 
              transition: 'all 300ms ease' 
            }} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}>
              View My Work
            </button>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}