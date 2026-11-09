import type { Metadata } from "next";
import ShowcaseGrid from "@/components/ShowcaseGrid";

export const metadata: Metadata = {
  title: "Showcase | Claude Builders Club at Ohio State",
  description:
    "See what Ohio State students are building with Claude. Submit your project for a chance to get featured.",
};

export default function ShowcasePage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-mist" id="showcase-top" aria-labelledby="showcase-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h1 id="showcase-h">Built with Claude</h1>
              <p className="t-lead">Real projects shipped by Ohio State students. See what the club is building — and get yours featured.</p>
              <ul className="rows">
                <li><span className="rows__name">Projects</span><span className="rows__value">30+ shipped</span></li>
                <li><span className="rows__name">Builders</span><span className="rows__value">100+ students</span></li>
                <li><span className="rows__name">Tools</span><span className="rows__value">Claude API, Code, MCP &amp; more</span></li>
              </ul>
              <a className="link" href="/submit">Submit your project</a>
            </div>
            <div className="frame frame--split frame--lit span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/tools.svg" alt="Claude, Claude Code, GitHub, Python, React and Vercel" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="section" id="projects" aria-labelledby="projects-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="projects-h">Featured projects</h2>
              <p className="t-lead">From campus to production. Projects built on Claude&apos;s API, Claude Code, and more.</p>
              <a className="link" href="/submit">Add yours</a>
            </div>
          </div>
          <div style={{ marginTop: "var(--head-gap)" }}>
            <ShowcaseGrid />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-band" id="how" aria-labelledby="how-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="how-h">How to get featured</h2>
              <p className="t-lead">Three steps. No gatekeeping, no minimum.</p>
              <ul className="rows">
                <li><span className="rows__name">Build</span><p>Ship a project that uses Claude — an app, a tool, an agent, a hack. Big or small.</p></li>
                <li><span className="rows__name">Submit</span><p>Fill out the form. Tell us what you built and what tools you used.</p></li>
                <li><span className="rows__name">Featured</span><p>We review every submission. Standout projects get showcased here.</p></li>
              </ul>
              <a className="link" href="/submit">Submit now</a>
            </div>
            <div className="frame frame--split span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/judges.svg" alt="NVIDIA, Meta, Google, AWS, Anthropic and Claude" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
