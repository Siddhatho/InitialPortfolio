"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

const ROLES = ["Software Engineer", "AI Research Engineer", "Full Stack Developer"] as const;

export default function RoleSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-4 h-[32px] md:h-[40px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          className="text-xl md:text-2xl font-heading text-brand-blue font-medium"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.4 }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
