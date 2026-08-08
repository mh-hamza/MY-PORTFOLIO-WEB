import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

// ─── Skill data by category ───────────────────────────────────────────────────
const CATEGORIES = [
  {
    name: 'Frontend',
    color: 'blue',
    skills: [
      { name: 'HTML',          level: 95 },
      { name: 'CSS',           level: 90 },
      { name: 'JavaScript',    level: 85 },
      { name: 'React.js',      level: 85 },
      { name: 'Next js',       level: 75 },
      { name: 'Redux',         level: 70 },
      { name: 'Tailwind CSS',  level: 90 },
      { name: 'Framer Motion', level: 75 },
      { name: 'Shadcn',        level: 80 },
    ],
  },

  {
    name: 'Backend & Database',
    color: 'green',
    skills: [
      { name: 'Node.js',       level: 80 },
      { name: 'Express.js',    level: 80 },
      { name: 'MongoDB',       level: 80 },
      { name: 'Firebase',      level: 75 },
      { name: 'JWT Auth',      level: 85 },
      { name: 'REST APIs',     level: 85 },
      { name: 'Mongoose',      level: 80 },
      { name: 'Multer',        level: 75 },
      { name: 'bcrypt.js',     level: 80 },
    ],
  },

  {
    name: 'Dev Tools',
    color: 'orange',
    skills: [
      { name: 'Git',           level: 85 },
      { name: 'GitHub',        level: 85 },
      { name: 'VS Code',       level: 90 },
      { name: 'Vercel',        level: 80 },
      { name: 'Netlify',       level: 80 },
      { name: 'Postman',       level: 75 },
      { name: 'Vite',          level: 85 },
      { name: 'NPM',           level: 85 },
      { name: 'Chrome DevTools', level: 80 },
    ],
  },
];

// Tailwind color maps — avoids dynamic class generation issues
const COLOR = {
  blue: {
    bar:    'bg-blue-500 dark:bg-blue-400',
    badge:  'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
    header: 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
  },
  green: {
    bar:    'bg-green-500 dark:bg-green-400',
    badge:  'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300',
    header: 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/50',
  },
  orange: {
    bar:    'bg-orange-500 dark:bg-orange-400',
    badge:  'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300',
    header: 'text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800/50',
  },
};

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ name, level, color, index, animate }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{level}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${COLOR[color].bar}`}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({ category, cardDelay }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const c = COLOR[category.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: cardDelay }}
      className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md
        transition-shadow duration-200 border border-gray-100 dark:border-gray-600 flex flex-col h-full"
    >
      {/* Category header */}
      <h3 className={`text-sm font-bold uppercase tracking-widest mb-5 pb-3 border-b ${c.header}`}>
        {category.name}
      </h3>

      {/* Skill bars */}
      <div className="space-y-4 flex-1">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            index={i}
            animate={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Skills section ───────────────────────────────────────────────────────────
const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div id="skills" className="bg-gray-50 dark:bg-gray-800 w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl pl-3 mb-3 border-l-4 font-bold border-blue-600 dark:text-white text-gray-900">
            Skills &amp; Tools
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 pl-3 text-sm">
            Technologies I use professionally, grouped by area.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.name}
              category={category}
              cardDelay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

