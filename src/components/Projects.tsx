import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  lenguages: string[];
  media?: string[];
  demo?: string;
  source: string[];
}

const ProjectCarousel3D: React.FC<{
  projects: Project[];
  onProjectChange: (index: number) => void;
  currentIndex: number;
}> = ({ projects, onProjectChange, currentIndex }) => {
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    onProjectChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    onProjectChange(newIndex);
  };

  const goToSlide = (index: number) => {
    onProjectChange(index);
  };

  const getVisibleProjects = () => {
    const visible = [];
    const totalProjects = projects.length;

    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalProjects) % totalProjects;
      visible.push({
        project: projects[index],
        position: i,
        originalIndex: index,
      });
    }

    return visible;
  };

  const getCardStyles = (position: number) => {
    const baseStyles: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      transition: "all 0.5s ease-in-out",
      width: "200px",
      height: "120px",
    };

    switch (position) {
      case -2:
        return {
          ...baseStyles,
          left: "0%",
          transform: "translateY(-50%) scale(0.7)",
          zIndex: 1,
          opacity: 0.3,
        };
      case -1:
        return {
          ...baseStyles,
          left: "18%",
          transform: "translateY(-50%) scale(0.85)",
          zIndex: 2,
          opacity: 0.6,
        };
      case 0:
        return {
          ...baseStyles,
          left: "50%",
          transform: "translateY(-50%) translateX(-50%) scale(1)",
          zIndex: 3,
          opacity: 1,
        };
      case 1:
        return {
          ...baseStyles,
          right: "18%",
          transform: "translateY(-50%) scale(0.85)",
          zIndex: 2,
          opacity: 0.6,
        };
      case 2:
        return {
          ...baseStyles,
          right: "0%",
          transform: "translateY(-50%) scale(0.7)",
          zIndex: 1,
          opacity: 0.3,
        };
      default:
        return {
          ...baseStyles,
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  return (
    <div className="relative w-full h-40 overflow-hidden bg-theme-alt rounded-lg mb-6">
      <div className="relative w-full h-full">
        {getVisibleProjects().map(({ project, position, originalIndex }) => (
          <motion.div
            key={`${originalIndex}-${position}`}
            className="bg-theme rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center text-center p-3"
            style={getCardStyles(position)}
            onClick={() => position !== 0 && goToSlide(originalIndex)}
          >
            {/* Nombre del proyecto */}
            <h3
              className={`font-bold text-theme mb-2 ${
                position === 0 ? "text-base" : "text-sm"
              }`}
            >
              {project.title}
            </h3>

            {/* Lenguajes */}
            <div className="flex flex-wrap gap-1 justify-center">
              {project.lenguages
                .slice(0, position === 0 ? 3 : 2)
                .map((lang, langIndex) => (
                  <span
                    key={langIndex}
                    className={`inline-block bg-primary-light text-theme-light rounded ${
                      position === 0
                        ? "text-xs px-2 py-1"
                        : "text-xs px-1 py-0.5"
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              {project.lenguages.length > (position === 0 ? 3 : 2) && (
                <span className="text-theme-alt text-xs">
                  +{project.lenguages.length - (position === 0 ? 3 : 2)}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-theme/80 hover:bg-theme text-theme-alt hover:text-theme p-1.5 rounded-full shadow-lg z-10 transition-all text-sm"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-theme/80 hover:bg-theme text-theme-alt hover:text-theme p-1.5 rounded-full shadow-lg z-10 transition-all text-sm"
      >
        →
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-theme-alt hover:bg-primary-light"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0); // Nuevo estado
  const [pauseUntil, setPauseUntil] = useState<number>(0);

  const projects = t("projects.items", { returnObjects: true }) as Project[];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setCurrentProjectIndex(0); // Reinicia el índice de proyecto al entrar en vista
    }
  }, [controls, inView]);

  useEffect(() => {
    setCurrentMediaIndex(0); // Reinicia el índice de media al cambiar de proyecto
  }, [currentProjectIndex]);

  // Carrusel automático
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      if (Date.now() > pauseUntil) {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [inView, projects.length, pauseUntil]);

  const handleProjectChange = (index: number) => {
    setCurrentProjectIndex(index);
    setPauseUntil(Date.now() + 180000); // Pausa 180 segundos
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

  const currentProject = projects[currentProjectIndex];
  const mediaList =
    currentProject.media && currentProject.media.length > 0
      ? currentProject.media
      : ["/src/assets/projects/default.jpeg"];
  const safeMediaIndex =
    currentMediaIndex >= mediaList.length ? 0 : currentMediaIndex;
  const currentMedia = mediaList[safeMediaIndex];

  const isVideo = (url: string) => {
    return (
      url.includes(".mp4") ||
      url.includes(".webm") ||
      url.includes(".ogg") ||
      url.includes("video")
    );
  };

  // Funciones para cambiar de media
  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaList.length - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === mediaList.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="projects" className="py-20 bg-theme-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-theme mb-4  text-center"
            variants={itemVariants}
          >
            {t("projects.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>

          {/* Carrusel 3D de Proyectos */}
          <ProjectCarousel3D
            projects={projects}
            onProjectChange={handleProjectChange}
            currentIndex={currentProjectIndex}
          />

          {/* Proyecto Principal */}
          <div className="flex flex-col lg:flex-row items-stretch bg-theme rounded-lg shadow-lg overflow-hidden">
            {/* Imagen/Video Principal - Izquierda */}
            <div className="lg:w-3/5 w-full  bg-theme-alt flex items-center justify-center relative">
              {/* Flecha Izquierda */}
              {mediaList.length > 1 && (
                <button
                  onClick={handlePrevMedia}
                  className="media-arrow group absolute left-0 top-0 h-full w-16 flex items-center justify-center bg-transparent z-10"
                  aria-label="Anterior"
                >
                  <span className="arrow-circle flex items-center justify-center w-12 h-12 rounded-full text-primary text-2xl transition-all group-hover:animate-bounce-side">
                    ←
                  </span>
                </button>
              )}
              <motion.div
                key={currentMedia}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                {isVideo(currentMedia) ? (
                  <video
                    src={currentMedia}
                    className="w-full h-full object-cover "
                    controls
                    muted
                    loop
                    autoPlay
                  />
                ) : (
                  <img
                    src={currentMedia}
                    alt={currentProject.title}
                    className="w-full h-full object-cover "
                  />
                )}
              </motion.div>
              {/* Flecha Derecha */}
              {mediaList.length > 1 && (
                <button
                  onClick={handleNextMedia}
                  className="media-arrow group absolute right-0 top-0 h-full w-16 flex items-center justify-center bg-transparent z-10"
                  aria-label="Siguiente"
                >
                  <span className="arrow-circle flex items-center justify-center w-12 h-12 rounded-full text-primary text-2xl transition-all group-hover:animate-bounce-side">
                    →
                  </span>
                </button>
              )}
              {/* Indicadores de media */}
              {mediaList.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {mediaList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMediaIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === safeMediaIndex
                          ? "bg-primary scale-125"
                          : "bg-theme-alt hover:bg-primary-light"
                      }`}
                      aria-label={`Media ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Información del Proyecto - Derecha */}
            <div className="lg:w-2/5 w-full flex flex-col p-8 relative bg-theme">
              <motion.div
                key={currentProjectIndex}
                className="h-full flex flex-col"
              >
                <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
                  {currentProject.lenguages.map((lang, langIndex) => (
                    <span
                      key={langIndex}
                      className="inline-block bg-primary-light text-theme-light text-xs px-2 py-1 rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-theme mb-4 pr-20">
                  {currentProject.title}
                </h3>

                <p className="text-theme-alt mb-6 flex-grow text-sm lg:text-base">
                  {currentProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-theme mb-3">
                    {t("projects.technologies")}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block bg-primary-light text-theme-light text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      className="inline-block text-primary hover:text-primary-hover font-medium text-center sm:text-left"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("projects.viewProject")} →
                    </a>
                  )}
                  {currentProject.source &&
                    currentProject.source.length > 0 && (
                      <a
                        href={currentProject.source[0]}
                        className="inline-block text-theme-alt hover:text-theme font-medium text-center sm:text-left"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("projects.viewProject")} →
                      </a>
                    )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
