"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GitBranch, Link as LinkIcon, Mail } from "lucide-react";

import { socials } from "@/data/socials";
import { fadeUp } from "@/lib/motion";
import AnimateSection from "@/components/ui/AnimateSection";
import GlowButton from "@/components/ui/GlowButton";
import RoleSwitcher from "@/components/hero/RoleSwitcher";

const ICONS = {
  github: GitBranch,
  linkedin: LinkIcon,
  mail: Mail,
} as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-brand-bg"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-blue/10 blur-2xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-8">
        <AnimateSection className="space-y-6" delay={0}>
          <motion.p
            variants={fadeUp}
            className="text-sm font-mono text-brand-muted"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold text-brand-text lg:text-6xl"
          >
            Siddartho Sarker Bipro
          </motion.h1>

          <motion.div variants={fadeUp}>
            <RoleSwitcher />
          </motion.div>

          <motion.p variants={fadeUp} className="max-w-xl text-brand-muted">
            I build intelligent systems at the intersection of software
            engineering and AI research. From embedded robotics to full-stack
            platforms — I ship things that work.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <GlowButton variant="primary" href="#projects">
              View Projects
            </GlowButton>
            <GlowButton
              variant="outline"
              href="/resume.pdf"
              download
            >
              Download Resume
            </GlowButton>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4">
            {socials.slice(0, 3).map((s) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              if (!Icon) return null;
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-brand-muted transition-colors hover:text-brand-blue"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </motion.div>
        </AnimateSection>

        <motion.div
          className="flex items-center justify-center"
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }
        >
          <svg
            width="420"
            height="320"
            viewBox="0 0 420 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[280px] w-[360px] md:h-[320px] md:w-[420px]"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  stroke="rgba(59,130,246,0.18)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="420" height="320" fill="url(#grid)" />

            <line
              x1="110"
              y1="90"
              x2="220"
              y2="150"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="2"
            />
            <line
              x1="220"
              y1="150"
              x2="310"
              y2="110"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="2"
            />
            <line
              x1="220"
              y1="150"
              x2="260"
              y2="230"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="2"
            />

            <motion.circle
              cx="110"
              cy="90"
              r="7"
              fill="rgba(59,130,246,0.9)"
              animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 2, repeat: Infinity, repeatType: "mirror" }
              }
            />
            <motion.circle
              cx="220"
              cy="150"
              r="8"
              fill="rgba(59,130,246,0.9)"
              animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.2 }
              }
            />
            <motion.circle
              cx="310"
              cy="110"
              r="7"
              fill="rgba(59,130,246,0.9)"
              animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.4 }
              }
            />
            <motion.circle
              cx="260"
              cy="230"
              r="7"
              fill="rgba(59,130,246,0.9)"
              animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.6 }
              }
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
