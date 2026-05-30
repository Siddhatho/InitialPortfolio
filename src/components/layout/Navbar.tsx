"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GitBranch, Link as LinkIcon, Mail, Menu, X } from "lucide-react";

import { socials } from "@/data/socials";
import { NAV_ITEMS } from "@/lib/constants";
import { fadeIn, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  github: GitBranch,
  linkedin: LinkIcon,
  mail: Mail,
} as const;

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#home");

  const navItems = useMemo(() => NAV_ITEMS, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY ?? 0;
      setScrolled(y > 8);

      const sections = navItems
        .map((item) => item.href)
        .filter((href) => href.startsWith("#"))
        .map((href) => document.querySelector(href))
        .filter((el): el is HTMLElement => Boolean(el));

      const current = sections
        .map((el) => ({ el, top: el.getBoundingClientRect().top }))
        .filter(({ top }) => top <= 160)
        .sort((a, b) => b.top - a.top)[0];

      if (current) {
        setActiveHref(`#${current.el.id}`);
      } else {
        setActiveHref("#home");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navItems]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className={cn(
          "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3",
          "shadow-[0_0_20px_rgba(59,130,246,0.1)]",
          scrolled && "border-brand-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
        )}
      >
        <div className="flex items-center justify-between gap-6">
          <Link
            href="#home"
            className="font-heading font-semibold text-brand-text"
          >
            Siddartho
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  activeHref === item.href
                    ? "text-brand-blue"
                    : "text-brand-muted hover:text-brand-text"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {socials.map((s) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              if (!Icon) return null;
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-muted transition-colors hover:text-brand-text"
                  aria-label={s.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center text-brand-text md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              key="mobile-menu"
              initial={shouldReduceMotion ? undefined : "hidden"}
              animate={shouldReduceMotion ? undefined : "visible"}
              exit={shouldReduceMotion ? undefined : "hidden"}
              variants={shouldReduceMotion ? undefined : fadeIn}
              className="md:hidden"
            >
              <motion.div
                initial={shouldReduceMotion ? undefined : "hidden"}
                animate={shouldReduceMotion ? undefined : "visible"}
                exit={shouldReduceMotion ? undefined : "hidden"}
                variants={shouldReduceMotion ? undefined : scaleIn}
                className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        activeHref === item.href
                          ? "text-brand-blue"
                          : "text-brand-muted hover:text-brand-text"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {socials.map((s) => {
                    const Icon = ICONS[s.icon as keyof typeof ICONS];
                    if (!Icon) return null;
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-muted transition-colors hover:text-brand-text"
                        aria-label={s.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
