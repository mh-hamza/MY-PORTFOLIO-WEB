import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const SOCIAL = [
  { href: 'https://github.com/mh-hamza',              Icon: Github,   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/mh-hamza444/', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:mhdkh444@gmail.com',                Icon: Mail,     label: 'Email'    },
];

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-1">Mohammad Hamza</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Full Stack Web Developer &amp; BCA Student based in Jaunpur, UP.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex space-x-5"
          >
            {SOCIAL.map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center space-y-2"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with <span className="text-blue-600 dark:text-blue-400 font-medium">React</span>,{' '}
            <span className="text-blue-600 dark:text-blue-400 font-medium">Tailwind CSS</span> &amp; a lot of coffee ☕
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} mohammadhamza.in — All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
