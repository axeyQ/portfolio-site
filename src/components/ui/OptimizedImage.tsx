// src/components/ui/OptimizedImage.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  onLoad?: () => void;
  blur?: boolean;
}

/**
 * OptimizedImage component with lazy loading, blur effect, and fade-in animation
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
  onLoad,
  blur = true,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };
  
  // Base style classes
  const imageStyles = {
    objectFit,
  };
  
  // For placeholder or error state
  const placeholderSrc = error
    ? '/images/error-placeholder.jpg' // Replace with your error image
    : '/images/placeholder.jpg'; // Replace with your placeholder image
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && blur && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
          style={{ zIndex: 1 }}
        />
      )}
      
      {/* Main image with fade-in animation */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={error ? placeholderSrc : src}
          alt={alt}
          width={width}
          height={height}
          style={imageStyles}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      </motion.div>
    </div>
  );
};

export default OptimizedImage;