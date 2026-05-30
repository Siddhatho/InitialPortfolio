import { projects } from "@/data/projects";
import FeaturedProject from "@/components/projects/FeaturedProject";
import ProjectCard from "@/components/projects/ProjectCard";
import Container from "@/components/layout/Container";
import AnimateSection from "@/components/ui/AnimateSection";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProjectGrid() {
  const featuredProject =
    projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featuredProject.slug);

  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionHeading title="Projects" subtitle="Things I've built" />

        <div className="mt-10">
          <AnimateSection>
            <FeaturedProject project={featuredProject} />
          </AnimateSection>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <AnimateSection key={p.slug}>
                <ProjectCard project={p} />
              </AnimateSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
