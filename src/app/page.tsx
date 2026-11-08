const DISCORD_URL = "https://discord.gg/Re7FCAkS";

export default function Home() {
  return (
    <>
      {/* HERO: triptych (dealt): the headline on span-3, a collage of three sets in the middle,
          one large button on the right line. The grain-gradient ground on the club's mark is the
          page's one effect. */}
      <section className="hero hero--triptych" aria-labelledby="hero-h">
        <div className="wrap">
          <div className="hero-text grid hero__grid">
            <div className="span-3">
              <h1 id="hero-h">Student AI club at Ohio State</h1>
              <p className="hero__lead">The Claude Builders Club runs workshops and projects on Claude, and Claude Hacks, a hackathon for 100 students.</p>
            </div>
            <div className="ly-collage span-6 start-4" role="img" aria-label="Cards for the club, its hackathon and the winning projects">
              <div className="ly-collage__set is-on">
                <div className="ly-piece pc-win pc-win--lead" style={{ left: "4%", top: "6%", width: "48%", height: "42%" }}>
                  <span className="lbl">The club&apos;s hackathon</span>
                  <h4>Claude Hacks 2026</h4>
                  <span className="team">17 to 19 April, Pomerene Hall</span>
                  <p>100 students, 19 projects.</p>
                </div>
                <div className="ly-piece pc-list" style={{ left: "56%", top: "6%", width: "40%", height: "42%" }}>
                  <span className="lbl">What the club does</span>
                  <div className="it"><b>Learn</b>Claude API workshops</div>
                  <div className="it"><b>Build</b>Projects on Claude</div>
                  <div className="it"><b>Connect</b>Events with engineers</div>
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
                <div className="ly-piece pc-win" style={{ left: "4%", top: "6%", width: "48%", height: "42%" }}>
                  <span className="lbl">1st place, open track</span>
                  <h4>EagleEye</h4>
                  <span className="team">Claude Mythos</span>
                  <p>Reads highway cameras with Claude vision and triages crashes in seconds.</p>
                </div>
                <div className="ly-piece pc-win" style={{ left: "56%", top: "6%", width: "40%", height: "42%" }}>
                  <span className="lbl">1st place, sustainability track</span>
                  <h4>Greenify</h4>
                  <span className="team">Awesome Dragons</span>
                  <p>A smart home agent that cuts energy use from one sentence.</p>
                </div>
                <div className="ly-piece pc-win" style={{ left: "4%", top: "52%", width: "50%", height: "44%" }}>
                  <span className="lbl">2nd place, open track</span>
                  <h4>Tokenlens</h4>
                  <span className="team">Crtl Alt Elite</span>
                  <p>What a repository spends on LLM calls, model by model.</p>
                </div>
                <div className="ly-piece pc-judges" style={{ left: "58%", top: "52%", width: "38%", height: "44%" }}>
                  <span className="lbl">Judges from</span>
                  <div className="row">
                    <span className="ic-tile ic-tile--wide"><img className="ic ic-wide" src="/assets/icons/nvidia.svg" alt="NVIDIA" width="40" height="8" /></span>
                    <span className="ic-tile"><img className="ic ic-land" src="/assets/icons/meta.svg" alt="Meta" width="40" height="27" /></span>
                    <span className="ic-tile"><img className="ic" src="/assets/icons/google-icon.svg" alt="Google" width="39" height="40" /></span>
                    <span className="ic-tile"><img className="ic ic-land" src="/assets/icons/aws.svg" alt="AWS" width="40" height="24" /></span>
                  </div>
                </div>
              </div>
              <div className="ly-collage__set" aria-hidden="true">
                <div className="ly-piece pc-win" style={{ left: "4%", top: "6%", width: "48%", height: "42%" }}>
                  <span className="lbl">3rd place, open track</span>
                  <h4>Pilot</h4>
                  <span className="team">DGX Disciples</span>
                  <p>A macOS agent that drives your iPhone for you.</p>
                </div>
                <div className="ly-piece pc-win" style={{ left: "56%", top: "6%", width: "40%", height: "42%" }}>
                  <span className="lbl">2nd place, sustainability track</span>
                  <h4>EnergyWatch</h4>
                  <span className="team">Forecast Fellas</span>
                  <p>When to sell, charge or draw for homes with solar.</p>
                </div>
                <div className="ly-piece pc-list" style={{ left: "4%", top: "52%", width: "50%", height: "44%" }}>
                  <span className="lbl">Two tracks</span>
                  <div className="it"><b>Open</b>Anything built on Claude</div>
                  <div className="it"><b>Sustainability</b>Energy and environment, with IGS Energy</div>
                </div>
                <div className="ly-piece pc-list pc-win--end" style={{ left: "58%", top: "52%", width: "38%", height: "44%" }}>
                  <span className="lbl">Scored on</span>
                  <div className="it"><b>Innovation</b></div>
                  <div className="it"><b>Technical complexity</b></div>
                  <div className="it"><b>Impact</b></div>
                  <div className="it"><b>Presentation</b></div>
                </div>
              </div>
            </div>
            <div className="span-3 start-10 hero__cta">
              <a className="btn btn--primary" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                Join the Discord
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path className="m-arrow__stem" d="M1 6h8" /><path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg>
              </a>
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
              <p className="t-small muted club__team">Run by Ayush Saggar and Rohan Aleti.</p>
              <a className="link" href="/info">See the club page</a>
            </div>
            <div className="frame frame--split frame--lit span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/tools.svg" alt="Claude, Claude Code, GitHub, Python, React and Vercel" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* HACKATHON: last year's Claude Hacks, one screen, beside the judges' marks; bg-band dealt */}
      <section className="section bg-band" id="hackathon" aria-labelledby="hackathon-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="hackathon-h">Claude Hacks 2026</h2>
              <p className="t-lead">100 students built with Claude at Pomerene Hall, 17 to 19 April 2026.</p>
              <ul className="rows">
                <li><span className="rows__name">Projects submitted</span><span className="rows__value">19</span></li>
                <li><span className="rows__name">Winning teams</span><span className="rows__value">5, two tracks</span></li>
                <li><span className="rows__name">Judges from</span><span className="rows__value">Six companies</span></li>
                <li><span className="rows__name">Sponsors</span><span className="rows__value">Anthropic, IGS Energy</span></li>
              </ul>
              <a className="link" href="/winners">See the winners</a>
            </div>
            <div className="frame frame--split span-7 start-6 picture__frame">
              <img className="frame__img" src="/assets/sheets/judges.svg" alt="The marks of NVIDIA, Meta, Google, AWS, Anthropic and Claude" width="628" height="502" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: the page's split, every answer open */}
      <section className="section" id="faq" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="grid">
            <div className="span-5 stack-5">
              <h2 id="faq-h">Questions</h2>
              <p className="faq__intro">The club answers the rest on Discord.</p>
              <div className="frame faq__contact">
                <img className="frame__img" src="/assets/sheets/contact.svg" alt="The Discord and Instagram marks" width="519" height="389" loading="lazy" decoding="async" />
              </div>
              <p className="faq__links">
                <a className="link" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Ask on Discord</a>
                <a className="link faq__contact-desk" href="https://instagram.com/claudeatohiostate" target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
              </p>
            </div>
            <div className="faq span-7 start-6">
              <div className="faq__item"><h3>Who can join the club?</h3><p>Any Ohio State student. No AI experience needed.</p></div>
              <div className="faq__item faq__item--desk"><h3>Who judged Claude Hacks?</h3><p>Engineers from NVIDIA, Meta, Google, AWS, Vertiv and IGS Energy.</p></div>
              <div className="faq__item faq__item--desk"><h3>Where does the club announce events?</h3><p>On Discord first, then Instagram.</p></div>
              <div className="faq__item"><h3>Will the club run Claude Hacks again?</h3><p>Yes, next year. News lands on Discord first.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
