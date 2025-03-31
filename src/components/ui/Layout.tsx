// src/components/ui/Layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import CustomCursor from './CustomCursor';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <header className="fixed w-full z-10 bg-black/20 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Portfolio
          </Link>
          <ul className="flex space-x-8">
            {['Projects', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
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