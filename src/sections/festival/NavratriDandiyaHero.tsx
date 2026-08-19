import React, { useEffect, useMemo, useState } from "react";

import { resolveBlockImageUrl } from "../../components/HeroSection/heroSectionUtils";
import { resolveStorefrontFontFamily } from "../../shared/fonts/fontRegistry";
import {
  resolveThemeFontKey,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import type {
  NavratriDandiyaHeroProps,
  NavratriWordBlock,
  NavratriFeatureBlock,
  NavratriBadgeBlock,
} from "./types";

const WORD_BLOCK_TYPE = "navratri_word";
const FEATURE_BLOCK_TYPE = "navratri_feature";
const BADGE_BLOCK_TYPE = "navratri_badge";

const COLOR_FALLBACKS = {
  sectionBackgroundColor: "#250A15",
  sectionBackgroundGradient:
    "linear-gradient(135deg,#250A15 0%,#4B0F26 26%,#6F1635 60%,#2B0915 100%)",
  primaryColor: "#F6B73C",
  onPrimaryColor: "#3A1020",
  secondaryColor: "#D94A67",
  accentColor: "#228457",
  onAccentColor: "#F0AE34",
  tertiaryColor: "#4D3CB5",
  highlightColor: "#7A1737",
  surfaceColor: "#57152A",
  textColor: "#FFFFFF",
  mutedTextColor: "rgba(255,255,255,0.72)",
  borderColor: "rgba(255,255,255,0.14)",
  glowColor: "#FFD98A",
  mediaOverlayColor: "rgba(25,6,12,0.84)",
};

const TEXT_DEFAULTS = {
  eyebrowText: { color: "rgba(255,255,255,0.78)", fontWeight: "500" },
  headingLineOne: { color: "#FFFFFF", fontWeight: "500" },
  headingConnector: { color: "#FFFFFF", fontWeight: "500" },
  headingLineThree: { color: "rgba(255,255,255,0.88)", fontWeight: "500" },
  bodyText: { color: "rgba(255,255,255,0.72)", fontWeight: "400" },
  primaryButtonText: { color: "#3A1020", fontWeight: "600" },
  secondaryButtonText: { color: "#FFFFFF", fontWeight: "600" },
  mediaCaptionLabel: { color: "rgba(255,255,255,0.56)", fontWeight: "500" },
  mediaCaptionText: { color: "#FFFFFF", fontWeight: "600" },
};

const CONTENT_FALLBACKS = {
  eyebrowText: "Navratri-inspired hero experience",
  headingLineOne: "Build with",
  headingConnector: "more",
  headingLineThree: "this Navratri.",
  bodyText:
    "A premium festive hero blending Garba spirit, Dandiya motion, rich colour and modern storytelling into one memorable first impression.",
  primaryButtonText: "Start your project",
  secondaryButtonText: "Watch festive story",
  mediaAlt: "People celebrating Navratri with Garba and Dandiya",
  mediaCaptionLabel: "Festival atmosphere",
  mediaCaptionText: "Where craft, celebration and movement meet.",
};

const DEFAULT_WORDS = ["Rhythm", "Colour", "Celebration", "Energy"];
const DEFAULT_FEATURES = [
  "Garba-inspired mood",
  "Mirror-work details",
  "Dandiya energy",
  "Premium storytelling",
];
const DEFAULT_BADGES = ["Navratri 2026", "01 — 09 Nights"];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Leading/tracking pairs for the display heading. "tight" reproduces the
 * source design, which is drawn for a geometric sans; the looser steps exist
 * because a theme font with taller metrics or connected letterforms collides
 * at those values, and no CSS can adapt tracking to a font's metrics for us.
 */
const HEADING_DENSITY = {
  tight: { leading: "0.88", tracking: "-0.068em" },
  balanced: { leading: "0.98", tracking: "-0.03em" },
  relaxed: { leading: "1.08", tracking: "0em" },
};

const DEFAULT_HEADING_DENSITY = "tight";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function riseStyle(delay: number, duration: number, travel = 16): React.CSSProperties {
  return {
    ["--akn-rise-y" as unknown as string]: `${travel}px`,
    animation: `akn-rise ${duration}s ${EASE} ${delay}s both`,
  } as React.CSSProperties;
}

function fadeStyle(delay: number, duration: number): React.CSSProperties {
  return { animation: `akn-fade ${duration}s ${EASE} ${delay}s both` };
}

function scaleStyle(delay: number, duration: number): React.CSSProperties {
  return { animation: `akn-scale ${duration}s ${EASE} ${delay}s both` };
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

function readBlockText(block: { props?: { text?: string } } | null | undefined): string {
  return safeText(block?.props?.text);
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

type DecorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  tertiary: string;
  highlight: string;
  onAccent: string;
  onPrimary: string;
};

function Toran({ palette }: { palette: DecorPalette }) {
  const colors = [palette.primary, palette.secondary, palette.accent, palette.tertiary];
  return (
    <div aria-hidden="true" className="akn-toran">
      <div className="akn-toran__line" style={{ background: `linear-gradient(to right,transparent,${palette.primary},transparent)` }} />
      <div className="akn-toran__track">
        {Array.from({ length: 23 }).map((_, index) => (
          <div key={index} className="akn-toran__item" style={{ transform: `translateY(${index % 2 === 0 ? 0 : 6}px)` }}>
            <div className="akn-toran__bead" />
            <div className="akn-toran__flag" style={{ background: colors[index % colors.length] }} />
            <div className="akn-toran__thread" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Dandiya({ className = "", rotate = 0, delay = 0, palette, reduced }: { className?: string; rotate?: number; delay?: number; palette: DecorPalette; reduced: boolean }) {
  const bands = [palette.highlight, palette.tertiary, palette.accent, palette.secondary];
  return (
    <div
      aria-hidden="true"
      className={`akn-dandiya ${className}`}
      style={{
        ["--akn-dandiya-rotate" as unknown as string]: `${rotate}deg`,
        borderColor: `color-mix(in srgb, ${palette.onPrimary} 12%, transparent)`,
        background: palette.onAccent,
        animation: reduced ? "none" : `akn-dandiya 4.6s ease-in-out ${delay}s infinite`,
        transform: `rotate(${rotate}deg)`,
      } as React.CSSProperties}
    >
      <span className="akn-dandiya__band" style={{ insetInlineStart: 16, background: bands[0] }} />
      <span className="akn-dandiya__band" style={{ insetInlineStart: 48, background: bands[1] }} />
      <span className="akn-dandiya__band" style={{ insetInlineEnd: 48, background: bands[2] }} />
      <span className="akn-dandiya__band" style={{ insetInlineEnd: 16, background: bands[3] }} />
      <span className="akn-dandiya__sheen" />
    </div>
  );
}

function HangingLantern({ className = "", delay = 0, palette, reduced }: { className?: string; delay?: number; palette: DecorPalette; reduced: boolean }) {
  return (
    <div aria-hidden="true" className={`akn-lantern ${className}`} style={{ animation: reduced ? "none" : `akn-lantern 5.2s ease-in-out ${delay}s infinite` }}>
      <div className="akn-lantern__thread-top" />
      <div className="akn-lantern__body" style={{ background: `linear-gradient(to bottom,${palette.primary},${palette.onAccent})` }}>
        <div className="akn-lantern__cap" />
        <div className="akn-lantern__window" />
      </div>
      <div className="akn-lantern__thread-bottom" />
      <div className="akn-lantern__tassels">
        <span style={{ background: palette.primary }} />
        <span style={{ background: palette.secondary }} />
        <span style={{ background: palette.accent }} />
      </div>
    </div>
  );
}

function MirrorMedallion({ className = "", color, reduced }: { className?: string; color: string; reduced: boolean }) {
  return (
    <div aria-hidden="true" className={`akn-medallion ${className}`} style={{ animation: reduced ? "none" : "akn-spin 28s linear infinite" }}>
      <div
        className="akn-medallion__outer"
        style={{
          background: `radial-gradient(circle at center, color-mix(in srgb,#fff 16%,transparent), color-mix(in srgb,${color} 13%,transparent) 58%, transparent 72%)`,
        }}
      >
        <div className="akn-medallion__mid">
          <div className="akn-medallion__inner" />
        </div>
      </div>
    </div>
  );
}

function RangoliAura({ primary, reduced }: { primary: string; reduced: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="akn-rangoli"
      style={{
        animation: reduced ? "none" : "akn-spin 54s linear infinite",
        background: `radial-gradient(circle at center, color-mix(in srgb,${primary} 10%,transparent) 0%, color-mix(in srgb,${primary} 4%,transparent) 20%, transparent 20%), repeating-conic-gradient(from 0deg, color-mix(in srgb,#fff 8%,transparent) 0deg 4deg, transparent 4deg 14deg)`,
      }}
    />
  );
}

function DynamicWord({
  words,
  reduced,
  style,
}: {
  words: string[];
  reduced: boolean;
  style: React.CSSProperties;
}) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || words.length < 2) return undefined;
    let clear: number | undefined;
    const interval = window.setInterval(() => {
      setIndex((value) => {
        setPrevious(value);
        return (value + 1) % words.length;
      });
      window.clearTimeout(clear);
      clear = window.setTimeout(() => setPrevious(null), 560);
    }, 2300);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(clear);
    };
  }, [reduced, words.length]);

  const safeIndex = index % words.length;
  const longest = words.reduce((winner, item) => (item.length > winner.length ? item : winner), "");

  return (
    <span className="akn-word" style={style}>
      {previous !== null && !reduced ? (
        <span key={`prev-${previous}-${safeIndex}`} className="akn-word__slot" style={{ animation: "akn-word-out .55s cubic-bezier(0.22,1,0.36,1) both" }}>
          {words[previous % words.length]}
        </span>
      ) : null}
      <span key={`cur-${safeIndex}`} className="akn-word__slot" style={{ animation: reduced ? "none" : "akn-word-in .55s cubic-bezier(0.22,1,0.36,1) both" }}>
        {words[safeIndex]}
      </span>
      <span className="akn-word__ghost">{longest}</span>
    </span>
  );
}

export default function NavratriDandiyaHero({ section, theme }: NavratriDandiyaHeroProps) {
  const props = section?.settings?.props ?? {};
  const rawBlocks = Array.isArray(section?.settings?.blocks) ? section.settings.blocks : [];
  const reduced = useReducedMotionPreference();

  const bodyFont = resolveStorefrontFontFamily(resolveThemeFontKey("body", theme));
  const headingFont = resolveStorefrontFontFamily(resolveThemeFontKey("heading", theme));

  const color = (key: keyof typeof COLOR_FALLBACKS) => {
    const v = safeText((props as Record<string, unknown>)[key]);
    return v || COLOR_FALLBACKS[key];
  };
  const content = (key: keyof typeof CONTENT_FALLBACKS) => {
    const v = (props as Record<string, unknown>)[key];
    return v === null || v === undefined ? CONTENT_FALLBACKS[key] : String(v);
  };
  const flag = (key: string, fallback = true) =>
    (props as Record<string, unknown>)[key] === undefined ? fallback : (props as Record<string, unknown>)[key] !== false;

  const textStyle = (fieldId: keyof typeof TEXT_DEFAULTS, role: "heading" | "body") => {
    const resolved = resolvedTextStyleToInlineStyle(
      resolveTextStyle({ section, theme, fieldId, role, defaultStyle: TEXT_DEFAULTS[fieldId] })
    );
    // `fontSize` is dropped on purpose: it always resolves to a value (falling
    // back to the global 48px heading / 18px body defaults), which would
    // override this layout's designed sizes — including the responsive heading
    // clamp — and leave the rotating word sized differently from the heading
    // lines around it. Sizing stays owned by the stylesheet.
    const { fontSize: _fontSize, ...rest } = resolved;
    return role === "heading" ? { ...rest, fontFamily: headingFont } : rest;
  };

  const words = useMemo(() => {
    const list = (rawBlocks.filter((b) => safeText((b as { type?: string })?.type) === WORD_BLOCK_TYPE) as NavratriWordBlock[])
      .map(readBlockText)
      .filter(Boolean);
    return list.length > 0 ? list : DEFAULT_WORDS;
  }, [rawBlocks]);

  const features = useMemo(() => {
    const list = (rawBlocks.filter((b) => safeText((b as { type?: string })?.type) === FEATURE_BLOCK_TYPE) as NavratriFeatureBlock[])
      .map(readBlockText)
      .filter(Boolean);
    return list.length > 0 ? list : DEFAULT_FEATURES;
  }, [rawBlocks]);

  const badges = useMemo(() => {
    const list = (rawBlocks.filter((b) => safeText((b as { type?: string })?.type) === BADGE_BLOCK_TYPE) as NavratriBadgeBlock[])
      .map(readBlockText)
      .filter(Boolean);
    return list.length > 0 ? list : DEFAULT_BADGES;
  }, [rawBlocks]);

  const decorPalette: DecorPalette = useMemo(
    () => ({
      primary: color("primaryColor"),
      secondary: color("secondaryColor"),
      accent: color("accentColor"),
      tertiary: color("tertiaryColor"),
      highlight: color("highlightColor"),
      onAccent: color("onAccentColor"),
      onPrimary: color("onPrimaryColor"),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      props.primaryColor,
      props.secondaryColor,
      props.accentColor,
      props.tertiaryColor,
      props.highlightColor,
      props.onAccentColor,
      props.onPrimaryColor,
    ]
  );

  const headingDensity =
    HEADING_DENSITY[safeText(props.headingDensity) as keyof typeof HEADING_DENSITY] ??
    HEADING_DENSITY[DEFAULT_HEADING_DENSITY];

  const media = resolveBlockImageUrl(props.mediaImage);
  const mediaAlt = content("mediaAlt");

  if (section?.enabled === false) return null;

  const primaryHref = safeText(props.primaryButtonLink) || "#";
  const secondaryHref = safeText(props.secondaryButtonLink) || "#";

  return (
    <section
      className="akn-hero"
      data-ak-section="festival"
      style={{
        ["--akn-heading-leading" as unknown as string]: headingDensity.leading,
        ["--akn-heading-tracking" as unknown as string]: headingDensity.tracking,
        fontFamily: bodyFont,
        color: color("textColor"),
        background: color("sectionBackgroundColor"),
      } as React.CSSProperties}
    >
      <div className="akn-hero__gradient" style={{ background: color("sectionBackgroundGradient") }} />
      <div
        className="akn-hero__glow"
        style={{
          background: `radial-gradient(circle at 15% 20%, color-mix(in srgb, ${color("primaryColor")} 18%, transparent), transparent 24%), radial-gradient(circle at 78% 18%, color-mix(in srgb, ${color("secondaryColor")} 24%, transparent), transparent 26%), radial-gradient(circle at 50% 65%, color-mix(in srgb, ${color("secondaryColor")} 20%, transparent), transparent 30%), radial-gradient(circle at 82% 72%, color-mix(in srgb, ${color("primaryColor")} 12%, transparent), transparent 20%)`,
        }}
      />
      <div className="akn-hero__sparkle" />

      {media ? <div className="akn-hero__bg" style={{ backgroundImage: `url('${media}')` }} /> : null}
      <div
        className="akn-hero__bg-overlay"
        style={{
          background: `linear-gradient(90deg, ${color("mediaOverlayColor")} 0%, color-mix(in srgb, ${color("mediaOverlayColor")} 55%, transparent) 35%, color-mix(in srgb, ${color("mediaOverlayColor")} 26%, transparent) 58%, color-mix(in srgb, ${color("mediaOverlayColor")} 72%, transparent) 100%)`,
        }}
      />
      <div className="akn-hero__vignette" />

      {flag("showToran") ? <Toran palette={decorPalette} /> : null}

      <div className="akn-hero__decor" aria-hidden="true">
        {flag("showLanterns") ? (
          <>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--lantern-1"><HangingLantern palette={decorPalette} reduced={reduced} /></div>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--lantern-2"><HangingLantern delay={0.45} palette={decorPalette} reduced={reduced} /></div>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--lantern-3"><HangingLantern delay={0.25} palette={decorPalette} reduced={reduced} /></div>
          </>
        ) : null}
        {flag("showMirrorMedallions") ? (
          <>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--medallion-1"><MirrorMedallion color={color("primaryColor")} reduced={reduced} /></div>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--medallion-2"><MirrorMedallion color={color("secondaryColor")} reduced={reduced} /></div>
          </>
        ) : null}
        {flag("showDandiyaSticks") ? (
          <>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--dandiya-start"><Dandiya rotate={-28} palette={decorPalette} reduced={reduced} /></div>
            <div className="akn-hero__decor-slot akn-hero__decor-slot--dandiya-end"><Dandiya rotate={30} delay={0.5} palette={decorPalette} reduced={reduced} /></div>
          </>
        ) : null}
      </div>

      <div className="akn-hero__inner">
        <div className="akn-grid">
          <div className="akn-copy">
            {flag("showEyebrow") && content("eyebrowText") ? (
              <div
                className="akn-eyebrow"
                style={{
                  ...riseStyle(0, 0.65),
                  borderColor: color("borderColor"),
                  background: `color-mix(in srgb, ${color("textColor")} 8%, transparent)`,
                }}
              >
                <span style={{ color: color("primaryColor") }}>
                  <MusicIcon />
                </span>
                <span style={textStyle("eyebrowText", "body")}>{content("eyebrowText")}</span>
              </div>
            ) : null}

            <h2 className="akn-heading" style={{ ...riseStyle(0.06, 0.82, 20), fontFamily: headingFont }}>
              <span className="akn-heading__line" style={textStyle("headingLineOne", "heading")}>
                {content("headingLineOne")}
              </span>
              <span className="akn-heading__line">
                <span style={textStyle("headingConnector", "heading")}>{content("headingConnector")}</span>{" "}
                <DynamicWord words={words} reduced={reduced} style={{ color: color("primaryColor") }} />
              </span>
              <span className="akn-heading__line" style={textStyle("headingLineThree", "heading")}>
                {content("headingLineThree")}
              </span>
            </h2>

            {content("bodyText") ? (
              <p className="akn-body" style={{ ...riseStyle(0.16, 0.72, 18), ...textStyle("bodyText", "body") }}>
                {content("bodyText")}
              </p>
            ) : null}

            <div className="akn-actions" style={riseStyle(0.22, 0.72, 18)}>
              {content("primaryButtonText") ? (
                <a
                  href={primaryHref}
                  className="akn-btn akn-btn--primary"
                  style={{ background: color("primaryColor"), ...textStyle("primaryButtonText", "body") }}
                >
                  {content("primaryButtonText")}
                  <span className="akn-btn__icon"><ArrowUpRightIcon /></span>
                </a>
              ) : null}

              {flag("showSecondaryButton") && content("secondaryButtonText") ? (
                <a
                  href={secondaryHref}
                  className="akn-btn akn-btn--secondary"
                  style={{
                    borderColor: color("borderColor"),
                    background: `color-mix(in srgb, ${color("textColor")} 8%, transparent)`,
                    ...textStyle("secondaryButtonText", "body"),
                  }}
                >
                  {content("secondaryButtonText")}
                </a>
              ) : null}
            </div>

            {flag("showFeatures") && features.length > 0 ? (
              <div
                className="akn-features"
                style={{
                  ...fadeStyle(0.34, 0.8),
                  borderColor: color("borderColor"),
                  color: `color-mix(in srgb, ${color("textColor")} 48%, transparent)`,
                }}
              >
                {features.map((feature, index) => (
                  <div key={`${feature}-${index}`} className="akn-features__item">
                    <span>{feature}</span>
                    {index < features.length - 1 ? (
                      <span
                        className="akn-features__dot"
                        style={{ background: [color("primaryColor"), color("secondaryColor"), color("accentColor")][index % 3] }}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="akn-visual">
            <div className="akn-visual__stage" style={scaleStyle(0.12, 0.85)}>
              <div className="akn-visual__panel" style={{ borderColor: color("borderColor"), background: `color-mix(in srgb, ${color("textColor")} 6%, transparent)` }} />

              <div className="akn-ring akn-ring--outer" style={{ borderColor: `color-mix(in srgb, ${color("primaryColor")} 20%, transparent)`, animation: reduced ? "none" : "akn-spin 42s linear infinite" }} />
              <div className="akn-ring akn-ring--middle" style={{ borderColor: `color-mix(in srgb, ${color("textColor")} 12%, transparent)`, animation: reduced ? "none" : "akn-spin-reverse 30s linear infinite" }} />
              <div className="akn-ring akn-ring--inner" style={{ borderColor: `color-mix(in srgb, ${color("secondaryColor")} 22%, transparent)`, animation: reduced ? "none" : "akn-spin 24s linear infinite" }} />
              {flag("showRangoliAura") ? <RangoliAura primary={color("primaryColor")} reduced={reduced} /> : null}

              <div
                className="akn-media-frame"
                style={{ borderColor: color("borderColor"), background: color("surfaceColor") }}
              >
                {media ? (
                  <div role="img" aria-label={mediaAlt} className="akn-media-frame__img" style={{ backgroundImage: `url('${media}')` }} />
                ) : null}
                <div className="akn-media-frame__shade" />

                {flag("showMediaBadges") && badges.length > 0 ? (
                  <div className="akn-media-frame__badges">
                    {badges.map((badge, index) => (
                      <span key={`${badge}-${index}`} className="akn-badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : null}

                {flag("showMediaCaption") && (content("mediaCaptionLabel") || content("mediaCaptionText")) ? (
                  <div className="akn-caption">
                    {content("mediaCaptionLabel") ? (
                      <p className="akn-caption__label" style={textStyle("mediaCaptionLabel", "body")}>
                        {content("mediaCaptionLabel")}
                      </p>
                    ) : null}
                    {content("mediaCaptionText") ? (
                      <p className="akn-caption__text" style={{ ...textStyle("mediaCaptionText", "heading"), fontFamily: headingFont }}>
                        {content("mediaCaptionText")}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {flag("showDandiyaSticks") ? (
                <>
                  <div className="akn-hero__decor-slot akn-hero__decor-slot--dandiya-bottom-start"><Dandiya rotate={-36} delay={0.3} palette={decorPalette} reduced={reduced} /></div>
                  <div className="akn-hero__decor-slot akn-hero__decor-slot--dandiya-bottom-end"><Dandiya rotate={38} delay={0.7} palette={decorPalette} reduced={reduced} /></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
