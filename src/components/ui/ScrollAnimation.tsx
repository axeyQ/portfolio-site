// src/components/ui/ScrollAnimation.tsx
'use client';

import React, { useEffect, ReactNode } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  className?: string;
  threshold?: number;
  delay?: number;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const ScrollAnimation = ({ 
  children, 
  variants = defaultVariants, 
  className = '', 
  threshold = 0.1, 
  delay = 0 
}: ScrollAnimationProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
      custom={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Preset animations for common use cases
export const FadeUp = (props: Omit<ScrollAnimationProps, 'variants'>) => (
  <ScrollAnimation 
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay: props.delay || 0
        }
      }
    }}
    {...props}
  />
);

export const FadeIn = (props: Omit<ScrollAnimationProps, 'variants'>) => (
  <ScrollAnimation 
    variants={{
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay: props.delay || 0
        }
      }
    }}
    {...props}
  />
);

export const SlideIn = (props: Omit<ScrollAnimationProps, 'variants'>) => (
  <ScrollAnimation 
    variants={{
      hidden: { opacity: 0, x: -100 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay: props.delay || 0
        }
      }
    }}
    {...props}
  />
);

export const ScaleIn = (props: Omit<ScrollAnimationProps, 'variants'>) => (
  <ScrollAnimation 
    variants={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay: props.delay || 0
        }
      }
    }}
    {...props}
  />
);

export default ScrollAnimation;