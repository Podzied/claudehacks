import type { Metadata } from "next";
import JudgePanel from "@/components/JudgePanel";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Judging | Claude Hacks @ Ohio State",
  description: "Live judging panel for Claude Hacks.",
  robots: { index: false, follow: false },
};

export default function JudgePage() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-xs text-text-secondary">Judging Live</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
              Judge <span className="text-gradient">Panel</span>
            </h1>
            <p className="text-lg text-text-muted">
              Rate teams as they present. Your scores save instantly.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <JudgePanel />
        </FadeIn>
      </div>
    </section>
  );
}
