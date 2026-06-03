"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const hovered = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setEnabled(!window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button");
      const next = Boolean(interactive);
      if (next === hovered.current) return;
      hovered.current = next;
      if (next) {
        ringEl.style.width = "52px";
        ringEl.style.height = "52px";
        ringEl.style.borderColor = "color-mix(in srgb, var(--violet-s) 40%, transparent)";
      } else {
        ringEl.style.width = "34px";
        ringEl.style.height = "34px";
        ringEl.style.borderColor = "color-mix(in srgb, var(--accent) 20%, transparent)";
      }
    };

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;
      rafId.current = window.requestAnimationFrame(tick);
    };

    ring.current.x = window.innerWidth / 2;
    ring.current.y = window.innerHeight / 2;
    mouse.current.x = ring.current.x;
    mouse.current.y = ring.current.y;

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafId.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  const shared: CSSProperties = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    left: 0,
    top: 0,
  };

  return (
    <>
      <div
        ref={ringRef}
        style={{
          ...shared,
          width: 34,
          height: 34,
          border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
          zIndex: 9998,
        }}
      />
      <div
        ref={dotRef}
        style={{
          ...shared,
          width: 8,
          height: 8,
          background: "var(--accent)",
          mixBlendMode: "screen",
          zIndex: 9999,
        }}
      />
    </>
  );
}
