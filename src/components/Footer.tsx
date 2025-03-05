import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Kevin Lopez</h2>
            <p className="text-gray-400 mt-2">
              {t('hero.description')}
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            
            
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary transition-colors">
                  {t('header.home')}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-primary transition-colors">
                  {t('header.projects')}
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-400 hover:text-primary transition-colors">
                  {t('header.experience')}
                </a>
              </li>
              <li>
                 <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  {t('header.contact')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;