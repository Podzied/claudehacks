import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Sponsors | Claude Hacks @ Ohio State",
  description: "Our sponsors and partners powering Claude Hacks @ Ohio State.",
};

const tiers = [
  {
    name: "Platinum",
    gradient: "from-primary to-accent",
    sponsors: [
      { name: "Anthropic", initials: "A", desc: "Creators of Claude AI — providing API credits and mentorship for all participants." },
    ],
  },
  {
    name: "Gold",
    gradient: "from-yellow-500 to-orange-500",
    sponsors: [
      { name: "Ohio State CSE", initials: "OSU", desc: "The Department of Computer Science & Engineering at The Ohio State University." },
    ],
  },
  {
    name: "Silver",
    gradient: "from-text-muted to-border-light",
    sponsors: [
      { name: "IGS Energy", initials: "IGS", desc: "Energy solutions provider supporting student innovation." },
    ],
  },
];

const perks = [
  { text: "Logo on website, banners, and all marketing materials", icon: "globe" },
  { text: "Recruiting access to 200+ talented student developers", icon: "users" },
  { text: "Booth space at the event for demos and networking", icon: "building" },
  { text: "Opportunity to present a workshop or tech talk", icon: "mic" },
  { text: "Branded prize category (Gold+ tiers)", icon: "trophy" },
  { text: "Access to project submissions and participant resumes", icon: "file" },
];

export default function SponsorsPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="font-mono text-xs text-primary">PARTNERS</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-6">
              Sponsors & <span className="text-gradient">Partners</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Claude Hacks is made possible by the generous support of our sponsors.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {tiers.map((tier, ti) => (
            <FadeIn key={tier.name} delay={ti * 0.1}>
              <div>
                <div className="text-center mb-8">
                  <span className={`inline-block font-display font-bold text-xl bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                    {tier.name} Sponsors
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tier.sponsors.map((s) => (
                    <div key={s.name} className="gradient-border p-8 rounded-2xl text-center group hover:bg-surface-light/20 transition-colors">
                      <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                        <span className="text-white font-display font-bold">{s.initials}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2">{s.name}</h3>
                      <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12">Why Sponsor?</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {perks.map((perk, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="flex items-start gap-4 glass rounded-xl p-5 group hover:bg-surface-light/30 transition-colors">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm text-text-secondary leading-relaxed">{perk.text}</span>
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
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Become a Sponsor</h2>
            <p className="text-text-muted mb-10">
              Support the next generation of AI builders. We&apos;d love to hear from you.
            </p>
            <a
              href="mailto:claudebuildersclub@gmail.com"
              className="inline-block btn-glow text-white px-10 py-4 rounded-full text-lg font-semibold"
            >
              Contact Us
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
