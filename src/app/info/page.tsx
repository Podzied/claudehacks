import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Info | Claude Builders Club at Ohio State",
  description: "Learn about the Claude Builders Club at The Ohio State University.",
};

export default function InfoPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-mist" aria-labelledby="info-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h1 id="info-h">Claude Builders Club</h1>
              <p className="t-lead">A student organization at The Ohio State University dedicated to building with Claude AI.</p>
              <ul className="rows">
                <li><span className="rows__name">Founded</span><span className="rows__value">2025</span></li>
                <li><span className="rows__name">Members</span><span className="rows__value">100+ students</span></li>
                <li><span className="rows__name">Location</span><span className="rows__value">Columbus, Ohio</span></li>
              </ul>
            </div>
            <div className="frame frame--split frame--lit span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/tools.svg" alt="Claude, Claude Code, GitHub, Python, React and Vercel" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section" aria-labelledby="pillars-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="pillars-h">What we do</h2>
              <p className="t-lead">Three things, every semester.</p>
            </div>
          </div>
          <ul className="rows" style={{ marginTop: "var(--head-gap)", maxWidth: 640 }}>
            <li>
              <span className="rows__name">Learn</span>
              <span className="rows__value">Weekly workshops covering the Claude API, prompt engineering, and AI development.</span>
            </li>
            <li>
              <span className="rows__name">Build</span>
              <span className="rows__value">Hands-on projects where members build real applications powered by Claude.</span>
            </li>
            <li>
              <span className="rows__name">Connect</span>
              <span className="rows__value">Events with industry professionals and fellow students interested in AI.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <section className="section bg-band" aria-labelledby="join-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-7 stack-5">
              <h2 id="join-h">Get involved</h2>
              <p className="t-lead">Open to all Ohio State students. Come to a meeting, or submit a project you&apos;re already working on.</p>
              <p className="faq__links">
                <a className="link" href="/submit">Submit a project</a>
                <a className="link" href="https://instagram.com/claudeatohiostate" target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
