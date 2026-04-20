import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About | Claude Hacks @ Ohio State",
  description: "Learn about Claude Hacks, a hackathon powered by Claude AI at The Ohio State University.",
};

const tracks = [
  {
    name: "Open",
    desc: "Build anything you want with Claude AI. No restrictions on topic or domain. The most creative and impactful project wins.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    name: "Sustainability",
    desc: "Build solutions that address environmental or sustainability challenges using Claude AI.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const prizes = [
  { place: "1st Place", amount: "$750 Credits + $300", desc: "Best overall project. API credits and cash prize." },
  { place: "2nd Place", amount: "$500 Credits", desc: "Runner-up. API credits." },
  { place: "3rd Place", amount: "$250 Credits", desc: "Third place. API credits." },
];

const rules = [
  "Teams can have 1–4 members. All members must be registered.",
  "All code must be written during the hackathon. Pre-existing libraries and frameworks are allowed.",
  "Projects must use the Claude API in a meaningful way.",
  "You may use any programming language, framework, or platform.",
  "All projects must be submitted by the deadline (11:00 AM EST, Sunday April 19).",
  "Judging criteria: Innovation, Technical Complexity, Impact, and Presentation.",
  "Be respectful, inclusive, and follow the Code of Conduct at all times.",
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="font-mono text-xs text-primary">ABOUT</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-6">
              About <span className="text-gradient">Claude Hacks</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              A hackathon bringing together students from all backgrounds
              to build innovative projects powered by Claude AI. April 17–19, 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">How It Works</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { day: "Friday 5:30–8 PM", title: "Kickoff", desc: "Check-in & food at 5:30, introduction at 6:30, then in-person work time from 7–8 PM.", color: "from-primary/20" },
              { day: "Saturday (Virtual)", title: "Build", desc: "Continue hacking remotely with your team.", color: "from-accent/20" },
              { day: "Sunday 11 AM+", title: "Demo", desc: "Projects due at 11 AM, judging starts at 12 PM.", color: "from-primary/20" },
            ].map((d, i) => (
              <FadeIn key={d.day} delay={i * 0.1}>
                <div className="gradient-border p-6 rounded-2xl h-full group hover:bg-surface-light/20 transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} to-transparent flex items-center justify-center mb-4`}>
                    <span className="font-mono text-sm text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="font-mono text-xs text-text-muted mb-2">{d.day}</div>
                  <h3 className="font-display font-bold text-xl mb-2">{d.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Tracks</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {tracks.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="gradient-border p-6 rounded-2xl group hover:bg-surface-light/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {t.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{t.name}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Prizes</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prizes.map((p, i) => (
              <FadeIn key={p.place} delay={i * 0.06}>
                <div className="gradient-border p-6 rounded-2xl text-center group hover:bg-surface-light/20 transition-colors">
                  <div className="text-3xl font-display font-bold text-gradient mb-2">{p.amount}</div>
                  <div className="font-semibold text-sm mb-1">{p.place}</div>
                  <p className="text-xs text-text-muted">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Judges */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Judges</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "TBA", role: "NVIDIA", initials: "NV" },
              { name: "TBA", role: "Meta", initials: "M" },
              { name: "TBA", role: "Google", initials: "G" },
              { name: "TBA", role: "IGS Energy", initials: "IGS" },
              { name: "TBA", role: "AWS", initials: "AWS" },
              { name: "TBA", role: "Vertiv", initials: "V" },
            ].map((judge, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="gradient-border p-6 rounded-2xl text-center group hover:bg-surface-light/20 transition-colors">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-sm font-display font-bold text-white">{judge.initials}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{judge.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{judge.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-sm text-text-muted mt-8">
              More judges to be announced soon.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Rules */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Rules</h2>
          </FadeIn>
          <div className="space-y-3">
            {rules.map((rule, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex gap-4 glass rounded-xl px-5 py-4">
                  <span className="text-gradient font-display font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-text-secondary">{rule}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-primary-subtle" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">That&apos;s a wrap!</h2>
            <p className="text-text-muted mb-10">
              Claude Hacks 2026 has concluded. Check out the winning projects.
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
    </>
  );
}
