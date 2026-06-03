type SkillCapsuleProps = {
  label: string;
};

export default function SkillCapsule({ label }: SkillCapsuleProps) {
  return <span className="skills-pill">{label}</span>;
}

