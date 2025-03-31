// src/components/ui/FloatingActionButton.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Define navigation items with icons
  const navigationItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      label: 'Projects',
      href: '/projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      label: 'About',
      href: '/about',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    },
  ];
  
  // Determine button styles based on theme
  const buttonClass = theme === 'dark'
    ? "bg-indigo-500 hover:bg-indigo-400 text-white"
    : "bg-indigo-600 hover:bg-indigo-700 text-white";
  
  const menuItemClass = theme === 'dark'
    ? "bg-gray-800 text-white hover:bg-gray-700"
    : "bg-white text-gray-900 hover:bg-gray-100";
  
  return (
    <div className="fixed left-6 bottom-6 z-50">
      {/* Main button */}
      <motion.button
        onClick={toggleMenu}
        className={`p-3 rounded-full shadow-lg ${buttonClass} z-50 relative`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Quick navigation"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </motion.div>
      </motion.button>
      
      {/* Menu items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0 w-max"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href}>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-md ${menuItemClass}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton;