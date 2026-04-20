import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Register | Claude Hacks @ Ohio State",
  description: "Claude Hacks 2026 has concluded. See the winning projects.",
};

export default function RegisterPage() {
  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-text-muted" />
            <span className="font-mono text-xs text-text-secondary">Event Concluded</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
            That&apos;s a <span className="text-gradient">wrap!</span>
          </h1>
          <p className="text-lg text-text-muted mb-10">
            Claude Hacks 2026 has concluded. Thanks to everyone who joined us April 17–19.
            Check out the winning projects.
          </p>
          <Link
            href="/winners"
            className="inline-block btn-glow text-white px-10 py-4 rounded-full text-lg font-semibold"
          >
            See the Winners →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
