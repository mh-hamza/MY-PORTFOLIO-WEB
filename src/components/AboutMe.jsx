import React, { useRef, useState, useEffect } from "react";
import { User, Briefcase, School, Heart, Flame } from "lucide-react";  // Imported a new icon (Flame)
import myImage from "../assets/profileImage.jpg"

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

// AboutMe Section
const AboutMe = () => {
  const sections = [
    {
      title: "Who Am I",
      icon: <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      description:
        "I am a passionate web developer who loves to create elegant and functional websites using modern technologies like React, Node.js, and MongoDB.",
    },
    {
      title: "Experience",
      icon: <Briefcase className="h-8 w-8 text-green-600 dark:text-green-400" />,
      description:
        "With over 2 years of experience in full-stack web development, I have worked on several projects involving front-end and back-end technologies.",
    },
    {
      title: "Education",
      icon: <School className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />,
      description:
        "I hold a Bachelor's degree in Computer Science and have specialized in web development, data structures, and algorithms.",
    },
    {
      title: "Hobbies",
      icon: <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />,
      description:
        "When I'm not coding, I love hiking, photography, exploring new technologies, and reading tech blogs to stay updated with the latest trends.",
    },
    // New "Passion" section added
    {
      title: "Passion",
      icon: <Flame className="h-8 w-8 text-orange-600 dark:text-orange-400" />,  // Using Flame icon
      description:
        "I am deeply passionate about creating impactful digital experiences. The constant challenge of solving problems through code keeps me excited and motivated every day.",
    }
  ];

  return (
    <div id="about" className="dark:bg-gray-800 w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src={myImage}
              alt="My Image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <div className="space-y-12">
              {sections.map((section, index) => (
                <AnimatedSection key={section.title} delay={200 * (index + 1)}>
                  <div className="flex items-center space-x-6 mb-6">
                    <div>{section.icon}</div>
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {section.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AnimatedSection for smooth scroll animation
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

export default AboutMe;
