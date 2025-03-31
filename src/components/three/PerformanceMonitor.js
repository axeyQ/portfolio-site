// src/components/three/PerformanceMonitor.tsx
'use client';

import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

interface PerformanceMonitorProps {
  showStats?: boolean;
  onPerformanceIssue?: () => void;
  lowerQualityThreshold?: number; // FPS below which quality should be reduced
}

const PerformanceMonitor = ({
  showStats = false,
  onPerformanceIssue,
  lowerQualityThreshold = 30,
}: PerformanceMonitorProps) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [lowPerformanceDetected, setLowPerformanceDetected] = useState(false);
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);
  
  // Initialize Stats.js
  useEffect(() => {
    if (showStats) {
      const statsInstance = Stats();
      statsInstance.dom.style.position = 'absolute';
      statsInstance.dom.style.top = '0px';
      statsInstance.dom.style.left = '0px';
      document.body.appendChild(statsInstance.dom);
      setStats(statsInstance);
      
      return () => {
        document.body.removeChild(statsInstance.dom);
      };
    }
  }, [showStats]);
  
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
        onPerformanceIssue?.();
      }
    }
  });
  
  return null; // This component doesn't render anything
};

// Higher order component to wrap a scene with performance monitoring
export const withPerformanceMonitoring = (
  Component: React.ComponentType<any>,
  options: PerformanceMonitorProps = {}
) => {
  return (props: any) => {
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
      
      options.onPerformanceIssue?.();
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
};

// Helper HOC for adaptive detail level in ThreeJS components
export const createAdaptiveScene = (
  HighQualityScene: React.ComponentType<any>,
  MediumQualityScene: React.ComponentType<any>,
  LowQualityScene: React.ComponentType<any>
) => {
  return withPerformanceMonitoring((props: any) => {
    const { quality, ...otherProps } = props;
    
    switch (quality) {
      case 'low':
        return <LowQualityScene {...otherProps} />;
      case 'medium': 
        return <MediumQualityScene {...otherProps} />;
      case 'high':
      default:
        return <HighQualityScene {...otherProps} />;
    }
  });
};

export default PerformanceMonitor;