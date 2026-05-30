import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function GlassCard({
  children,
  className,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-brand-card backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-200",
        hover &&
          "hover:-translate-y-1 hover:border-brand-blue/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
