"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  EMAIL,
  GITHUB,
  GH_USER,
  LINKEDIN,
  TWITTER,
  WHATSAPP,
} from "@/data/contact";

let openTerminalHandler: (() => void) | null = null;

export function openTerminal() {
  openTerminalHandler?.();
}

const INITIAL_LINES = [
  "Portfolio terminal v2.0 — Siddartho Sarker Bipro",
  "Type help to see commands.",
];

type CommandHandler = (args: string[]) => string | void;

function buildCommands(close: () => void): Record<string, CommandHandler> {
  return {
    help: () =>
      "Commands: whoami · ls · projects · skills · contact · now · github · linkedin · twitter · clear · exit",
    whoami: () =>
      "siddartho — CSE student, software & AI engineer · Dhaka 🇧🇩",
    ls: () =>
      "projects/  skills/  about.txt  contact.md  resume.pdf  experiments/",
    projects: () =>
      "1. Restaurant Delivery Robot — Arduino C++\n2. AI Research Reviewer — Python LLMs\n3. Unity Football Game — Unity C#\n4. Django Blog Platform — Django MySQL\n5. Embedded Sensor System — Arduino",
    skills: () =>
      "Frontend: Next.js React TypeScript Tailwind\nBackend: Django Flask MySQL REST\nAI/ML: Python LLM Prompt Engineering\nEmbedded: Arduino C++ Sensors Robotics",
    contact: () =>
      `email: ${EMAIL}\ngithub: ${GITHUB}\nlinkedin: ${LINKEDIN}\ntwitter: ${TWITTER}\nwhatsapp: ${WHATSAPP}`,
    now: () =>
      "📍 Dhaka, Bangladesh\n🔨 Building: RAG pipeline + LLM fine-tuning\n📚 Reading: RLHF papers\n🎯 2026: Ship 2 open-source AI tools\n⚡ Uptime: 3+ years · still going",
    github: () => {
      window.open(GITHUB, "_blank", "noopener,noreferrer");
      return GITHUB;
    },
    linkedin: () => {
      window.open(LINKEDIN, "_blank", "noopener,noreferrer");
      return LINKEDIN;
    },
    twitter: () => {
      window.open(TWITTER, "_blank", "noopener,noreferrer");
      return TWITTER;
    },
    clear: () => {
      return "__CLEAR__";
    },
    exit: () => {
      close();
      return "";
    },
  };
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    openTerminalHandler = () => setOpen(true);
    return () => {
      openTerminalHandler = null;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const commands = buildCommands(close);
    const handler = commands[cmd.toLowerCase()];

    setLines((prev) => [...prev, `visitor@portfolio:~$ ${trimmed}`]);

    if (!handler) {
      setLines((prev) => [
        ...prev,
        `command not found: ${cmd} — type help`,
      ]);
      return;
    }

    const result = handler(args);
    if (result === "__CLEAR__") {
      setLines([]);
      return;
    }
    if (result) {
      setLines((prev) => [...prev, ...result.split("\n")]);
    }
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    }
  };

  return (
    <>
      <style>{`
        .terminal-overlay {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(6px);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease, visibility 0.2s ease;
        }
        .terminal-overlay.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .terminal-modal {
          width: min(580px, 90vw);
          background: #07071a;
          border: 1px solid color-mix(in srgb, var(--accent) 14%, transparent);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
        }
        .terminal-titlebar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-family: var(--fm);
          font-size: 11px;
          color: var(--text-s);
        }
        .terminal-dots {
          display: flex;
          gap: 6px;
        }
        .terminal-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .terminal-dots span:nth-child(1) {
          background: #ff5f57;
        }
        .terminal-dots span:nth-child(2) {
          background: #ffbd2e;
        }
        .terminal-dots span:nth-child(3) {
          background: #28ca41;
        }
        .terminal-titlebar__title {
          flex: 1;
          text-align: center;
        }
        .terminal-close {
          background: none;
          border: none;
          color: var(--text-s);
          cursor: pointer;
          font-size: 14px;
          line-height: 1;
          padding: 2px 6px;
        }
        .terminal-close:hover {
          color: var(--text);
        }
        .terminal-output {
          height: 300px;
          overflow-y: auto;
          padding: 14px 16px;
          font-family: var(--fm);
          font-size: 12px;
          line-height: 1.9;
          color: var(--text);
          scrollbar-width: thin;
          scrollbar-color: var(--border-h) transparent;
        }
        .terminal-output::-webkit-scrollbar {
          width: 3px;
        }
        .terminal-output::-webkit-scrollbar-thumb {
          background: var(--border-h);
          border-radius: 3px;
        }
        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 14px;
          border-top: 1px solid var(--border);
          font-family: var(--fm);
          font-size: 12px;
        }
        .terminal-prompt {
          color: var(--accent);
          white-space: nowrap;
        }
        .terminal-input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
          font-family: var(--fm);
          font-size: 12px;
          color: var(--text);
          caret-color: var(--accent);
        }
        .terminal-hint {
          position: fixed;
          left: 16px;
          bottom: 16px;
          z-index: 200;
          opacity: 0.38;
          font-family: var(--fm);
          font-size: 10px;
          color: var(--text-m);
          pointer-events: none;
        }
      `}</style>

      {!open && (
        <p className="terminal-hint" aria-hidden="true">
          press ` for terminal
        </p>
      )}

      <div
        className={`terminal-overlay${open ? " open" : ""}`}
        role="presentation"
        onClick={close}
      >
        <div
          className="terminal-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio terminal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="terminal-titlebar">
            <div className="terminal-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="terminal-titlebar__title">
              siddartho@portfolio:~
            </span>
            <button
              type="button"
              className="terminal-close"
              aria-label="Close terminal"
              onClick={close}
            >
              ✕
            </button>
          </div>

          <div ref={outputRef} className="terminal-output">
            {lines.map((line, index) => (
              <div key={`${index}-${line.slice(0, 12)}`}>{line}</div>
            ))}
          </div>

          <div className="terminal-input-row">
            <span className="terminal-prompt">visitor@portfolio:~$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          </div>
        </div>
      </div>
    </>
  );
}
