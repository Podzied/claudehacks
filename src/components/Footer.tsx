export default function Footer() {
  return (
    <footer className="footer closing footer--statement g2m" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--word">
          <div className="section-head--split">
            <div>
              <h2 id="close-h">Build with Claude at Ohio State</h2>
              <p className="t-lead">Workshops, projects and community for students building with AI.</p>
            </div>
            <a className="btn btn--primary" href="/submit">
              Submit a project
              <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                <path className="m-arrow__stem" d="M1 6h8" />
                <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
              </svg>
            </a>
          </div>
          <p className="close__word" aria-hidden="true">
            Claude Builders
          </p>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <a className="nav__logo" href="/#top">
                <img src="/assets/icons/claude.svg" alt="" className="nav__logo-icon" />
                Claude Builders Club
              </a>
              <p className="footer__lede">A student AI club at The Ohio State University, building on Claude.</p>
              <div className="footer__partners">
                <span className="footer__partners-label">In partnership with</span>
                <div className="footer__partners-logos">
                  <img src="/osu-logo.svg" alt="The Ohio State University" width="40" height="35" />
                  <img src="/anthropic-logo.svg" alt="Anthropic" width="36" height="25" />
                </div>
              </div>
            </div>
            <div className="span-2 footer__col">
              <h4>Club</h4>
              <ul>
                <li><a href="/#club">What we do</a></li>
                <li><a href="/#about">About</a></li>
                <li><a href="/#faq">Questions</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h4>Pages</h4>
              <ul>
                <li><a href="/showcase">Showcase</a></li>
                <li><a href="/submit">Submit a project</a></li>
                <li><a href="/winners">Past winners</a></li>
                <li><a href="/sponsors">Sponsors</a></li>
                <li><a href="/info">Club page</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h4>Follow</h4>
              <ul>
                <li><a href="https://instagram.com/claudeatohiostate" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>&copy; 2026 Claude Builders Club at Ohio State</span>
            <span className="credits">Product names and logos are trademarks of their owners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
