import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Resume from '../assets/Mohammad Hamza Resume.pdf';

// ─── Typing effect hook ───────────────────────────────────────────────────────
const ROLES = [
  'MERN Stack Developer',
  'Full Stack Developer',
  'React.js Developer',
  'Freelance Web Developer',
];

function useTypingEffect(words, typeSpeed = 75, deleteSpeed = 40, pauseMs = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    let timer;
    const current = words[wordIdx];

    if (phase === 'typing') {
      if (display.length < current.length) {
        timer = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          typeSpeed
        );
      } else {
        timer = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timer = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          deleteSpeed
        );
      } else {
        setWordIdx((wordIdx + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [display, phase, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return display;
}

// ─── VS Code-style code snippet ──────────────────────────────────────────────
const CODE_LINES = [
  { n: 1, indent: 0, text: 'const developer = {', color: 'text-blue-400' },
  { n: 2, indent: 1, text: "name: 'Mohammad Hamza',", color: 'text-green-400' },
  { n: 3, indent: 1, text: "role: 'MERN Stack Developer',", color: 'text-green-400' },
  { n: 4, indent: 1, text: "stack: ['React.js', 'Node.js', 'MongoDB'],", color: 'text-yellow-400' },
  { n: 5, indent: 1, text: "location: 'Jaunpur, India',", color: 'text-green-400' },
  { n: 6, indent: 1, text: "available: true,", color: 'text-orange-400' },
  { n: 7, indent: 0, text: '};', color: 'text-blue-400' },
];

const CodeSnippet = () => (
  <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-80 xl:w-96 pointer-events-none select-none z-10">
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
      {/* Title bar */}
      <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2.5 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-gray-400 text-xs font-mono">developer.js</span>
      </div>
      {/* Code */}
      <div className="bg-gray-900 dark:bg-gray-950 px-4 py-4 font-mono text-xs leading-relaxed">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={line.n}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
            className="flex items-start"
          >
            <span className="text-gray-600 w-5 text-right mr-4 text-xs shrink-0 mt-0.5">
              {line.n}
            </span>
            <span
              className={line.color}
              style={{ paddingLeft: `${line.indent * 16}px` }}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Social links ─────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    href: 'https://github.com/mh-hamza',
    Icon: Github,
    label: 'GitHub',
    hoverClass: 'hover:text-gray-900 dark:hover:text-white hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/40',
  },
  {
    href: 'https://www.linkedin.com/in/mh-hamza444/',
    Icon: Linkedin,
    label: 'LinkedIn',
    hoverClass: 'hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-950/10',
  },
  {
    href: 'mailto:mhdkh444@gmail.com',
    Icon: Mail,
    label: 'Email',
    hoverClass: 'hover:text-red-500 dark:hover:text-red-400 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50/30 dark:hover:bg-red-950/10',
  },
];

const SocialLinks = () => (
  <div className="flex items-center flex-wrap gap-3">
    {SOCIAL_LINKS.map(({ href, Icon, label, hoverClass }) => (
      <motion.a
        key={label}
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 dark:border-gray-700
          text-gray-600 dark:text-gray-400 text-xs font-semibold shadow-sm transition-all duration-200 ${hoverClass}`}
      >
        <Icon size={14} />
        <span>{label}</span>
      </motion.a>
    ))}
  </div>
);

// ─── Hero ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '6+', label: 'Projects Shipped' },
  { value: '2+', label: 'Years Coding' },
];

export function Hero() {
  const typedRole = useTypingEffect(ROLES);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_var(--tw-gradient-stops))]
          from-blue-100/70 via-transparent to-transparent
          dark:from-blue-900/20 dark:via-transparent dark:to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 w-full relative">
        {/* Left content — constrained so code snippet has room on lg+ */}
        <div className="lg:max-w-[54%]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                bg-green-50 dark:bg-green-900/20
                text-green-700 dark:text-green-400
                border border-green-200 dark:border-green-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for freelance &amp; internship
              </span>
            </motion.div>

            {/* Sub-heading */}
            <motion.p
              variants={itemVariants}
              className="text-blue-600 dark:text-blue-400 text-lg font-semibold tracking-wide uppercase"
            >
              Welcome to my portfolio
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
            >
              <span className="block">Hi, I'm</span>
              <span className="block mt-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
                Mohammad Hamza
              </span>
            </motion.h1>

            {/* Typing role */}
            <motion.div variants={itemVariants} className="h-8 flex items-center">
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {typedRole}
                <span className="ml-0.5 inline-block w-0.5 h-5 bg-blue-500 dark:bg-blue-400 animate-pulse align-middle" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
            >
              Building full-stack web applications with the MERN stack — clean APIs, fast React UIs, and real solutions for real users.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex items-center flex-wrap gap-x-6 gap-y-2">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="text-center sm:text-left">
                    <span className="font-bold text-gray-900 dark:text-white text-xl">{stat.value}</span>
                    <span className="ml-1.5 text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="hidden sm:block w-px h-5 bg-gray-300 dark:bg-gray-600" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants}>
              <SocialLinks />
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-1">
              <a
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                  text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25
                  transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <ArrowDown className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                  border border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                  hover:border-blue-500 hover:text-blue-600
                  dark:hover:border-blue-400 dark:hover:text-blue-400
                  transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                View Projects
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
        {/* Decorative code snippet — large screens only */}
        <CodeSnippet />
      </div>


      {/* Scroll mouse indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1.5"
        >
          <div className="w-1.5 h-2 bg-blue-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
