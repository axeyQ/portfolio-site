// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import Preloader from '@/components/ui/Preloader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio Website | Creative Developer',
  description: 'Interactive portfolio website built with NextJS and ThreeJS',
  keywords: ['portfolio', 'web development', 'frontend', '3D', 'ThreeJS', 'NextJS', 'interactive'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    title: 'Creative Developer Portfolio',
    description: 'Explore my interactive portfolio showcasing frontend and 3D development work',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Developer Portfolio',
    description: 'Explore my interactive portfolio showcasing frontend and 3D development work',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-black dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <Preloader />
          {children}
          <ScrollToTopButton />
          <FloatingActionButton />
        </ThemeProvider>
      </body>
    </html>
  );
}