import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import '../index.css'

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = t('hero.roles', { returnObjects: true }) as string[];

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && displayText === currentRole) {
      // Pause at complete word
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }
    
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, currentRoleIndex, isDeleting, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-theme to-theme-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-xl md:text-2xl text-theme-alt mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('hero.greeting')}
          </motion.h2>
          
          <motion.h1 
            className="text-4xl md:text-6xl text-theme mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('hero.name')}
          </motion.h1>
          
          <motion.div
            className="text-4xl md:text-6xl text-primary font-medium mt-10 mb-6 h-12 flex items-center justify-center retro-font"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="relative">
              <span className="inline-block min-w-[120px] text-left uppercase font-bold">
                {displayText}
              </span>
              <span className="absolute right-[-8px] top-0 h-full w-[2px] bg-primary animate-blink"></span>
            </span>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-theme-alt max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a 
              href="#contact" 
              className="inline-block bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 duration-200"
            >
              {t('header.contact')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;