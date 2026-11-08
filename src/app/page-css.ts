export const pageCss = `
/* the brand palette and the dealt pairing, as start.mjs brand printed them (the accent darkened one
   step from #c15f3c to #b4522f so a white label passes 4.5:1) */
:root {
  --p-bg: #faf9f5; --p-surface: #f0eee6; --p-ink: #141413; --p-muted: #5f5b53;
  --p-accent: #b4522f; --p-accent-ink: #ffffff; --p-action: #b4522f; --p-action-ink: #ffffff;
  --p-inv-bg: #141413; --p-inv-surface: #212120; --p-inv-ink: #faf9f5; --p-inv-muted: #999996;
  --p-inv-accent: #d97757; --p-inv-accent-ink: #111111; --p-inv-action: #d97757; --p-inv-action-ink: #111111;
  --font-display: "Host Grotesk", system-ui, sans-serif;
  --font-text: "Host Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.035em;
  --display-tracking-xl: -0.04em;
}

/* ---------------------------------------------------------------- page CSS: inside the visuals */

/* the hero collage's pieces: sized in % of the collage, their text in container units, so the phone
   shows the same picture smaller; no display text at 40px or more, so no piece reads as a heading */
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
.ly-collage .pc-sched { background: #fff; color: var(--ink); padding: 3.4cqw 4cqw; display: grid; gap: 1.2cqw; align-content: start; font: 400 max(13px, 2cqw)/1.3 var(--font-text); }
.pc-sched b { font-weight: 500; font-size: max(13px, 2.3cqw); }
.pc-sched .ln { display: flex; justify-content: space-between; gap: 2cqw; padding-top: 1.2cqw; border-top: 1px solid var(--line); }
.pc-sched .ln em { font-style: normal; color: var(--muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.ly-collage .pc-list { background: #fff; color: var(--ink); padding: 4cqw; display: grid; gap: 1.6cqw; align-content: start; font: 400 max(13px, 2.1cqw)/1.35 var(--font-text); }
.pc-list .lbl { font-weight: 500; color: var(--muted); font-size: max(13px, 1.9cqw); }
.pc-list .it { padding-top: 1.4cqw; border-top: 1px solid var(--line); }
.pc-list .it b { display: block; font-weight: 500; font-size: max(13px, 2.4cqw); }
.ly-collage .pc-judges { background: #fff; color: var(--ink); padding: 4cqw; display: grid; gap: 2.4cqw; align-content: start; }
.pc-judges .lbl { font-weight: 500; color: var(--muted); font-size: max(13px, 1.9cqw); }
.pc-judges .row { display: flex; flex-wrap: wrap; gap: 1.6cqw; align-items: center; }
.pc-judges .ic-tile { --tile: 6.4cqw; }
.pc-judges .wordmark { font: 500 max(13px, 2.2cqw)/1 var(--font-display); letter-spacing: -0.02em; padding: 0 1.4cqw; height: 6.4cqw; display: inline-grid; place-items: center; }

/* the dealt section grounds (backgrounds.css) bring a min-height, centring and padding of their own
   that fight the one-section-per-screen box: the box's rules win here */
main > section.section.section:is(.bg-mist, .bg-band) { --g-screen: calc(var(--h, 1) * 100svh); display: block; padding: var(--padt) 0 calc(var(--padb) + var(--bar)); }
@media (min-width: 640px) and (max-width: 1279px) {
  main > section.section.section:is(.bg-mist, .bg-band) { display: flex; flex-direction: column; height: auto; }
}
@media (max-width: 639px) { main > section.section.section:is(.bg-mist, .bg-band) { --g-screen: calc(var(--hm, var(--h, 1)) * 100lvh); } }

/* the hero's button at the page's one button height (the triptych demo's 64px fails button-styles) */
.hero--triptych .hero__cta .btn { height: var(--btn-h); font-size: var(--t-body); padding-inline: var(--s-5); }
/* the footer's name: 12 letters across the wrap (the kit sizes for 8), and room for the face's ascenders */
.close__word { font-size: clamp(40px, 13.4vw, 194px); line-height: 1.12; min-width: 0; }
@media (min-width: 640px) and (max-width: 1279px) { .close__word { font-size: clamp(40px, 8.5vw, 194px); } .closing__links .footer__lede { font-size: var(--t-body); } }
@media (max-width: 639px) { .close__word { font-size: clamp(40px, 13.4vw, 60px); } }

/* the two picture frames (the club's tools, the hackathon's judges): one composed picture of real marks
   on the lit ground, 5:4; square on a small laptop, 5:4 on the tablet, square on the phone */
.picture__frame { --ratio: 0px; background: var(--ground-bg); padding: 0; aspect-ratio: 5 / 4; }
.picture__frame > .frame__img { object-fit: contain; }
@media (min-width: 1024px) and (max-width: 1279px) { .picture__frame { aspect-ratio: 1 / 1; } }
/* the tablet: the words first, then the picture frame takes what the screen leaves (the wrap is the
   section's column there); the rows go across so no half of the column stands empty */
@media (min-width: 640px) and (max-width: 1023px) {
  #club .grid, #hackathon .grid { display: contents; }
  .picture__frame { aspect-ratio: auto; flex: 1 1 0; min-height: 0; margin-top: var(--s-5); }
  #club .rows { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: var(--s-5); }
  #hackathon .rows { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: var(--s-5); }
  #club .rows > li, #hackathon .rows > li { padding-top: var(--s-4); }
  #club .rows > li:first-child, #hackathon .rows > li:first-child { padding-top: var(--s-4); }
}
@media (max-width: 639px) { .picture__frame { aspect-ratio: 2 / 1; } .nav__logo-long, .club__team, .pc-win--lead .team { display: none; } }

/* the questions' contact frame: the club's two channels as one picture on the lit ground, the links
   under it; the split keeps its two columns on the tablet so the answers' rules never run the
   container's width; on the phone two questions and the intro go */
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

`;
