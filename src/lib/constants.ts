import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const ANIMATION_DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const;

export const ANIMATION_DELAY = {
  stagger: 0.1,
  section: 0.2,
} as const;
