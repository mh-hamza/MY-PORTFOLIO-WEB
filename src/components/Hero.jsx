import React from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 " />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ddf1fc]
          via-[#ffffff00]
          to-[#ffffff00] dark:from-[#2177972b]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <div className="text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3, // Stagger animations for child elements
                },
              },
            }}
            className="space-y-6"
          >
            {/* Animated Subheading */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-blue-600 dark:text-blue-400 text-lg font-semibold tracking-wide uppercase"
            >
              Welcome to my portfolio
            </motion.h2>

            {/* Animated Heading */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 1, type: "spring", stiffness: 80 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
            >
              <span className="block">Hi, I'm</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
                Mohammad Hamza
              </span>
            </motion.h1>

            {/* Animated Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              A passionate MERN Stack Developer crafting beautiful and
              functional web experiences. Specialized in building modern
              applications with MongoDB, Express.js, React.js, and Node.js.
            </motion.p>

            {/* Animated Social Links */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
              className="flex justify-center space-x-6 mt-8"
            >
              <SocialLinks />
            </motion.div>

            {/* Animated Call-to-Action */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="mt-12"
            >
              <a
                href="#about"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <span>Learn more about me</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

const SocialLinks = () => (
  <div className="flex items-center space-x-4">
    <motion.a
      href="https://github.com/mh-hamza"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.3, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    >
      <Github size={20} />
    </motion.a>
    <motion.a
      href="https://www.linkedin.com/in/mh-hamza444/"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.3, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    >
      <Linkedin size={20} />
    </motion.a>
    <motion.a
      href="mailto:mhdkh444@gmail.com"
      whileHover={{ scale: 1.3, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    >
      <Mail size={20} />
    </motion.a>
  </div>
);
