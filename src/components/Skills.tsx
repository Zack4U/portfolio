import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Obtiene la lista de tecnologías desde el archivo de traducción
  const technologies = t("technologies.items", { returnObjects: true }) as {
    name: string;
    description: string;
    icon: string;
  }[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-theme-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-theme mb-4 "
            variants={itemVariants}
          >
            {t("technologies.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-theme-alt max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t("technologies.description")}
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center justify-center bg-theme rounded-xl shadow-md p-6  hover:scale-105 transition-transform"
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                borderColor: "rgb(220, 20, 60)",
                borderWidth: "2px",
                boxShadow: "0 8px 32px 0 rgba(220,20,60,0.15)",
              }}
              style={{ border: "2px solid transparent" }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-12 h-12 mb-3 object-contain"
                loading="lazy"
              />
              <span className="text-theme-alt font-medium text-sm text-center mb-1">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
