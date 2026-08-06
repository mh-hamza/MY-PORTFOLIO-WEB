import React from 'react';

const TECHS = [
  { name: 'React.js',    color: '#61DAFB', dot: '#38bdf8' },
  { name: 'Node.js',     color: '#339933', dot: '#4ade80' },
  { name: 'MongoDB',     color: '#47A248', dot: '#4ade80' },
  { name: 'Express.js',  color: '#888888', dot: '#94a3b8' },
  { name: 'Next.js',     color: '#000000', dot: '#6b7280' },
  { name: 'Firebase',    color: '#FFCA28', dot: '#fbbf24' },
  { name: 'Tailwind CSS',color: '#06B6D4', dot: '#22d3ee' },
  { name: 'JavaScript',  color: '#F7DF1E', dot: '#fbbf24' },
  { name: 'Git',         color: '#F05032', dot: '#f87171' },
  { name: 'Vite',        color: '#646CFF', dot: '#a78bfa' },
  { name: 'REST APIs',   color: '#888888', dot: '#94a3b8' },
  { name: 'HTML & CSS',  color: '#E44D26', dot: '#fb923c' },
];

// Duplicate items for seamless infinite loop
const ITEMS = [...TECHS, ...TECHS];

const TechMarquee = () => {
  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700 overflow-hidden">
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tech-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }
        .tech-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section label */}
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-400 mb-6">
        Technologies I Work With
      </p>

      {/* Scrolling strip */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10
          bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10
          bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent" />

        <div className="tech-marquee-track">
          {ITEMS.map((tech, i) => (
            <div
              key={i}
              className="mx-3 flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full
                bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600
                shadow-sm dark:shadow-gray-900/50 hover:shadow-md transition-shadow duration-200"
            >
              {/* Brand color dot */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: tech.dot }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-100 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
