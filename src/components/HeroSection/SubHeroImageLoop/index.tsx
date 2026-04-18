import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { normalizeImageUrl } from "../heroSectionUtils";

export type SubHeroImageLoopBlock = {
  id?: string;
  type?: string;
  props?: {
    desktopImage?: string;
    mobileImage?: string;
    alt?: string;
  };
};

export type SubHeroImageLoopSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: {
      autoPlay?: boolean;
      interval?: string | number;
      heightOption?: string;
      effect?: "fade" | "slide";
    };
    blocks?: SubHeroImageLoopBlock[];
  };
};

export type SubHeroImageLoopProps = {
  section: SubHeroImageLoopSectionDoc;
};

type NormalizedSlide = {
  id: string | number;
  desktop: string;
  mobile?: string;
  alt: string;
};

const BLOCK_TYPE = "imageSlide";

function blocksToSlides(blocks: SubHeroImageLoopBlock[] | undefined): NormalizedSlide[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return [];

  const out: NormalizedSlide[] = [];
  blocks.forEach((b, i) => {
    if (b.type && b.type !== BLOCK_TYPE) return;
    const p = b.props || {};
    const desktopRaw = normalizeImageUrl(p.desktopImage);
    if (!desktopRaw) return;

    const mobileRaw = normalizeImageUrl(p.mobileImage);
    const mobile = mobileRaw !== "" ? mobileRaw : undefined;

    out.push({
      id: b.id ?? `img-slide-${i + 1}`,
      desktop: desktopRaw,
      mobile,
      alt: String(p.alt ?? "").trim(),
    });
  });
  return out;
}

function SlidePicture({
  desktopSrc,
  mobileSrc,
  alt,
  className,
}: {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  className?: string;
}) {
  const desktop = desktopSrc.trim();
  const mobile = mobileSrc?.trim();

  if (!desktop) return null;

  if (mobile) {
    return (
      <picture>
        <source media="(max-width: 639px)" srcSet={mobile} />
        <img
          src={desktop}
          alt={alt}
          decoding="async"
          draggable={false}
          className={className}
          onError={(e) => {
            e.currentTarget.removeAttribute("src");
          }}
        />
      </picture>
    );
  }

  return (
    <img
      src={desktop}
      alt={alt}
      decoding="async"
      draggable={false}
      className={className}
      onError={(e) => {
        e.currentTarget.removeAttribute("src");
      }}
    />
  );
}

const fadeTransition = {
  opacity: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
  scale: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
  filter: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
};

const slideTransition = {
  duration: 1,
  ease: [0.4, 0, 0.2, 1] as const,
};

const HEIGHT_KEYS = ["xs", "sm", "md", "lg", "xl", "full"] as const;
type HeightKey = (typeof HEIGHT_KEYS)[number];

function resolveHeightKey(raw: unknown): HeightKey {
  const s = raw == null ? "" : String(raw);
  if (HEIGHT_KEYS.includes(s as HeightKey)) return s as HeightKey;
  if (s === "small") return "sm";
  if (s === "medium") return "md";
  if (s === "large") return "lg";
  if (s === "short") return "sm";
  if (s === "tall") return "lg";
  if (s === "default") return "md";
  return "md";
}

/**
 * Sub-hero image loop: Framer Motion fade or slide, Apple-like tonal overlays, glass indicators.
 * Data-driven from `section.settings` (blocks type `imageSlide`).
 */
export default function SubHeroImageLoop({ section }: SubHeroImageLoopProps) {
  const p = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];
  const reduceMotion = useReducedMotion();

  const slides = useMemo(() => blocksToSlides(blocks), [blocks]);

  const autoPlay = p.autoPlay !== false;
  const intervalMs = Math.max(
    1200,
    Number.parseInt(String(p.interval ?? "4200"), 10) || 4200
  );
  const heightKey = resolveHeightKey(p.heightOption);
  const effect = p.effect === "slide" ? "slide" : "fade";

  const [activeIndex, setActiveIndex] = useState(0);

  const slideCount = slides.length;
  const canGo = slideCount > 1;

  const goNext = useCallback(() => {
    if (!canGo) return;
    setActiveIndex((i) => (i + 1) % slideCount);
  }, [canGo, slideCount]);

  useEffect(() => {
    if (!autoPlay || !canGo) return;
    const id = window.setInterval(goNext, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, canGo, goNext, intervalMs]);

  useEffect(() => {
    if (activeIndex >= slideCount && slideCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, slideCount]);

  if (section.enabled === false) {
    return null;
  }

  if (slideCount === 0) {
    return null;
  }

  const active = slides[activeIndex];
  const altText = active.alt || `Sub hero slide ${activeIndex + 1}`;

  const rootClass = ["ak-sub-hero-loop", `ak-sub-hero-loop--h-${heightKey}`].join(" ");

  const viewportMod =
    effect === "slide" ? "ak-sub-hero-loop__viewport--slide-ui" : "ak-sub-hero-loop__viewport--fade-ui";

  const fadeMotionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, scale: 1.035, filter: "blur(10px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.985, filter: "blur(8px)" },
        transition: fadeTransition,
      };

  const slideMotionProps = reduceMotion
    ? {
        initial: { x: "0%" },
        animate: { x: "0%" },
        exit: { x: "0%" },
        transition: { duration: 0.15 },
      }
    : {
        initial: { x: "100%" },
        animate: { x: "0%" },
        exit: { x: "-100%" },
        transition: slideTransition,
      };

  return (
    <section className={rootClass}>
      <div className="ak-sub-hero-loop__inner">
        <div className={`ak-sub-hero-loop__viewport ${viewportMod}`}>
          {effect === "fade" ? (
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                className="ak-sub-hero-loop__motionFill"
                {...fadeMotionProps}
              >
                <SlidePicture
                  desktopSrc={active.desktop}
                  mobileSrc={active.mobile}
                  alt={altText}
                  className="ak-sub-hero-loop__img"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                className="ak-sub-hero-loop__motionFill"
                {...slideMotionProps}
              >
                <SlidePicture
                  desktopSrc={active.desktop}
                  mobileSrc={active.mobile}
                  alt={altText}
                  className="ak-sub-hero-loop__img"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Apple-like tonal balancing */}
          <div className="ak-sub-hero-loop__tonal" aria-hidden="true">
            <div className="ak-sub-hero-loop__tonalBase" />
            <div className="ak-sub-hero-loop__tonalGradient" />
            <div className="ak-sub-hero-loop__tonalRadial" />
            <div className="ak-sub-hero-loop__tonalTop" />
            <div className="ak-sub-hero-loop__tonalBottom" />
          </div>

          {/* Soft glass polish */}
          <div className="ak-sub-hero-loop__polish" aria-hidden="true">
            <div className="ak-sub-hero-loop__polishWash" />
            <div className="ak-sub-hero-loop__polishLeft" />
          </div>

          {canGo ? (
            <div
              className="ak-sub-hero-loop__indicatorsBar"
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={String(s.id)}
                    type="button"
                    role="tab"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={isActive}
                    className="ak-sub-hero-loop__indicatorBtn"
                    onClick={() => setActiveIndex(i)}
                  >
                    <span
                      className={
                        isActive
                          ? "ak-sub-hero-loop__indicatorDot ak-sub-hero-loop__indicatorDot--active"
                          : "ak-sub-hero-loop__indicatorDot"
                      }
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
