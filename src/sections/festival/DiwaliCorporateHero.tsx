import React, { useEffect, useMemo, useState } from "react";

import { resolveBlockImageUrl } from "../../components/HeroSection/heroSectionUtils";
import { resolveStorefrontFontFamily } from "../../shared/fonts/fontRegistry";
import {
  resolveThemeFontKey,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import type {
  DiwaliCorporateHeroProps,
  DiwaliCorporateStatBlock,
  DiwaliCorporateOfferBlock,
} from "./types";

export const STAT_BLOCK_TYPE = "diwali_corp_stat";
export const OFFER_BLOCK_TYPE = "diwali_corp_offer";

/**
 * Illustration pigments.
 *
 * Deliberately NOT merchant-editable and NOT part of the global colour system:
 * these are the fixed pigments of the drawn marigold/diya/rangoli artwork, the
 * way ink colours in an illustration are fixed. Recolouring them from theme
 * tokens makes the artwork read as broken rather than branded. Everything the
 * merchant *should* control — text, buttons, surfaces, the offerings band —
 * comes from props + the global style system below.
 */
const PIG = {
  mari: "hsl(33 98% 52%)",
  mariDeep: "hsl(20 95% 44%)",
  mariLight: "hsl(46 100% 62%)",
  gold: "hsl(43 96% 56%)",
  leaf: "hsl(105 48% 24%)",
  leafLight: "hsl(92 52% 42%)",
  brassDeep: "hsl(30 70% 26%)",
  flame: "hsl(46 100% 66%)",
  flameCore: "hsl(54 100% 93%)",
  ember: "hsl(18 100% 54%)",
  clay: "hsl(16 58% 28%)",
  clayLight: "hsl(22 62% 46%)",
  magenta: "hsl(328 82% 46%)",
  crimson: "hsl(352 78% 44%)",
  turmeric: "hsl(47 96% 56%)",
  royal: "hsl(226 66% 40%)",
  parrot: "hsl(118 54% 36%)",
  chalk: "hsl(40 70% 96%)",
};

const PETAL_PATH = "M0 0C6-8 6-22 0-32C-6-22-6-8 0 0Z";
const FLAME_PATH = "M0-38C5-28 8-22 6-15C5-10 2-8 0-8C-2-8-5-10-6-15C-8-22-5-28 0-38Z";

/** Merchant-editable colours. Fallbacks read correctly on the default light surface. */
const COLOR_FALLBACKS = {
  sectionBackgroundColor: "#FBF7F1",
  headingTextColor: "#14213D",
  mutedTextColor: "#4A5168",
  borderColor: "#E6DCCF",
  accentColor: "#E0574C",
  secondaryColor: "#B7791F",
  primaryColor: "#3B5BDB",
  primaryButtonBgColor: "#14213D",
  primaryButtonTextColor: "#FFFFFF",
  bandBackgroundColor: "#13213D",
  bandTextColor: "#F6EFE5",
};

const TEXT_DEFAULTS = {
  eyebrowText: { color: "#4A5168", fontWeight: "600" },
  headingLineOne: { color: "#14213D", fontWeight: "700" },
  headingLineTwo: { color: "#E0574C", fontWeight: "700" },
  headingLineThree: { color: "#B7791F", fontWeight: "700" },
  bodyText: { color: "#4A5168", fontWeight: "400" },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "600" },
  secondaryButtonText: { color: "#14213D", fontWeight: "600" },
};

const CONTENT_FALLBACKS = {
  eyebrowText: "Diwali for workplaces",
  headingLineOne: "Professional.",
  headingLineTwo: "Festive.",
  headingLineThree: "Memorable.",
  bodyText:
    "Celebrate Diwali at your workplace while elevating your brand presence, strengthening team culture and building deeper client relationships.",
  primaryButtonText: "Plan a Celebration",
  secondaryButtonText: "Explore for Your Industry",
  mediaAlt: "Team celebrating Diwali at work",
};

