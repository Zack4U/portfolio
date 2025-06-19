import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "/logo.svg?react";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("header.home"), href: "#home" },
    { name: t("header.projects"), href: "#projects" },
    { name: t("header.experience"), href: "#experience" },
    { name: t("header.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50  ${
        isScrolled ? "bg-theme/90 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a
              href="#home"
              className="text-xl font-bold text-theme flex items-center "
            >
              <Logo className="h-10 w-10 mr-2 text-theme" />
              {t("hero.name")}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-theme-alt hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-theme-alt transition-colors"
                aria-label={
                  theme === "dark" ? t("theme.light") : t("theme.dark")
                }
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-theme" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={toggleLanguageMenu}
                  className="p-2 rounded-full hover:bg-theme-alt transition-colors flex items-center"
                  aria-label="Change language"
                >
                  <Globe size={20} className="text-theme-alt" />
                </button>

                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-theme rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        i18n.language === "en"
                          ? "text-primary bg-theme-alt"
                          : "text-theme-alt hover:bg-theme-alt"
                      }`}
                    >
                      {t("language.en")}
                    </button>
                    <button
                      onClick={() => changeLanguage("es")}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        i18n.language === "es"
                          ? "text-primary bg-theme-alt"
                          : "text-theme-alt hover:bg-theme-alt"
                      }`}
                    >
                      {t("language.es")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-theme-alt transition-colors"
              aria-label={theme === "dark" ? t("theme.light") : t("theme.dark")}
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-theme" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-theme-alt hover:bg-theme-alt transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-theme shadow-lg"
        >
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-theme-alt hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="py-2 border-t border-theme">
              <button
                onClick={() => {
                  changeLanguage("en");
                  setIsMenuOpen(false);
                }}
                className={`block py-2 w-full text-left ${
                  i18n.language === "en" ? "text-primary" : "text-theme-alt"
                }`}
              >
                {t("language.en")}
              </button>
              <button
                onClick={() => {
                  changeLanguage("es");
                  setIsMenuOpen(false);
                }}
                className={`block py-2 w-full text-left ${
                  i18n.language === "es" ? "text-primary" : "text-theme-alt"
                }`}
              >
                {t("language.es")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
