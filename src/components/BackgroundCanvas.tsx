"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { x: 0.15, y: 0.3, r: 0.38, sx: 1.8, sy: 1.4 },
  { x: 0.85, y: 0.2, r: 0.3, sx: -1.4, sy: 1.8 },
  { x: 0.48, y: 0.75, r: 0.42, sx: 1.1, sy: -1.5 },
  { x: 0.06, y: 0.82, r: 0.26, sx: 2, sy: -1.2 },
] as const;

const SECTION_COLORS: Record<string, [number, number, number]> = {
  home: [124, 58, 237],
  experience: [37, 99, 235],
  projects: [37, 99, 235],
  skills: [22, 163, 74],
  about: [180, 83, 9],
  contact: [6, 182, 212],
};

const LERP_SPEED = 0.008;
const PARTICLE_COUNT = 28;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function spawnParticle(width: number, height: number): Particle {
  const maxLife = Math.floor(randomBetween(280, 480));
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.15, 0.15),
    r: randomBetween(0.4, 1.8),
    life: 0,
    maxLife,
  };
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    let target = { r: 124, g: 58, b: 237 };
    let current = { ...target };
    root.style.setProperty("--gr", String(target.r));
    root.style.setProperty("--gg", String(target.g));
    root.style.setProperty("--gb", String(target.b));

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let rafId = 0;

    const particles: Particle[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          particles.push(spawnParticle(width, height));
        }
      }
    };

    const readRgb = () => {
      const gr = parseInt(getComputedStyle(root).getPropertyValue("--gr"), 10);
      const gg = parseInt(getComputedStyle(root).getPropertyValue("--gg"), 10);
      const gb = parseInt(getComputedStyle(root).getPropertyValue("--gb"), 10);
      return {
        r: Number.isFinite(gr) ? gr : current.r,
        g: Number.isFinite(gg) ? gg : current.g,
        b: Number.isFinite(gb) ? gb : current.b,
      };
    };

    const draw = () => {
      time += 0.016;

      current.r += (target.r - current.r) * LERP_SPEED;
      current.g += (target.g - current.g) * LERP_SPEED;
      current.b += (target.b - current.b) * LERP_SPEED;
      root.style.setProperty("--gr", String(Math.round(current.r)));
      root.style.setProperty("--gg", String(Math.round(current.g)));
      root.style.setProperty("--gb", String(Math.round(current.b)));

      const rgb = readRgb();
      ctx.clearRect(0, 0, width, height);

      BLOBS.forEach((blob, index) => {
        const cx =
          (blob.x + Math.sin(time * 0.35 * blob.sx) * 0.06) * width;
        const cy =
          (blob.y + Math.cos(time * 0.35 * blob.sy) * 0.06) * height;
        const radius = blob.r * Math.min(width, height);
        const alpha = index === 0 ? 0.085 : 0.055;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      particles.forEach((particle, i) => {
        particle.life += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
          particle.life >= particle.maxLife ||
          particle.x < 0 ||
          particle.x > width ||
          particle.y < 0 ||
          particle.y > height
        ) {
          particles[i] = spawnParticle(width, height);
          return;
        }

        const t = particle.life / particle.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.35;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.fill();
      });

      rafId = window.requestAnimationFrame(draw);
    };

    const sectionIds = Object.keys(SECTION_COLORS);
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!SECTION_COLORS[id]) return;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size === 0) {
          const home = SECTION_COLORS.home;
          target = { r: home[0], g: home[1], b: home[2] };
          return;
        }

        let bestId = "home";
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        const next = SECTION_COLORS[bestId] ?? SECTION_COLORS.home;
        target = { r: next[0], g: next[1], b: next[2] };
      },
      { threshold: 0.3 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    resize();
    window.addEventListener("resize", resize);
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        .bg-canvas__canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .bg-canvas__noise {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .bg-canvas__grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
          background-size: 70px 70px;
        }
      `}</style>
      <canvas ref={canvasRef} className="bg-canvas__canvas" aria-hidden="true" />
      <div className="bg-canvas__noise" aria-hidden="true" />
      <div className="bg-canvas__grid grid-bg" aria-hidden="true" />
    </>
  );
}