const DEFAULT_STATS: { icon: string; title: string; body: string }[] = [
  { icon: "users", title: "500+", body: "Corporate events" },
  { icon: "star", title: "4.9/5", body: "Client satisfaction" },
  { icon: "building", title: "IT & CA Firms", body: "Across India" },
];
const DEFAULT_OFFERS: { icon: string; title: string; body: string }[] = [
  { icon: "lotus", title: "Curated Experiences", body: "Diyas, décor, artists & more" },
  { icon: "users", title: "Stronger Relationships", body: "With teams & clients" },
  { icon: "chart", title: "Elevated Brand Presence", body: "On and beyond the workplace" },
  { icon: "heart", title: "End-to-End Support", body: "From concept to celebration" },
];

const SPACING_SCALE: Record<string, string> = {
  small: "2rem",
  medium: "4rem",
  large: "5.4rem",
};

export const ICON_PATHS: Record<string, string> = {
  lotus: "M12 20c-4 0-8-3-9-7 3 0 6 1 9 4 3-3 6-4 9-4-1 4-5 7-9 7zM12 17c-2-2-3-5-2-9 1 1 2 2 2 3 0-1 1-2 2-3 1 4 0 7-2 9z",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  heart: "M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10z",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20v-1a6 6 0 0 1 12 0v1M16 4.5a3.5 3.5 0 0 1 0 6.5M21 20v-1a6 6 0 0 0-3.5-5.4",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
  building: "M4 21V5l8-2v18M12 21V9l8 2v10M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2M2 21h20",
  music: "M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  bed: "M3 18V8M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6M7 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  chart: "M4 20V12M10 20V6M16 20v-9M22 20H2",
  leaf: "M5 19c0-8 5-14 14-14 0 9-6 14-14 14zM5 19c3-4 6-7 10-9",
  book: "M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM4 5v16M8 7h8",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  dandiya: "M5 20L17 4M8 21L20 5M4 18l2 2M16 3l2 2",
  dumbbell: "M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12",
  bowl: "M3 11h18a9 9 0 0 1-18 0zM8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4",
  hanger: "M12 7a2 2 0 1 1 2-2M12 7v2L3 16h18l-9-7",
  brush: "M18 3l3 3-9 9-3-3zM9 12l-3 3c-2 0-3 1-3 4 3 0 4-1 4-3l3-3",
  cup: "M5 8h12v5a6 6 0 0 1-12 0zM17 9h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-2",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

/**
 * Fallback counter for the SVG id namespace. React 17 (this package's lowest
 * supported peer) has no `useId`, and the section id is normally present and
 * already unique per instance, so this only covers preview/test renders that
 * pass an id-less section.
 */
let instanceCounter = 0;

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function useReducedMotionPreference(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

function Icon({ name, size = 22 }: { name?: string; size?: number }) {
  const d = ICON_PATHS[safeText(name)] ?? ICON_PATHS.sparkle;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Gradients/symbols the decor reuses. Every id is namespaced with `u` (derived
 * from the section id) so two of these sections on one page don't collide —
 * SVG ids are global to the document.
 */
function OrnamentDefs({ u }: { u: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <radialGradient id={`${u}-mg`} cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor={PIG.mariLight} />
          <stop offset=".55" stopColor={PIG.mari} />
          <stop offset="1" stopColor={PIG.mariDeep} />
        </radialGradient>
        <radialGradient id={`${u}-my`} cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor={PIG.chalk} />
          <stop offset=".45" stopColor={PIG.turmeric} />
          <stop offset="1" stopColor={PIG.mari} />
        </radialGradient>
        <linearGradient id={`${u}-lf`} x1="0" x2="1">
          <stop offset="0" stopColor={PIG.leafLight} />
          <stop offset="1" stopColor={PIG.leaf} />
        </linearGradient>
        <linearGradient id={`${u}-br`} x1="0" x2="1">
          <stop offset="0" stopColor={PIG.brassDeep} />
          <stop offset=".45" stopColor={PIG.gold} />
          <stop offset=".6" stopColor={PIG.chalk} />
          <stop offset="1" stopColor={PIG.brassDeep} />
        </linearGradient>
        <radialGradient id={`${u}-halo`}>
          <stop offset="0" stopColor={PIG.flame} stopOpacity=".6" />
          <stop offset="1" stopColor={PIG.flame} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${u}-rg`}>
          <stop offset="0" stopColor={PIG.turmeric} stopOpacity=".6" />
          <stop offset=".45" stopColor={PIG.mari} stopOpacity=".32" />
          <stop offset=".75" stopColor={PIG.magenta} stopOpacity=".12" />
          <stop offset="1" stopColor={PIG.magenta} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${u}-paper`} cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor={PIG.flameCore} />
          <stop offset=".35" stopColor={PIG.turmeric} />
          <stop offset=".72" stopColor={PIG.mari} />
          <stop offset="1" stopColor={PIG.crimson} />
        </radialGradient>
        <linearGradient id={`${u}-fl`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={PIG.ember} />
          <stop offset=".45" stopColor={PIG.flame} />
          <stop offset="1" stopColor={PIG.flameCore} />
        </linearGradient>
        <linearGradient id={`${u}-cl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PIG.clayLight} />
          <stop offset="1" stopColor={PIG.clay} />
        </linearGradient>
        <symbol id={`${u}-mari`} viewBox="-10 -10 20 20">
          {petals.map((a) => (
            <ellipse key={a} cy="-5.6" rx="3" ry="4.2" fill={`url(#${u}-mg)`} transform={`rotate(${a})`} />
          ))}
          {petals.map((a) => (
            <ellipse key={`i${a}`} cy="-2.8" rx="2.1" ry="2.8" fill={PIG.mariLight} opacity=".85" transform={`rotate(${a + 11})`} />
          ))}
          <circle r="1.8" fill={PIG.mariDeep} />
        </symbol>
        <symbol id={`${u}-mariY`} viewBox="-10 -10 20 20">
          {petals.map((a) => (
            <ellipse key={a} cy="-5.6" rx="3" ry="4.2" fill={`url(#${u}-my)`} transform={`rotate(${a})`} />
          ))}
          <circle r="2.2" fill={PIG.mari} />
        </symbol>
        <symbol id={`${u}-leaf`} viewBox="-5 0 10 24">
          <path d="M0 0C4.5 5 4.5 15 0 24C-4.5 15-4.5 5 0 0Z" fill={`url(#${u}-lf)`} />
          <path d="M0 2V22" stroke={PIG.leafLight} strokeWidth=".6" />
        </symbol>
        <symbol id={`${u}-bell`} viewBox="-6 0 12 14">
          <path d="M-1 0H1V2C4 3 5 6 5 10H-5C-5 6-4 3-1 2Z" fill={`url(#${u}-br)`} />
          <circle cy="12" r="1.6" fill={PIG.brassDeep} />
        </symbol>
      </defs>
    </svg>
  );
}

/**
 * Drawn from the centre outwards in fixed units so the garland always spans the
 * full width at any viewport and is never cropped mid-swag.
 */
function Toran({ u }: { u: string }) {
  const SW = 200;
  const N = 7;
  const items: { x: number; y: number; alt: boolean }[] = [];
  const strands: number[] = [];
  for (let s = -N; s < N; s += 1) {
    for (let k = 0; k < 18; k += 1) {
      const t = k / 18;
      items.push({ x: s * SW + t * SW, y: 18 + Math.sin(Math.PI * t) * 50, alt: k % 2 === 1 });
    }
    strands.push(s * SW);
  }
  strands.push(N * SW);

  return (
    <svg aria-hidden="true" className="akdc-toran">
      <svg x="50%" overflow="visible">
        <g className="akdc-toran__g">
          <path d="M-1420 10H1420" stroke={PIG.brassDeep} strokeWidth="2.5" />
          {Array.from({ length: 109 }, (_, i) => {
            const x = -1404 + i * 26;
            return (
              <use
                key={i}
                href={`#${u}-leaf`}
                x={x - 6}
                y="8"
                width="12"
                height="30"
                transform={`rotate(${i % 2 ? 9 : -9} ${x} 10)`}
              />
            );
          })}
          {items.map((m, i) => (
            <use key={i} href={`#${u}-${m.alt ? "mariY" : "mari"}`} x={m.x - 9.5} y={m.y - 9.5} width="19" height="19" />
          ))}
          {strands.map((x, i) => (
            <g key={i} className="akdc-sway" style={{ animationDelay: `${-((i * 0.7) % 5).toFixed(1)}s` }}>
              {Array.from({ length: 6 }, (_, k) => (
                <use key={k} href={`#${u}-${k % 2 ? "mariY" : "mari"}`} x={x - 8.5} y={20 + k * 17} width="17" height="17" />
              ))}
              <use href={`#${u}-bell`} x={x - 7} y="124" width="14" height="16" />
              <path d={`M${x} 140v14`} stroke={PIG.crimson} strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
        </g>
      </svg>
    </svg>
  );
}

function GlobeLantern({
  u,
  drop = 60,
  size = 1,
  delay = 0,
  style,
}: {
  u: string;
  drop?: number;
  size?: number;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const d = drop;
  const cy = d + 42;
  return (
    <svg
      viewBox={`-46 0 92 ${d + 118}`}
      width={92 * size}
      height={(d + 118) * size}
      aria-hidden="true"
      className="akdc-swing akdc-lantern"
      style={{ transformOrigin: "50% 0", animationDelay: `${delay}s`, ...style }}
    >
      <circle cy={cy} r="46" fill={`url(#${u}-halo)`} className="akdc-pulse" />
      <path d={`M0 0V${d}`} stroke={PIG.brassDeep} strokeWidth="1.5" />
      <path d={`M-9 ${d}h18l3 7h-24z`} fill={`url(#${u}-br)`} />
      <ellipse cy={cy} rx="31" ry="34" fill={`url(#${u}-paper)`} />
      <g fill="none" stroke={PIG.crimson} strokeWidth="1.1" opacity=".38">
        <ellipse cy={cy} rx="20" ry="34" />
        <ellipse cy={cy} rx="9" ry="34" />
        {[-22, -11, 0, 11, 22].map((o) => (
          <path
            key={o}
            d={`M${-Math.sqrt(1 - (o / 34) ** 2) * 31} ${cy + o}H${Math.sqrt(1 - (o / 34) ** 2) * 31}`}
          />
        ))}
      </g>
      <path d={`M-10 ${cy + 33}h20l-3 7h-14z`} fill={`url(#${u}-br)`} />
      {[-4, 0, 4].map((x) => (
        <path key={x} d={`M0 ${cy + 40}L${x} ${cy + 62}`} stroke={PIG.crimson} strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <circle cy={cy + 44} r="2.6" fill={PIG.gold} />
    </svg>
  );
}

function Diya({ u, size = 1, delay = 0 }: { u: string; size?: number; delay?: number }) {
  return (
    <svg viewBox="-34 -46 68 66" width={68 * size} height={66 * size} aria-hidden="true">
      <ellipse cy="-14" rx="30" ry="30" fill={`url(#${u}-halo)`} className="akdc-pulse" />
      <path className="akdc-flicker" style={{ animationDelay: `${delay}s` }} d={FLAME_PATH} fill={`url(#${u}-fl)`} />
      <path d="M-1.2-8h2.4v4h-2.4z" fill={PIG.brassDeep} />
      <path d="M-30-6C-26 12 26 12 30-6C22 0 14 2 0 2C-14 2-22 0-30-6Z" fill={`url(#${u}-cl)`} />
      <path d="M-30-6C-22 0-14 2 0 2C14 2 22 0 30-6" fill="none" stroke={PIG.gold} strokeWidth="1.6" />
      {[-18, -9, 0, 9, 18].map((x) => (
        <circle key={x} cx={x} cy={x === 0 ? 7 : 6} r="1.3" fill={PIG.turmeric} />
      ))}
    </svg>
  );
}

/** Shared geometry: filled rings for the rangoli, line art for the mandala. */
const ring = (n: number, r: number, s: number, colors: string[] | null, rot = 0) =>
  Array.from({ length: n }, (_, i) => (
    <path
      key={i}
      d={PETAL_PATH}
      {...(colors
        ? { fill: colors[i % colors.length] }
        : { fill: "none", stroke: "currentColor", strokeWidth: 1.1 / s })}
      transform={`rotate(${rot + (360 / n) * i}) translate(0 ${-r}) scale(${s})`}
    />
  ));

const dots = (n: number, r: number, rad: number, fill = "currentColor") =>
  Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n;
    return <circle key={i} cx={(Math.sin(a) * r).toFixed(2)} cy={(-Math.cos(a) * r).toFixed(2)} r={rad} fill={fill} />;
  });

function Rangoli({ u, className = "" }: { u: string; className?: string }) {
  return (
    <svg viewBox="-110 -110 220 220" overflow="visible" aria-hidden="true" className={className}>
      <circle r="165" fill={`url(#${u}-rg)`} className="akdc-breathe" />
      <circle r="105" fill="none" stroke={PIG.chalk} strokeWidth="2.2" strokeDasharray="0.5 6" strokeLinecap="round" />
      {ring(24, 70, 0.95, [PIG.magenta, PIG.mari])}
      <g className="akdc-twinkle">{dots(48, 101, 2.2, PIG.turmeric)}</g>
      {dots(24, 73, 2.6, PIG.chalk)}
      <circle r="66" fill={PIG.royal} />
      {ring(16, 34, 0.95, [PIG.parrot, PIG.turmeric], 11.25)}
      <circle r="34" fill={PIG.crimson} />
      {ring(8, 6, 0.85, [PIG.chalk, PIG.mariLight])}
      {dots(16, 55, 1.8, PIG.chalk)}
      <circle r="7" fill={PIG.mari} />
      <circle r="3" fill={PIG.chalk} />
    </svg>
  );
}

function Mandala({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-110 -110 220 220" aria-hidden="true" className={className} style={style}>
      <circle r="106" fill="none" stroke="currentColor" strokeWidth=".8" />
      {ring(32, 72, 1, null)}
      {dots(64, 103, 1.1)}
      <circle r="70" fill="none" stroke="currentColor" strokeWidth=".8" />
      {ring(16, 40, 0.95, null, 11.25)}
      <circle r="40" fill="none" stroke="currentColor" strokeWidth=".8" />
      {ring(12, 12, 0.85, null)}
      {dots(24, 56, 1.3)}
      <circle r="9" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Stands in for the photo when the merchant hasn't uploaded one, so the hero never looks half-built. */
function FestiveScene({ u }: { u: string }) {
  return (
    <div aria-hidden="true" className="akdc-scene">
      <div className="akdc-scene__inner">
        <div className="akdc-scene__glow akdc-breathe" />
        <Mandala className="akdc-spin akdc-scene__mandala-lg" style={{ color: PIG.gold, opacity: 0.7 }} />
        <Mandala className="akdc-scene__mandala-sm" style={{ color: PIG.mari, opacity: 0.45 }} />
        <Rangoli u={u} className="akdc-scene__rangoli" />
      </div>
    </div>
  );
}

const PETALS: [number, number, number][] = [
  [4, 0, 11], [11, 4.2, 13], [19, 1.8, 10], [27, 7.4, 15], [35, 6.1, 12], [44, 2.7, 14], [52, 9.5, 12],
  [60, 8.3, 11], [68, 0.9, 13], [76, 5.4, 10], [84, 3.3, 12], [92, 7.2, 14], [97, 10.6, 13],
];
const PETAL_TINTS = [PIG.mari, PIG.magenta, PIG.turmeric];

function PetalShower() {
  return (
    <div aria-hidden="true" className="akdc-petals">
      {PETALS.map(([x, delay, duration], i) => (
        <span
          key={i}
          className={`akdc-petals__item ${i % 2 ? "akdc-petals__item--sm" : ""}`}
          style={{
            insetInlineStart: `${x}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            background: PETAL_TINTS[i % 3],
          }}
        />
      ))}
    </div>
  );
}

export default function DiwaliCorporateHero({ section, theme }: DiwaliCorporateHeroProps) {
  const props = (section?.settings?.props ?? {}) as Record<string, unknown>;
  const rawBlocks = Array.isArray(section?.settings?.blocks) ? section.settings.blocks : [];
  const reduced = useReducedMotionPreference();

  // Namespaces every SVG id in this instance; two sections on one page would
  // otherwise share gradient/symbol ids and the second would render wrong.
  const [fallbackUid] = useState(() => {
    instanceCounter += 1;
    return `akdc${instanceCounter}`;
  });
  const u = useMemo(() => {
    const fromSection = safeText(section?.id).replace(/[^a-zA-Z0-9]/g, "");
    return fromSection ? `akdc${fromSection}` : fallbackUid;
  }, [section?.id, fallbackUid]);

  const bodyFont = resolveStorefrontFontFamily(resolveThemeFontKey("body", theme));
  const headingFont = resolveStorefrontFontFamily(resolveThemeFontKey("heading", theme));

  const color = (key: keyof typeof COLOR_FALLBACKS) => safeText(props[key]) || COLOR_FALLBACKS[key];
  const content = (key: keyof typeof CONTENT_FALLBACKS) => {
    const v = props[key];
    return v === null || v === undefined ? CONTENT_FALLBACKS[key] : String(v);
  };
  const flag = (key: string, fallback = true) =>
    props[key] === undefined ? fallback : props[key] !== false;

  const textStyle = (fieldId: keyof typeof TEXT_DEFAULTS, role: "heading" | "body") => {
    const resolved = resolvedTextStyleToInlineStyle(
      resolveTextStyle({ section, theme, fieldId, role, defaultStyle: TEXT_DEFAULTS[fieldId] })
    );
    // fontSize is dropped deliberately: it always resolves to the global 48px /
    // 18px default, which would override this layout's responsive clamp and
    // break the three heading lines out of their shared scale.
    const { fontSize: _fontSize, ...rest } = resolved;
    return role === "heading" ? { ...rest, fontFamily: headingFont } : rest;
  };

  const blocksOfType = (type: string) =>
    rawBlocks.filter((b) => safeText((b as { type?: string })?.type) === type);

  const stats = useMemo(() => {
    const list = (blocksOfType(STAT_BLOCK_TYPE) as DiwaliCorporateStatBlock[])
      .map((b) => ({
        icon: safeText(b?.props?.icon) || "users",
        title: safeText(b?.props?.title),
        body: safeText(b?.props?.body),
      }))
      .filter((s) => s.title || s.body);
    return list.length > 0 ? list : DEFAULT_STATS;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawBlocks]);

  const offers = useMemo(() => {
    const list = (blocksOfType(OFFER_BLOCK_TYPE) as DiwaliCorporateOfferBlock[])
      .map((b) => ({
        icon: safeText(b?.props?.icon) || "lotus",
        title: safeText(b?.props?.title),
        body: safeText(b?.props?.body),
      }))
      .filter((o) => o.title || o.body);
    return list.length > 0 ? list : DEFAULT_OFFERS;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawBlocks]);

  const statTints = [color("accentColor"), color("secondaryColor"), color("primaryColor")];

  const spacing = SPACING_SCALE[safeText(props.sectionPadding)] ?? SPACING_SCALE.medium;
  const media = resolveBlockImageUrl(props.mediaImage);
  const showToran = flag("showToran");

  if (section?.enabled === false) return null;

  const headingLevel = safeText(props.headingLevel);
  const HeadingTag = (["h1", "h2", "h3"].includes(headingLevel) ? headingLevel : "h1") as "h1" | "h2" | "h3";

  const primaryHref = safeText(props.primaryButtonLink) || "#";
  const secondaryHref = safeText(props.secondaryButtonLink) || "#";
  const primaryLabel = content("primaryButtonText");
  const secondaryLabel = flag("showSecondaryButton") ? content("secondaryButtonText") : "";

  return (
    <section
      className={`akdc-hero${reduced ? " akdc-hero--still" : ""}`}
      data-ak-section="festival"
      id={safeText(props.anchorId) || undefined}
      style={
        {
          ["--akdc-space" as unknown as string]: spacing,
          ["--akdc-border" as unknown as string]: color("borderColor"),
          fontFamily: bodyFont,
          background: color("sectionBackgroundColor"),
          color: color("headingTextColor"),
        } as React.CSSProperties
      }
    >
      <OrnamentDefs u={u} />
      {showToran ? <Toran u={u} /> : null}

      {flag("showLanterns") ? (
        <div aria-hidden="true" className="akdc-lanterns">
          <GlobeLantern u={u} drop={96} size={0.85} style={{ insetInlineEnd: "40%" }} />
          <GlobeLantern u={u} drop={150} size={1} delay={-3} style={{ insetInlineEnd: "5%" }} />
        </div>
      ) : null}

      <div className="akdc-hero__body">
        <div className={`akdc-hero__copy${showToran ? " akdc-hero__copy--toran" : ""}`}>
          {flag("showEyebrow") && content("eyebrowText") ? (
            <p className="akdc-eyebrow akdc-rise" style={textStyle("eyebrowText", "body")}>
              <span style={{ color: color("secondaryColor") }}>
                <Icon name="sparkle" size={26} />
              </span>
              <span className="akdc-eyebrow__text">{content("eyebrowText")}</span>
            </p>
          ) : null}

          <HeadingTag className="akdc-heading akdc-rise akdc-rise--1">
            <span className="akdc-heading__line" style={textStyle("headingLineOne", "heading")}>
              {content("headingLineOne")}
            </span>
            {content("headingLineTwo") ? (
              <span className="akdc-heading__line" style={textStyle("headingLineTwo", "heading")}>
                {content("headingLineTwo")}
              </span>
            ) : null}
            {content("headingLineThree") ? (
              <span className="akdc-heading__line" style={textStyle("headingLineThree", "heading")}>
                {content("headingLineThree")}
              </span>
            ) : null}
          </HeadingTag>

          {content("bodyText") ? (
            <p className="akdc-body akdc-rise akdc-rise--2" style={textStyle("bodyText", "body")}>
              {content("bodyText")}
            </p>
          ) : null}

          {primaryLabel || secondaryLabel ? (
            <div className="akdc-ctas akdc-rise akdc-rise--3">
              {primaryLabel ? (
                <a
                  href={primaryHref}
                  className="akdc-btn akdc-btn--primary"
                  style={{
                    background: color("primaryButtonBgColor"),
                    ...textStyle("primaryButtonText", "body"),
                  }}
                >
                  {primaryLabel}
                  <span className="akdc-btn__arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                </a>
              ) : null}
              {secondaryLabel ? (
                <a
                  href={secondaryHref}
                  className="akdc-btn akdc-btn--ghost"
                  style={{ borderColor: color("secondaryColor"), ...textStyle("secondaryButtonText", "body") }}
                >
                  {secondaryLabel}
                </a>
              ) : null}
            </div>
          ) : null}

          {flag("showStats") && stats.length ? (
            <ul className="akdc-stats akdc-rise akdc-rise--4">
              {stats.map((st, i) => (
                <li key={i} className={`akdc-stats__item${i ? " akdc-stats__item--div" : ""}`}>
                  <span
                    className="akdc-stats__icon"
                    style={{
                      color: statTints[i % 3],
                      background: `color-mix(in srgb, ${statTints[i % 3]} 14%, transparent)`,
                    }}
                  >
                    <Icon name={st.icon} />
                  </span>
                  <span className="akdc-stats__text">
                    <span className="akdc-stats__value" style={{ fontFamily: headingFont }}>
                      {st.title}
                    </span>
                    <span className="akdc-stats__label" style={{ color: color("mutedTextColor") }}>
                      {st.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="akdc-hero__media">
          {media ? (
            <img src={media} alt={content("mediaAlt")} loading="eager" decoding="async" className="akdc-hero__photo" />
          ) : (
            <FestiveScene u={u} />
          )}

          {flag("showDiyas") ? (
            <div aria-hidden="true" className="akdc-diyas">
              {[0, 1, 2].map((i) => (
                <Diya key={i} u={u} size={0.9} delay={-i * 0.5} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {flag("showOfferings") && offers.length ? (
        <div
          className="akdc-band"
          style={{ background: color("bandBackgroundColor"), color: color("bandTextColor") }}
        >
          {flag("showMandala") ? (
            <>
              <Mandala className="akdc-band__mandala akdc-band__mandala--start" style={{ color: PIG.gold, opacity: 0.18 }} />
              <Mandala className="akdc-band__mandala akdc-band__mandala--end" style={{ color: PIG.gold, opacity: 0.18 }} />
            </>
          ) : null}
          <ul className="akdc-band__list">
            {offers.map((o, i) => (
              <li key={i} className={`akdc-band__item${i ? " akdc-band__item--div" : ""}`}>
                <span className="akdc-band__icon" style={{ borderColor: PIG.gold, color: PIG.gold }}>
                  <Icon name={o.icon} size={26} />
                </span>
                <span className="akdc-band__text">
                  <span className="akdc-band__title" style={{ fontFamily: headingFont }}>
                    {o.title}
                  </span>
                  <span className="akdc-band__body">{o.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {flag("showPetals") && !reduced ? <PetalShower /> : null}
    </section>
  );
}
