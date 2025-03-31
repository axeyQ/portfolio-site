// src/components/three/LazyThree.tsx
'use client';

import { useState, useEffect, Suspense, ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface LazyThreeProps {
  component: ComponentType<any>;
  fallback?: JSX.Element;
  props?: any;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  placeholder?: JSX.Element;
}

/**
 * LazyThree component handles lazy loading of ThreeJS components
 * only when they come into viewport, saving resources and improving performance
 */
const LazyThree = ({
  component: Component,
  fallback,
  props = {},
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  placeholder,
}: LazyThreeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView({
    threshold,
    rootMargin,
    triggerOnce,
  });

  // Start loading the component when it's in view
  useEffect(() => {
    if (inView && !isLoaded) {
      // A small delay to ensure other higher priority things load first
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView, isLoaded]);

  return (
    <div ref={ref} className="w-full h-full relative">
      {inView && isLoaded ? (
        <Suspense fallback={fallback || <LoadingPlaceholder />}>
          <Component {...props} />
        </Suspense>
      ) : (
        placeholder || <LoadingPlaceholder />
      )}
    </div>
  );
};

// A simple loading placeholder
const LoadingPlaceholder = () => (
  <motion.div
    className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg"
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
  >
    <div className="text-center">
      <div className="inline-block w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">Loading 3D content...</p>
    </div>
  </motion.div>
);

/**
 * Creates a lazy-loaded version of any ThreeJS component
 */
export const createLazyThreeComponent = (
  Component: ComponentType<any>,
  options = {}
) => {
  // Use Next.js dynamic import with SSR disabled for ThreeJS components
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
  });
  
  return (props: any) => (
    <LazyThree
      component={DynamicComponent}
      props={props}
      {...options}
    />
  );
};

export default LazyThree;