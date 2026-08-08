import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import Resume from '../assets/Mohammad Hamza Resume.pdf';

// ─── Data ────────────────────────────────────────────────────────────────────
const ABOUT_TEXT = `Mohammad Hamza — MERN Stack Developer 🚀
BCA student @ Dr. Ram Manohar Lohia Avadh University
Based in Jaunpur, Uttar Pradesh, India
2+ years building full-stack web apps.
Passionate about clean code and great UX.`;

const SKILLS_TEXT = `Frontend:  React.js, HTML5, CSS3, Tailwind CSS, Next js, Redux, Shadcn
Backend:   Node.js, Express.js, Firebase
Database:  MongoDB, Firebase
Tools:     Git, GitHub, VS Code, Vercel, Netlify, Postman`;

const PROJECTS_TEXT = [
  '🛍️ E-Commerce Store   — SAAD FurniStore client & admin dashboard (MERN & Tailwind)',
  '🔗 URL Shortener       — Full-stack MERN app with analytics & custom URLs',
  '🔬 Ayush Pathology Lab — Real-time reports & appointment system (React + Firebase)',
  '🏫 College Web         — Responsive college site with admin panel & admissions',
  '🚀 Space Web           — UI-only space-themed showcase with AOS animations',
  '✅ Task Manager Todo   — Real-time task management (React + Firebase)',
].join('\n');

const CONTACT_TEXT = `📧 Email:    mhdkh444@gmail.com
📞 Phone:    +91 6393588539
📍 Location: Jaunpur, Uttar Pradesh, India`;

const SOCIAL_TEXT = `🐙 GitHub:   https://github.com/mh-hamza
💼 LinkedIn: https://www.linkedin.com/in/mh-hamza444/
📧 Email:    mhdkh444@gmail.com`;

const HELP_TEXT = `Available commands:

  help       Show this help message
  about      Who is Mohammad Hamza?
  skills     List all skills
  projects   List all projects with descriptions
  contact    Show email, phone & location
  social     Show GitHub, LinkedIn & email links
  location   Detect your location & show Hamza's
  resume     Open resume in a new tab
  whoami     Who are you?
  clear      Clear the terminal
  sudo hire-me  👀 Try it...

Use ↑ / ↓ arrows to cycle through command history.`;

// ─── Command map ─────────────────────────────────────────────────────────────
function buildCommandMap() {
  return {
    help: () => ({ text: HELP_TEXT }),
    about: () => ({ text: ABOUT_TEXT }),
    skills: () => ({ text: SKILLS_TEXT }),
    projects: () => ({ text: PROJECTS_TEXT }),
    contact: () => ({ text: CONTACT_TEXT }),
    social: () => ({ text: SOCIAL_TEXT }),
    resume: () => {
      setTimeout(() => window.open(Resume, '_blank'), 200);
      return { text: '📄 Opening resume in a new tab...' };
    },
    whoami: () => ({
      text: "You're a curious visitor exploring a developer's playground 👀",
    }),
    clear: () => ({ clear: true }),
    location: () => ({ async: true, key: 'location' }),
    'sudo hire-me': () => ({ async: true, key: 'hire-me' }),
  };
}

