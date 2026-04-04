import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About | Claude Hacks @ Ohio State",
  description: "Learn about Claude Hacks — a 3-day hackathon powered by Claude AI at The Ohio State University.",
};

const tracks = [
  {
    name: "AI Agents",
    desc: "Build autonomous agents that can reason, plan, and take action using Claude.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
  },
  {
    name: "Education",
    desc: "Create tools that make learning more accessible, personalized, and effective.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    name: "Health & Wellness",
    desc: "Develop solutions that improve health outcomes and promote well-being.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    name: "Open Innovation",
    desc: "Build anything you want! The most creative and impactful project wins.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

const prizes = [
  { place: "1st Place", amount: "$750 Credits + $300", desc: "Best overall project — API credits and cash prize" },
  { place: "2nd Place", amount: "$500 Credits", desc: "Runner-up — API credits" },
  { place: "3rd Place", amount: "$250 Credits", desc: "Third place — API credits" },
];

const rules = [
  "Teams can have 1–4 members. All members must be registered.",
  "All code must be written during the hackathon. Pre-existing libraries and frameworks are allowed.",
  "Projects must use the Claude API in a meaningful way.",
  "You may use any programming language, framework, or platform.",
  "All projects must be submitted by the deadline (10:00 AM, April 19).",
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
              A 3-day hackathon bringing together students from all backgrounds
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
              { day: "Day 1", title: "Kickoff", desc: "Opening ceremony, team formation, workshops, and the hack begins!", color: "from-primary/20" },
              { day: "Day 2", title: "Build", desc: "Full day of hacking with workshops, mentors, and activities.", color: "from-accent/20" },
              { day: "Day 3", title: "Demo", desc: "Submit projects, present to judges, and awards ceremony.", color: "from-primary/20" },
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
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Sound exciting?</h2>
            <p className="text-text-muted mb-10">Register now to reserve your spot.</p>
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
