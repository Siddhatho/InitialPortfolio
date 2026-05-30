"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant: "primary" | "outline";
  className?: string;
  download?: boolean | string;
};

export default function GlowButton({
  children,
  href,
  onClick,
  variant,
  className,
  download,
}: GlowButtonProps) {
  const base =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200";

  const styles =
    variant === "primary"
      ? "bg-brand-blue text-white hover:bg-brand-glow hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      : "border border-brand-blue text-brand-blue hover:bg-brand-blue/10";

  const classes = cn(base, styles, className);

  if (href) {
    const isDownload = Boolean(download);
    const isExternal = href.startsWith("http");

    if (isDownload || isExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          download={download}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
