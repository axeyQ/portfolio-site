// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import Layout from '@/components/ui/Layout';
import PageTransition from '@/components/ui/PageTransition';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

  const inputClasses = "w-full bg-gray-800/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-6 py-28">
          <h1 className="text-5xl font-bold mb-12 text-center">Get In Touch</h1>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
            <motion.div 
              className="md:col-span-2 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 className="text-3xl font-semibold mb-6" variants={itemVariants}>
                Contact Information
              </motion.h2>

              <div className="space-y-6">
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Email</h3>
                    <p className="text-gray-300">hello@yourportfolio.com</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Location</h3>
                    <p className="text-gray-300">San Francisco, CA</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="bg-indigo-600 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Phone</h3>
                    <p className="text-gray-300">+1 (123) 456-7890</p>
                  </div>
                </motion.div>

                <motion.div className="pt-6 flex space-x-4" variants={itemVariants}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <div className="md:col-span-3">
              <motion.form 
                onSubmit={handleSubmit}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl p-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {!isSubmitted ? (
                  <>
                    <motion.div className="mb-6" variants={itemVariants}>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                      />
                    </motion.div>

                    <motion.div className="mb-6" variants={itemVariants}>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                      />
                    </motion.div>

                    <motion.div className="mb-6" variants={itemVariants}>
                      <label htmlFor="message" className="block text-white font-medium mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={6}
                        className={inputClasses}
                        required
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      variants={itemVariants}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </>
                ) : (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                )}
              </motion.form>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}