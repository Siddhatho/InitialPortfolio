import { GitBranch, Link as LinkIcon, Mail } from "lucide-react";

import Container from "@/components/layout/Container";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <Container>
        <SectionHeading
          title="Get in touch"
          subtitle="Open to opportunities, collaborations, and interesting problems."
          align="center"
        />

        <div className="mt-10">
          <GlassCard className="mx-auto max-w-lg p-8" hover={false}>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm text-brand-muted">Email</span>
                </div>
                <a
                  href="mailto:your@email.com"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  your@email.com
                </a>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm text-brand-muted">GitHub</span>
                </div>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  github.com/yourusername
                </a>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm text-brand-muted">LinkedIn</span>
                </div>
                <a
                  href="https://linkedin.com/in/yourhandle"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  linkedin.com/in/yourhandle
                </a>
              </div>
            </div>
          </GlassCard>

          <div className="mt-8 flex justify-center">
            <GlowButton variant="primary" href="/resume.pdf" download>
              Download Resume
            </GlowButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
