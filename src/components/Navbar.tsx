const SLIDES_URL =
  "https://docs.google.com/presentation/d/1KjZ1kextPiGLsCK0yZkMbCp8jW1aVsuL/edit?usp=sharing&ouid=104681296212393054344&rtpof=true&sd=true";
export const DISCORD_URL = "https://discord.gg/Re7FCAkS";

export default function Navbar() {
  return (
    <header className="nav nav--centre">
      <div className="wrap nav__bar">
        <a className="nav__logo" href="/#top">
          Claude Builders<span className="nav__logo-long"> Club</span>
        </a>
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href="/#club">
              Club
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#hackathon">
              Hackathon{" "}
              <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-3">
                  <p className="t-label">Open track winners</p>
                  <a href="/winners#eagleeye">EagleEye<span>1st place, Claude Mythos</span></a>
                  <a href="/winners#tokenlens">Tokenlens<span>2nd place, Crtl Alt Elite</span></a>
                  <a href="/winners#pilot">Pilot<span>3rd place, DGX Disciples</span></a>
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Sustainability track winners</p>
                  <a href="/winners#greenify">Greenify<span>1st place, Awesome Dragons</span></a>
                  <a href="/winners#energywatch">EnergyWatch<span>2nd place, Forecast Fellas</span></a>
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Claude Hacks 2026</p>
                  <a href="/schedule">Schedule<span>The three days in detail</span></a>
                  <a href="/sponsors">Sponsors<span>Anthropic and IGS Energy</span></a>
                  <a href={SLIDES_URL} target="_blank" rel="noopener noreferrer">Kickoff slides<span>The Friday deck</span></a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/winners">
              Winners
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#faq">
              Questions
            </a>
          </div>
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            Join the Discord
          </a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
