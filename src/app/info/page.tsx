import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Club Info | Claude Hacks @ Ohio State",
  description: "Learn about the Claude Builders Club at The Ohio State University.",
};

const team = [
  { name: "Ayush Saggar", role: "Co-organizer", initials: "AS" },
  { name: "Rohan Aleti", role: "Co-organizer", initials: "RA" },
  { name: "Nimai Bhat", role: "Co-organizer", initials: "NB" },
];

const pillars = [
  {
    title: "Learn",
    desc: "Weekly workshops covering Claude API, prompt engineering, and AI development best practices.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Build",
    desc: "Hands-on projects where members build real applications powered by Claude AI.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Connect",
    desc: "Networking events with industry professionals and fellow AI enthusiasts.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function InfoPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">CB</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-6">
              Claude Builders <span className="text-gradient">Club</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              A student organization at The Ohio State University
              dedicated to exploring and building with Claude AI.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="gradient-border p-6 rounded-2xl text-center h-full group hover:bg-surface-light/20 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {p.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{p.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Our Team</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="gradient-border p-6 rounded-2xl text-center group hover:bg-surface-light/20 transition-colors">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-lg font-display font-bold text-white">{member.initials}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section className="py-20 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-primary-subtle" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Join the Club</h2>
            <p className="text-text-muted mb-10">
              Interested in AI development? Join the Claude Builders Club.
            </p>
            <a
              href="mailto:claudebuildersclub@gmail.com"
              className="inline-block btn-glow text-white px-10 py-4 rounded-full text-lg font-semibold"
            >
              Get in Touch
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
