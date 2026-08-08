import React, { useRef, useState, useEffect } from 'react';
import { User, Briefcase, School, Heart, Flame } from 'lucide-react';
import myImage from '../assets/profileImage.jpg';

// ─── Shared custom hook ───────────────────────────────────────────────────────
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, ...options }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => { if (elementRef.current) observer.unobserve(elementRef.current); };
  }, []);

  return { elementRef, isVisible };
}

// ─── Section data ─────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    title: 'Who Am I',
    icon: <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    description:
      "I'm a MERN stack developer and BCA student who loves building real, usable web products. My stack spans React, Next.js, Node.js, Express, MongoDB, Firebase, and Tailwind CSS. Alongside development, I run a Jan Seva Kendra (digital service centre), which keeps me grounded in solving real, everyday problems with technology.",
  },
  {
    title: 'Experience',
    icon: <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />,
    description:
      '2+ years of hands-on experience with JavaScript and the MERN ecosystem. I have shipped 6+ full-stack projects — from a URL shortener with click analytics to admin-panel-driven React + Firebase applications — covering both frontend (React, Tailwind, Framer Motion) and backend (Node.js, Express, REST APIs, MongoDB).',
  },
  {
    title: 'Education',
    icon: <School className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
    description:
      'Completed High School and Intermediate from SGSIC Samodhpur. Currently pursuing a Bachelor of Computer Applications (BCA) at Dr. Ram Manohar Lohia Avadh University.',
  },
  {
    title: 'Hobbies',
    icon: <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />,
    description:
      "When not coding — photography, gaming, and tinkering with new dev tools. I follow tech blogs regularly and try to ship something new every few weeks to keep the momentum going.",
  },
  {
    title: 'Passion',
    icon: <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
    description:
      "Driven by the challenge of turning a blank editor into something that genuinely helps people. The MERN stack is my primary playground, but I'm always exploring — Next.js, animations, and performance tuning keep me excited.",
  },
];

// ─── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({ section, index, isLast }) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`flex gap-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Icon + vertical connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center
          bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
          shadow-sm z-10">
          {section.icon}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 min-h-[2rem] bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-600 dark:to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 pt-1.5 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          {section.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {section.description}
        </p>
      </div>
    </div>
  );
}

// ─── About Me ─────────────────────────────────────────────────────────────────
const AboutMe = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div id="about" className="dark:bg-gray-800 w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-14">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Profile photo */}
          <div
            ref={elementRef}
            className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              <img
                src={myImage}
                alt="Mohammad Hamza"
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
                loading="lazy"
              />
              {/* Subtle accent border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-blue-200 dark:border-blue-800/50 -z-10" />
            </div>
          </div>

          {/* Timeline */}
          <div>
            {SECTIONS.map((section, index) => (
              <TimelineItem
                key={section.title}
                section={section}
                index={index}
                isLast={index === SECTIONS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
