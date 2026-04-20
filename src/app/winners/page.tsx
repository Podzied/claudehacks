import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Winners | Claude Hacks @ Ohio State",
  description: "Meet the winners of Claude Hacks 2026 at The Ohio State University.",
};

interface Winner {
  place: 1 | 2 | 3;
  project: string;
  team: string;
  tagline: string;
  description: string;
  highlights: string;
  members: string[];
  demo?: string;
}

const openWinners: Winner[] = [
  {
    place: 1,
    project: "EagleEye",
    team: "Claude Mythos",
    tagline:
      "AI-assisted emergency dispatch that watches highway camera feeds and triages incidents in seconds.",
    description:
      "EagleEye monitors Columbus highway cameras and uses Claude's vision to detect crashes and hazards in real time, generate structured incident summaries, estimate severity, and recommend the right emergency response package — compressing the gap between detection, triage, and dispatch.",
    highlights:
      "React/Vite + Express/TS, ODOT camera proxy, scenario engine, multi-provider analyzer with mock fallback for demo resilience.",
    members: ["Will Campbell", "Rishik Panjugala", "Connor Walmsley"],
  },
  {
    place: 2,
    project: "Tokenlens",
    team: "Crtl Alt Elite",
    tagline:
      "Paste any GitHub repo URL → instantly see exactly how much that codebase spends on LLM API calls.",
    description:
      "TokenLens scans every file, detects LLM calls across OpenAI, Anthropic, Google, Cohere, Mistral, LangChain, LlamaIndex and more, then projects costs across 20+ models. Live streaming results, token estimation by task type (RAG, summarization, coding, classification), plus a Claude Haiku recommender that suggests cheaper model swaps with rationale.",
    highlights:
      "FastAPI + React + Tailwind (~6.2k LOC), 14-model pricing catalog, NDJSON streaming, SQLite caching.",
    members: ["Sathvik Allipuram", "Harrison Hahner", "Srijan Puli", "Prajuval Prakash"],
    demo: "https://osutokenlens.vercel.app/",
  },
  {
    place: 3,
    project: "Pilot",
    team: "DGX Disciples",
    tagline:
      "A macOS agent that drives your iPhone for you — Claude vision + synthetic taps through iPhone Mirroring.",
    description:
      "SwiftUI menubar app + Python daemon that uses Claude's vision to read your phone screen, plans actions, and injects synthetic taps and keystrokes through Apple's iPhone Mirroring window. Users write short YAML \"skills\"; after 3 clean runs Pilot freezes the workflow into a compiled local replay (~30s cloud loop → ~2s).",
    highlights:
      "~10k+ LOC, MCP server, 6-layer memory (catalog, runtime store, vector index, hint cache, compiled snapshots, usage backplane), APScheduler.",
    members: ["Athin Shetty", "Sohum Suthar"],
  },
];

const sustainabilityWinners: Winner[] = [
  {
    place: 1,
    project: "Greenify",
    team: "Awesome Dragons",
    tagline:
      'Tell your house "I\'m leaving" or "I\'m cooking" — Claude reorganizes your energy use to match.',
    description:
      "A smart home agent that takes plain-English intent and automatically adjusts devices to cut energy use, while protecting essentials. Every run reports both energy saved (kW) and dollar savings, with a monthly view tying decisions back to the bill. Safety-first: high-impact devices first, essentials untouched, full transparency on what changed and why.",
    highlights:
      "FastAPI backend (1300-line agent, hybrid LLM + rules planner, schema-validated JSON plans, real smart-plug seam), React 19 + Three Fiber 3D dollhouse frontend.",
    members: [
      "Siddarth Tummala",
      "Kanishk Kovuru",
      "Shukanth Jojodae",
      "Shirish Parasa",
      "Pathiv Medidi",
    ],
  },
  {
    place: 2,
    project: "EnergyWatch",
    team: "Forecast Fellas",
    tagline:
      "AI dispatch for home solar — when to sell, when to charge, when to pull, explained in plain English.",
    description:
      "Helps homeowners with solar + battery storage decide when to sell back to the grid, charge their battery, or draw from it. Pulls real Open-Meteo forecasts for solar generation and asks Claude Sonnet to reason over pricing signals, battery state, and the 7-day forecast — then writes natural-language advisories like \"Tuesday looks overcast — pre-charge tonight at off-peak rates to cover the shortfall.\"",
    highlights:
      "React + Node/Express + SQLite, bcrypt auth + Gmail verification + JWT, 3,288-line Recharts dashboard, customizable strategy modes, live power-flow diagram.",
    members: ["Ayush Pandit", "Aaryan Sharma"],
  },
];

