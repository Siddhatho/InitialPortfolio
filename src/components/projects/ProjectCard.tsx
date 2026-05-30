import type { Project } from "@/types";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard hover className="relative h-full p-4">
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 rounded-2xl"
        aria-label={`Open ${project.title}`}
      />

      <div className="relative">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.featured}
          />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex w-fit rounded-full bg-brand-blue/10 px-2 py-1 text-xs text-brand-blue">
              {project.category}
            </span>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="relative z-10 text-brand-muted transition-colors hover:text-brand-blue"
              >
                <GitBranch className="h-4 w-4" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label="Live demo"
                className="relative z-10 text-brand-muted transition-colors hover:text-brand-blue"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <h3 className="text-lg font-heading font-semibold text-brand-text">
            {project.title}
          </h3>

          <p className="text-sm text-brand-muted line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-brand-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
