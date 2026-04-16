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
      { name: "Anthropic", desc: "Creators of Claude AI. Providing API credits and mentorship for all participants.", logo: "anthropic" as const },
    ],
  },
  {
    name: "Gold",
    gradient: "from-yellow-500 to-orange-500",
    sponsors: [
      { name: "Ohio State CSE", desc: "The Department of Computer Science & Engineering at The Ohio State University.", logo: "osu" as const },
    ],
  },
  {
    name: "Silver",
    gradient: "from-text-muted to-border-light",
    sponsors: [
      { name: "IGS Energy", desc: "Energy solutions provider supporting student innovation.", logo: "igs" as const },
    ],
  },
];

const perks = [
  { text: "Logo on website, banners, and all marketing materials", icon: "globe" },
  { text: "Recruiting access to 100 talented student developers", icon: "users" },
  { text: "Booth space at the event for demos and networking", icon: "building" },
  { text: "Opportunity to present a workshop or tech talk", icon: "mic" },
  { text: "Branded prize category (Gold+ tiers)", icon: "trophy" },
  { text: "Access to project submissions and participant resumes", icon: "file" },
];

function SponsorLogo({ name }: { name: "anthropic" | "osu" | "igs" }) {
  switch (name) {
    case "anthropic":
      return (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="30" r="5" fill="currentColor" />
          <circle cx="60" cy="90" r="5" fill="currentColor" />
          <circle cx="30" cy="60" r="5" fill="currentColor" />
          <circle cx="90" cy="60" r="5" fill="currentColor" />
          <circle cx="38.8" cy="38.8" r="5" fill="currentColor" />
          <circle cx="81.2" cy="38.8" r="5" fill="currentColor" />
          <circle cx="38.8" cy="81.2" r="5" fill="currentColor" />
          <circle cx="81.2" cy="81.2" r="5" fill="currentColor" />
        </svg>
      );
    case "osu":
      return (
        <div className="w-14 h-14 rounded-full bg-[#BB0000] flex items-center justify-center">
          <span className="text-white font-display font-bold text-2xl">O</span>
        </div>
      );
    case "igs":
      return (
        <img src="/igs-logo.svg" alt="IGS Energy" className="w-14 h-14" />
      );
  }
}

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
                      <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center">
                        <SponsorLogo name={s.logo} />
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
              href="https://instagram.com/claudeatohiostate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-glow text-white px-10 py-4 rounded-full text-lg font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Contact Us on Instagram
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
