// src/components/ui/DynamicContactForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Dynamic contact form with animations and validation
 */
const DynamicContactForm = () => {
  // Form state management
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const { theme } = useTheme();
  
  // Focus first input on step change
  useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('input, textarea');
      if (inputs[currentStep]) {
        setTimeout(() => {
          (inputs[currentStep] as HTMLElement).focus();
        }, 500);
      }
    }
  }, [currentStep]);
  
  // Form validation
  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : undefined;
      case 'email':
        return value.trim() === '' 
          ? 'Email is required' 
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? 'Invalid email address'
          : undefined;
      case 'subject':
        return value.trim() === '' ? 'Subject is required' : undefined;
      case 'message':
        return value.trim() === '' 
          ? 'Message is required' 
          : value.trim().length < 10
          ? 'Message must be at least 10 characters'
          : undefined;
      default:
        return undefined;
    }
  };
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;
    
    (Object.keys(formState) as Array<keyof FormState>).forEach((key) => {
      const error = validateField(key, formState[key]);
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormState({
      ...formState,
      [name]: value,
    });
    
    // Validate field on change if already touched
    if (touchedFields[name]) {
      const error = validateField(name as keyof FormState, value);
      setFormErrors({
        ...formErrors,
        [name]: error,
      });
    }
  };
  
  // Mark field as touched on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
    
    const error = validateField(name as keyof FormState, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };
  
  // Handle form navigation
  const handleNext = () => {
    const currentField = Object.keys(formState)[currentStep] as keyof FormState;
    const error = validateField(currentField, formState[currentField]);
    
    if (error) {
      setFormErrors({
        ...formErrors,
        [currentField]: error,
      });
      setTouchedFields({
        ...touchedFields,
        [currentField]: true,
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrev = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formState).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouchedFields(allTouched);
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      console.log('Form submitted:', formState);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setFormErrors({});
        setTouchedFields({});
        setCurrentStep(0);
      }, 5000);
    }, 1500);
  };
  
  // Define form steps
  const formSteps = [
    {
      field: 'name',
      label: 'What\'s your name?',
      type: 'text',
      placeholder: 'John Doe',
      emoji: '👋',
    },
    {
      field: 'email',
      label: 'What\'s your email?',
      type: 'email',
      placeholder: 'john@example.com',
      emoji: '📧',
    },
    {
      field: 'subject',
      label: 'What\'s this about?',
      type: 'text',
      placeholder: 'Project Inquiry',
      emoji: '💼',
    },
    {
      field: 'message',
      label: 'Your message',
      type: 'textarea',
      placeholder: 'Tell me about your project...',
      emoji: '💬',
    },
  ];
  
  // Input classes based on theme and errors
  const getInputClasses = (fieldName: string) => {
    const baseClasses = "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300";
    const themeClasses = theme === 'dark' 
      ? "bg-gray-800 text-white border border-gray-700 focus:ring-indigo-500" 
      : "bg-white text-gray-900 border border-gray-300 focus:ring-indigo-600";
    const errorClasses = touchedFields[fieldName] && formErrors[fieldName as keyof FormErrors]
      ? theme === 'dark' ? "border-red-500" : "border-red-600"
      : "";
      
    return `${baseClasses} ${themeClasses} ${errorClasses}`;
  };
  
  // Button classes
  const primaryButtonClasses = "px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const secondaryButtonClasses = "px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-full transition-colors";
  
  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     transition: {
  //       staggerChildren: 0.1,
  //       staggerDirection: -1,
  //     },
  //   },
  // };
  
  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: { y: 0, opacity: 1 },
  //   exit: { y: -20, opacity: 0 },
  // };
  
  const currentStep3D = (
    <motion.div
      key={`step-${currentStep}`}
      className={`p-8 rounded-xl shadow-xl ${
        theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/90'
      } backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center mb-6">
        <span className="text-4xl">{formSteps[currentStep].emoji}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-center">
        {formSteps[currentStep].label}
      </h3>
      
      <div className="mb-6">
        {formSteps[currentStep].type === 'textarea' ? (
          <textarea
            name={formSteps[currentStep].field}
            value={formState[formSteps[currentStep].field as keyof FormState]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formSteps[currentStep].placeholder}
            className={getInputClasses(formSteps[currentStep].field)}
            rows={5}
          />
        ) : (
          <input
            type={formSteps[currentStep].type}
            name={formSteps[currentStep].field}
            value={formState[formSteps[currentStep].field as keyof FormState]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formSteps[currentStep].placeholder}
            className={getInputClasses(formSteps[currentStep].field)}
          />
        )}
        
        {touchedFields[formSteps[currentStep].field] && 
         formErrors[formSteps[currentStep].field as keyof FormErrors] && (
          <motion.p
            className="mt-2 text-red-500 dark:text-red-400 text-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {formErrors[formSteps[currentStep].field as keyof FormErrors]}
          </motion.p>
        )}
      </div>
      
      <div className="flex justify-between">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={handlePrev}
            className={secondaryButtonClasses}
          >
            Back
          </button>
        ) : (
          <div></div> // Empty div to maintain flex spacing
        )}
        
        {currentStep < formSteps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className={primaryButtonClasses}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={primaryButtonClasses}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        )}
      </div>
      
      {/* Step indicator */}
      <div className="flex justify-center mt-8">
        {formSteps.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full mx-1 ${
              index === currentStep
                ? 'bg-indigo-600 dark:bg-indigo-500'
                : index < currentStep
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
            initial={{ width: index === currentStep ? 12 : 20 }}
            animate={{ width: index === currentStep ? 32 : 12 }}
            style={{ transition: 'width 0.3s ease' }}
          />
        ))}
      </div>
    </motion.div>
  );
  
  // Success message after form submission
  const successMessage = (
    <motion.div
      className={`p-8 rounded-xl shadow-xl text-center ${
        theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/90'
      } backdrop-blur-sm`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
        className="flex items-center justify-center mb-6"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </motion.div>
      
      <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
      <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Thank you for reaching out. I&apos;ll get back to you shortly!
      </p>
      
      <motion.div
        className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="bg-green-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
  
  return (
    <div className="max-w-lg mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <AnimatePresence mode="wait">
          {isSubmitted ? successMessage : currentStep3D}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default DynamicContactForm;