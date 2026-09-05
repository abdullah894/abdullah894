#!/usr/bin/env node
// Generates every animated SVG used by README.md into ../assets.
// No dependencies. Run:  node scripts/build-assets.mjs
//
// All animation is pure SVG (SMIL + CSS keyframes) so it plays inside GitHub's
// <img> sandbox, where JavaScript never runs.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');
mkdirSync(OUT, { recursive: true });

// ───────────────────────── content (edit freely) ─────────────────────────

const C = {
  bg0: '#080B12', bg1: '#0C1220', bg2: '#090D18',
  card: '#0B1220', card2: '#101B2E', line: '#1B2739', line2: '#1D3A5C',
  text: '#F8FAFC', soft: '#B9C4D6', muted: '#7E90A8', dim: '#3E4C61', mid: '#8B949E',
  cyan: '#22D3EE', indigo: '#6366F1', purple: '#A855F7', pink: '#F472B6', green: '#34D399',
  cyanL: '#67E8F9', indigoL: '#818CF8', purpleL: '#C084FC', pinkL: '#F9A8D4',
};

const PROFILE = {
  name: 'Abdullah Latif',
  handle: 'abdullah894',
  status: 'OPEN TO PRODUCT WORK',
  roles: ['Full-Stack Developer', 'AI Product Engineer', 'Mobile & Web Builder', 'Backend Systems Architect'],
  roleColors: [C.cyan, C.indigoL, C.purpleL, C.pinkL],
  tagline: ['I turn product ideas into shipped, maintained systems —', 'from the interface down to the database and the deploy.'],
  taglineMobile: ['Product ideas → shipped, maintained systems.', 'Interface down to database and deploy.'],
  sections: [
    { file: 'h-01', index: '01', title: 'At a Glance',   label: '// overview',   color: C.cyan },
    { file: 'h-02', index: '02', title: 'Selected Work', label: '// projects',   color: C.indigoL },
    { file: 'h-03', index: '03', title: 'Toolkit',       label: '// stack',      color: C.purpleL },
    { file: 'h-04', index: '04', title: 'How I Build',   label: '// principles', color: C.pinkL },
    { file: 'h-05', index: '05', title: 'Currently',     label: '// now',        color: C.green },
    { file: 'h-06', index: '06', title: "Let's Connect", label: '// contact',    color: C.cyan },
  ],
  nav: [
    { file: 'nav-overview', label: 'OVERVIEW', color: C.cyan },
    { file: 'nav-work',     label: 'WORK',     color: C.indigoL },
    { file: 'nav-stack',    label: 'STACK',    color: C.purpleL },
    { file: 'nav-approach', label: 'APPROACH', color: C.pinkL },
    { file: 'nav-now',      label: 'NOW',      color: C.green },
    { file: 'nav-contact',  label: 'CONTACT',  color: C.cyan },
  ],
  now: [
    ['building',  'MBS retrieval assistant · chunking strategy, evals, cost modelling'],
    ['designing', 'scroll-driven 3D web experiences · Three.js + GSAP'],
    ['learning',  'Unity · by building a full game, not by watching tutorials'],
    ['reading',   'hybrid search, grounding and RAG evaluation'],
  ],
  nowMobile: [
    ['building',  ['MBS retrieval assistant · chunking,', 'evals, cost modelling']],
    ['designing', ['scroll-driven 3D web · Three.js + GSAP']],
    ['learning',  ['Unity · by shipping a full game']],
    ['reading',   ['hybrid search, grounding, RAG evals']],
  ],
  marquee: [
    'NestJS', 'Next.js', 'React Native', 'PostgreSQL', 'pgvector', 'TypeScript', 'Prisma', 'Expo',
    'AWS', 'Docker', 'Nginx', 'Stripe', 'Socket.io', 'Three.js', 'GSAP', 'OpenAI', 'RAG pipelines',
    'n8n', 'Supabase', 'Firebase', 'Tailwind', 'Vue', 'MongoDB', 'Unity', 'Figma',
  ],
  footer: { title: 'Thanks for stopping by.', typed: "let's build something that ships." },
};

// ───────────────────────── primitives ─────────────────────────

const SANS = `-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif`;
const MONO = `'JetBrains Mono','SFMono-Regular',Menlo,Consolas,monospace`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const r2 = (n) => Math.round(n * 100) / 100;
const kt = (n) => n.toFixed(5).replace(/0+$/, '').replace(/\.$/, '');

