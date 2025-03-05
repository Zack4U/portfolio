import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  lenguages: string[];
  media?: string[];
  demo?: string;
  source: string[];
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Get projects from translations
  const projects = t('projects.items', { returnObjects: true }) as Project[];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (!isPaused && currentIndex !== null) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % projects.length : 0));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, projects.length, currentIndex]);

  const handleProjectHover = (index: number) => {
    setActiveProject(index);
    setIsPaused(true);
  };

  const handleProjectLeave = () => {
    setActiveProject(null);
    setIsPaused(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      id="projects" 
      className="py-20 bg-theme-alt"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-theme mb-4"
            variants={itemVariants}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto"
            variants={itemVariants}
          ></motion.div>
        </motion.div>

        <div className="relative overflow-hidden" ref={projectsRef}>
          <div className="flex flex-wrap -mx-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`px-4 w-full md:w-1/2 lg:w-1/3 mb-8 transition-all duration-500 ${
                  activeProject === index ? 'md:w-1/2 lg:w-1/2' : ''
                } ${
                  currentIndex === index && activeProject === null ? 'md:w-1/2 lg:w-1/2' : ''
                }`}
                onMouseEnter={() => handleProjectHover(index)}
                onMouseLeave={handleProjectLeave}
                initial="hidden"
                animate={controls}
                variants={itemVariants}
              >
                <div 
                  className={`project-card bg-theme rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 ${
                    activeProject === index || (currentIndex === index && activeProject === null)
                      ? 'scale-105 shadow-xl'
                      : 'hover:scale-105'
                  }`}
                >
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={ '/src/assets/projects/default.jpeg'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 flex flex-wrap gap-2">
                      {project.lenguages.map((lang, langIndex) => (
                        <span
                          key={langIndex}
                          className="inline-block bg-primary-light text-theme-light text-xs px-2 py-1 rounded"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 glass-effect">
                    <h3 className="text-xl font-bold text-theme-dark mb-2">
                      {project.title}
                    </h3>
                    <p className="text-primary-dark mb-4">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-theme-dark mb-2">
                        {t('projects.technologies')}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-primary-light text-theme-light text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={project.demo || project.source[0]}
                      className="inline-block text-primary hover:text-primary-hover font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('projects.viewProject')} →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;