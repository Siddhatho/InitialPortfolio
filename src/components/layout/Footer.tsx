import { GitBranch, Link as LinkIcon, Mail } from "lucide-react";

import { socials } from "@/data/socials";

const ICONS = {
  github: GitBranch,
  linkedin: LinkIcon,
  mail: Mail,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-brand-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row md:px-8">
        <p className="text-sm text-brand-muted">
          Siddartho Sarker Bipro © {year}
        </p>

        <div className="flex items-center gap-4">
          {socials.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            if (!Icon) return null;
            return (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="text-brand-muted transition-colors hover:text-brand-text"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
