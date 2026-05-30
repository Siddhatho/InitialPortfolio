"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimateSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimateSection({
  children,
  className,
  delay = 0,
}: AnimateSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={stagger}
      transition={{ delayChildren: delay }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
