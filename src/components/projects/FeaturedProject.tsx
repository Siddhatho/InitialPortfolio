import type { Project } from "@/types";

import Link from "next/link";

import ProjectMedia from "@/components/projects/ProjectMedia";

type FeaturedProjectProps = {
  project: Project;
};

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <article className="pc pc--featured">
      <ProjectMedia
        src={project.image}
        alt={project.title}
        featured
        priority
      />

      <div className="pc__body">
        <span className="pc__tag pc__tag--featured">
          ★ Featured · Robotics
        </span>

        <h3 className="pc__title">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        <p className="pc__desc">{project.description}</p>

        <div className="pc__stack">
          {project.tech.map((t) => (
            <span key={t} className="pc__pill">
              {t}
            </span>
          ))}
        </div>

        <div className="pc__links">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="pc__link-btn"
          >
            GitHub ↗
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="pc__link-btn"
            >
              Demo ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
