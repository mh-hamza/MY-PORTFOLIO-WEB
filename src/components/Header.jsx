import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon,Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); 

  return (
    <header className="fixed w-full top-0  dark:bg-gray-900/30  bg-white/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <NavLinks />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SocialLinks />
            <button
              onClick={toggleTheme}
              className="p-2  text-gray-600 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks />
              <div className="flex justify-center space-x-4">
                <SocialLinks />
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

const NavLinks = () => (
  <>
    {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
      <motion.a
        key={item}
        href={`#${item.toLowerCase()}`}
        whileHover={{ scale: 1.1 }}
        className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
      >
        {item}
      </motion.a>
    ))}
  </>
);

const SocialLinks = () => (
  <div className="flex items-center space-x-4">
    <motion.a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    >
      <Github size={20} />
    </motion.a>
    <motion.a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    >
      <Linkedin size={20} />
    </motion.a>
    <motion.a
      href="mailto:contact@example.com"
      whileHover={{ scale: 1.2 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    >
      <Mail size={20} />
    </motion.a>
  </div>
);

export default Header;
