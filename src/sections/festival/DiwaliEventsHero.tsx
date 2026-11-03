import React, { useEffect, useMemo, useState } from "react";

import { resolveBlockImageUrl } from "../../components/HeroSection/heroSectionUtils";
import { resolveStorefrontFontFamily } from "../../shared/fonts/fontRegistry";
import {
  resolveThemeFontKey,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import type {
  DiwaliEventsHeroProps,
  DiwaliEventsServiceBlock,
  DiwaliEventsStatBlock,
} from "./types";

export const SERVICE_BLOCK_TYPE = "diwali_event_service";
export const STAT_BLOCK_TYPE = "diwali_event_stat";

/**
 * Illustration pigments for the drawn decor (brass lanterns, festoon bulbs,
 * marigold petals, the gold band rule). Fixed on purpose — these are the ink
 * colours of the artwork, not brand colours. Everything brand-facing (text,
 * buttons, surfaces, the stats band) is merchant-editable below.
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
  magenta: "hsl(328 82% 46%)",
  crimson: "hsl(352 78% 44%)",
  turmeric: "hsl(47 96% 56%)",
  chalk: "hsl(40 70% 96%)",
};

const PETAL_PATH = "M0 0C6-8 6-22 0-32C-6-22-6-8 0 0Z";

/** Merchant-editable colours. Defaults are the designed festive-night palette. */
const COLOR_FALLBACKS = {
  sectionBackgroundColor: "#0D1430",
  headingTextColor: "#FFF8EE",
  mutedTextColor: "rgba(255,248,238,0.84)",
  accentColor: "#F2C45A",
  primaryButtonBgColor: "#C2185B",
  bandBackgroundColor: "#0D1430",
  bandTextColor: "#FFF8EE",
};

const TEXT_DEFAULTS = {
  eyebrowText: { color: "#F2C45A", fontWeight: "600" },
  headingStart: { color: "#FFF8EE", fontWeight: "700" },
  headingAccent: { color: "#F2C45A", fontWeight: "700" },
  headingEnd: { color: "#FFF8EE", fontWeight: "700" },
  bodyText: { color: "rgba(255,248,238,0.84)", fontWeight: "400" },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "600" },
  secondaryButtonText: { color: "#FFF8EE", fontWeight: "600" },
  scriptNote: { color: "#F2C45A", fontWeight: "400" },
};

const CONTENT_FALLBACKS = {
  eyebrowText: "Artists • Events • Creative experiences",
  headingStart: "Bring the Spirit of",
  headingAccent: "Diwali",
  headingEnd: "to Life",
  bodyText:
    "Soulful performances, unforgettable experiences and flawlessly curated events: a creative celebration of culture, community and divine energy.",
  primaryButtonText: "Plan Your Diwali Event",
  secondaryButtonText: "Watch Our Story",
  mediaAlt: "Diwali celebration on stage",
  scriptNote: "More than events,\na celebration of people, art and life",
};

const DEFAULT_SERVICES: { icon: string; title: string }[] = [
  { icon: "music", title: "Live Performances" },
  { icon: "star", title: "Event Management" },
  { icon: "lotus", title: "Creative Installations" },
  { icon: "users", title: "Artists & Talent" },
];

const DEFAULT_STATS: { title: string; body: string }[] = [
  { title: "250+", body: "Artists & performers" },
  { title: "500+", body: "Events curated" },
  { title: "10K+", body: "Memorable experiences" },
  { title: "100%", body: "End-to-end management" },
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
  play: "M8 5v14l11-7z",
};

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

