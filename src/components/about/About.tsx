import Image from "next/image";

import Container from "@/components/layout/Container";
import GlowButton from "@/components/ui/GlowButton";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/profile.jpg"
              alt="Siddartho Sarker Bipro"
              width={400}
              height={400}
              className="rounded-2xl border border-white/10 object-cover"
              priority={false}
            />
          </div>

          <div>
            <SectionHeading title="About me" align="left" />

            <div className="mt-6 space-y-4 text-brand-muted">
              <p>
                I&apos;m a software engineer and AI research engineer based in
                Bangladesh, building systems that sit at the intersection of
                intelligence and engineering.
              </p>
              <p>
                My work spans embedded robotics, full-stack web platforms, and
                LLM-based research tooling. I care deeply about systems that are
                fast, readable, and actually useful.
              </p>
              <p>
                When I&apos;m not coding I&apos;m running experiments, reading
                papers, or working on side projects that probably involve a
                microcontroller.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton variant="outline" href="/resume.pdf" download>
                View Resume
              </GlowButton>
              <GlowButton variant="outline" href="#contact">
                Contact Me
              </GlowButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
