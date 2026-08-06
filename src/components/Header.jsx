import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const closeMenu = () => setIsOpen(false);

  // Scroll shrink effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.toLowerCase());
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-sm'
          : 'bg-white/80 dark:bg-gray-900/30'
      }`}
    >
      <nav
        className={`container mx-auto px-6 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code2
              className={`text-blue-600 dark:text-blue-500 transition-all duration-300 ${
                scrolled ? 'h-6 w-6' : 'h-8 w-8'
              }`}
            />
            <span
              className={`font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text transition-all duration-300 ${
                scrolled ? 'text-xl' : 'text-2xl'
              }`}
            >
              Portfolio
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <NavLinks activeSection={activeSection} closeMenu={closeMenu} />
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center space-x-4">
            <SocialLinks />
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark/light mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-500 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks activeSection={activeSection} closeMenu={closeMenu} />
              <div className="flex justify-center space-x-4 pt-2">
                <SocialLinks />
              </div>
              <button
                onClick={() => { toggleTheme(); closeMenu(); }}
                className="p-2 text-gray-600 dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full mx-auto transition-colors"
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

const NavLinks = ({ activeSection, closeMenu }) => (
  <>
    {NAV_ITEMS.map((item) => {
      const id = item.toLowerCase();
      const isActive = activeSection === id;
      return (
        <a
          key={item}
          href={`#${id}`}
          onClick={closeMenu}
          className={`relative text-sm font-medium transition-colors duration-200 group py-1 ${
            isActive
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {item}
          {/* Active underline indicator */}
          <span
            className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400 transition-all duration-250 ${
              isActive
                ? 'w-full opacity-100'
                : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-40'
            }`}
          />
        </a>
      );
    })}
  </>
);

const SocialLinks = () => (
  <div className="flex items-center space-x-4">
    <motion.a
      href="https://github.com/mh-hamza"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
    >
      <Github size={20} />
    </motion.a>
    <motion.a
      href="https://www.linkedin.com/in/mh-hamza444/"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
    >
      <Linkedin size={20} />
    </motion.a>
    <motion.a
      href="mailto:mhdkh444@gmail.com"
      whileHover={{ scale: 1.2 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
    >
      <Mail size={20} />
    </motion.a>
  </div>
);

export default Header;
