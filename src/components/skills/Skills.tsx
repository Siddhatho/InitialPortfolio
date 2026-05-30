import { skills } from "@/data/skills";

import Container from "@/components/layout/Container";
import AnimateSection from "@/components/ui/AnimateSection";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCapsule from "@/components/skills/SkillCapsule";

export default function Skills() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20">
      <Container>
        <SectionHeading title="Skills" />

        <AnimateSection className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const items = skills.filter((s) => s.category === category);
              return (
                <div key={category}>
                  <p className="mb-3 text-xs font-mono uppercase tracking-widest text-brand-blue">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <SkillCapsule key={`${category}-${skill.name}`} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateSection>
      </Container>
    </section>
  );
}
