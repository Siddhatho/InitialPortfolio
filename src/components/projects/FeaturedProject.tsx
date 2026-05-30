import type { Project } from "@/types";

import Image from "next/image";

import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

type FeaturedProjectProps = {
  project: Project;
};

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <GlassCard
      hover={false}
      className="border border-brand-blue/20 p-6 shadow-[0_0_40px_rgba(59,130,246,0.08)] md:p-8"
    >
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-mono text-brand-blue">Featured Project</p>
          <h3 className="mt-3 font-heading text-3xl font-bold text-brand-text">
            {project.title}
          </h3>
          <p className="mt-4 text-brand-muted">{project.longDescription}</p>

          <div className="mt-5 flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-brand-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <GlowButton variant="primary" href={project.github}>
              GitHub
            </GlowButton>
            <GlowButton variant="outline" href={project.demo}>
              Live Demo
            </GlowButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
