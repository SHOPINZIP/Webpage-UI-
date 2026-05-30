import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";

import { normalizeImageUrl } from "../HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  NSP_SIG_HERO_DESCRIPTION_DEFAULT,
  NSP_SIG_HERO_EYEBROW_DEFAULT,
  NSP_SIG_HERO_HEADING_DEFAULT,
  NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT,
  NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT,
} from "../../shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults";

export type NspSignatureHeroBlock = {
  id?: string;
  type?: string;
  props?: {
    image?: string;
    alt?: string;
    position?: string;
  };
};

export type NspSignatureHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: Record<string, unknown>;
    blocks?: NspSignatureHeroBlock[];
  };
};

export type ScrollParallaxSignatureHeroProps = {
  section: NspSignatureHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

type PositionKey = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const POSITIONS: PositionKey[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

/** Matches `useScroll` offset tuple (framer-motion v6). */
const SCROLL_OFFSET: [string, string] = ["start start", "0.75 end"];
const SCROLLABLE_OVERFLOW_VALUES = new Set(["auto", "scroll", "overlay"]);

function isScrollableOverflowValue(value: string) {
  return SCROLLABLE_OVERFLOW_VALUES.has(value.toLowerCase());
}

function isActuallyScrollable(el: HTMLElement) {
  return el.clientHeight > 0 && el.scrollHeight - el.clientHeight > 1;
}

/**
 * Finds the nearest *actually scrollable* ancestor (e.g. admin preview panel).
 * If an ancestor has overflow styles but cannot scroll, it is ignored.
 */
function findScrollContainer(el: HTMLElement | null): HTMLElement | null {
  let parent: HTMLElement | null = el?.parentElement ?? null;
  while (parent) {
    const style = window.getComputedStyle(parent);
    const ox = style.overflow.toLowerCase();
    const oy = style.overflowY.toLowerCase();
    const canScrollByStyle =
      isScrollableOverflowValue(ox) || isScrollableOverflowValue(oy);
    if (canScrollByStyle && isActuallyScrollable(parent)) {
      return parent;
    }
    if (parent === document.body) break;
    parent = parent.parentElement;
  }
  return null;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < breakpoint);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [breakpoint]);
  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function parsePosition(raw: unknown): PositionKey {
  const s = String(raw ?? "").trim();
  if (POSITIONS.includes(s as PositionKey)) return s as PositionKey;
  return "top-left";
}

type CardModel = {
  key: string;
  position: PositionKey;
  image: string;
  alt: string;
};

function FloatingImageCard({
  card,
  index,
  progress,
  isMobile,
  settleLift,
  enableFloatingImages,
}: {
  card: CardModel;
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
  settleLift: MotionValue<number>;
  enableFloatingImages?: boolean;
}) {
  const shouldFloat = enableFloatingImages !== false;

  const floatMultiplier = isMobile ? 0.6 : 1;
  const idleFloatY = [10, 14, 12, 16][index] * floatMultiplier;
  const idleFloatRotate = [0.9, -0.75, 0.85, -0.95][index];
  const idleDuration = [11, 12.5, 11.8, 13][index];
  const startYDesktop = [0, 14, 26, 12][index];
  const startYMobile = [-20, -10, 28, 40][index];
  const startY = isMobile ? startYMobile : startYDesktop;

  const moveUpDistance = isMobile
    ? [-705, -770, -830, -875][index]
    : [-985, -1045, -1095, -1140][index];

  const rotateRange = [-6, 5, -4, 6][index];
  const layerDepth = [0.8, 1.1, 0.95, 1.18][index];

  const rawY = useTransform(
    progress,
    [0, 0.12, 0.3, 0.45, 0.6, 1],
    [
      startY,
      startY - 8,
      startY - 34,
      moveUpDistance,
      moveUpDistance - 24,
      moveUpDistance - 40,
    ]
  );
  const rawRotate = useTransform(
    progress,
    [0, 0.15, 0.45, 1],
    [rotateRange, rotateRange * 0.76, rotateRange * 0.12, 0]
  );
  const rawScale = useTransform(
    progress,
    [0, 0.15, 0.4, 0.6, 1],
    [1, 1.006, 1.018, 0.982, 0.95]
  );
  const rawOpacity = useTransform(
    progress,
    [0, 0.38, 0.54, 0.6, 1],
    [1, 1, 0.72, 0.08, 0]
  );
  const rawInnerParallax = useTransform(
    progress,
    [0, 1],
    [0, isMobile ? -32 * layerDepth : -54 * layerDepth]
  );

  const y = useSpring(rawY, { stiffness: 60, damping: 24, mass: 0.9 });
  const rotate = useSpring(rawRotate, { stiffness: 54, damping: 22, mass: 0.96 });
  const scale = useSpring(rawScale, { stiffness: 64, damping: 24, mass: 0.9 });
  const opacity = useSpring(rawOpacity, { stiffness: 72, damping: 28, mass: 0.84 });
  const innerParallax = useSpring(rawInnerParallax, {
    stiffness: 40,
    damping: 20,
    mass: 1.08,
  });

  const settleOffset = useTransform(settleLift, (v) => v * layerDepth * 0.7);

  /** Idle float offsets — animated via `animate()` so they combine with scroll-driven `y`/`rotate` on one layer. */
  const floatYOffset = useMotionValue(0);
  const floatRotateOffset = useMotionValue(0);

  const cardY = useTransform([y, floatYOffset], ([scrollY, idleY]) => Number(scrollY) + Number(idleY));
  const cardRotate = useTransform(
    [rotate, floatRotateOffset],
    ([scrollR, idleR]) => Number(scrollR) + Number(idleR)
  );

  useEffect(() => {
    if (!shouldFloat) {
      floatYOffset.set(0);
      floatRotateOffset.set(0);
      return;
    }
    const animY = animate(floatYOffset, [0, -idleFloatY, 0, idleFloatY * 0.55, 0], {
      duration: idleDuration,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const animR = animate(floatRotateOffset, [0, idleFloatRotate, 0, idleFloatRotate * -0.75, 0], {
      duration: idleDuration,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => {
      animY.stop();
      animR.stop();
      floatYOffset.set(0);
      floatRotateOffset.set(0);
    };
  }, [shouldFloat, idleFloatY, idleFloatRotate, idleDuration, floatYOffset, floatRotateOffset]);

  return (
    <motion.div
      style={{ y: cardY, rotate: cardRotate, scale, opacity }}
      className={`ak-nsp-sig-hero__card ak-nsp-sig-hero__card--${card.position}${
        isMobile ? " ak-nsp-sig-hero__card--mobile" : ""
      }`}
    >
      <div className="ak-nsp-sig-hero__cardInner">
        <motion.div style={{ y: innerParallax }} className="ak-nsp-sig-hero__cardParallax">
          {card.image ? (
            <img
              src={card.image}
              alt={card.alt || ""}
              className="ak-nsp-sig-hero__cardImg"
              decoding="async"
              draggable={false}
              onError={(e) => {
                e.currentTarget.removeAttribute("src");
              }}
            />
          ) : (
            <div className="ak-nsp-sig-hero__cardPlaceholder" aria-hidden />
          )}
        </motion.div>

        <motion.div
          style={{ y: settleOffset }}
          className="ak-nsp-sig-hero__cardShade"
          aria-hidden
        />

        <div className="ak-nsp-sig-hero__cardRing" aria-hidden />
      </div>
    </motion.div>
  );
}

type ScrollRoot = HTMLElement | Window;

function ScrollParallaxSignatureHeroInner({
  section,
  sectionRef,
  scrollRoot,
  theme,
}: {
  section: NspSignatureHeroSectionDoc;
  sectionRef: React.RefObject<HTMLElement>;
  scrollRoot: ScrollRoot;
  theme?: StorefrontTheme | null;
}) {
  const scrollOpts = useMemo(() => {
    const base = {
      target: sectionRef as React.RefObject<HTMLElement>,
      offset: SCROLL_OFFSET,
    };
    if (scrollRoot === window) {
      return base;
    }
    return {
      ...base,
      container: { current: scrollRoot as HTMLElement } as React.RefObject<HTMLElement>,
    };
  }, [sectionRef, scrollRoot]);

  const { scrollYProgress } = useScroll(
    scrollOpts as Parameters<typeof useScroll>[0]
  );

  const p = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];

  const eyebrow = String(p.eyebrow ?? "").trim();
  const heading = String(p.heading ?? "").trim();
  const description = String(p.description ?? "").trim();
  const primaryButtonText = String(p.primaryButtonText ?? "").trim();
  const primaryButtonLink = String(p.primaryButtonLink ?? "").trim() || "#";
  const secondaryButtonText = String(p.secondaryButtonText ?? "").trim();
  const secondaryButtonLink = String(p.secondaryButtonLink ?? "").trim() || "#";
  const showSecondaryButton = p.showSecondaryButton !== false;
  const enableScrollMotion = p.enableScrollMotion !== false;
  const backgroundTone = String(p.backgroundTone ?? "light");

  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const progressLogBucketRef = useRef<number>(-1);

  useEffect(() => {
    console.log("Floating enabled:", p.enableFloatingImages);
  }, [p.enableFloatingImages]);

  useEffect(() => {
    const reducedMotionFromMq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    if (scrollRoot === window) {
      console.log("[NSP Signature Hero] scroll root: window");
    } else {
      const scrollElement = scrollRoot as HTMLElement;
      const cls = scrollElement.className.trim().split(/\s+/).filter(Boolean).join(".");
      console.log(
        "[NSP Signature Hero] scroll root element:",
        `<${scrollElement.tagName.toLowerCase()}${cls ? `.${cls}` : ""}>`
      );
    }
    console.log("[NSP Signature Hero] enableScrollMotion:", enableScrollMotion);
    console.log(
      "[NSP Signature Hero] prefers-reduced-motion:",
      reducedMotionFromMq
    );
  }, [scrollRoot, enableScrollMotion]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest: number) => {
      const bucket = Math.round(latest * 20) / 20;
      if (bucket === progressLogBucketRef.current) return;
      progressLogBucketRef.current = bucket;
      console.log("[NSP Signature Hero] scrollYProgress:", Number(latest.toFixed(3)));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const animProgress = useTransform(scrollYProgress, (latest) => {
    if (!enableScrollMotion || prefersReducedMotion) return 0;
    return latest;
  });

  const rawTextY = useTransform(
    animProgress,
    [0, 0.45, 0.6, 0.75, 1],
    [0, 0, -72, -165, -250]
  );
  const rawTextScale = useTransform(animProgress, [0, 0.45, 0.7, 1], [1, 1, 0.972, 0.93]);
  const rawTextOpacity = useTransform(animProgress, [0, 0.55, 0.8, 1], [1, 1, 0.72, 0.14]);
  const rawBadgeOpacity = useTransform(animProgress, [0, 0.55, 0.9, 1], [1, 1, 0.32, 0.18]);
  const rawHaloScale = useTransform(animProgress, [0, 0.28, 0.55, 1], [1, 1.03, 1.08, 1.12]);
  const rawTextParallax = useTransform(animProgress, [0, 1], [0, isMobile ? -10 : -18]);

  const textY = useSpring(rawTextY, { stiffness: 54, damping: 22, mass: 1.02 });
  const textScale = useSpring(rawTextScale, { stiffness: 58, damping: 24, mass: 0.98 });
  const textOpacity = useSpring(rawTextOpacity, { stiffness: 66, damping: 26, mass: 0.9 });
  const badgeOpacity = useSpring(rawBadgeOpacity, { stiffness: 68, damping: 26, mass: 0.86 });
  const haloScale = useSpring(rawHaloScale, { stiffness: 48, damping: 20, mass: 1.1 });
  const textParallax = useSpring(rawTextParallax, { stiffness: 40, damping: 18, mass: 1.12 });

  const velocity = useVelocity(scrollYProgress);
  const velocityAbs = useTransform(velocity, (v) => Math.min(Math.abs(v) * 90, 1));
  const settleTarget = useTransform(velocityAbs, (v) =>
    enableScrollMotion && !prefersReducedMotion ? (1 - v) * -7 : 0
  );
  const settleLift = useSpring(settleTarget, { stiffness: 90, damping: 20, mass: 0.8 });

  const textPanelOpacity = useTransform(animProgress, [0, 0.22, 0.5], [0.54, 0.36, 0.18]);
  const textPanelBlur = useTransform(animProgress, [0, 0.6], [10, 4]);
  const textShadowOpacity = useTransform(animProgress, [0, 0.35, 0.75], [0.08, 0.12, 0.04]);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const lightX = useSpring(useTransform(pointerX, [0, 1], [38, 62]), {
    stiffness: 80,
    damping: 18,
    mass: 1,
  });
  const lightY = useSpring(useTransform(pointerY, [0, 1], [30, 66]), {
    stiffness: 80,
    damping: 18,
    mass: 1,
  });

  const glowStyle = {
    background: useTransform(
      [lightX, lightY, textPanelOpacity],
      ([x, y, opacity]) =>
        `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,${0.42 + Number(opacity) * 0.18}), rgba(255,255,255,${0.14 + Number(opacity) * 0.1}) 24%, rgba(255,255,255,0.02) 58%, transparent 72%)`
    ),
  };

  const descBlur = useTransform(textPanelBlur, (v) => `blur(${Math.max(v - 2, 2)}px)`);

  const headingBoxShadow = useTransform(
    textShadowOpacity,
    (v) => `0 22px 70px rgba(255,255,255,${v})`
  );
  const headingBackdrop = useTransform(textPanelBlur, (v) => `blur(${v}px)`);

  const cards = useMemo(() => {
    const slice = blocks.slice(0, 4);
    return POSITIONS.map((fallbackPos, i) => {
      const b = slice[i];
      const bp = b?.props ?? {};
      const position = parsePosition(bp.position ?? fallbackPos);
      const image = normalizeImageUrl(String(bp.image ?? ""));
      const alt = String(bp.alt ?? "").trim();
      return {
        key: String(b?.id ?? `card-${i + 1}`),
        position,
        image,
        alt,
      } as CardModel;
    });
  }, [blocks]);

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: NSP_SIG_HERO_EYEBROW_DEFAULT,
        })
      ),
    [section, theme]
  );

  const headingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "heading",
          role: "heading",
          defaultStyle: NSP_SIG_HERO_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const descriptionStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "description",
          role: "body",
          defaultStyle: NSP_SIG_HERO_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  const primaryButtonTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "primaryButtonText",
          role: "body",
          defaultStyle: NSP_SIG_HERO_PRIMARY_BUTTON_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const secondaryButtonTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "secondaryButtonText",
          role: "body",
          defaultStyle: NSP_SIG_HERO_SECONDARY_BUTTON_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const rootMods =
    backgroundTone === "soft-neutral"
      ? "ak-nsp-sig-hero--tone-soft"
      : "ak-nsp-sig-hero--tone-light";

  return (
    <>

      <div className="ak-nsp-sig-hero__halo" aria-hidden />

      <div className="ak-nsp-sig-hero__cards">
        {cards.map((c, index) => (
          <FloatingImageCard
            key={c.key}
            card={c}
            index={index}
            progress={animProgress}
            isMobile={isMobile}
            settleLift={settleLift}
            enableFloatingImages={
              typeof p.enableFloatingImages === "boolean" ? p.enableFloatingImages : undefined
            }
          />
        ))}
      </div>

      <div className="ak-nsp-sig-hero__center">
        <motion.div
          style={{ y: textY, scale: textScale, opacity: textOpacity }}
          className="ak-nsp-sig-hero__content"
        >
          {eyebrow ? (
            <motion.div
              style={{ opacity: badgeOpacity, y: settleLift }}
              className="ak-nsp-sig-hero__badge"
            >
              <span style={eyebrowStyle}>{eyebrow}</span>
            </motion.div>
          ) : null}

          {heading ? (
            <motion.div
              style={{
                y: textParallax,
                boxShadow: headingBoxShadow,
                backdropFilter: headingBackdrop,
              }}
              className="ak-nsp-sig-hero__headingShell"
            >
              <h2 className="ak-nsp-sig-hero__heading" style={headingStyle}>
                {heading}
              </h2>
            </motion.div>
          ) : null}

          {description ? (
            <motion.div
              style={{ y: settleLift, backdropFilter: descBlur }}
              className="ak-nsp-sig-hero__descShell"
            >
              <p className="ak-nsp-sig-hero__desc" style={descriptionStyle}>
                {description}
              </p>
            </motion.div>
          ) : null}

          <motion.div style={{ y: settleLift }} className="ak-nsp-sig-hero__actions">
            {primaryButtonText ? (
              <a
                className="ak-nsp-sig-hero__btnPrimary"
                href={primaryButtonLink}
                style={primaryButtonTextStyle}
              >
                {primaryButtonText}
              </a>
            ) : null}
            {showSecondaryButton && secondaryButtonText ? (
              <a
                className="ak-nsp-sig-hero__btnSecondary"
                href={secondaryButtonLink}
                style={secondaryButtonTextStyle}
              >
                {secondaryButtonText}
              </a>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function ScrollParallaxSignatureHero({
  section,
  appearance,
  theme,
}: ScrollParallaxSignatureHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollRoot, setScrollRoot] = useState<ScrollRoot | null>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      setScrollRoot(window);
      return;
    }
    setScrollRoot(findScrollContainer(el) ?? window);
  }, []);

  const p = section.settings?.props ?? {};
  const sectionHeight = String(p.sectionHeight ?? "260vh").trim() || "260vh";
  const backgroundTone = String(p.backgroundTone ?? "light");

  if (section.enabled === false) {
    return null;
  }

  const rootMods =
    backgroundTone === "soft-neutral"
      ? "ak-nsp-sig-hero--tone-soft"
      : "ak-nsp-sig-hero--tone-light";

  return (
    <section
      ref={sectionRef}
      className={`ak-nsp-sig-hero ak-nsp-sig-hero--scroll ${rootMods}`}
      style={{ height: sectionHeight, ...sectionAppearanceStyle(appearance) }}
    >
      <div className="ak-nsp-sig-hero__sticky">
        {scrollRoot !== null ? (
          <ScrollParallaxSignatureHeroInner
            section={section}
            sectionRef={sectionRef}
            scrollRoot={scrollRoot}
            theme={theme}
          />
        ) : null}
      </div>
    </section>
  );
}
