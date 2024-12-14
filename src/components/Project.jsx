import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Node.js", "MongoDB", "Redux"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management System",
    description: "Collaborative task management tool with real-time updates",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tech: ["MERN Stack", "Socket.io", "JWT"],
    github: "#",
    live: "#",
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Express", "Chart.js"],
    github: "#",
    live: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Node.js", "MongoDB", "Redux"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management System",
    description: "Collaborative task management tool with real-time updates",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tech: ["MERN Stack", "Socket.io", "JWT"],
    github: "#",
    live: "#",
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Express", "Chart.js"],
    github: "#",
    live: "#",
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
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
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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
