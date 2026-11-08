// Composes groups of real marks (public/assets/icons, fetched by the design kit's icons.mjs) into one
// static SVG each, so a frame holds a single picture. Run: node scripts/make-sheets.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const ICONS = 'public/assets/icons', OUT = 'public/assets/sheets';
const icon = (id) => {
  const src = readFileSync(`${ICONS}/${id}.svg`, 'utf8');
  const vb = (src.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24';
  const inner = src.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const ink = /data-ic="ink"/.test(src);
  return { vb, inner, ink };
};
// a tile: white rounded square (wide: 2.4x) with the mark at 60% of the tile (wide: 1.7x wide, 58% tall)
function tile(id, x, y, t, wide) {
  const { vb, inner, ink } = icon(id);
  const w = wide ? t * 2.4 : t, r = t * 0.28;
  const mw = wide ? t * 1.7 : t * 0.6, mh = wide ? t * 0.58 : t * 0.6;
  const mx = x + (w - mw) / 2, my = y + (t - mh) / 2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${t}" rx="${r}" fill="#ffffff" stroke="rgba(20,20,19,.12)"/>` +
    `<svg x="${mx}" y="${my}" width="${mw}" height="${mh}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet"${ink ? ' color="#141413"' : ''}>${inner}</svg>`;
}
function sheet(name, W, H, rows, t, gap, title) {
  let body = '';
  const rowW = (r) => r.reduce((a, [, wide]) => a + (wide ? t * 2.4 : t), 0) + gap * (r.length - 1);
  const totalH = rows.length * t + gap * (rows.length - 1);
  let y = (H - totalH) / 2;
  for (const r of rows) {
    let x = (W - rowW(r)) / 2;
    for (const [id, wide] of r) { body += tile(id, x, y, t, wide); x += (wide ? t * 2.4 : t) + gap; }
    y += t + gap;
  }
  writeFileSync(`${OUT}/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">${body}</svg>\n`);
}
sheet('judges', 628, 502, [[['nvidia', true], ['meta'], ['google-icon']], [['aws'], ['anthropic'], ['claude']]], 96, 32, 'NVIDIA, Meta, Google, AWS, Anthropic and Claude');
sheet('contact', 519, 389, [[['discord'], ['instagram']]], 112, 40, 'Discord and Instagram');
sheet('tools', 628, 502, [[['claude'], ['claude-code'], ['github']], [['python'], ['react'], ['vercel']]], 96, 32, 'Claude, Claude Code, GitHub, Python, React and Vercel');
console.log('sheets written');
