// src/components/ui/Loading.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  onComplete?: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-4xl font-bold text-white">Portfolio</div>
      </motion.div>

      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <div className="mt-4 text-gray-400">{progress}%</div>
    </motion.div>
  );
};

export default Loading;