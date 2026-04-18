import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import FadeIn from "@/components/FadeIn";
import { isSubmissionsClosed } from "@/lib/deadline";

export const metadata: Metadata = {
  title: "Submit | Claude Hacks @ Ohio State",
  description: "Submit your project for Claude Hacks at The Ohio State University.",
};

export const dynamic = "force-dynamic";

export default function SubmitPage() {
  const closed = isSubmissionsClosed();

  return (
    <section className="py-24">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className={`w-2 h-2 rounded-full ${closed ? "bg-text-muted" : "bg-primary animate-pulse-glow"}`} />
              <span className="font-mono text-xs text-text-secondary">
                {closed ? "Submissions Closed" : "Submissions Open"}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
              {closed ? (
                <>Submissions <span className="text-gradient">Closed</span></>
              ) : (
                <>Submit Your <span className="text-gradient">Project</span></>
              )}
            </h1>
            <p className="text-lg text-text-muted">
              {closed
                ? "The submission deadline has passed. Judging is now in progress."
                : "Deadline: 11:00 AM EST, Sunday April 19, 2026. Judging starts at 12:00 PM."}
            </p>
          </div>
        </FadeIn>
        {!closed && (
          <FadeIn delay={0.15}>
            <SubmitForm />
          </FadeIn>
        )}
      </div>
    </section>
  );
}
