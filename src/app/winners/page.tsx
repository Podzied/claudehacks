import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Winners | Claude Builders Club at Ohio State",
  description: "Meet the winners of Claude Hacks 2026, hosted by the Claude Builders Club at The Ohio State University.",
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
    tagline: "AI-assisted emergency dispatch that watches highway camera feeds and triages incidents in seconds.",
    description: "EagleEye monitors Columbus highway cameras and uses Claude’s vision to detect crashes and hazards in real time, generate structured incident summaries, estimate severity, and recommend the right emergency response package.",
    highlights: "React/Vite + Express/TS, ODOT camera proxy, scenario engine, multi-provider analyzer with mock fallback for demo resilience.",
    members: ["Will Campbell", "Rishik Panjugala", "Connor Walmsley"],
  },
  {
    place: 2,
    project: "TokenLens",
    team: "Ctrl Alt Elite",
    tagline: "Paste any GitHub repo URL → instantly see exactly how much that codebase spends on LLM API calls.",
    description: "TokenLens scans every file, detects LLM calls across OpenAI, Anthropic, Google, Cohere, Mistral, LangChain, LlamaIndex and more, then projects costs across 20+ models. Live streaming results, token estimation by task type, plus a Claude Haiku recommender that suggests cheaper model swaps with rationale.",
    highlights: "FastAPI + React + Tailwind (~6.2k LOC), 14-model pricing catalog, NDJSON streaming, SQLite caching.",
    members: ["Sathvik Allipuram", "Harrison Hahner", "Srijan Puli", "Prajuval Prakash"],
    demo: "https://osutokenlens.vercel.app/",
  },
  {
    place: 3,
    project: "Pilot",
    team: "DGX Disciples",
    tagline: "A macOS agent that drives your iPhone for you — Claude vision + synthetic taps through iPhone Mirroring.",
    description: "SwiftUI menubar app + Python daemon that uses Claude’s vision to read your phone screen, plans actions, and injects synthetic taps and keystrokes through Apple’s iPhone Mirroring window. Users write short YAML \"skills\"; after 3 clean runs Pilot freezes the workflow into a compiled local replay.",
    highlights: "~10k+ LOC, MCP server, 6-layer memory (catalog, runtime store, vector index, hint cache, compiled snapshots, usage backplane), APScheduler.",
    members: ["Athin Shetty", "Sohum Suthar"],
  },
];

const sustainabilityWinners: Winner[] = [
  {
    place: 1,
    project: "Greenify",
    team: "Awesome Dragons",
    tagline: "Tell your house “I’m leaving” or “I’m cooking” — Claude reorganizes your energy use to match.",
    description: "A smart home agent that takes plain-English intent and automatically adjusts devices to cut energy use, while protecting essentials. Every run reports both energy saved (kW) and dollar savings, with a monthly view tying decisions back to the bill.",
    highlights: "FastAPI backend (1300-line agent, hybrid LLM + rules planner, schema-validated JSON plans, real smart-plug seam), React 19 + Three Fiber 3D dollhouse frontend.",
    members: ["Siddarth Tummala", "Kanishk Kovuru", "Shukanth Jojodae", "Shirish Parasa", "Pathiv Medidi"],
  },
  {
    place: 2,
    project: "EnergyWatch",
    team: "Forecast Fellas",
    tagline: "AI dispatch for home solar — when to sell, when to charge, when to pull, explained in plain English.",
    description: "Helps homeowners with solar + battery storage decide when to sell back to the grid, charge their battery, or draw from it. Pulls real Open-Meteo forecasts for solar generation and asks Claude Sonnet to reason over pricing signals, battery state, and the 7-day forecast.",
    highlights: "React + Node/Express + SQLite, bcrypt auth + Gmail verification + JWT, 3,288-line Recharts dashboard, customizable strategy modes, live power-flow diagram.",
    members: ["Ayush Pandit", "Aaryan Sharma"],
  },
];

const placeLabel: Record<1 | 2 | 3, string> = {
  1: "1st place",
  2: "2nd place",
  3: "3rd place",
};

function WinnerCard({ winner }: { winner: Winner }) {
  return (
    <article className="winner-card" id={winner.project.toLowerCase()}>
      <div className="winner-card__head">
        <span className="t-label muted">{placeLabel[winner.place]}</span>
        <h3>{winner.project}</h3>
        <span className="t-small muted">by {winner.team}</span>
      </div>

      <p className="t-lead" style={{ marginBottom: "var(--s-3)" }}>{winner.tagline}</p>
      <p className="t-small muted" style={{ lineHeight: 1.55 }}>{winner.description}</p>

      <div className="winner-card__stack">
        <span className="t-label muted">Built with</span>
        <p className="t-small" style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{winner.highlights}</p>
      </div>

      <div className="winner-card__stack">
        <span className="t-label muted">Team ({winner.members.length})</span>
        <p className="t-small">{winner.members.join(", ")}</p>
      </div>

      {winner.demo && (
        <div style={{ paddingTop: "var(--s-3)", borderTop: "1px solid var(--line)" }}>
          <a className="link" href={winner.demo} target="_blank" rel="noreferrer">Live demo</a>
        </div>
      )}
    </article>
  );
}

export default function WinnersPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-mist" aria-labelledby="winners-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h1 id="winners-h">Winners</h1>
              <p className="t-lead">Five teams, two tracks, one weekend at Claude Hacks 2026. Congratulations to the builders who pushed Claude the furthest.</p>
              <ul className="rows">
                <li><span className="rows__name">Event</span><span className="rows__value">Claude Hacks 2026</span></li>
                <li><span className="rows__name">Teams</span><span className="rows__value">5 winners across 2 tracks</span></li>
                <li><span className="rows__name">Judges</span><span className="rows__value">NVIDIA, Meta, Google, AWS, IGS, Vertiv</span></li>
              </ul>
              <a className="link" href="/showcase">See the community showcase</a>
            </div>
            <div className="frame frame--split frame--lit span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/judges.svg" alt="NVIDIA, Meta, Google, AWS, Anthropic and Claude" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Open Track */}
      <section className="section" id="open" aria-labelledby="open-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="open-h">Open track</h2>
              <p className="t-lead">Build anything. The projects that pushed creativity, engineering depth, and Claude usage.</p>
            </div>
          </div>
          <div className="winner-grid winner-grid--3" style={{ marginTop: "var(--head-gap)" }}>
            {openWinners.map((w) => (
              <WinnerCard key={w.project} winner={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Track */}
      <section className="section bg-band" id="sustainability" aria-labelledby="sustain-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="sustain-h">Sustainability track</h2>
              <p className="t-lead">Sponsored by IGS Energy. Solutions tackling environmental and energy challenges with AI.</p>
            </div>
          </div>
          <div className="winner-grid winner-grid--2" style={{ marginTop: "var(--head-gap)" }}>
            {sustainabilityWinners.map((w) => (
              <WinnerCard key={w.project} winner={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="section" aria-labelledby="thanks-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-7 stack-5">
              <h2 id="thanks-h">Thanks to every team</h2>
              <p className="t-lead">Huge thanks to every team who shipped that weekend, and to our judges from NVIDIA, Meta, Google, IGS Energy, AWS, and Vertiv for their time and feedback.</p>
              <a className="link" href="/submit">Submit your own project</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
