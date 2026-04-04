import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">CH</span>
              </div>
              <span className="font-display font-bold text-lg">Claude Hacks</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              A 3-day hackathon powered by Claude AI, hosted by the Claude Builders Club
              at The Ohio State University.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs text-text-muted font-mono">April 17–19, 2026</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-sm mb-4 text-text-secondary">Navigate</h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Club", href: "/info" },
                { label: "Sponsors", href: "/sponsors" },
                { label: "Register", href: "/register" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-text-muted hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display font-semibold text-sm mb-4 text-text-secondary">Contact</h4>
            <div className="space-y-3 text-sm text-text-muted">
              <a
                href="mailto:claudebuildersclub@gmail.com"
                className="block hover:text-primary transition-colors"
              >
                claudebuildersclub@gmail.com
              </a>
              <p>Pomerene Hall 280, The Ohio State University</p>
              <p>1760 Neil Ave, Columbus, OH 43210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Claude Builders Club @ Ohio State
          </p>
          <p className="text-xs text-text-muted">
            Built with <span className="text-primary">Claude</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
