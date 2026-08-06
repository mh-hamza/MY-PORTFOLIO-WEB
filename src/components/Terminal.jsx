import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import Resume from '../assets/Mohammad Hamza Resume.pdf';

// ─── Data ────────────────────────────────────────────────────────────────────

const ABOUT_TEXT = `Mohammad Hamza — MERN Stack Developer 🚀
BCA student @ Dr. Ram Manohar Lohia Avadh University
Based in Jaunpur, Uttar Pradesh, India
2+ years building full-stack web apps.
Passionate about clean code and great UX.`;

const SKILLS_TEXT = `Frontend:  React.js, HTML5, CSS3, Tailwind CSS
Backend:   Node.js, Express.js
Database:  MongoDB, Firebase
Tools:     Git, GitHub, REST APIs
Design:    Responsive Design, Framer Motion`;

const PROJECTS_TEXT = [
  '🔗 URL Shortener       — Full-stack MERN app with analytics & custom URLs',
  '🔬 Ayush Pathology Lab — Real-time reports & appointment system (React + Firebase)',
  '🏫 College Web         — Responsive college site with admin panel & admissions',
  '🚀 Space Web           — UI-only space-themed showcase with AOS animations',
  '✅ Task Manager Todo   — Real-time task management (React + Firebase)',
  '🎨 Old Portfolio       — HTML/CSS/JS portfolio with AOS animations',
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

function buildCommandMap(closeFn) {
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

async function handleHireMe() {
  return new Promise((resolve) => {
    let dots = 0;
    const frames = [
      '🔍 Checking if hiring manager is online...',
      '📊 Analyzing skill match: React ✅  Node.js ✅  MongoDB ✅  Framer Motion ✅',
      '🤝 Match score: 100% — HIRE IMMEDIATELY',
      '📨 Sending offer letter... just kidding 😅',
      '✅ But seriously, scroll down to Contact and let\'s talk!',
    ];
    let i = 0;
    const lines = [];
    // Return immediately and the caller will handle the async display
    resolve({ __hireMe: true, frames });
  });
}

// ─── Terminal Line component ──────────────────────────────────────────────────

function TerminalLine({ line }) {
  if (line.type === 'input') {
    return (
      <div className="flex items-start gap-1 terminal-line">
        <span className="terminal-prompt shrink-0">hamza@portfolio:~$</span>
        <span className="terminal-cmd ml-1">{line.text}</span>
      </div>
    );
  }
  if (line.type === 'output') {
    return (
      <pre className="terminal-output whitespace-pre-wrap break-words font-mono">
        {line.text}
      </pre>
    );
  }
  if (line.type === 'error') {
    return (
      <pre className="terminal-error whitespace-pre-wrap font-mono">
        {line.text}
      </pre>
    );
  }
  if (line.type === 'loading') {
    return (
      <pre className="terminal-loading whitespace-pre-wrap font-mono animate-pulse">
        {line.text}
      </pre>
    );
  }
  return null;
}

// ─── Blinking Cursor ─────────────────────────────────────────────────────────

function Cursor() {
  return <span className="terminal-cursor">▋</span>;
}

// ─── Main Terminal Modal ──────────────────────────────────────────────────────

const WELCOME = [
  { type: 'output', text: '┌─────────────────────────────────────────────┐' },
  { type: 'output', text: "│     Welcome to Mohammad Hamza's terminal     │" },
  { type: 'output', text: '│       Type "help" to see all commands.       │' },
  { type: 'output', text: '└─────────────────────────────────────────────┘' },
];

function TerminalModal({ onClose }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const commandMap = useRef(buildCommandMap(onClose));

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

      // Find handler (longest match first for multi-word)
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
          // Animate hire-me frames
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
          // Scroll to contact after last frame
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
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    /* Backdrop */
    <div
      className="terminal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Window */}
      <div className={`terminal-window ${isDark ? 'terminal-dark' : 'terminal-light'}`}>
        {/* Title bar */}
        <div className="terminal-titlebar">
          <div className="terminal-dots">
            <button
              className="terminal-dot terminal-dot-red"
              onClick={onClose}
              aria-label="Close terminal"
              title="Close"
            />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
          </div>
          <span className="terminal-title">hamza@portfolio:~</span>
          <span />
        </div>

        {/* Output area */}
        <div className="terminal-body" ref={outputRef}>
          {lines.map((line, i) => (
            <TerminalLine key={i} line={line} />
          ))}

          {/* Active input row */}
          <div className="flex items-center terminal-input-row">
            <span className="terminal-prompt shrink-0">hamza@portfolio:~$</span>
            <span className="ml-1 terminal-cmd flex-1 break-all">
              {input}
              <Cursor />
            </span>
          </div>
        </div>

        {/* Hidden real input to capture keystrokes */}
        <input
          ref={inputRef}
          className="terminal-hidden-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          autoFocus
          aria-label="Terminal input"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}

// ─── Floating Button + Container ─────────────────────────────────────────────

function Terminal() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Close on Escape even if modal isn't focused
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Floating launch button */}
      <button
        id="terminal-toggle-btn"
        onClick={() => setOpen((o) => !o)}
        className={`terminal-fab ${isDark ? 'terminal-fab-dark' : 'terminal-fab-light'}`}
        title="Open interactive terminal (easter egg)"
        aria-label="Open terminal"
      >
        <span className="terminal-fab-icon">&#62;_</span>
      </button>

      {/* Modal */}
      {open && <TerminalModal onClose={() => setOpen(false)} />}

      {/* Styles */}
      <style>{`
        /* ── FAB ── */
        .terminal-fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
        }
        .terminal-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .terminal-fab:active {
          transform: scale(0.95);
        }
        .terminal-fab-light {
          background: #1e293b;
          color: #60a5fa;
        }
        .terminal-fab-dark {
          background: #0f172a;
          color: #60a5fa;
          border: 1px solid rgba(96,165,250,0.3);
        }
        .terminal-fab-icon {
          letter-spacing: -0.05em;
          user-select: none;
        }

        /* ── Backdrop ── */
        .terminal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: termFadeIn 0.15s ease;
        }
        @keyframes termFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Window ── */
        .terminal-window {
          width: min(720px, 100%);
          max-height: min(520px, 85vh);
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          animation: termSlideUp 0.2s ease;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.825rem;
          line-height: 1.6;
        }
        @keyframes termSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .terminal-dark {
          background: #0d1117;
          color: #c9d1d9;
          border: 1px solid #30363d;
        }
        .terminal-light {
          background: #1e2433;
          color: #cdd6f4;
          border: 1px solid #394060;
        }

        /* ── Title bar ── */
        .terminal-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.85rem;
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          user-select: none;
        }
        .terminal-dots {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }
        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .terminal-dot-red    { background: #ff5f57; }
        .terminal-dot-yellow { background: #febc2e; cursor: default; }
        .terminal-dot-green  { background: #28c840; cursor: default; }
        .terminal-title {
          color: rgba(255,255,255,0.45);
          font-size: 0.75rem;
          letter-spacing: 0.03em;
        }

        /* ── Body / scroll area ── */
        .terminal-body {
          flex: 1;
          overflow-y: auto;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .terminal-body::-webkit-scrollbar {
          width: 5px;
        }
        .terminal-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-body::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.12);
          border-radius: 10px;
        }

        /* ── Lines ── */
        .terminal-prompt {
          color: #4ade80;
          font-weight: 700;
          white-space: nowrap;
        }
        .terminal-cmd {
          color: #e2e8f0;
        }
        .terminal-output {
          color: #94a3b8;
          margin: 0.15rem 0;
        }
        .terminal-error {
          color: #f87171;
          margin: 0.15rem 0;
        }
        .terminal-loading {
          color: #fbbf24;
          margin: 0.15rem 0;
        }
        .terminal-input-row {
          margin-top: 0.15rem;
        }

        /* ── Blinking cursor ── */
        .terminal-cursor {
          display: inline-block;
          color: #60a5fa;
          animation: termBlink 1s step-end infinite;
          margin-left: 1px;
        }
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Hidden real input ── */
        .terminal-hidden-input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .terminal-window {
            font-size: 0.75rem;
            max-height: 75vh;
          }
          .terminal-fab {
            bottom: 1.25rem;
            right: 1.25rem;
            width: 2.75rem;
            height: 2.75rem;
          }
        }
      `}</style>
    </>
  );
}

export default Terminal;
