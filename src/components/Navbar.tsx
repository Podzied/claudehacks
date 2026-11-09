export const GROUPME_URL = "https://groupme.com/join_group/110067294/Y3bFkjX6";

export default function Navbar() {
  return (
    <header className="nav nav--centre">
      <div className="wrap nav__bar">
        <a className="nav__logo" href="/#top">
          <img src="/assets/icons/claude.svg" alt="" className="nav__logo-icon" />
          <span className="nav__logo-text">
            Claude Builders Club
            <span className="nav__logo-sub">@ The Ohio State University</span>
          </span>
        </a>
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href="/#club">
              Club
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#about">
              About
            </a>
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
          <a className="btn btn--primary" href={GROUPME_URL} target="_blank" rel="noopener noreferrer">
            Join the GroupMe
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
