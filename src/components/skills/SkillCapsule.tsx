import type { Skill } from "@/types";

type SkillCapsuleProps = {
  skill: Skill;
};

export default function SkillCapsule({ skill }: SkillCapsuleProps) {
  return (
    <span className="border border-white/10 bg-white/5 text-brand-muted hover:border-brand-blue/50 hover:text-brand-text px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105">
      {skill.name}
    </span>
  );
}
