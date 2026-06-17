'use client';

import { useState, useRef, useEffect } from 'react';

const PORTFOLIO = {
  name: 'Siddartho Sarker Bipro',
  title: 'Software Engineer & AI Researcher',
  location: 'Dhaka, Bangladesh',
  email: 'siddharthosarker219@gmail.com',
  github: 'https://github.com/Siddhatho',
  linkedin: 'https://linkedin.com/in/siddhartho-sarker-b5452822a',
  twitter: 'https://x.com/siddartho11',
  status: 'open_to_opportunities=true',
  building: 'RAG pipeline + LLM fine-tuning experiments',
  reading: 'RLHF papers · Attention Is All You Need',
  goal: 'Ship 2 open-source AI tools in 2026',
  skills: {
    Frontend: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    Backend: ['Django', 'Flask', 'MySQL', 'REST APIs'],
    'AI/Research': ['Python', 'LLM Workflows', 'Prompt Engineering'],
    Embedded: ['Arduino', 'C++', 'Sensors', 'Robotics'],
    Tools: ['Git', 'Vercel', 'Firebase', 'Linux', 'Unity'],
  },
  projects: {
    'restaurant-robot': {
      title: 'Restaurant Delivery Robot',
      description: 'Autonomous delivery robot with sensor fusion, obstacle avoidance, and path planning.',
      tech: ['Arduino', 'C++', 'Sensors', 'Path Planning'],
      github: 'https://github.com/Siddhatho/restaurant-delivery-robot',
      type: '★ Featured · Robotics',
    },
    'ai-research-reviewer': {
      title: 'AI Research Reviewer',
      description: 'LLM-powered paper analysis pipeline with structured prompt engineering workflows.',
      tech: ['Python', 'LLM', 'Prompt Engineering'],
      github: 'https://github.com/Siddhatho/ai-research-reviewer',
      type: 'AI/ML',
    },
    'unity-football-game': {
      title: 'Unity Football Game',
      description: 'Arcade-style football game with physics-based gameplay and polished UX.',
      tech: ['Unity', 'C#', 'Game Design'],
      github: 'https://github.com/Siddhatho/unity-football-game',
      type: 'Game Dev',
    },
    'django-blog-platform': {
      title: 'Django Blog Platform',
      description: 'Full-stack blog platform with REST APIs, auth, and MySQL persistence.',
      tech: ['Django', 'Python', 'MySQL', 'REST'],
      github: 'https://github.com/Siddhatho/django-blog-platform',
      type: 'Full Stack',
    },
    'embedded-sensor-system': {
      title: 'Embedded Sensor System',
      description: 'Multi-sensor data acquisition and monitoring firmware on Arduino.',
      tech: ['Arduino', 'C++', 'Sensors'],
      github: 'https://github.com/Siddhatho/embedded-sensor-system',
      type: 'Embedded',
    },
  },
};

type OutputLine = { type: 'input' | 'output'; content: string };

function processCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  const parts = raw.trim().split(/\s+/);
  if (!cmd) return [];

  if (cmd === 'help') return [
    '┌─ Commands ──────────────────────────────────────┐',
    '│ whoami              → who am I?                 │',
    '│ ls                  → list sections             │',
    '│ ls projects/        → list all projects         │',
    '│ cat about.txt       → about me                  │',
    '│ cat skills.txt      → tech skills               │',
    '│ cat experience.txt  → education & highlights    │',
    '│ cat contact.txt     → contact info              │',
    '│ cat projects/<name> → project details           │',
    '│ echo $STATUS        → availability              │',
    '│ open github         → open GitHub profile       │',
    '│ open linkedin       → open LinkedIn             │',
    '│ clear               → clear terminal            │',
    '└─────────────────────────────────────────────────┘',
  ];

  if (cmd === 'whoami') return [PORTFOLIO.name, PORTFOLIO.title, `📍 ${PORTFOLIO.location}`];
  if (cmd === 'pwd') return ['/home/siddartho/portfolio'];
  if (cmd === 'ls') return ['about.txt    skills.txt    experience.txt    contact.txt', 'projects/    blog/         resume.pdf'];

  if (cmd === 'ls projects/') return [
    'Projects:',
    ...Object.keys(PORTFOLIO.projects).map(
      (k) => `  ${k.padEnd(32)}→ ${PORTFOLIO.projects[k as keyof typeof PORTFOLIO.projects].type}`
    ),
    '', 'Usage: cat projects/<name>',
  ];

  if (cmd === 'cat about.txt') return [
    '━━━ about.txt ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `Name     : ${PORTFOLIO.name}`,
    `Role     : ${PORTFOLIO.title}`,
    `Location : ${PORTFOLIO.location}`,
    '', 'Bio:',
    '  Building systems at the intersection of software',
    '  engineering and AI research.',
    '',
    `Building : ${PORTFOLIO.building}`,
    `Reading  : ${PORTFOLIO.reading}`,
    `Goal     : ${PORTFOLIO.goal}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ];

  if (cmd === 'cat skills.txt') {
    const lines = ['━━━ skills.txt ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'];
    for (const [cat, items] of Object.entries(PORTFOLIO.skills))
      lines.push(`${cat.padEnd(15)}: ${items.join(' · ')}`);
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    return lines;
  }

  if (cmd === 'cat experience.txt') return [
    '━━━ experience.txt ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'EDUCATION',
    '  2022→NOW  B.Sc. Computer Science & Engineering',
    '             University · Dhaka, BD',
    '  2019→2021 Higher Secondary Certificate',
    '             College · Science Division',
    '', 'HIGHLIGHTS',
    '  2024  Restaurant Delivery Robot — Arduino, sensors',
    '  2023  AI Research Reviewer — LLM, prompt eng.',
    '  2023  Full Stack Web Dev — Django, React, Vercel',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ];

  if (cmd === 'cat contact.txt') return [
    '━━━ contact.txt ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `Email    : ${PORTFOLIO.email}`,
    `GitHub   : ${PORTFOLIO.github}`,
    `LinkedIn : ${PORTFOLIO.linkedin}`,
    `Twitter  : ${PORTFOLIO.twitter}`,
    '', 'Tip: type "open github" or "open linkedin"',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  ];

  if (cmd === 'echo $status') return [`STATUS: ${PORTFOLIO.status}`];

  if (parts[0] === 'cat' && parts[1]?.startsWith('projects/')) {
    const key = parts[1].replace('projects/', '') as keyof typeof PORTFOLIO.projects;
    const p = PORTFOLIO.projects[key];
    if (!p) return [`cat: projects/${key}: No such file`, `Available: ${Object.keys(PORTFOLIO.projects).join(', ')}`];
    return [
      `━━━ projects/${key} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Title  : ${p.title}`,
      `Type   : ${p.type}`,
      `Desc   : ${p.description}`,
      `Tech   : ${p.tech.join(' · ')}`,
      `GitHub : ${p.github}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ];
  }

  if (parts[0] === 'open') {
    const urls: Record<string, string> = {
      github: PORTFOLIO.github, linkedin: PORTFOLIO.linkedin,
      twitter: PORTFOLIO.twitter, resume: '/resume.pdf',
    };
    if (urls[parts[1]]) { window.open(urls[parts[1]], '_blank'); return [`Opening ${parts[1]}...`]; }
    return [`open: unknown "${parts[1]}"`, 'Available: github, linkedin, twitter, resume'];
  }

  return [`command not found: ${parts[0]}`, 'Type "help" to see available commands.'];
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<OutputLine[]>([
    { type: 'output', content: 'siddartho@portfolio:~ — type "help" for commands' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    if (cmd.toLowerCase() === 'clear') { setHistory([]); setInput(''); return; }
    const lines = processCommand(cmd);
    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      ...lines.map(l => ({ type: 'output' as const, content: l })),
    ]);
    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(historyIndex + 1, cmdHistory.length - 1); setHistoryIndex(n); setInput(cmdHistory[n] ?? ''); }
    if (e.key === 'ArrowDown') { e.preventDefault(); const n = Math.max(historyIndex - 1, -1); setHistoryIndex(n); setInput(n === -1 ? '' : cmdHistory[n]); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <>
      <style>{`
        .term-fab {
          position: fixed;
          bottom: 5.5rem;
          right: 2rem;
          z-index: 1000;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #000;
          border: 1px solid rgba(0,229,255,0.4);
          color: #00e5ff;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px rgba(0,229,255,0.2);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .term-fab:hover {
          box-shadow: 0 0 28px rgba(0,229,255,0.4);
          transform: scale(1.08);
        }
        .term-panel {
          position: fixed;
          bottom: 9rem;
          right: 2rem;
          z-index: 999;
          width: 520px;
          max-width: calc(100vw - 2rem);
          background: #0a0a0a;
          border: 1px solid rgba(0,229,255,0.25);
          border-radius: 12px;
          overflow: hidden;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.08);
          transform-origin: bottom right;
          animation: termSlideUp 0.2s ease;
        }
        @keyframes termSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .term-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #111;
          border-bottom: 1px solid rgba(0,229,255,0.12);
        }
        .term-dots { display: flex; gap: 5px; }
        .term-dots span { width: 10px; height: 10px; border-radius: 50%; }
        .term-dots span:nth-child(1) { background: #ff5f57; }
        .term-dots span:nth-child(2) { background: #febc2e; }
        .term-dots span:nth-child(3) { background: #28c840; }
        .term-title { color: #555; font-size: 11px; margin-left: 4px; }
        .term-close {
          margin-left: auto;
          background: none;
          border: none;
          color: #555;
          cursor: pointer;
          font-size: 14px;
          line-height: 1;
          padding: 2px 4px;
        }
        .term-close:hover { color: #fff; }
        .term-body {
          height: 300px;
          overflow-y: auto;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .term-body::-webkit-scrollbar { width: 4px; }
        .term-body::-webkit-scrollbar-track { background: transparent; }
        .term-body::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.2); border-radius: 2px; }
        .term-line-input { display: flex; gap: 8px; }
        .term-prompt { color: #00e5ff; user-select: none; }
        .term-cmd { color: #fff; }
        .term-out { color: #aaa; white-space: pre; }
        .term-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid rgba(0,229,255,0.12);
          background: #0a0a0a;
        }
        .term-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-family: inherit;
          font-size: 12px;
          caret-color: #00e5ff;
        }
        .term-input::placeholder { color: #333; }
      `}</style>

      {/* Floating button */}
      <button
        className="term-fab"
        onClick={() => setOpen(o => !o)}
        title="Open terminal"
        aria-label="Toggle terminal"
      >
        {open ? '✕' : '>_'}
      </button>

      {/* Terminal panel */}
      {open && (
        <div className="term-panel">
          <div className="term-bar">
            <div className="term-dots"><span /><span /><span /></div>
            <span className="term-title">siddartho@portfolio:~</span>
            <button className="term-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="term-body">
            {history.map((line, i) => (
              <div key={i}>
                {line.type === 'input' ? (
                  <div className="term-line-input">
                    <span className="term-prompt">❯</span>
                    <span className="term-cmd">{line.content}</span>
                  </div>
                ) : (
                  <div className="term-out">{line.content}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form className="term-input-row" onSubmit={handleSubmit}>
            <span className="term-prompt">❯</span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      )}
    </>
  );
}