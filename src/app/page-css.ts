export const pageCss = `
:root {
  --p-bg: #faf9f5; --p-surface: #f0eee6; --p-ink: #141413; --p-muted: #5f5b53;
  --p-accent: #b4522f; --p-accent-ink: #ffffff; --p-action: #b4522f; --p-action-ink: #ffffff;
  --p-inv-bg: #141413; --p-inv-surface: #212120; --p-inv-ink: #faf9f5; --p-inv-muted: #999996;
  --p-inv-accent: #d97757; --p-inv-accent-ink: #111111; --p-inv-action: #d97757; --p-inv-action-ink: #111111;
  --osu-scarlet: #BA0C2F;
  --claude-orange: #D97757;
  --font-display: "Host Grotesk", system-ui, sans-serif;
  --font-text: "Host Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.035em;
  --display-tracking-xl: -0.04em;
}

/* ---------------------------------------------------------------- hero collage pieces */

.ly-collage { container-type: inline-size; }
.ly-collage .ly-piece { box-shadow: 0 1px 2px rgb(0 0 0 / .08), 0 22px 48px -22px rgb(0 0 0 / .35); }
.ly-collage .pc-win { background: #fff; color: var(--ink); padding: 4cqw; display: grid; align-content: start; gap: 1.4cqw; font: 400 max(13px, 2.1cqw)/1.35 var(--font-text); }
.pc-win .lbl { font-weight: 500; color: var(--muted); font-size: max(13px, 1.9cqw); }
.pc-win h4 { font: var(--display-weight) min(5.6cqw, 36px)/1 var(--font-display); letter-spacing: -0.03em; margin: 0 0 .4cqw; color: var(--ink); }
.pc-win--lead h4 { font-size: min(7.5cqw, 38px); }
.pc-win--lead p { font-size: max(13px, 2.3cqw); }
.pc-win .team { color: var(--muted); }
.pc-win p { margin: 0; }
.pc-win--end { padding-right: 12cqw; }
.ly-collage .pc-mark { isolation: isolate; color: var(--ground-ink); padding: 4cqw 12cqw 4cqw 4cqw; display: grid; align-content: end; gap: 1.2cqw; }
.pc-mark > * { position: relative; }
.pc-mark__icon { display: block; margin-bottom: 2cqw; } .pc-mark__icon .ic { --ic-s: 6cqw; }
.pc-mark strong { font: var(--display-weight) min(6.4cqw, 38px)/1.02 var(--font-display); letter-spacing: -0.03em; }
.pc-mark span { font-size: max(13px, 2.1cqw); line-height: 1.35; }
.ly-collage .pc-fact { background: var(--ink); color: var(--bg); padding: 4cqw; display: grid; align-content: space-between; }
.pc-fact b { font: var(--display-weight) min(6cqw, 38px)/1.05 var(--font-display); letter-spacing: -0.03em; }
.pc-fact span { font-size: max(13px, 2.1cqw); line-height: 1.35; max-width: 18ch; }
.ly-collage .pc-list { background: #fff; color: var(--ink); padding: 4cqw; display: grid; gap: 1.6cqw; align-content: start; font: 400 max(13px, 2.1cqw)/1.35 var(--font-text); }
.pc-list .lbl { font-weight: 500; color: var(--muted); font-size: max(13px, 1.9cqw); }
.pc-list .it { padding-top: 1.4cqw; border-top: 1px solid var(--line); }
.pc-list .it b { display: block; font-weight: 500; font-size: max(13px, 2.4cqw); }
.ly-collage .pc-judges { background: #fff; color: var(--ink); padding: 4cqw; display: grid; gap: 2.4cqw; align-content: start; }
.pc-judges .lbl { font-weight: 500; color: var(--muted); font-size: max(13px, 1.9cqw); }
.pc-judges .row { display: flex; flex-wrap: wrap; gap: 1.6cqw; align-items: center; }
.pc-judges .ic-tile { --tile: 6.4cqw; }

/* ---------------------------------------------------------------- section layout overrides */

main > section.section.section:is(.bg-mist, .bg-band) { --g-screen: calc(var(--h, 1) * 100svh); display: block; padding: var(--padt) 0 calc(var(--padb) + var(--bar)); }
@media (min-width: 640px) and (max-width: 1279px) {
  main > section.section.section:is(.bg-mist, .bg-band) { display: flex; flex-direction: column; height: auto; }
}
@media (max-width: 639px) { main > section.section.section:is(.bg-mist, .bg-band) { --g-screen: calc(var(--hm, var(--h, 1)) * 100lvh); } }

.hero--triptych .hero__cta .btn { height: var(--btn-h); font-size: var(--t-body); padding-inline: var(--s-5); }

.close__word { font-size: clamp(40px, 13.4vw, 194px); line-height: 1.12; min-width: 0; }
@media (min-width: 640px) and (max-width: 1279px) { .close__word { font-size: clamp(40px, 8.5vw, 194px); } .closing__links .footer__lede { font-size: var(--t-body); } }
@media (max-width: 639px) { .close__word { font-size: clamp(40px, 13.4vw, 60px); } }

.picture__frame { --ratio: 0px; background: var(--ground-bg); padding: 0; aspect-ratio: 5 / 4; }
.picture__frame > .frame__img { object-fit: contain; }
@media (min-width: 1024px) and (max-width: 1279px) { .picture__frame { aspect-ratio: 1 / 1; } }
@media (min-width: 640px) and (max-width: 1023px) {
  #club .grid, #about .grid { display: contents; }
  .picture__frame { aspect-ratio: auto; flex: 1 1 0; min-height: 0; margin-top: var(--s-5); }
  #club .rows { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: var(--s-5); }
  #about .rows { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: var(--s-5); }
  #club .rows > li, #about .rows > li { padding-top: var(--s-4); }
  #club .rows > li:first-child, #about .rows > li:first-child { padding-top: var(--s-4); }
}
@media (max-width: 639px) { .picture__frame { aspect-ratio: 2 / 1; } .nav__logo-long, .club__team, .pc-win--lead .team { display: none; } }

.faq__contact { background: var(--ground-bg); padding: 0; aspect-ratio: 4 / 3; }
.faq__contact > .frame__img { object-fit: contain; }
.faq__links { display: flex; flex-wrap: wrap; gap: var(--s-3) var(--s-6); }
@media (min-width: 640px) and (max-width: 1023px) {
  #faq .grid, #faq .grid > .span-5 { display: contents; }
  #faq .wrap > * + * { margin-top: var(--s-5); }
  .faq__contact { aspect-ratio: auto; flex: 1 1 0; min-height: 0; }
  .faq__intro { display: none; }
}
@media (max-width: 639px) { .faq__contact { aspect-ratio: 3 / 1; } .faq__intro, .faq__item--desk, .faq__contact-desk { display: none; } }

/* ---------------------------------------------------------------- branding */

/* hero logo row: OSU Block O × Anthropic wordmark */
.hero__brand-row { display: flex; align-items: center; justify-content: center; gap: 24px; padding: var(--s-5) 0 var(--s-3); }
.hero__brand-logo--osu { height: 52px; width: auto; }
.hero__brand-logo--anthropic { height: 28px; width: auto; }
.hero__brand-x { font: 300 24px/1 var(--font-display); color: var(--muted); user-select: none; }

/* nav logo */
.nav__logo { display: flex; align-items: center; }
.nav__logo-icon { height: 20px; width: auto; margin-right: 8px; flex-shrink: 0; }
.nav__logo-text { display: flex; flex-direction: column; line-height: 1.15; }
.nav__logo-sub { font-size: 0.65em; opacity: 0.55; font-weight: 400; letter-spacing: 0.01em; }

/* footer partner logos */
.footer__partners { display: flex; flex-direction: column; gap: 8px; margin-top: var(--s-4); }
.footer__partners-label { font: 400 max(11px, var(--t-small))/1 var(--font-text); color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
.footer__partners-logos { display: flex; align-items: center; gap: 20px; }
.footer__partners-logos img { height: 24px; width: auto; opacity: 0.6; }
.footer__partners-logos img:first-child { height: 32px; }

@media (max-width: 639px) {
  .hero__brand-row { gap: 16px; padding: var(--s-4) 0 var(--s-2); }
  .hero__brand-logo--osu { height: 36px; }
  .hero__brand-logo--anthropic { height: 20px; }
  .hero__brand-x { font-size: 20px; }
}

/* ---------------------------------------------------------------- showcase grid & cards */

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: var(--card-gap);
}

.showcase-card {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  padding: var(--s-5);
  border-radius: var(--r-lg);
  border: 1px solid var(--line);
  background: var(--bg);
  transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
}
.showcase-card:hover {
  border-color: var(--line-strong);
  box-shadow: 0 8px 40px -12px color-mix(in oklab, var(--ink) 8%, transparent);
}

.showcase-card--cta {
  border-style: dashed;
  border-color: color-mix(in oklab, var(--accent) 35%, transparent);
  background: color-mix(in oklab, var(--accent) 3%, var(--bg));
}
.showcase-card--cta:hover {
  border-color: var(--accent);
}

.showcase-card__head h3 {
  font-family: var(--font-display);
  font-weight: var(--display-weight);
  font-size: var(--t-h3);
  line-height: 1.2;
  letter-spacing: var(--display-tracking);
}

.showcase-card__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.showcase-chip {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--r-sm);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: var(--t-label);
  color: var(--muted);
  line-height: 1.4;
}

.showcase-card__links {
  display: flex;
  gap: var(--s-5);
  padding-top: var(--s-3);
  border-top: 1px solid var(--line);
}

/* ---------------------------------------------------------------- winner grid & cards */

.winner-grid {
  display: grid;
  gap: var(--card-gap);
}
.winner-grid--3 {
  grid-template-columns: repeat(3, 1fr);
}
.winner-grid--2 {
  grid-template-columns: repeat(2, 1fr);
}
@media (max-width: 1023px) {
  .winner-grid--3 { grid-template-columns: 1fr; }
  .winner-grid--2 { grid-template-columns: 1fr; }
}
@media (min-width: 640px) and (max-width: 1023px) {
  .winner-grid--2 { grid-template-columns: repeat(2, 1fr); }
}

.winner-card {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  padding: var(--s-5);
  border-radius: var(--r-lg);
  border: 1px solid var(--line);
  background: var(--bg);
  transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
}
.winner-card:hover {
  border-color: var(--line-strong);
  box-shadow: 0 8px 40px -12px color-mix(in oklab, var(--ink) 8%, transparent);
}

.winner-card__head {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.winner-card__head h3 {
  font-family: var(--font-display);
  font-weight: var(--display-weight);
  font-size: var(--t-h3);
  line-height: 1.2;
  letter-spacing: var(--display-tracking);
}

.winner-card__stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

`;
