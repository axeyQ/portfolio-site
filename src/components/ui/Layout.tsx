// src/components/ui/Layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomCursor from './CustomCursor';
import Loading from './Loading';
import HamburgerMenu from './HamburgerMenu';
import ThemeSwitcher from './ThemeSwitcher';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // We'll only show the loading screen on the first render
  useEffect(() => {
    // Check for browser environment
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited');
      if (hasVisited) {
        setIsLoading(false);
      } else {
        sessionStorage.setItem('hasVisited', 'true');
      }
    } else {
      // If SSR, don't show loading screen
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <CustomCursor />>
      <header className="fixed w-full z-10 bg-black/20 backdrop-blur-md dark:bg-black/20 dark:backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white dark:text-white">
            Portfolio
          </Link>
          <div className="flex items-center">
            <ul className="hidden md:flex space-x-8 mr-4">
              {['Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeSwitcher />
            <HamburgerMenu />
          </div>
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-black/20 backdrop-blur-md text-white py-6">
        <div className="container mx-auto px-6">
          <p className="text-center">© {new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;