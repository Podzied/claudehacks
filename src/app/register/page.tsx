import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Register | Claude Hacks @ Ohio State",
  description: "Sign up for Claude Hacks, a hackathon powered by Claude AI at The Ohio State University.",
};

export default function RegisterPage() {
  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="font-mono text-xs text-text-secondary">Registration Closed</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">At Capacity</h1>
            <p className="text-lg text-text-muted">
              All 100 spots have been filled for Claude Hacks. April 17 &amp; 19, 2026.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <RegisterForm />
        </FadeIn>
      </div>
    </section>
  );
}
