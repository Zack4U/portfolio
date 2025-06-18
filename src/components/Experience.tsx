import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineItem {
  title: string;
  institution?: string;
  company?: string;
  period: string;
  description: string;
}

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const education = t("experience.items.education", {
    returnObjects: true,
  }) as TimelineItem[];
  const work = t("experience.items.work", {
    returnObjects: true,
  }) as TimelineItem[];

  return (
    <section id="experience" className="py-20 app-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-theme mb-4 glassmorphism-mid">
            {t("experience.title")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Education Timeline */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-theme mb-8 text-center glassmorphism-mid">
              {t("experience.education")}
            </h3>
            <div className="relative ">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-primary-light "></div>

              {/* Timeline Items */}
              {education.map((item, index) => (
                <TimelineCard
                  key={index}
                  item={item}
                  index={index}
                  isLeft={true}
                  total={education.length}
                />
              ))}
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div className="w-full md:w-1/2 ">
            <h3 className="text-2xl font-bold text-theme mb-8 text-center glassmorphism-mid">
              {t("experience.work")}
            </h3>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-primary-light"></div>

              {/* Timeline Items */}
              {work.map((item, index) => (
                <TimelineCard
                  key={index}
                  item={item}
                  index={index}
                  isLeft={false}
                  total={work.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
  total: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  item,
  index,
  isLeft,
  total,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    hidden: {
      opacity: 0.1,
      x: isLeft ? -20 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={`relative mb-12 ${index === total - 1 ? "mb-0" : ""}`}
    >
      {/* Timeline Dot */}
      <div className="absolute  md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-theme z-10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>

      {/* Card */}
      <div
        className={`ml-12 md:ml-0 md:w-[calc(100%-20px)] ${
          isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
        } relative`}
      >
        <div className="bg-theme rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 glassmorphism">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full mb-3">
            {item.period}
          </span>
          <h4 className="text-xl font-bold text-theme mb-2">{item.title}</h4>
          <p className="text-primary font-medium mb-3">
            {item.institution || item.company}
          </p>
          <p className="text-theme-alt">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
