import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import FAQ from "@/components/FAQ";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

const highlights = [
  {
    stat: "3 Days",
    label: "Fri + Sat (virtual) + Sun",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    stat: "100",
    label: "Participant cap",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    stat: "$1,800+",
    label: "In prizes",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.27.308 6.023 6.023 0 01-2.27-.308" />
      </svg>
    ),
  },
  {
    stat: "Free",
    label: "Swag & API credits",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Highlights */}
      <section className="py-24 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((h, i) => (
              <FadeIn key={h.stat} delay={i * 0.1}>
                <div className="gradient-border p-6 rounded-2xl text-center group hover:bg-surface-light/30 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    {h.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient mb-1">
                    {h.stat}
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted">{h.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What is Claude Hacks */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              What is <span className="text-gradient">Claude Hacks</span>?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Claude Hacks is a hackathon where students come together to build innovative
              projects powered by Claude AI. Whether you&apos;re a first-time hacker or a seasoned
              developer, this is your chance to explore the frontier of AI-powered applications.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-text-secondary leading-relaxed">
              Hosted by the Claude Builders Club at The Ohio State University, you&apos;ll get free
              access to Claude API credits, mentorship from industry experts, workshops, and the
              chance to win over $1,800 in prizes and API credits.
            </p>
          </FadeIn>
        </div>
      </section>

      <Schedule />
      <FAQ />

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary-subtle" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">Ready to build?</h2>
            <p className="text-text-muted mb-10 text-lg">
              Spots are limited. Register now to secure your place at Claude Hacks.
            </p>
            <Link
              href="/register"
              className="inline-block btn-glow text-white px-10 py-4 rounded-full text-lg font-semibold"
            >
              Register Now
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