// ─── Async handlers ──────────────────────────────────────────────────────────
async function handleLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('network');
    const data = await res.json();
    const city = data.city || data.region || 'your city';
    const country = data.country_name || 'your country';
    return `📍 Hamza's location:  Jaunpur, Uttar Pradesh, India\n🌐 Detected you in:   ${city}, ${country} 👋\n\n(Cool, right? Visit the Contact section to say hi!)`;
  } catch {
    return `📍 Hamza's location: Jaunpur, Uttar Pradesh, India\n\n(Couldn't detect your location — no worries, you're still welcome here! 👋)`;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
const WELCOME = [
  { type: 'output', text: '┌─────────────────────────────────────────────┐' },
  { type: 'output', text: "│     Welcome to Mohammad Hamza's terminal     │" },
  { type: 'output', text: '│       Type "help" to see all commands.       │' },
  { type: 'output', text: '└─────────────────────────────────────────────┘' },
];

const TerminalSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const commandMap = useRef(buildCommandMap());

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const appendLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const processCommand = useCallback(
    async (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Add to history
      setHistory((h) => [trimmed, ...h]);
      setHistoryIndex(-1);

      // Echo input
      appendLines([{ type: 'input', text: trimmed }]);

      const cmd = trimmed.toLowerCase();
      const handler = commandMap.current[cmd];

      if (!handler) {
        appendLines([
          {
            type: 'error',
            text: `command not found: ${trimmed}\nType "help" for available commands.`,
          },
        ]);
        return;
      }

      const result = handler();

      if (result.clear) {
        setLines(WELCOME);
        return;
      }

      if (result.async) {
        setIsProcessing(true);
        appendLines([{ type: 'loading', text: '⏳ Processing...' }]);

        if (result.key === 'location') {
          const text = await handleLocation();
          setLines((prev) => {
            const filtered = prev.filter((l) => l.type !== 'loading');
            return [...filtered, { type: 'output', text }];
          });
        } else if (result.key === 'hire-me') {
          const frames = [
            '🔍 Checking if a hiring manager is online...',
            '📊 Analyzing skill match... React ✅  Node.js ✅  MongoDB ✅',
            '🤝 Match score: 100%  — HIRE IMMEDIATELY',
            '📨 Sending offer letter... (just kidding 😅)',
            '✅ Seriously though — scroll to Contact and let\'s talk!',
          ];
          setLines((prev) => prev.filter((l) => l.type !== 'loading'));
          for (let i = 0; i < frames.length; i++) {
            await new Promise((r) => setTimeout(r, 700));
            appendLines([{ type: 'output', text: frames[i] }]);
          }
          await new Promise((r) => setTimeout(r, 800));
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }

        setIsProcessing(false);
        return;
      }

      appendLines([{ type: 'output', text: result.text }]);
    },
    [appendLines]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIndex((idx) => {
        const next = Math.min(idx + 1, history.length - 1);
        setInput(history[next] ?? '');
        return next;
      });
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIndex((idx) => {
        const next = Math.max(idx - 1, -1);
        setInput(next === -1 ? '' : history[next] ?? '');
        return next;
      });
      return;
    }
  };

  const handleWindowClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="terminal-section" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <TerminalIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Interactive Terminal
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Type commands to discover skills, projects, and custom easter eggs
              </p>
            </div>
          </div>
        </motion.div>

        {/* Embedded Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`w-full rounded-xl overflow-hidden shadow-lg border flex flex-col font-mono text-sm leading-relaxed cursor-text ${
            isDark ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9]' : 'bg-[#1e2433] border-[#394060] text-[#cdd6f4]'
          }`}
          onClick={handleWindowClick}
          style={{ height: '400px' }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/20 border-b border-white/5 select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs text-white/40">hamza@portfolio:~</span>
            <span className="w-12" />
          </div>

          {/* Terminal Console Output body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5" ref={outputRef}>
            {lines.map((line, i) => {
              if (line.type === 'input') {
                return (
                  <div key={i} className="flex items-start gap-1">
                    <span className="text-[#4ade80] font-bold shrink-0">hamza@portfolio:~$</span>
                    <span className="text-white/90 break-all ml-1">{line.text}</span>
                  </div>
                );
              }
              if (line.type === 'output') {
                return (
                  <pre key={i} className="text-white/60 whitespace-pre-wrap break-words font-mono">
                    {line.text}
                  </pre>
                );
              }
              if (line.type === 'error') {
                return (
                  <pre key={i} className="text-red-400 whitespace-pre-wrap font-mono">
                    {line.text}
                  </pre>
                );
              }
              if (line.type === 'loading') {
                return (
                  <pre key={i} className="text-yellow-400 whitespace-pre-wrap font-mono animate-pulse">
                    {line.text}
                  </pre>
                );
              }
              return null;
            })}

            {/* Typing line */}
            <div className="flex items-center">
              <span className="text-[#4ade80] font-bold shrink-0">hamza@portfolio:~$</span>
              <span className="ml-2 text-white/90 flex-1 break-all">
                {input}
                <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse align-middle" />
              </span>
            </div>
          </div>

          {/* Hidden input to capture keystrokes */}
          <input
            ref={inputRef}
            type="text"
            className="absolute opacity-0 pointer-events-none w-1 h-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default TerminalSection;