/** Fallback SVG id namespace; React 17 (lowest supported peer) has no `useId`. */
let instanceCounter = 0;

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
  const key = safeText(name);
  const d = ICON_PATHS[key] ?? ICON_PATHS.sparkle;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={key === "play" ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Gradients/patterns the decor reuses, namespaced per instance. */
function OrnamentDefs({ u }: { u: string }) {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id={`${u}-br`} x1="0" x2="1">
          <stop offset="0" stopColor={PIG.brassDeep} />
          <stop offset=".45" stopColor={PIG.gold} />
          <stop offset=".6" stopColor={PIG.chalk} />
          <stop offset="1" stopColor={PIG.brassDeep} />
        </linearGradient>
        <radialGradient id={`${u}-gl`} cx="50%" cy="55%" r="60%">
          <stop offset="0" stopColor={PIG.flameCore} />
          <stop offset=".45" stopColor={PIG.flame} />
          <stop offset="1" stopColor={PIG.ember} />
        </radialGradient>
        <radialGradient id={`${u}-halo`}>
          <stop offset="0" stopColor={PIG.flame} stopOpacity=".6" />
          <stop offset="1" stopColor={PIG.flame} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${u}-jaali`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M4 0L8 4L4 8L0 4Z" fill="none" stroke={PIG.brassDeep} strokeWidth=".9" />
          <circle cx="4" cy="4" r=".9" fill={PIG.brassDeep} />
        </pattern>
      </defs>
    </svg>
  );
}

/** Hanging brass lantern: pierced (jaali) body over a warm glow, with a slow swing. */
function Lantern({
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
  const body = `M-18 ${d + 22}Q-26 ${d + 62} -14 ${d + 102}H14Q26 ${d + 62} 18 ${d + 22}Z`;
  return (
    <svg
      viewBox={`-40 0 80 ${d + 150}`}
      width={80 * size}
      height={(d + 150) * size}
      aria-hidden="true"
      className="akde-swing akde-lantern"
      style={{ transformOrigin: "50% 0", animationDelay: `${delay}s`, ...style }}
    >
      <circle cy={d + 64} r="40" fill={`url(#${u}-halo)`} className="akde-pulse" />
      <path d={`M0 0V${d}`} stroke={PIG.brassDeep} strokeWidth="1.6" />
      <path d={`M-6 ${d}h12l4 10h-20z`} fill={`url(#${u}-br)`} />
      <path d={`M-16 ${d + 12}h32l-4 10h-24z`} fill={`url(#${u}-br)`} />
      <path d={body} fill={`url(#${u}-gl)`} />
      <path d={body} fill={`url(#${u}-jaali)`} opacity=".7" />
      <path
        d={`M-18 ${d + 22}H18M-14 ${d + 102}H14M0 ${d + 22}V${d + 102}`}
        stroke={PIG.brassDeep}
        strokeWidth="1.4"
        opacity=".8"
      />
      <path d={`M-16 ${d + 102}h32l-6 10h-20z`} fill={`url(#${u}-br)`} />
      <path d={`M0 ${d + 112}l-5 9h10z`} fill={`url(#${u}-br)`} />
      <path d={`M0 ${d + 121}v14`} stroke={PIG.crimson} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Festoon lights: a sagging wire of warm bulbs twinkling out of step. */
function StringLights({
  u,
  sag = 40,
  bulbs = 26,
  className = "",
}: {
  u: string;
  sag?: number;
  bulbs?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 1200 ${sag + 50}`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      className={className}
    >
      <path d={`M0 12Q600 ${12 + sag * 2} 1200 12`} fill="none" stroke={PIG.brassDeep} strokeWidth="1.5" />
      {Array.from({ length: bulbs }, (_, i) => {
        const t = (i + 0.5) / bulbs;
        const x = t * 1200;
        const y = 12 + 2 * t * (1 - t) * sag * 2 + 8;
        return (
          <g key={i} className="akde-twinkle" style={{ animationDelay: `${((i * 0.37) % 2.6).toFixed(2)}s` }}>
            <circle cx={x} cy={y} r="10" fill={`url(#${u}-halo)`} />
            <circle cx={x} cy={y} r="3.4" fill={PIG.flameCore} />
          </g>
        );
      })}
    </svg>
  );
}

