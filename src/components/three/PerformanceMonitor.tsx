// src/components/three/PerformanceMonitor.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
// Remove unused imports
import type { ComponentType} from 'react';

// Type for Stats - since we may not have proper types for the module
type StatsType = {
  dom: HTMLElement;
  update: () => void;
  begin: () => void;
  end: () => void;
};

// Mock Stats if it's not available during build
let Stats: { new(): StatsType } | null = null;

// Only import Stats on client side
if (typeof window !== 'undefined') {
  // Use dynamic import for Stats
  import('three/examples/jsm/libs/stats.module.js').then((module) => {
    Stats = module.default;
  }).catch(err => {
    console.error('Failed to load Stats module:', err);
  });
}

interface PerformanceMonitorProps {
  showStats?: boolean;
  onPerformanceIssue?: () => void;
  lowerQualityThreshold?: number; // FPS below which quality should be reduced
}

interface SceneComponentProps {
  quality?: 'high' | 'medium' | 'low';
  [key: string]: any;
}

/**
 * Performance monitoring component for ThreeJS scenes
 */
const PerformanceMonitor = ({
  showStats = false,
  onPerformanceIssue,
  lowerQualityThreshold = 30,
}: PerformanceMonitorProps) => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [lowPerformanceDetected, setLowPerformanceDetected] = useState(false);
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);
  
  // Initialize Stats.js
  useEffect(() => {
    if (showStats && typeof window !== 'undefined' && Stats) {
      const statsInstance = new Stats();
      statsInstance.dom.style.position = 'absolute';
      statsInstance.dom.style.top = '0px';
      statsInstance.dom.style.left = '0px';
      document.body.appendChild(statsInstance.dom);
      setStats(statsInstance);
      
      return () => {
        document.body.removeChild(statsInstance.dom);
      };
    }
  }, [showStats, Stats]);
  
  // Monitor performance
  useFrame((state) => {
    if (stats) {
      stats.update();
    }
    
    // Calculate FPS from delta time
    const fps = Math.round(1 / state.clock.getDelta());
    
    // Add to FPS history, keeping only the last 10 samples
    setFpsHistory(prev => [...prev.slice(-9), fps]);
    
    // Check if average FPS is below threshold
    if (fpsHistory.length >= 10) {
      const avgFps = fpsHistory.reduce((sum, fps) => sum + fps, 0) / fpsHistory.length;
      
      if (avgFps < lowerQualityThreshold && !lowPerformanceDetected) {
        setLowPerformanceDetected(true);
        if (onPerformanceIssue) onPerformanceIssue();
      }
    }
  });
  
  return null; // This component doesn't render anything
};

// Higher order component to wrap a scene with performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  Component: ComponentType<P & SceneComponentProps>,
  options: PerformanceMonitorProps = {}
): ComponentType<P> => {
  // Add display name for better debugging
  const WithPerformanceMonitoring = (props: P) => {
    const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
    
    const handlePerformanceIssue = () => {
      // Step down quality
      if (quality === 'high') {
        setQuality('medium');
        console.log('Performance: Reduced quality to medium');
      } else if (quality === 'medium') {
        setQuality('low');
        console.log('Performance: Reduced quality to low');
      }
      
      if (options.onPerformanceIssue) options.onPerformanceIssue();
    };
    
    return (
      <>
        <PerformanceMonitor
          showStats={options.showStats}
          onPerformanceIssue={handlePerformanceIssue}
          lowerQualityThreshold={options.lowerQualityThreshold}
        />
        <Component {...props} quality={quality} />
      </>
    );
  };
  
  // Set display name for debugging
  WithPerformanceMonitoring.displayName = `WithPerformanceMonitoring(${Component.displayName || Component.name || 'Component'})`;
  
  return WithPerformanceMonitoring;
};

// Helper HOC for adaptive detail level in ThreeJS components
export const createAdaptiveScene = <P extends object>(
  HighQualityScene: ComponentType<P>,
  MediumQualityScene: ComponentType<P>,
  LowQualityScene: ComponentType<P>
): ComponentType<P> => {
  const AdaptiveScene = (props: P & SceneComponentProps) => {
    const { quality, ...otherProps } = props;
    
    switch (quality) {
      case 'low':
        return <LowQualityScene {...otherProps as P} />;
      case 'medium': 
        return <MediumQualityScene {...otherProps as P} />;
      case 'high':
      default:
        return <HighQualityScene {...otherProps as P} />;
    }
  };
  
  // Set display name for debugging
  AdaptiveScene.displayName = 'AdaptiveScene';
  
  return withPerformanceMonitoring(AdaptiveScene);
};

export default PerformanceMonitor;