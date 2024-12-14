import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-0"
          >
            <h3 className="text-2xl font-bold mb-2">Mohammad Hamza</h3>
            <p className="text-gray-600 dark:text-gray-400">Building the web, one line at a time</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6"
          >
           <SocialLinks/>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t text-center"
          style={{ borderColor: '#E2E8F0' }}
        >
          <p className="text-gray-400 dark:text-gray-700">
            &copy; {new Date().getFullYear()} mohammadhamza.in All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

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

export default Footer;
