import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import port1 from '../assets/port1.jpeg';
import port2 from '../assets/port2.jpeg';
import port3 from '../assets/port3.jpeg';
import port4 from '../assets/port4.jpeg';
import port5 from '../assets/port5.jpeg';
import port6 from '../assets/port6.jpeg';

const PROJECTS = [
  {
    title: 'E-Commerce Store (SAAD FurniStore)',
    description:
      'A full-featured e-commerce platform with a customer store and a separate admin dashboard. Built with React and Tailwind to provide a seamless catalog browsing, shopping cart, and store management experience.',
    image: port6,
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    github: 'https://github.com/mh-hamza/e-commerce',
    live: 'https://saad-ecom-client.netlify.app/',
    adminLive: 'https://saad-ecom-admin.netlify.app/',
  },
  {
    title: 'URL Shortener',
    description:
      'Lets users shorten any URL, create custom slugs, and see exactly who clicked — capturing device type, location, and timestamp. Built to replace paid analytics tools for small businesses.',
    image: port1,
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/mh-hamza/URL-SHORTNER-MERN-APP',
    live: 'https://mh-shrink.netlify.app/',
  },
  {
    title: 'Ayush Pathology Lab',
    description:
      'A working management system for a real pathology lab — staff can CRUD test reports, patients can book appointments, and everything updates in real time. Deployed and actively used.',
    image: port2,
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/mh-hamza/Ayush-Pathology-Demo',
    live: 'https://ayush-pathology-demo.netlify.app/',
  },
  {
    title: 'College Website',
    description:
      'Full college website with an admin panel for managing notices, faculty, and gallery — plus an online admission form that captures student data directly into Firebase, replacing manual paperwork.',
    image: port3,
    tech: ['React', 'Firebase'],
    github: 'https://github.com/mh-hamza/sgsic-demo',
    live: 'https://sgsic-demo.netlify.app/',
  },
  {
    title: 'Space Web',
    description:
      'A visually ambitious space-themed UI showcase built to practice advanced CSS, Tailwind layouts, and AOS scroll animations — focused purely on polished design and motion.',
    image: port4,
    tech: ['React', 'Tailwind CSS', 'AOS Animation'],
    github: 'https://github.com/mh-hamza/SPACE-WEBSITE-React',
    live: 'https://mh-space-tech.netlify.app/',
  },
  {
    title: 'Task Manager',
    description:
      'A real-time to-do app where tasks sync instantly across tabs. Supports task categorisation, status tracking, and Firebase authentication — built as a productivity tool for personal use.',
    image: port5,
    tech: ['React', 'Firebase'],
    github: 'https://github.com/mh-hamza/TASK-MANAGER',
    live: 'https://task-manager-project-work.netlify.app/',
  },
];

// ─── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl
      transition-all duration-300 overflow-hidden flex flex-col
      hover:-translate-y-1.5"
  >
    {/* Image with zoom overlay */}
    <div className="relative overflow-hidden h-48 flex-shrink-0">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      {/* Dark overlay with icon links on hover */}
      <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100
        transition-opacity duration-300 flex flex-wrap items-center justify-center gap-3 px-2">
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full
              text-gray-900 dark:text-gray-100 text-xs font-medium shadow-lg
              hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </motion.a>
        )}
        {project.live && (
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live demo"
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-full
              text-white text-xs font-medium shadow-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </motion.a>
        )}
        {project.adminLive && (
          <motion.a
            href={project.adminLive}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View admin panel"
            whileHover={{ scale: 1.15 }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-full
              text-white text-xs font-medium shadow-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Admin Demo
          </motion.a>
        )}
      </div>
    </div>

    {/* Card body */}
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/30
              text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Bottom icon links (always visible on mobile) */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 md:hidden">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </a>
        )}
        {project.adminLive && (
          <a
            href={project.adminLive}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Admin Demo
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

// ─── Projects section ─────────────────────────────────────────────────────────
const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl pl-3 mb-3 border-l-4 font-bold border-blue-600 dark:text-white text-gray-900">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 pl-3 text-sm">
            Things I've built — from side projects to real deployed products.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
