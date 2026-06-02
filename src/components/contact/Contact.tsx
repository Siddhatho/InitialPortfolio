import { GitBranch, Link as LinkIcon, Mail, PhoneIcon } from "lucide-react";

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
                  href="https://mail.google.com/mail/u/1/#inbox?compose=DmwnWtDsVWQznltwRMRVKqCZDfPWFZcTGfTDRLvmqXswVZVqDpCDrmlgHxdcLSLbwMPsghgxVnrl"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  siddharthosarker219@email.com
                </a>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm text-brand-muted">GitHub</span>
                </div>
                <a
                  href="https://github.com/Siddhatho"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  Siddhartho
                </a>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm text-brand-muted">LinkedIn</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/siddhartho-sarker-b5452822a/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  Siddhartho Sarker
                </a>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-brand-blue" />
                  <span className="text-sm text-brand-muted">WhatsApp</span>
                </div>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-brand-text transition-colors hover:text-brand-blue"
                >
                  +880 1875-943580
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
