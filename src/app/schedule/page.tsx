import type { Metadata } from "next";
import Schedule from "@/components/Schedule";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Schedule | Claude Hacks @ Ohio State",
  description: "Full schedule for Claude Hacks at The Ohio State University, April 17–19, 2026.",
};

export default function SchedulePage() {
  return (
    <section className="pt-20">
      <div className="max-w-3xl mx-auto px-6 pt-16 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-primary">EVENT</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
            Event <span className="text-gradient">Schedule</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            April 17–19, 2026 · Pomerene 280 (in-person) + virtual day Saturday.
          </p>
        </FadeIn>
      </div>
      <Schedule />
    </section>
  );
}
