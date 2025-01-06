import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink } from "lucide-react";
import port1 from "../assets/port1.jpeg"
import port2 from "../assets/port2.jpeg"
import port3 from "../assets/port3.jpeg"
import port4 from "../assets/port4.jpeg"
import port5 from "../assets/port5.jpeg"
import port6 from "../assets/port6.jpeg"
const projects = [
  {
    "title": "URL Shortner",
    "description": "A full-stack URL shortener app with click tracking, user location, device information, and the ability to create custom URLs, providing detailed analytics on link interactions.",
    "image": port1,
    "tech": ["React", "Node.js", "MongoDB", "Express"],
    "github": "https://github.com/mh-hamza/URL-SHORTNER-MERN-APP",
    "live": "https://mh-shrink.netlify.app/"
  },
  {
    "title": "Ayush Pathology Lab",
    "description": "A collaborative task management tool with real-time updates and an admin panel for CRUD operations on reports. Also includes an appointment system for clients.",
    "image": port2,
    "tech": ["React", "Firebase", "Tailwind CSS"],
    "github": "https://github.com/mh-hamza/Ayush-Pathology-Demo",
    "live": "https://ayush-pathology-demo.netlify.app/"
  },
  {
    "title": "College Web",
    "description": "A responsive website for the college with real-time features, an admin panel for managing school data, and an online admission system, built using React and Firebase.",
    "image": port3,
    "tech": ["React", "Firebase"],
    "github": "https://sgsic-demo.netlify.app/",
    "live": "https://sgsic-demo.netlify.app/"
  },
  {
    "title": "Space Web",
    "description": "UI-only model of a space-themed website showcasing modern design with AOS animations, without any functional backend.",
    "image": port4,
    "tech": ["React", "Tailwind CSS", "AOS animation"],
    "github": "https://github.com/mh-hamza/SPACE-WEBSITE-React",
    "live": "https://mh-space-tech.netlify.app/"
  },
  {
    "title": "Task Manager Todo",
    "description": "A task management app with real-time updates, built with React and Firebase, allowing users to manage tasks efficiently.",
    "image": port5,
    "tech": ["React", "Firebase"],
    "github": "https://github.com/mh-hamza/TASK-MANAGER",
    "live": "https://task-manager-project-work.netlify.app/"
  },
  {
    "title": "Old Portfolio",
    "description": "A personal, fully responsive portfolio website with smooth AOS animations with a modern design.",
    "image": port6,
    "tech": ["HTML", "CSS", "JavaScript", "AOS animation"],
    "github": "https://github.com/mh-hamza/My-Personal-Portfolio",
    "live": "https://mhhamza.netlify.app/"
  }
];


const Projects = () => {
  const [ref, inView] = useInView({
    // triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 ">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl pl-2 mb-8 border-l-4  font-sans font-bold border-blue-600 dark:text-white text-gray-900">
            Featured Projects
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
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

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
  >
    <div className="relative group overflow-hidden">
      <img
        src={project.image || "https://via.placeholder.com/400x300"}
        alt={project.title || "Project Image"}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 object-top"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
        {project.github && (
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-white dark:bg-gray-700 rounded-full"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 text-gray-900 dark:text-gray-100" />
          </motion.a>
        )}
        {project.live && (
          <motion.a
            href={project.live}
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-white dark:bg-gray-700 rounded-full"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Project"
          >
            <ExternalLink className="w-6 h-6 text-gray-900 dark:text-gray-100" />
          </motion.a>
        )}
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default Projects;
