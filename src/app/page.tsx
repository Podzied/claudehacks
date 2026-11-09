const GROUPME_URL = "https://groupme.com/join_group/110067294/Y3bFkjX6";

export default function Home() {
  return (
    <>
      <section className="hero hero--triptych" aria-labelledby="hero-h">
        <div className="wrap">
          <div className="hero__brand-row">
            <img src="/osu-logo.svg" alt="The Ohio State University" className="hero__brand-logo hero__brand-logo--osu" />
            <span className="hero__brand-x" aria-hidden="true">&times;</span>
            <img src="/anthropic-logo.svg" alt="Anthropic" className="hero__brand-logo hero__brand-logo--anthropic" />
          </div>
          <div className="hero-text grid hero__grid">
            <div className="span-3">
              <h1 id="hero-h">Claude Builders<br/>Club</h1>
              <p className="hero__lead">The student AI club at The Ohio State University. We learn, build and ship with Claude.</p>
              <p className="hero__sub">Open to all Ohio State students. No AI experience needed.</p>
            </div>
            <div className="ly-collage span-6 start-4" role="img" aria-label="Cards about the club and what members do">
              <div className="ly-collage__set is-on">
                <div className="ly-piece pc-win pc-win--lead" style={{ left: "4%", top: "6%", width: "48%", height: "42%" }}>
                  <span className="lbl">What we do</span>
                  <h4>Learn &amp; Build</h4>
                  <span className="team">with Claude</span>
                  <p>Workshops on the Claude API, projects shipped on Claude, and events with engineers.</p>
                </div>
                <div className="ly-piece pc-list" style={{ left: "56%", top: "6%", width: "40%", height: "42%" }}>
                  <span className="lbl">Club activities</span>
                  <div className="it"><b>Workshops</b>Claude API &amp; Claude Code</div>
                  <div className="it"><b>Projects</b>Ship real apps on Claude</div>
                  <div className="it"><b>Events</b>Meet engineers in the field</div>
                </div>
                <div className="ly-piece pc-fact" style={{ left: "4%", top: "52%", width: "38%", height: "44%" }}>
                  <b>Open to all</b>
                  <span>Any Ohio State student, no AI experience needed</span>
                </div>
                <div className="ly-piece pc-mark" style={{ left: "46%", top: "52%", width: "50%", height: "44%" }} data-fx="grain-gradient" data-fx-seed="3">
                  <span className="pc-mark__icon"><img className="ic" src="/assets/icons/claude.svg" alt="" width="40" height="40" /></span>
                  <strong>Claude Builders Club</strong>
                  <span>The Ohio State University, Columbus</span>
                </div>
              </div>
              <div className="ly-collage__set" aria-hidden="true">
                <div className="ly-piece pc-win pc-win--lead" style={{ left: "4%", top: "6%", width: "48%", height: "42%" }}>
                  <span className="lbl">Built by members</span>
                  <h4>Real Projects</h4>
                  <span className="team">Shipped on Claude</span>
                  <p>From AI agents to creative tools, our members build and ship real applications.</p>
                </div>
                <div className="ly-piece pc-list" style={{ left: "56%", top: "6%", width: "40%", height: "42%" }}>
                  <span className="lbl">Tools we use</span>
                  <div className="it"><b>Claude API</b>Build intelligent apps</div>
                  <div className="it"><b>Claude Code</b>AI-powered development</div>
                  <div className="it"><b>Python &amp; React</b>Full-stack projects</div>
                </div>
                <div className="ly-piece pc-win" style={{ left: "4%", top: "52%", width: "50%", height: "44%" }}>
                  <span className="lbl">Community</span>
                  <h4>100+ Members</h4>
                  <span className="team">and growing</span>
                  <p>Students from every major, learning to build with AI together.</p>
                </div>
                <div className="ly-piece pc-judges" style={{ left: "58%", top: "52%", width: "38%", height: "44%" }}>
                  <span className="lbl">Powered by</span>
                  <div className="row">
                    <span className="ic-tile"><img className="ic" src="/assets/icons/claude.svg" alt="Claude" width="40" height="40" /></span>
                    <span className="ic-tile"><img className="ic ic-land" src="/assets/icons/anthropic.svg" alt="Anthropic" width="40" height="27" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLUB: split-text-left, what the club does beside the tools its members build with */}
      <section className="section bg-mist" id="club" aria-labelledby="club-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="club-h">Workshops and projects for students</h2>
              <ul className="rows">
                <li><span className="rows__name">Learn</span><p>Workshops on the Claude API.</p></li>
                <li><span className="rows__name">Build</span><p>Projects shipped on Claude.</p></li>
                <li><span className="rows__name">Connect</span><p>Events with engineers in the field.</p></li>
              </ul>
              <a className="link" href="/info">See the club page</a>
            </div>
            <div className="frame frame--split frame--lit span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/tools.svg" alt="Claude, Claude Code, GitHub, Python, React and Vercel" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT: who we are and how to get involved */}
      <section className="section bg-band" id="about" aria-labelledby="about-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="about-h">About the club</h2>
              <p className="t-lead">The Claude Builders Club is a student organization at The Ohio State University, supported by Anthropic.</p>
              <ul className="rows">
                <li><span className="rows__name">Founded</span><span className="rows__value">2025</span></li>
                <li><span className="rows__name">Members</span><span className="rows__value">100+ students</span></li>
                <li><span className="rows__name">Location</span><span className="rows__value">Columbus, Ohio</span></li>
                <li><span className="rows__name">Open to</span><span className="rows__value">All OSU students</span></li>
              </ul>
              <a className="link" href="/winners">See past hackathon winners</a>
            </div>
            <div className="frame frame--split span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/judges.svg" alt="The marks of NVIDIA, Meta, Google, AWS, Anthropic and Claude" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="faq-h">Questions</h2>
              <p className="faq__intro">The club answers the rest on GroupMe.</p>
              <div className="frame faq__contact">
                <img className="frame__img" src="/assets/sheets/contact.svg" alt="The GroupMe and Instagram marks" width="519" height="389" loading="lazy" decoding="async" />
              </div>
              <p className="faq__links">
                <a className="link" href={GROUPME_URL} target="_blank" rel="noopener noreferrer">Ask on GroupMe</a>
                <a className="link faq__contact-desk" href="https://instagram.com/claudeatohiostate" target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
              </p>
            </div>
            <div className="faq span-7 start-6">
              <div className="faq__item"><h3>Who can join the club?</h3><p>Any Ohio State student. No AI experience needed.</p></div>
              <div className="faq__item faq__item--desk"><h3>What is Claude?</h3><p>Claude is an AI assistant made by Anthropic. We build apps and tools on top of it.</p></div>
              <div className="faq__item faq__item--desk"><h3>Where does the club announce events?</h3><p>On GroupMe first, then Instagram.</p></div>
              <div className="faq__item"><h3>How do I get started?</h3><p>Join our GroupMe and come to the next workshop. We&apos;ll help you from there.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
