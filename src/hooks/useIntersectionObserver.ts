// src/hooks/useIntersectionObserver.ts
'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

type IntersectionObserverCallback = (
  isIntersecting: boolean,
  entry: IntersectionObserverEntry
) => void;

/**
 * Custom hook for using IntersectionObserver
 * 
 * @param callback Function to call when intersection status changes
 * @param options IntersectionObserver options
 * @returns Ref to attach to the target element
 */
export function useIntersectionObserver<T extends Element>(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverOptions = {}
): RefObject<T> {
  const { 
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false 
  } = options;
  
  const targetRef = useRef<T>(null);
  const callbackRef = useRef<IntersectionObserverCallback>(callback);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  // Setup or update the observer
  useEffect(() => {
    // Early return if no target element or no observer support
    if (!targetRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }
    
    // Cleanup existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Track if the element has already triggered (for triggerOnce option)
    let hasTriggered = false;
    
    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        // If triggerOnce is true and it already triggered, skip
        if (triggerOnce && hasTriggered && entry.isIntersecting) {
          return;
        }
        
        // Call the callback with the entry
        callbackRef.current(entry.isIntersecting, entry);
        
        // Mark as triggered if intersecting
        if (triggerOnce && entry.isIntersecting) {
          hasTriggered = true;
          
          // Disconnect the observer if we only need to trigger once
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      },
      { root, rootMargin, threshold }
    );
    
    // Start observing the target
    observerRef.current.observe(targetRef.current);
    
    // Cleanup when component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);
  
  return targetRef;
}

/**
 * Simplified hook that returns the intersection state
 */
export function useIsInView<T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const [isInView, setIsInView] = useState(false);
  
  const ref = useIntersectionObserver<T>(
    (isIntersecting) => {
      setIsInView(isIntersecting);
    },
    options
  );
  
  return [ref, isInView];
}

export default useIntersectionObserver;