/** Line-art mandala in currentColor. */
function Mandala({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const ring = (n: number, r: number, s: number, rot = 0) =>
    Array.from({ length: n }, (_, i) => (
      <path
        key={i}
        d={PETAL_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1 / s}
        transform={`rotate(${rot + (360 / n) * i}) translate(0 ${-r}) scale(${s})`}
      />
    ));
  const dots = (n: number, r: number, rad: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (2 * Math.PI * i) / n;
      return <circle key={i} cx={(Math.sin(a) * r).toFixed(2)} cy={(-Math.cos(a) * r).toFixed(2)} r={rad} fill="currentColor" />;
    });

  return (
    <svg viewBox="-110 -110 220 220" aria-hidden="true" className={className} style={style}>
      <circle r="106" fill="none" stroke="currentColor" strokeWidth=".8" />
      {ring(32, 72, 1)}
      {dots(64, 103, 1.1)}
      <circle r="70" fill="none" stroke="currentColor" strokeWidth=".8" />
      {ring(16, 40, 0.95, 11.25)}
      <circle r="40" fill="none" stroke="currentColor" strokeWidth=".8" />
      {ring(12, 12, 0.85)}
      {dots(24, 56, 1.3)}
      <circle r="9" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Fixed positions keep the render deterministic across server and client. */
const PETALS: [number, number, number][] = [
  [6, 0, 11], [14, 4.2, 13], [23, 1.8, 10], [35, 6.1, 12], [47, 2.7, 14],
  [58, 8.3, 11], [66, 0.9, 13], [74, 5.4, 10], [83, 3.3, 12], [92, 7.2, 14],
];

function PetalShower() {
  return (
    <div aria-hidden="true" className="akde-petals">
      {PETALS.map(([x, delay, duration], i) => (
        <span
          key={i}
          className="akde-petals__item"
          style={{
            insetInlineStart: `${x}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            background: i % 3 ? PIG.mari : PIG.magenta,
          }}
        />
      ))}
    </div>
  );
}

export default function DiwaliEventsHero({ section, theme }: DiwaliEventsHeroProps) {
  const props = (section?.settings?.props ?? {}) as Record<string, unknown>;
  const rawBlocks = Array.isArray(section?.settings?.blocks) ? section.settings.blocks : [];
  const reduced = useReducedMotionPreference();

  const [fallbackUid] = useState(() => {
    instanceCounter += 1;
    return `akde${instanceCounter}`;
  });
  const u = useMemo(() => {
    const fromSection = safeText(section?.id).replace(/[^a-zA-Z0-9]/g, "");
    return fromSection ? `akde${fromSection}` : fallbackUid;
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
    // fontSize dropped on purpose — it always resolves to the global 48px/18px
    // default, which would override this layout's responsive clamps and break
    // the heading's three inline parts out of a shared scale.
    const { fontSize: _fontSize, ...rest } = resolved;
    return role === "heading" ? { ...rest, fontFamily: headingFont } : rest;
  };

  const blocksOfType = (type: string) =>
    rawBlocks.filter((b) => safeText((b as { type?: string })?.type) === type);

  const services = useMemo(() => {
    const list = (blocksOfType(SERVICE_BLOCK_TYPE) as DiwaliEventsServiceBlock[])
      .map((b) => ({ icon: safeText(b?.props?.icon) || "music", title: safeText(b?.props?.title) }))
      .filter((s) => s.title);
    return list.length > 0 ? list : DEFAULT_SERVICES;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawBlocks]);

  const stats = useMemo(() => {
    const list = (blocksOfType(STAT_BLOCK_TYPE) as DiwaliEventsStatBlock[])
      .map((b) => ({ title: safeText(b?.props?.title), body: safeText(b?.props?.body) }))
      .filter((s) => s.title || s.body);
    return list.length > 0 ? list : DEFAULT_STATS;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawBlocks]);

  const spacing = SPACING_SCALE[safeText(props.sectionPadding)] ?? SPACING_SCALE.medium;
  const media = resolveBlockImageUrl(props.mediaImage);

  if (section?.enabled === false) return null;

  const headingLevel = safeText(props.headingLevel);
  const HeadingTag = (["h1", "h2", "h3"].includes(headingLevel) ? headingLevel : "h1") as "h1" | "h2" | "h3";

  const primaryHref = safeText(props.primaryButtonLink) || "#";
  const secondaryHref = safeText(props.secondaryButtonLink) || "#";
  const primaryLabel = content("primaryButtonText");
  const secondaryLabel = flag("showSecondaryButton") ? content("secondaryButtonText") : "";

  const shade = color("sectionBackgroundColor");
  const accent = color("accentColor");

  // The band is a 5-slot row with the mandala in the middle; stats split either
  // side of it. With an odd count the extra one sits on the leading side.
  const leadStats = stats.slice(0, Math.ceil(stats.length / 2));
  const trailStats = stats.slice(Math.ceil(stats.length / 2));

  return (
    <section
      className={`akde-hero${reduced ? " akde-hero--still" : ""}`}
      data-ak-section="festival"
      id={safeText(props.anchorId) || undefined}
      style={
        {
          ["--akde-space" as unknown as string]: spacing,
          fontFamily: bodyFont,
          background: shade,
          color: color("headingTextColor"),
        } as React.CSSProperties
      }
    >
      <OrnamentDefs u={u} />

      {media ? (
        <img
          src={media}
          alt={content("mediaAlt")}
          loading="eager"
          decoding="async"
          className="akde-hero__photo"
        />
      ) : null}

      {/* Scrim: keeps the copy readable over any photo. */}
      <div
        aria-hidden="true"
        className="akde-hero__scrim"
        style={{
          background: `linear-gradient(90deg, ${shade} 0%, color-mix(in srgb, ${shade} 72%, transparent) 36%, transparent 64%), linear-gradient(0deg, ${shade} 0%, transparent 40%)`,
        }}
      />

      {flag("showLights") ? (
        <>
          <StringLights u={u} sag={36} bulbs={30} className="akde-lights akde-lights--front" />
          <StringLights u={u} sag={60} bulbs={22} className="akde-lights akde-lights--back" />
        </>
      ) : null}

      {flag("showLanterns") ? (
        <div aria-hidden="true" className="akde-lanterns">
          <Lantern u={u} drop={60} size={0.9} style={{ insetInlineEnd: "24%" }} />
          <Lantern u={u} drop={110} size={1} delay={-2.5} style={{ insetInlineEnd: "8%" }} />
        </div>
      ) : null}

      <div className="akde-hero__body">
        <div className="akde-hero__copy">
          {flag("showEyebrow") && content("eyebrowText") ? (
            <p className="akde-eyebrow akde-rise" style={textStyle("eyebrowText", "body")}>
              {content("eyebrowText")}
            </p>
          ) : null}

          <HeadingTag className="akde-heading akde-rise akde-rise--1" style={{ fontFamily: headingFont }}>
            <span style={textStyle("headingStart", "heading")}>{content("headingStart")}</span>
            {content("headingAccent") ? (
              <>
                {" "}
                <span style={textStyle("headingAccent", "heading")}>{content("headingAccent")}</span>
              </>
            ) : null}
            {content("headingEnd") ? (
              <>
                {" "}
                <span style={textStyle("headingEnd", "heading")}>{content("headingEnd")}</span>
              </>
            ) : null}
          </HeadingTag>

          {content("bodyText") ? (
            <p className="akde-body akde-rise akde-rise--2" style={textStyle("bodyText", "body")}>
              {content("bodyText")}
            </p>
          ) : null}

          {primaryLabel || secondaryLabel ? (
            <div className="akde-ctas akde-rise akde-rise--3">
              {primaryLabel ? (
                <a
                  href={primaryHref}
                  className="akde-btn akde-btn--primary"
                  style={{ background: color("primaryButtonBgColor"), ...textStyle("primaryButtonText", "body") }}
                >
                  {primaryLabel}
                  <span className="akde-btn__arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                </a>
              ) : null}
              {secondaryLabel ? (
                <a
                  href={secondaryHref}
                  className="akde-btn akde-btn--ghost"
                  style={{ borderColor: accent, ...textStyle("secondaryButtonText", "body") }}
                >
                  <Icon name="play" size={16} />
                  {secondaryLabel}
                </a>
              ) : null}
            </div>
          ) : null}

          {flag("showServices") && services.length ? (
            <ul className="akde-services akde-rise akde-rise--4">
              {services.map((s, i) => (
                <li key={i} className={`akde-services__item${i ? " akde-services__item--div" : ""}`}>
                  <span style={{ color: accent }}>
                    <Icon name={s.icon} size={34} />
                  </span>
                  <span className="akde-services__label">{s.title}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {flag("showStatsBand") && stats.length ? (
        <div className="akde-band">
          {/* Ornate gold rule that caps the band. */}
          <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="akde-band__rule">
            <path d="M0 34Q360 6 720 22T1440 10" fill="none" stroke={PIG.gold} strokeWidth="2" />
            <path d="M0 40V34Q360 6 720 22T1440 10V40Z" fill={color("bandBackgroundColor")} />
          </svg>

          <div style={{ background: color("bandBackgroundColor"), color: color("bandTextColor") }}>
            <div className="akde-band__grid">
              {leadStats.map((st, i) => (
                <p key={`lead-${i}`} className="akde-band__stat">
                  <span className="akde-band__value" style={{ color: accent, fontFamily: headingFont }}>
                    {st.title}
                  </span>
                  <span className="akde-band__label">{st.body}</span>
                </p>
              ))}

              <div aria-hidden="true" className="akde-band__mandala">
                <Mandala style={{ color: accent }} />
              </div>

              {trailStats.map((st, i) => (
                <p key={`trail-${i}`} className="akde-band__stat">
                  <span className="akde-band__value" style={{ color: accent, fontFamily: headingFont }}>
                    {st.title}
                  </span>
                  <span className="akde-band__label">{st.body}</span>
                </p>
              ))}

              {flag("showScriptNote") && content("scriptNote") ? (
                <p
                  className="akde-band__note"
                  style={textStyle("scriptNote", "heading")}
                >
                  {content("scriptNote")}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {flag("showPetals") && !reduced ? <PetalShower /> : null}
    </section>
  );
}
