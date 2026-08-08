import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Clock, CalendarCheck } from 'lucide-react';

const CERTIFICATIONS = [
  {
    title: 'O Level — Information Technology',
    issuer: 'NIELIT (National Institute of Electronics & Information Technology)',
    hours: 540,
    date: 'Dec 16, 2025',
    grade: 'C',
    gradeNote: 'Pass',
    color: 'blue',
  },
  {
    title: 'CCC — Course on Computer Concepts',
    issuer: 'NIELIT',
    hours: 90,
    date: 'Apr 10, 2024',
    grade: 'B',
    gradeNote: 'Good',
    color: 'green',
  },
  {
    title: 'Certificate Course in React-JS',
    issuer: 'NIELIT Virtual Academy',
    hours: 30,
    date: 'Dec 30, 2025',
    grade: 'S',
    gradeNote: 'Outstanding',
    color: 'purple',
  },
];

const colorMap = {
  blue: {
    dot:       'bg-blue-500',
    gradeBg:   'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    border:    'border-blue-200 dark:border-blue-700/60',
    iconBg:    'bg-blue-50 dark:bg-blue-900/20',
    iconText:  'text-blue-600 dark:text-blue-400',
  },
  green: {
    dot:       'bg-green-500',
    gradeBg:   'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    border:    'border-green-200 dark:border-green-700/60',
    iconBg:    'bg-green-50 dark:bg-green-900/20',
    iconText:  'text-green-600 dark:text-green-400',
  },
  purple: {
    dot:       'bg-violet-500',
    gradeBg:   'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
    border:    'border-violet-200 dark:border-violet-700/60',
    iconBg:    'bg-violet-50 dark:bg-violet-900/20',
    iconText:  'text-violet-600 dark:text-violet-400',
  },
};

function SectionVariant({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

const DeveloperExtras = () => {
  return (
    <section id="extras" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Certifications ─────────────────────────────────── */}
        <SectionVariant delay={0.1}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
              <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Certifications
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Government-recognised IT qualifications
              </p>
            </div>
          </div>
        </SectionVariant>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, index) => {
            const c = colorMap[cert.color];
            const isOutstanding = cert.grade === 'S';
            return (
              <SectionVariant key={cert.title} delay={index * 0.1}>
                <div className={`relative h-full p-5 rounded-xl border bg-gray-50 dark:bg-gray-900/40
                  hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${c.border}`}>

                  {/* Grade badge — top right */}
                  <div className="absolute top-4 right-4 flex flex-col items-center">
                    <span className={`text-xl font-extrabold leading-none px-2.5 py-1 rounded-lg ${c.gradeBg}`}>
                      {cert.grade}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{cert.gradeNote}</span>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-2 rounded-lg mb-3 ${c.iconBg}`}>
                    <Award className={`h-5 w-5 ${c.iconText}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug pr-14">
                    {cert.title}
                    {isOutstanding && (
                      <span className="ml-1.5 text-yellow-500" title="S Grade — Outstanding">★</span>
                    )}
                  </h3>

                  {/* Issuer */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {cert.issuer}
                  </p>

                  {/* Meta row: hours + date */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      {cert.hours} hours
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <CalendarCheck className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>

                </div>
              </SectionVariant>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DeveloperExtras;
