import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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
    <section id="contact" className="py-20 bg-theme-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-theme mb-4"
            variants={itemVariants}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p
            className="text-lg text-theme-alt max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t("contact.description")}
          </motion.p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="w-full md:w-2/5 bg-theme rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Quick access for contact information */}
              <h3 className="text-xl font-bold text-theme mb-6">
                {t("contact.contactQuickAccess")}
              </h3>
              <div className="flex space-x-6 justify-center mb-8">
                {/* Email Button */}
                <button
                  type="button"
                  className="flex flex-col items-center justify-center w-20 h-20 bg-primary-light p-4 rounded-full hover:bg-primary transition-colors group"
                  title={t("contact.emailTitle")}
                  onClick={() => {
                    navigator.clipboard.writeText(t("personal.email"));
                    window.open(`mailto:${t("personal.email")}`, "_blank");
                  }}
                >
                  <Mail className="w-6 h-6 text-theme-light transition-transform duration-200 group-hover:scale-125" />
                </button>

                {/* LinkedIn Button */}
                <a
                  href={t("personal.linkedin")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-20 h-20 bg-primary-light p-4 rounded-full hover:bg-primary transition-colors group"
                  title="LinkedIn"
                >
                  <svg
                    className="w-6 h-6 text-theme-light transition-transform duration-200 group-hover:scale-125"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z" />
                  </svg>
                </a>

                {/* GitHub Button */}
                <a
                  href={t("personal.github")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-20 h-20 bg-primary-light p-4 rounded-full hover:bg-primary transition-colors group"
                  title="GitHub"
                >
                  <svg
                    className="w-6 h-6 text-theme-light transition-transform duration-200 group-hover:scale-125"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>

              {/* Additional contact information */}
              <h3 className="text-xl font-bold text-theme mb-6">
                {t("contact.contactInformation")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-light p-3 rounded-full">
                    <Mail className="w-5 h-5 text-theme-light" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-theme-alt">
                      {t("contact.emailTitle")}
                    </h4>
                    <p className="text-theme">{t("personal.email")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-light p-3 rounded-full">
                    <Phone className="w-5 h-5 text-theme-light" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-theme-alt">
                      {t("contact.phoneTitle")}
                    </h4>
                    <p className="text-theme">{t("personal.phone")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-light p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-theme-light" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-theme-alt">
                      {t("contact.locationTitle")}
                    </h4>
                    <p className="text-theme">{t("personal.location")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-3/5 bg-theme rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-theme mb-2">
                    {t("contact.messageSent")}
                  </h3>
                  <p className="text-theme-alt">{t("contact.messageText")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-theme-alt mb-2"
                    >
                      {t("contact.nameLabel")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-primary focus:border-primary bg-theme text-theme"
                      placeholder={t("contact.namePlaceholder")}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-theme-alt mb-2"
                    >
                      {t("contact.emailLabel")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-primary focus:border-primary bg-theme text-theme"
                      placeholder={t("contact.emailPlaceholder")}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-theme-alt mb-2"
                    >
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-primary focus:border-primary bg-theme text-theme"
                      placeholder={t("contact.messagePlaceholder")}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? "Sending..." : t("contact.submitButton")}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