const svg = (w, h, body, { par = 'xMidYMid meet', label = '' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="${par}" role="img" aria-label="${esc(label)}">${body}</svg>`;

// Discrete (stepped) SMIL animation from a list of [timeSeconds, value] pairs.
function discrete(attr, pairs, T, loop = true) {
  const vals = [], kts = [];
  let last = -1, prev;
  for (const [t, v] of pairs.sort((a, b) => a[0] - b[0])) {
    if (v === prev) continue;
    let k = Math.round((t / T) * 1e5) / 1e5;
    if (k <= last) k = last + 1e-5;
    if (k >= 1) break;
    vals.push(v); kts.push(k); last = k; prev = v;
  }
  vals.push(vals[vals.length - 1]); kts.push(1);
  const tail = loop ? `repeatCount="indefinite"` : `fill="freeze"`;
  return `<animate attributeName="${attr}" calcMode="discrete" values="${vals.join(';')}" keyTimes="${kts.map(kt).join(';')}" dur="${T}s" ${tail}/>`;
}

// Typewriter engine: every glyph is its own <text> so the effect never depends on
// clip-path support or exact font metrics. Cursor position is a stepped animation.
class Typer {
  constructor(T, size, loop = true) { this.T = T; this.size = size; this.cw = size * 0.6; this.loop = loop; this.chars = []; this.cur = []; }
  type({ x, y, text, fill, t0, d, until }) {
    if (!this.cur.length) this.cur.push([0, x, y]);
    this.cur.push([t0, x, y]);
    let t = t0;
    for (let i = 0; i < text.length; i++) {
      t = t0 + (i + 1) * d;
      const b = typeof until === 'function' ? until(i) : (until ?? this.T);
      if (text[i] !== ' ') this.chars.push({ x: x + i * this.cw, y, ch: text[i], fill, a: t, b });
      this.cur.push([t, x + (i + 1) * this.cw, y]);
    }
    return t;
  }
  render({ cursorFill = C.pink } = {}) {
    const { T, size, cw, loop } = this;
    const tail = loop ? `repeatCount="indefinite"` : `fill="freeze"`;
    const glyphs = this.chars.map((c) => {
      const a = kt(c.a / T), b = kt(c.b / T);
      const once = c.b >= T;
      const anim = `<animate attributeName="opacity" calcMode="discrete" values="${once ? '0;1;1' : '0;1;0;0'}" keyTimes="${once ? `0;${a};1` : `0;${a};${b};1`}" dur="${T}s" ${tail}/>`;
      return `<text x="${r2(c.x)}" y="${c.y}" fill="${c.fill}" opacity="0">${esc(c.ch)}${anim}</text>`;
    }).join('');
    const xs = this.cur.map(([t, x]) => [t, r2(x)]);
    const ys = this.cur.map(([t, , y]) => [t, r2(y - size * 0.8)]);
    const cursor = `<rect class="caret" x="${xs[0][1]}" y="${ys[0][1]}" width="${r2(cw - 1.5)}" height="${r2(size * 1.02)}" rx="1" fill="${cursorFill}">${discrete('x', xs, T, loop)}${discrete('y', ys, T, loop)}</rect>`;
    return `<g font-family="${MONO}" font-size="${size}">${glyphs}${cursor}</g>`;
  }
}

// Cycling type → hold → delete typewriter used in the hero.
function roleTyper({ x, y, size, roles, colors, tType = 0.07, hold = 2.2, tDel = 0.035, gap = 0.45, start = 1.0 }) {
  let T = start;
  for (const r of roles) T += r.length * tType + hold + r.length * tDel + gap;
  const ty = new Typer(r2(T), size);
  let t = start;
  roles.forEach((role, idx) => {
    const n = role.length, holdEnd = t + n * tType + hold;
    ty.type({ x, y, text: role, fill: colors[idx % colors.length], t0: t, d: tType, until: (i) => holdEnd + (n - i) * tDel });
    for (let j = 1; j <= n; j++) ty.cur.push([holdEnd + j * tDel, x + (n - j) * ty.cw, y]);
    t = holdEnd + n * tDel + gap;
  });
  return ty;
}

const CSS_BASE = `
  .sans{font-family:${SANS}}
  .mono{font-family:${MONO}}
  .in{opacity:0;animation:in .9s ease forwards}
  .a1{animation-delay:.05s}.a2{animation-delay:.2s}.a3{animation-delay:.35s}.a4{animation-delay:.5s}
  .a5{animation-delay:.65s}.a6{animation-delay:.8s}.a7{animation-delay:.95s}
  @keyframes in{to{opacity:1}}
  .caret{animation:blink 1.1s steps(1) infinite}
  @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  .flow{stroke-dasharray:5 7;animation:dash 1.5s linear infinite}
  @keyframes dash{to{stroke-dashoffset:-24}}
  .beat{animation:beat 2.8s ease-in-out infinite}
  @keyframes beat{0%,100%{opacity:.35}50%{opacity:1}}
  .soft{animation:soft 4.5s ease-in-out infinite}
  @keyframes soft{0%,100%{opacity:.4}50%{opacity:.9}}
`;

const heroDefs = (w, h, shimmerW) => `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.bg0}"/><stop offset="50%" stop-color="${C.bg1}"/><stop offset="100%" stop-color="${C.bg2}"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${C.cyan}"/><stop offset="35%" stop-color="${C.indigo}"/><stop offset="70%" stop-color="${C.purple}"/><stop offset="100%" stop-color="${C.pink}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="50%" stop-color="#fff" stop-opacity="0.055"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="shimmer" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${shimmerW}" y2="0" gradientTransform="translate(-${shimmerW + 60} 0)">
      <stop offset="0" stop-color="${C.text}"/><stop offset=".36" stop-color="${C.text}"/>
      <stop offset=".48" stop-color="#7DD3FC"/><stop offset=".56" stop-color="#C4B5FD"/><stop offset=".64" stop-color="#F9A8D4"/>
      <stop offset=".76" stop-color="${C.text}"/><stop offset="1" stop-color="${C.text}"/>
      <animateTransform attributeName="gradientTransform" type="translate" values="-${shimmerW + 60} 0;${w + 60} 0" dur="6s" begin="1.4s" repeatCount="indefinite"/>
    </linearGradient>
    <radialGradient id="halo1"><stop offset="0%" stop-color="#3B82F6" stop-opacity="0.28"/><stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/></radialGradient>
    <radialGradient id="halo2"><stop offset="0%" stop-color="#D946EF" stop-opacity="0.16"/><stop offset="100%" stop-color="#D946EF" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0 L0 0 0 34" fill="none" stroke="${C.line}" stroke-width="1" opacity="0.5"/></pattern>
    <clipPath id="card"><rect width="${w}" height="${h}" rx="16"/></clipPath>
    <style>${CSS_BASE}
      .rise{animation:rise .9s cubic-bezier(.2,.7,.2,1) forwards,in .9s ease forwards;opacity:0}
      @keyframes rise{from{transform:translateY(10px)}to{transform:translateY(0)}}
      .drift{animation:drift 7s ease-in-out infinite}
      @keyframes drift{0%,100%{opacity:0;transform:translateY(0)}20%{opacity:.7}80%{opacity:.5}100%{transform:translateY(-26px)}}
    </style>
  </defs>`;

const chip = (x, y, w, text, bg, stroke, fill, size = 11) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${size * 2.35}" rx="6" fill="${bg}" stroke="${stroke}"/>` +
  `<text x="${x + size * 1.25}" y="${y + size * 1.55}" class="mono" font-size="${size}" fill="${fill}">${esc(text)}</text>`;

const packet = (path, color, dur, begin) =>
  `<circle r="2.6" fill="${color}" opacity="0"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>` +
  `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`;

// ───────────────────────── hero (desktop) ─────────────────────────

function hero() {
  const W = 1000, H = 320;
  const ty = roleTyper({ x: 70, y: 160, size: 18, roles: PROFILE.roles, colors: PROFILE.roleColors });
  const pillText = PROFILE.status, pillTL = pillText.length * 8.3, pillW = 31 + pillTL + 14;
  const dy = 8; // diagram vertical offset
  const body = `${heroDefs(W, H, 360)}
  <g clip-path="url(#card)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <ellipse cx="760" cy="60" rx="330" ry="200" fill="url(#halo1)">
      <animate attributeName="cx" values="760;700;760" dur="14s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="60;100;60" dur="14s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="120" cy="320" rx="300" ry="190" fill="url(#halo2)"><animate attributeName="cx" values="120;190;120" dur="18s" repeatCount="indefinite"/></ellipse>
    <g transform="skewX(-18)"><rect y="-40" width="150" height="400" fill="url(#shine)"><animate attributeName="x" values="-260;1120" dur="7s" begin="1.5s" repeatCount="indefinite"/></rect></g>
    <rect width="${W}" height="3" fill="url(#rule)"/>
    <rect y="${H - 3}" width="${W}" height="3" fill="url(#rule)" opacity="0.45"/>

    <g class="in a1">
      <rect x="48" y="40" width="${pillW}" height="26" rx="13" fill="#0B1626" stroke="${C.line2}"/>
      <circle cx="65" cy="53" r="4" fill="${C.green}" class="beat"/>
      <circle cx="65" cy="53" r="8" fill="${C.green}" opacity=".18"><animate attributeName="r" values="5;10;5" dur="2.8s" repeatCount="indefinite"/></circle>
      <text x="79" y="57.5" class="mono" font-size="11.5" fill="#7DD3FC" textLength="${pillTL}" lengthAdjust="spacing">${esc(pillText)}</text>
    </g>

    <g class="rise a2"><text x="48" y="118" class="sans" font-size="44" font-weight="700" fill="url(#shimmer)" letter-spacing="-0.8">${esc(PROFILE.name)}</text></g>

    <g class="in a3">
      <text x="48" y="160" class="mono" font-size="18" fill="${C.dim}">&gt;</text>
      ${ty.render({ cursorFill: C.pink })}
    </g>

    <text x="48" y="194" class="sans in a4" font-size="13.5" fill="${C.muted}">${esc(PROFILE.tagline[0])}</text>
    <text x="48" y="214" class="sans in a4" font-size="13.5" fill="${C.muted}">${esc(PROFILE.tagline[1])}</text>

    <g class="in a5">
      ${chip(48, 236, 112, 'React Native', '#0B1728', C.line2, '#7DD3FC')}
      ${chip(168, 236, 76, 'NestJS', '#140F20', '#372A50', '#C4B5FD')}
      ${chip(252, 236, 94, 'PostgreSQL', '#0A1A20', '#1B3B44', C.cyanL)}
      ${chip(354, 236, 118, 'LLM / Retrieval', '#1B0F1F', '#452038', C.pinkL)}
      ${chip(480, 236, 76, 'Next.js', '#0B1220', C.line2, '#E2E8F0')}
    </g>

    <g transform="translate(0 ${dy})">
      <text x="596" y="62" class="mono in a4" font-size="10.5" fill="${C.dim}" letter-spacing="1.2">// TYPICAL STACK</text>
      <g fill="none" stroke-width="1.5">
        <path class="flow in a5" d="M700 95 H752" stroke="${C.cyan}"/>
        <path class="flow in a5" d="M700 155 H752" stroke="${C.indigoL}"/>
        <path class="flow in a6" d="M856 124 H880" stroke="${C.purpleL}"/>
        <path class="flow in a7" d="M804 156 V214 H880" stroke="${C.pink}"/>
        <path class="in a5" d="M700 95 H726 V124 H752" stroke="#1F3350"/>
        <path class="in a5" d="M700 155 H726 V124 H752" stroke="#1F3350"/>
      </g>
      <g class="in a4"><rect x="596" y="76" width="104" height="38" rx="9" fill="${C.card}" stroke="${C.line2}"/><text x="648" y="100" text-anchor="middle" class="mono" font-size="12" fill="#7DD3FC">Next.js</text></g>
      <g class="in a5"><rect x="596" y="136" width="104" height="38" rx="9" fill="${C.card}" stroke="${C.line2}"/><text x="648" y="160" text-anchor="middle" class="mono" font-size="12" fill="#A5B4FC">Expo App</text></g>
      <g class="in a6">
        <rect x="752" y="92" width="104" height="64" rx="10" fill="${C.card2}" stroke="#31507E"/>
        <rect x="752" y="92" width="104" height="64" rx="10" fill="none" stroke="${C.indigoL}" opacity="0"><animate attributeName="opacity" values="0;.6;0" dur="3s" repeatCount="indefinite"/></rect>
        <text x="804" y="117" text-anchor="middle" class="mono" font-size="12.5" fill="#E2E8F0">API</text>
        <text x="804" y="136" text-anchor="middle" class="mono" font-size="10.5" fill="#5F7391">NestJS</text>
      </g>
      <g class="in a7">
        <rect x="880" y="92" width="96" height="64" rx="10" fill="#0A1A20" stroke="#1D454F"/>
        <text x="928" y="117" text-anchor="middle" class="mono" font-size="12" fill="${C.cyanL}">Postgres</text>
        <text x="928" y="136" text-anchor="middle" class="mono" font-size="10" fill="#4E7481">+ pgvector</text>
        <rect x="880" y="194" width="96" height="40" rx="10" fill="#1B0F1F" stroke="#53264A"/>
        <text x="928" y="219" text-anchor="middle" class="mono" font-size="12" fill="${C.pinkL}">AI Layer</text>
      </g>
      <circle cx="928" cy="168" r="2.5" fill="#334155" class="soft"/>
      <circle cx="928" cy="180" r="2.5" fill="#334155" class="soft"/>
      ${packet('M700 95 H752', C.cyan, 2.2, 1.0)}
      ${packet('M700 155 H752', C.indigoL, 2.6, 1.9)}
      ${packet('M856 124 H880', C.purpleL, 1.6, 1.4)}
      ${packet('M880 124 H856', C.cyanL, 1.6, 2.3)}
      ${packet('M804 156 V214 H880', C.pink, 3.2, 1.7)}
    </g>

    <g fill="${C.text}">
      <circle cx="560" cy="300" r="1.5" class="drift" style="animation-delay:.3s"/>
      <circle cx="640" cy="290" r="1.2" class="drift" style="animation-delay:2.1s"/>
      <circle cx="730" cy="305" r="1.6" class="drift" style="animation-delay:4s"/>
      <circle cx="840" cy="295" r="1.2" class="drift" style="animation-delay:1.2s"/>
      <circle cx="950" cy="300" r="1.5" class="drift" style="animation-delay:3.2s"/>
      <circle cx="590" cy="60" r="1.2" class="drift" style="animation-delay:5s"/>
    </g>
  </g>`;
  return svg(W, H, body, { label: `${PROFILE.name} — full-stack developer building AI-powered products` });
}

// ───────────────────────── hero (mobile) ─────────────────────────

function heroMobile() {
  const W = 640, H = 420;
  const ty = roleTyper({ x: 65, y: 186, size: 21, roles: PROFILE.roles, colors: PROFILE.roleColors });
  const pillText = PROFILE.status, pillTL = pillText.length * 10.2, pillW = 38 + pillTL + 18;
  const body = `${heroDefs(W, H, 420)}
  <g clip-path="url(#card)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <ellipse cx="520" cy="40" rx="280" ry="180" fill="url(#halo1)"><animate attributeName="cy" values="40;90;40" dur="14s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="80" cy="420" rx="260" ry="170" fill="url(#halo2)"/>
    <g transform="skewX(-18)"><rect y="-40" width="120" height="500" fill="url(#shine)"><animate attributeName="x" values="-200;760" dur="7s" begin="1.5s" repeatCount="indefinite"/></rect></g>
    <rect width="${W}" height="4" fill="url(#rule)"/>
    <rect y="${H - 4}" width="${W}" height="4" fill="url(#rule)" opacity="0.45"/>

    <g class="in a1">
      <rect x="40" y="44" width="${pillW}" height="32" rx="16" fill="#0B1626" stroke="${C.line2}"/>
      <circle cx="61" cy="60" r="5" fill="${C.green}" class="beat"/>
      <text x="78" y="65" class="mono" font-size="14" fill="#7DD3FC" textLength="${pillTL}" lengthAdjust="spacing">${esc(pillText)}</text>
    </g>

    <g class="rise a2"><text x="40" y="140" class="sans" font-size="50" font-weight="700" fill="url(#shimmer)" letter-spacing="-1">${esc(PROFILE.name)}</text></g>

    <g class="in a3">
      <text x="40" y="186" class="mono" font-size="21" fill="${C.dim}">&gt;</text>
      ${ty.render({ cursorFill: C.pink })}
    </g>

    <text x="40" y="228" class="sans in a4" font-size="17" fill="${C.muted}">${esc(PROFILE.taglineMobile[0])}</text>
    <text x="40" y="254" class="sans in a4" font-size="17" fill="${C.muted}">${esc(PROFILE.taglineMobile[1])}</text>

    <g class="in a5">
      ${chip(40, 284, 144, 'React Native', '#0B1728', C.line2, '#7DD3FC', 14)}
      ${chip(194, 284, 98, 'NestJS', '#140F20', '#372A50', '#C4B5FD', 14)}
      ${chip(302, 284, 122, 'PostgreSQL', '#0A1A20', '#1B3B44', C.cyanL, 14)}
    </g>
    <g class="in a6">
      ${chip(40, 330, 152, 'LLM / Retrieval', '#1B0F1F', '#452038', C.pinkL, 14)}
      ${chip(202, 330, 98, 'Next.js', C.card, C.line2, '#E2E8F0', 14)}
      <path class="flow" d="M312 346.5 H560" stroke="${C.indigoL}" stroke-width="2" fill="none" opacity="0.7"/>
      <circle cx="572" cy="346.5" r="5" fill="none" stroke="${C.indigoL}" stroke-width="2" opacity="0.7"/>
      <circle cx="572" cy="346.5" r="2" fill="${C.pink}" class="beat"/>
      ${packet('M312 346.5 H560', C.cyan, 2.4, 1.2)}
    </g>
  </g>`;
  return svg(W, H, body, { label: `${PROFILE.name} — full-stack developer building AI-powered products` });
}

// ───────────────────────── section headers ─────────────────────────
// Fixed-height, left-anchored, cropped on the right (preserveAspectRatio slice) so the
// title renders at the same size on every screen. Transparent; one file per theme.

function sectionHeader({ index, title, label, color }, theme) {
  const dark = theme === 'dark';
  const titleFill = dark ? C.text : '#0F172A';
  const labelFill = dark ? C.muted : '#64748B';
  const lineStroke = dark ? '#243044' : '#D9DEE5';
  const size = 26;
  const tw = Math.round(title.length * 0.55 * size);
  const labelX = 42 + tw + 18;
  const lineX = labelX + label.length * 7.2 + 28;
  const body = `
  <defs>
    <linearGradient id="ul" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient>
    <style>${CSS_BASE}
      .rise{animation:rise .8s cubic-bezier(.2,.7,.2,1) .15s forwards,in .8s ease .15s forwards;opacity:0}
      @keyframes rise{from{transform:translateY(8px)}to{transform:translateY(0)}}
      .flow2{stroke-dasharray:3 9;animation:dash 1.8s linear infinite}
    </style>
  </defs>
  <text x="2" y="38" class="mono in a1" font-size="12.5" letter-spacing="2" fill="${color}">${index}</text>
  <g class="rise"><text x="42" y="41" class="sans" font-weight="700" font-size="${size}" fill="${titleFill}" letter-spacing="-0.4">${esc(title)}</text></g>
  <rect x="42" y="50" height="2.5" rx="1.25" width="0" fill="url(#ul)"><animate attributeName="width" from="0" to="${tw}" dur=".9s" begin=".55s" fill="freeze" calcMode="spline" keySplines=".2 .7 .2 1"/></rect>
  <text x="${labelX}" y="38" class="mono in a4" font-size="12" fill="${labelFill}">${esc(label)}</text>
  <g class="in a5">
    <circle cx="${lineX - 12}" cy="32" r="2.5" fill="${color}" class="beat"/>
    <path d="M${lineX} 32 H1000" stroke="${lineStroke}" stroke-width="1.5" fill="none" class="flow2"/>
  </g>`;
  return svg(1000, 64, body, { par: 'xMinYMid slice', label: `${index} — ${title}` });
}

// ───────────────────────── nav pills ─────────────────────────

function navPill({ label, color }) {
  const tl = Math.round(label.length * 8.6);
  const w = 30 + tl + 16;
  const body = `
  <rect x=".5" y=".5" width="${w - 1}" height="31" rx="8" fill="${C.card}" stroke="#1E2A3D"/>
  <circle cx="16" cy="16" r="7" fill="${color}" opacity=".16"/>
  <circle cx="16" cy="16" r="3.2" fill="${color}"/>
  <text x="30" y="20.4" font-family="${MONO}" font-size="11.5" fill="#CBD5E1" textLength="${tl}" lengthAdjust="spacing">${esc(label)}</text>`;
  return svg(w, 32, body, { label });
}

// ───────────────────────── terminal ─────────────────────────

function terminal({ W, size, x0, lines, title, mobile }) {
  const lh = 27, y0 = 70, H = y0 + (lines.length - 1) * lh + 40;
  const T = 28;
  const ty = new Typer(T, size);
  let t = 0.7;
  lines.forEach((ln, i) => {
    const y = y0 + i * lh;
    let col = 0;
    for (const [text, fill] of ln.segs) { t = ty.type({ x: x0 + col * ty.cw, y, text, fill, t0: t, d: ln.d }); col += text.length; }
    t += ln.gap ?? 0.1;
  });
  const body = `
  <defs>
    <clipPath id="win"><rect width="${W}" height="${H}" rx="14"/></clipPath>
    <radialGradient id="glow"><stop offset="0" stop-color="${C.indigo}" stop-opacity=".16"/><stop offset="1" stop-color="${C.indigo}" stop-opacity="0"/></radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cyan}"/><stop offset=".5" stop-color="${C.purple}"/><stop offset="1" stop-color="${C.pink}"/></linearGradient>
    <style>${CSS_BASE}</style>
  </defs>
  <g clip-path="url(#win)">
    <rect width="${W}" height="${H}" fill="#0A0F1A"/>
    <ellipse cx="${W * 0.8}" cy="${H}" rx="${W * 0.5}" ry="${H * 0.8}" fill="url(#glow)"/>
    <rect width="${W}" height="36" fill="#0D1424"/>
    <rect y="36" width="${W}" height="1" fill="${C.line}"/>
    <circle cx="22" cy="18" r="5.5" fill="#FF5F57"/><circle cx="40" cy="18" r="5.5" fill="#FEBC2E"/><circle cx="58" cy="18" r="5.5" fill="#28C840"/>
    <text x="${W / 2}" y="22.5" text-anchor="middle" class="mono" font-size="12" fill="#5F7391">${esc(title)}</text>
    <g><animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.965;.99;1" dur="${T}s" repeatCount="indefinite"/>${ty.render({ cursorFill: '#CBD5E1' })}</g>
    <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#rule)" opacity=".6"/>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" fill="none" stroke="${C.line}"/>`;
  return svg(W, H, body, { label: mobile ? 'What I am doing right now' : 'What I am doing right now: building an MBS retrieval assistant, designing 3D web experiences, learning Unity, reading about RAG evaluation' });
}

const keyColors = [C.cyan, C.indigoL, C.purpleL, C.pinkL];

function terminalDesktop() {
  const lines = [
    { segs: [['$ ', C.green], ['abdullah --now', '#F1F5F9']], d: 0.055, gap: 0.4 },
    ...PROFILE.now.map(([k, v], i) => ({ segs: [[`  ${k.padEnd(12)}`, keyColors[i % 4]], [v, C.soft]], d: 0.012, gap: 0.14 })),
    { segs: [['$ ', C.green]], d: 0.05 },
  ];
  return terminal({ W: 1000, size: 14.5, x0: 40, lines, title: `${PROFILE.handle} — zsh — now` });
}

function terminalMobile() {
  const lines = [{ segs: [['$ ', C.green], ['abdullah --now', '#F1F5F9']], d: 0.055, gap: 0.4 }];
  PROFILE.nowMobile.forEach(([k, vs], i) => {
    vs.forEach((v, j) => lines.push({ segs: [[j === 0 ? k.padEnd(11) : ' '.repeat(11), keyColors[i % 4]], [v, C.soft]], d: 0.012, gap: 0.12 }));
  });
  lines.push({ segs: [['$ ', C.green]], d: 0.05 });
  return terminal({ W: 640, size: 15, x0: 28, lines, title: `${PROFILE.handle} — zsh`, mobile: true });
}

// ───────────────────────── marquee ─────────────────────────

function marquee(items) {
  const size = 12.5, cw = size * 0.6 + 1.8, gap = 30, H = 40;
  const cols = [C.cyan, C.indigoL, C.purpleL, C.pinkL];
  let x = 0; const parts = [];
  items.forEach((it, i) => {
    const t = it.toUpperCase(), tw = Math.round(t.length * cw);
    parts.push(`<text x="${x}" y="24.5" textLength="${tw}" lengthAdjust="spacing">${esc(t)}</text>`);
    x += tw + gap;
    parts.push(`<rect x="${x - 2.5}" y="17.5" width="5" height="5" rx="1" transform="rotate(45 ${x} 20)" fill="${cols[i % 4]}" opacity=".9"/>`);
    x += gap;
  });
  const W = x, dur = Math.round(W / 42);
  const body = `
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000"/><stop offset=".14" stop-color="#fff"/><stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="m"><rect width="1000" height="${H}" fill="url(#fade)"/></mask>
  </defs>
  <g mask="url(#m)"><g font-family="${MONO}" font-size="${size}" letter-spacing="1.8" fill="${C.mid}">
    <animateTransform attributeName="transform" type="translate" from="0 0" to="-${W} 0" dur="${dur}s" repeatCount="indefinite"/>
    <g>${parts.join('')}</g><g transform="translate(${W} 0)">${parts.join('')}</g>
  </g></g>`;
  return svg(1000, H, body, { par: 'xMidYMid slice', label: items.join(', ') });
}

// ───────────────────────── footer ─────────────────────────

function footer() {
  const W = 1000, H = 170;
  const { title, typed } = PROFILE.footer;
  const size = 14, tw = typed.length * size * 0.6;
  const ty = new Typer(6, size, false);
  ty.type({ x: W / 2 - tw / 2, y: 112, text: typed, fill: '#CBD5E1', t0: 1.1, d: 0.06 });
  const body = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.bg0}"/><stop offset=".5" stop-color="${C.bg1}"/><stop offset="1" stop-color="${C.bg2}"/></linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${C.cyan}"/><stop offset="35%" stop-color="${C.indigo}"/><stop offset="70%" stop-color="${C.purple}"/><stop offset="100%" stop-color="${C.pink}"/></linearGradient>
    <radialGradient id="a1"><stop offset="0" stop-color="#6366F1" stop-opacity=".35"/><stop offset="1" stop-color="#6366F1" stop-opacity="0"/></radialGradient>
    <radialGradient id="a2"><stop offset="0" stop-color="#22D3EE" stop-opacity=".22"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0"/></radialGradient>
    <radialGradient id="a3"><stop offset="0" stop-color="#F472B6" stop-opacity=".22"/><stop offset="1" stop-color="#F472B6" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0 L0 0 0 34" fill="none" stroke="${C.line}" stroke-width="1" opacity="0.45"/></pattern>
    <style>${CSS_BASE}
      .rise{animation:rise .9s cubic-bezier(.2,.7,.2,1) .2s forwards,in .9s ease .2s forwards;opacity:0}
      @keyframes rise{from{transform:translateY(8px)}to{transform:translateY(0)}}
    </style>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <ellipse cx="500" cy="${H}" rx="380" ry="150" fill="url(#a1)"><animate attributeName="cx" values="500;560;500" dur="12s" repeatCount="indefinite"/></ellipse>
  <ellipse cx="200" cy="40" rx="300" ry="140" fill="url(#a2)"><animate attributeName="cx" values="200;260;200" dur="15s" repeatCount="indefinite"/></ellipse>
  <ellipse cx="820" cy="60" rx="300" ry="140" fill="url(#a3)"><animate attributeName="cx" values="820;760;820" dur="17s" repeatCount="indefinite"/></ellipse>
  <rect width="${W}" height="3" fill="url(#rule)"/>
  <g class="rise"><text x="${W / 2}" y="78" text-anchor="middle" class="sans" font-size="26" font-weight="700" fill="${C.text}" letter-spacing="-0.4">${esc(title)}</text></g>
  ${ty.render({ cursorFill: C.pink })}
  <text x="${W / 2}" y="146" text-anchor="middle" class="mono in a6" font-size="11" fill="#5F7391" letter-spacing="1.2">github.com/${PROFILE.handle}</text>`;
  return svg(W, H, body, { par: 'xMidYMid slice', label: `${title} ${typed}` });
}

// ───────────────────────── divider ─────────────────────────

function divider() {
  const body = `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${C.cyan}" stop-opacity="0"/><stop offset="25%" stop-color="${C.indigo}" stop-opacity="0.55"/><stop offset="55%" stop-color="${C.purple}" stop-opacity="0.55"/><stop offset="100%" stop-color="${C.pink}" stop-opacity="0"/></linearGradient>
    <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${C.text}" stop-opacity="0"/><stop offset="50%" stop-color="${C.text}" stop-opacity="0.85"/><stop offset="100%" stop-color="${C.text}" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="0" y="5" width="1000" height="2" fill="url(#g)"/>
  <rect y="5" width="160" height="2" fill="url(#spark)" opacity="0.5"><animate attributeName="x" values="-180;1020" dur="6s" repeatCount="indefinite"/></rect>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none" role="presentation">${body}</svg>`;
}

// ───────────────────────── write ─────────────────────────

const files = {
  'hero.svg': hero(),
  'hero-mobile.svg': heroMobile(),
  'terminal.svg': terminalDesktop(),
  'terminal-mobile.svg': terminalMobile(),
  'marquee.svg': marquee(PROFILE.marquee),
  'footer.svg': footer(),
  'divider.svg': divider(),
};
for (const s of PROFILE.sections) { files[`${s.file}-dark.svg`] = sectionHeader(s, 'dark'); files[`${s.file}-light.svg`] = sectionHeader(s, 'light'); }
for (const n of PROFILE.nav) files[`${n.file}.svg`] = navPill(n);

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content.replace(/\n\s*/g, ' ').replace(/> </g, '><').trim() + '\n');
  console.log(`✓ assets/${name} (${(Buffer.byteLength(content) / 1024).toFixed(1)} KB)`);
}
