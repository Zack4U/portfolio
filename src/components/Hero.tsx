import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import "../index.css";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = t("hero.roles", { returnObjects: true }) as string[];
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentRole) {
      // Pause at complete word
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (isDeleting && displayText === "") {
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

  const handleCopyEmail = () => {
    const email = t("personal.email");
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 app-bg"
    >
      {isCopied && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white bg-green-500">
          {t("hero.emailCopied")}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glassmorphism">
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
              {t("hero.greeting")}
            </motion.h2>

            <motion.h1
              className="text-4xl md:text-5xl text-theme mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("hero.name")}
            </motion.h1>

            <motion.div
              className="text-4xl md:text-6xl text-primary font-medium mt-10 mb-6 h-12 flex items-center justify-center retro-font"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="relative w-full max-w-full min-w-0 flex items-center justify-center">
                <span
                  className="
                    inline-block
                    w-full
                    max-w-full
                    min-w-0
                    text-center
                    uppercase
                    font-bold
                    text-[clamp(1.25rem,6vw,2.5rem)]
                    truncate
                    text-primary
                  "
                  style={{ lineHeight: 1.1 }}
                >
                  {displayText}
                  <span className="inline-block w-[2px] h-[1em] align-baseline bg-primary animate-blink ml-1"></span>
                </span>
              </span>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-theme-alt max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t("hero.description")}
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
                {t("header.contact")}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex justify-center space-x-4 mt-4"
            >
              <a
                href={`mailto:${t("personal.email")}`}
                onClick={handleCopyEmail}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium py-3 rounded-full transition-colors transform hover:-translate-y-1 active:translate-y-0 duration-200"
                aria-label="Email"
              >
                <Mail size={20} className="text-theme-alt" />
              </a>
              {/* Github Button */}
              <a
                href={t("personal.github")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium py-3 rounded-full transition-colors transform hover:-translate-y-1 active:translate-y-0 duration-200 "
                aria-label="Github"
              >
                <Github size={20} className="text-theme-alt" />
              </a>
              {/* LinkedIn Button */}
              <a
                href={t("personal.linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium py-3 rounded-full transition-colors transform hover:-translate-y-1 active:translate-y-0 duration-200 "
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-theme-alt" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