const placeMeta: Record<1 | 2 | 3, { medal: string; label: string; ring: string }> = {
  1: { medal: "🥇", label: "1st Place", ring: "from-yellow-400/40 via-orange-400/30 to-primary/40" },
  2: { medal: "🥈", label: "2nd Place", ring: "from-text-muted/40 via-border-light/40 to-text-muted/30" },
  3: { medal: "🥉", label: "3rd Place", ring: "from-amber-700/30 via-amber-600/30 to-orange-700/30" },
};

function WinnerCard({ winner, index }: { winner: Winner; index: number }) {
  const meta = placeMeta[winner.place];
  return (
    <FadeIn delay={index * 0.1}>
      <div className="relative gradient-border rounded-2xl p-7 sm:p-8 h-full flex flex-col">
        <div
          className={`absolute -top-px left-6 right-6 h-px bg-gradient-to-r ${meta.ring}`}
          aria-hidden
        />
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl leading-none">{meta.medal}</span>
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                {meta.label}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gradient">
              {winner.project}
            </h3>
            <p className="text-sm text-text-muted mt-0.5">by {winner.team}</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-text font-medium mb-4 leading-relaxed">
          {winner.tagline}
        </p>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">{winner.description}</p>

        <div className="rounded-xl bg-surface/60 border border-border px-4 py-3 mb-5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
            Built with
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{winner.highlights}</p>
        </div>

        <div className="mb-5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-2">
            Team ({winner.members.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {winner.members.map((m) => (
              <div
                key={m}
                className="flex items-center gap-2 bg-surface border border-border rounded-full pl-1.5 pr-3 py-1"
              >
                <span className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                  {m
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
                <span className="text-sm font-medium">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {winner.demo && (
          <div className="mt-auto flex flex-wrap gap-2 text-xs">
            <a
              href={winner.demo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Live demo →
            </a>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

export default function WinnersPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary-subtle" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="font-mono text-xs text-primary">CLAUDE HACKS 2026</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-display font-bold mb-6">
              <span className="text-gradient">Winners</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Five teams, two tracks, one weekend. Congratulations to the
              builders who pushed Claude AI the furthest.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Open Track */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Open Track
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">Build anything</h2>
              <p className="text-text-muted mt-2 max-w-xl mx-auto">
                The projects that pushed creativity, engineering depth, and Claude usage.
              </p>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-3 gap-5">
            {openWinners.map((w, i) => (
              <WinnerCard key={w.project} winner={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Track */}
      <section className="py-16 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-green-700">
                  Sustainability Track · Sponsored by IGS Energy
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">For a better grid</h2>
              <p className="text-text-muted mt-2 max-w-xl mx-auto">
                Solutions tackling environmental and energy challenges with AI.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {sustainabilityWinners.map((w, i) => (
              <WinnerCard key={w.project} winner={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-lg text-text-secondary leading-relaxed">
              Huge thanks to every team who shipped this weekend, and to our
              judges from <span className="text-text font-medium">NVIDIA, Meta, Google, IGS Energy, AWS, and Vertiv</span> for
              their time and feedback.
            </p>
            <p className="text-sm text-text-muted mt-4">
              See you next year. 🧡
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
