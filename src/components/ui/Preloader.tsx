// src/components/ui/Preloader.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface PreloaderProps {
  duration?: number;
  minimumLoadingTime?: number;
}

const Preloader = ({ 
  duration = 2000, 
  minimumLoadingTime = 1000 
}: PreloaderProps) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Record start time
    const startTime = Date.now();
    
    const handleComplete = () => {
      // Calculate elapsed time
      const elapsedTime = Date.now() - startTime;
      
      // If elapsed time is less than minimum time, wait the remaining time
      if (elapsedTime < minimumLoadingTime) {
        setTimeout(() => {
          setLoading(false);
        }, minimumLoadingTime - elapsedTime);
      } else {
        setLoading(false);
      }
    };
    
    // Add event listener for when page is fully loaded
    window.addEventListener('load', handleComplete);
    
    // Set a timeout as a fallback
    const timer = setTimeout(() => {
      handleComplete();
    }, duration);
    
    return () => {
      window.removeEventListener('load', handleComplete);
      clearTimeout(timer);
    };
  }, [duration, minimumLoadingTime]);
  
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={`fixed inset-0 ${bgColor} flex flex-col items-center justify-center z-[9999]`}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: 'easeInOut'
            }
          }}
        >
          <div className="relative">
            {/* Logo or brand icon */}
            <motion.div
              className={`text-4xl font-bold ${textColor} mb-4 text-center`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </motion.div>
            
            {/* Loading animation */}
            <div className="flex justify-center mb-4">
              <div className="relative w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-indigo-600 dark:bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: duration / 1000, ease: 'easeInOut' }}
                />
              </div>
            </div>
            
            {/* Loading text */}
            <motion.div
              className={`text-sm ${textColor} text-center opacity-70`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              Loading amazing experiences...
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;