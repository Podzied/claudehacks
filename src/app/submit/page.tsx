import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Submit | Claude Hacks @ Ohio State",
  description: "Submit your project for Claude Hacks at The Ohio State University.",
};

export default function SubmitPage() {
  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-xs text-text-secondary">Submissions Open</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
              Submit Your <span className="text-gradient">Project</span>
            </h1>
            <p className="text-lg text-text-muted">
              Deadline: 11:00 AM, Sunday April 19, 2026. Judging starts at 12:00 PM.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <SubmitForm />
        </FadeIn>
      </div>
    </section>
  );
}
