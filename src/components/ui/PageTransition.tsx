'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;