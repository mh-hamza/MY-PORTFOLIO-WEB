import React, { useRef, useState, useEffect } from "react";
import {
  Server,
  Database,
  Code,
  Globe,
  Laptop,
  GitBranch,
  Terminal,
  Braces,
  Flame,
} from "lucide-react";
import waveImage from "../assets/03867548d25035d175d00b6a2084e27b.gif";
// Custom hook for intersection observer
function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isVisible };
}

// SkillCard Component
function SkillCard({ name, icon: Icon, description }) {
  return (
    <div className="relative group">
      <div className="relative p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div className="flex flex-col items-center">
          <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// AnimatedSection Component
function AnimatedSection({ children, className = "", delay = 0 }) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Skills Component
const Skills = () => {
  const skills = [
    {
      name: "MongoDB",
      icon: Database,
      description: "NoSQL database management & data modeling",
    },
    {
      name: "Express.js",
      icon: Server,
      description: "RESTful API development & middleware integration",
    },
    {
      name: "React.js",
      icon: Code,
      description: "Frontend development with modern React patterns",
    },
    {
      name: "Node.js",
      icon: Globe,
      description: "Server-side JavaScript & runtime environment",
    },
    {
      name: "Firebase",
      icon: Flame,
      description: "Real-time database & Auth services",
    },
    {
      name: "Git",
      icon: GitBranch,
      description: "Version control & collaboration",
    },
    {
      name: "RESTful APIs",
      icon: Terminal,
      description: "API design & implementation",
    },
    {
      name: "Responsive Design",
      icon: Laptop,
      description: "Cross-platform web development",
    },
  ];

  return (
    <div id="skills" className=" bg-white dark:bg-gray-800 w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-2xl md:text-3xl pl-2 mb-8 border-l-4  font-sans font-bold border-blue-600 dark:text-white text-gray-900">
        What I Know
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={200 * (index + 1)}>
              <SkillCard {...skill} />
            </AnimatedSection>
          ))}
        </div>
      </div>
      <img
        src={waveImage}
        alt="wave"
        className="w-full max-w-[1200px] mx-auto opacity-80 mix-blend-exclusion filter contrast-150  hue-rotate-[200deg] saturate-[2.5] dark:mix-blend-lighten dark:hue-rotate-0 dark:saturate-100 "
      />
    </div>
  );
};
export default Skills;
