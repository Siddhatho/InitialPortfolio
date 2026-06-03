"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "framer-motion";

const ROLES = [
  "Software Engineer",
  "AI Research Engineer",
  "Full Stack Developer",
  "Robotics Builder",
  "Systems Architect",
] as const;

const PAUSE_MS = 2200;
const TYPE_MS = 60;
const DELETE_MS = 40;

export default function RoleSwitcher() {
  const shouldReduceMotion = useReducedMotion();
  const [text, setText] = useState(shouldReduceMotion ? ROLES[0] : "");

  useEffect(() => {
    if (shouldReduceMotion) {
      setText(ROLES[0]);
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const schedule = (fn: () => void, ms: number) => {
      timeoutId = window.setTimeout(fn, ms);
    };

    const tick = () => {
      const role = ROLES[roleIndex];

      if (!deleting) {
        charIndex += 1;
        setText(role.slice(0, charIndex));

        if (charIndex >= role.length) {
          deleting = true;
          schedule(tick, PAUSE_MS);
          return;
        }

        schedule(tick, TYPE_MS);
        return;
      }

      charIndex -= 1;
      setText(role.slice(0, charIndex));

      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        schedule(tick, TYPE_MS);
        return;
      }

      schedule(tick, DELETE_MS);
    };

    schedule(tick, TYPE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [shouldReduceMotion]);

  return (
    <p className="hero-typewriter" aria-live="polite">
      <span>{text}</span>
      <span className="hero-typewriter__cursor" aria-hidden="true" />
    </p>
  );
}
