import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { normalizeImageUrl } from "../heroSectionUtils";

/** Section-level controls (settings.props) */
export type HeroSectionControls = {
  sectionLabel?: string;
  /** Toolbar subtitle (stacked scroll layout only) */
  toolbarHint?: string;
  autoPlay?: boolean;
  /** Seconds, often stored as string e.g. `"4"` */
  speed?: string | number;
  direction?: "left" | "right";
  showArrows?: boolean;
  showDots?: boolean;
  alignment?: "left" | "center" | "right";
  height?: "default" | "short" | "tall" | string;
  overlay?: "none" | "light" | "medium" | "heavy" | string;
};

export type HeroSlideAlignmentOverride = "inherit" | "left" | "center" | "right";

/** One slide block (settings.blocks[].props) */
export type HeroSlideBlockProps = {
  image?: string;
  imageMobile?: string;
  /** Small label above the title (stacked scroll layout) */
  eyebrow?: string;
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  alignmentOverride?: HeroSlideAlignmentOverride;
};

export type HeroSlideBlock = {
  id: string;
  type: "slide";
  props: HeroSlideBlockProps;
};

export type HeroSectionSettings = {
  props?: HeroSectionControls;
  blocks?: HeroSlideBlock[];
};

/** Persisted hero section document — pass this as the only data prop to `HeroSlider`. */
export type HeroSection = {
  id: string;
  type: "hero";
  enabled?: boolean;
  settings: HeroSectionSettings;
};

/** Internal normalized slide for rendering */
type NormalizedSlide = {
  id: string | number;
  image: string;
  imageMobile?: string;
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  contentAlignment?: "left" | "center" | "right";
};

export type HeroSliderProps = {
  section: HeroSection;
};

const HEIGHT_PRESETS: Record<string, "default" | "short" | "tall"> = {
  default: "default",
  short: "short",
  tall: "tall",
};

const OVERLAY_PRESETS: Record<string, "none" | "light" | "medium" | "heavy"> = {
  none: "none",
  light: "light",
  medium: "medium",
  heavy: "heavy",
};

function resolveSlideAlignment(
  override: HeroSlideAlignmentOverride | undefined,
  sectionDefault: "left" | "center" | "right"
): "left" | "center" | "right" | undefined {
  if (!override || override === "inherit") return undefined;
  return override;
}

function sectionBlocksToSlides(
  blocks: HeroSlideBlock[],
  sectionAlignment: "left" | "center" | "right"
): NormalizedSlide[] {
  const slideBlocks = blocks.filter((b) => b.type === "slide");
  if (slideBlocks.length === 0) return [];

  const out: NormalizedSlide[] = [];
  slideBlocks.forEach((b, i) => {
    const bp = b.props || {};
    const imageRaw = normalizeImageUrl(bp.image);
    if (!imageRaw) return;

    const imageMobileRaw = normalizeImageUrl(bp.imageMobile);
    const imageMobile = imageMobileRaw !== "" ? imageMobileRaw : undefined;

    out.push({
      id: b.id ?? `slide-${i + 1}`,
      image: imageRaw,
      imageMobile,
      headline: bp.headline,
      subheadline: bp.description,
      buttonText: bp.buttonText,
      buttonHref: bp.buttonLink || "#",
      secondaryButtonText: bp.secondaryButtonText,
      secondaryButtonHref: bp.secondaryButtonLink || "#",
      contentAlignment: resolveSlideAlignment(
        bp.alignmentOverride,
        sectionAlignment
      ),
    });
  });
  return out;
}

function preloadImage(src?: string) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

function SlideImage({
  desktopSrc,
  mobileSrc,
}: {
  desktopSrc: string;
  mobileSrc?: string;
}) {
  const [desktop, setDesktop] = useState(desktopSrc);
  const [mobile, setMobile] = useState(mobileSrc || "");

  useEffect(() => {
    setDesktop(desktopSrc);
  }, [desktopSrc]);

  useEffect(() => {
    setMobile(mobileSrc || "");
  }, [mobileSrc]);

  if (!desktop) {
    return null;
  }

  if (mobile) {
    return (
      <>
        <img
          src={desktop}
          alt=""
          decoding="async"
          draggable={false}
          onError={() => setDesktop("")}
          className="ak-hero__img ak-hero__img--desktop"
        />
        <img
          src={mobile}
          alt=""
          decoding="async"
          draggable={false}
          onError={() => setMobile("")}
          className="ak-hero__img ak-hero__img--mobile"
        />
      </>
    );
  }

  return (
    <img
      src={desktop}
      alt=""
      decoding="async"
      draggable={false}
      onError={() => setDesktop("")}
      className="ak-hero__img"
    />
  );
}

export default function HeroSlider({ section }: HeroSliderProps) {
  const p = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];

  const sectionAlignment = p.alignment ?? "left";
  const sectionLabel = p.sectionLabel;
  const heightPreset = p.height ?? "default";
  const overlayPreset = p.overlay ?? "medium";

  const autoPlayProp = p.autoPlay !== false;
  const directionProp = p.direction === "right" ? "right" : "left";
  const intervalSecondsProp = Math.max(1, Number(p.speed) || 4);
  const showArrows = p.showArrows !== false;
  const showDots = p.showDots !== false;

  const baseSlides = useMemo(() => {
    return sectionBlocksToSlides(blocks, sectionAlignment);
  }, [blocks, sectionAlignment]);

  const hasMultipleSlides = baseSlides.length > 1;

  const slides = useMemo(() => {
    if (!hasMultipleSlides) return baseSlides;
    return [
      { ...baseSlides[baseSlides.length - 1], id: `clone-start-${baseSlides[baseSlides.length - 1].id}` },
      ...baseSlides,
      { ...baseSlides[0], id: `clone-end-${baseSlides[0].id}` },
    ];
  }, [baseSlides, hasMultipleSlides]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const resetRafRef = useRef<number | null>(null);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [index, setIndex] = useState(hasMultipleSlides ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const slideSignature = useMemo(
    () =>
      baseSlides
        .map((s) => `${s.id}:${s.image}:${s.imageMobile ?? ""}`)
        .join("|"),
    [baseSlides]
  );

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateWidth = () => {
      const width = el.offsetWidth || 0;
      setViewportWidth(width);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    baseSlides.forEach((slide) => {
      preloadImage(slide.image);
      preloadImage(slide.imageMobile);
    });
  }, [baseSlides]);

  useEffect(() => {
    setIndex(hasMultipleSlides ? 1 : 0);
    setTransitionEnabled(true);
    setIsAnimating(false);
  }, [slideSignature, hasMultipleSlides]);

  const activeIndex = hasMultipleSlides
    ? ((index - 1) % baseSlides.length + baseSlides.length) % baseSlides.length
    : 0;

  const currentSlide = baseSlides[activeIndex] || baseSlides[0];

  const activeAlign =
    currentSlide?.contentAlignment ?? sectionAlignment ?? "left";

  const heightKey = HEIGHT_PRESETS[String(heightPreset)] ?? "default";
  const overlayKey = OVERLAY_PRESETS[String(overlayPreset)] ?? "medium";

  const displayHeadline = currentSlide?.headline;
  const displaySub = currentSlide?.subheadline;
  const displayButton = currentSlide?.buttonText;
  const primaryHref = currentSlide?.buttonHref ?? "#";
  const displayBadge = sectionLabel;

  const showSecondary = Boolean(
    currentSlide?.secondaryButtonText &&
    String(currentSlide.secondaryButtonText).trim()
  );

  const secondaryHref = currentSlide?.secondaryButtonHref || "#";

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      if (!hasMultipleSlides) return;
      if (isAnimating) return;

      setTransitionEnabled(true);
      setIsAnimating(true);
      setIndex(nextIndex);
    },
    [hasMultipleSlides, isAnimating]
  );

  const goNext = useCallback(() => {
    goToIndex(index + 1);
  }, [goToIndex, index]);

  const goPrev = useCallback(() => {
    goToIndex(index - 1);
  }, [goToIndex, index]);

  useEffect(() => {
    clearAutoplay();

    if (!hasMultipleSlides) return;
    if (!autoPlayProp) return;
    if (isAnimating) return;

    autoplayRef.current = window.setTimeout(() => {
      if (directionProp === "left") {
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
      } else {
        setTransitionEnabled(true);
        setIsAnimating(true);
        setIndex((prev) => prev - 1);
      }
    }, intervalSecondsProp * 1000);

    return clearAutoplay;
  }, [
    index,
    hasMultipleSlides,
    autoPlayProp,
    directionProp,
    intervalSecondsProp,
    isAnimating,
    clearAutoplay,
  ]);

  const jumpWithoutAnimation = useCallback((targetIndex: number) => {
    setTransitionEnabled(false);
    setIndex(targetIndex);

    if (resetRafRef.current) {
      cancelAnimationFrame(resetRafRef.current);
    }

    resetRafRef.current = requestAnimationFrame(() => {
      resetRafRef.current = requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setIsAnimating(false);
      });
    });
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!hasMultipleSlides) {
      setIsAnimating(false);
      return;
    }

    if (index === slides.length - 1) {
      jumpWithoutAnimation(1);
      return;
    }

    if (index === 0) {
      jumpWithoutAnimation(slides.length - 2);
      return;
    }

    setIsAnimating(false);
  }, [hasMultipleSlides, index, slides.length, jumpWithoutAnimation]);

  useEffect(() => {
    return () => {
      clearAutoplay();
      if (resetRafRef.current) {
        cancelAnimationFrame(resetRafRef.current);
      }
    };
  }, [clearAutoplay]);

  const trackTranslateX = viewportWidth > 0 ? -(index * viewportWidth) : 0;

  if (section.enabled === false) {
    return null;
  }

  if (baseSlides.length === 0) {
    return null;
  }

  return (
    <div className="ak-hero">
      <section className="ak-hero__section">
        <div className="ak-hero__container">
          <div className="ak-hero__frame">
            <div
              ref={viewportRef}
              className={`ak-hero__viewport ak-hero__viewport--${heightKey}`}
            >
              <div
                ref={trackRef}
                onTransitionEnd={handleTransitionEnd}
                className="ak-hero__track"
                style={{
                  width: viewportWidth > 0 ? `${slides.length * viewportWidth}px` : `${slides.length * 100}%`,
                  transform: `translate3d(${trackTranslateX}px, 0, 0)`,
                  transition:
                    hasMultipleSlides && transitionEnabled
                      ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                  willChange: "transform",
                }}
              >
                {slides.map((slide, i) => {
                  const href = slide.buttonHref || "#";

                  return (
                    <a
                      key={`slot-${i}-${slide.id}`}
                      href={href}
                      className="ak-hero__slide"
                      style={{
                        width: viewportWidth > 0 ? `${viewportWidth}px` : `${100 / slides.length}%`,
                        flex: "0 0 auto",
                      }}
                      aria-label="Hero slide"
                    >
                      <SlideImage
                        desktopSrc={slide.image}
                        mobileSrc={slide.imageMobile}
                      />

                      <div
                        className={`ak-hero__overlay ak-hero__overlay--${overlayKey}`}
                      />
                      <div className="ak-hero__gradient ak-hero__gradient--r" />
                      <div className="ak-hero__gradient ak-hero__gradient--t" />
                    </a>
                  );
                })}
              </div>

              <div
                className={`ak-hero__contentLayer ak-hero__contentLayer--${activeAlign}`}
              >
                <div className="ak-hero__contentPadding">
                  <div
                    className={`ak-hero__contentCard ak-hero__contentCard--${activeAlign}`}
                  >
                    {displayHeadline ? (
                      <h1 className="ak-hero__headline">{displayHeadline}</h1>
                    ) : null}

                    {displaySub ? (
                      <p className="ak-hero__subhead">{displaySub}</p>
                    ) : null}

                    <div
                      className={`ak-hero__ctaRow ak-hero__ctaRow--${activeAlign}`}
                    >
                      {displayButton ? (
                        <a
                          href={primaryHref}
                          className="ak-hero__btn ak-hero__btn--primary"
                        >
                          {displayButton}
                        </a>
                      ) : null}

                      {showSecondary && currentSlide?.secondaryButtonText ? (
                        <a
                          href={secondaryHref}
                          className="ak-hero__btn ak-hero__btn--secondary"
                        >
                          {currentSlide.secondaryButtonText}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {showArrows && hasMultipleSlides && (
                <>
                  <button
                    onClick={goPrev}
                    disabled={isAnimating}
                    className="ak-hero__arrow ak-hero__arrow--prev"
                    aria-label="Previous slide"
                    type="button"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>

                  <button
                    onClick={goNext}
                    disabled={isAnimating}
                    className="ak-hero__arrow ak-hero__arrow--next"
                    aria-label="Next slide"
                    type="button"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </>
              )}

              <div className="ak-hero__topbar">
                <div className="ak-hero__topbarInner">
                  {displayBadge ? (
                    <div className="ak-hero__badge">{displayBadge}</div>
                  ) : null}

                  <div className="ak-hero__counter">
                    Slide {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(baseSlides.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>

            {showDots && baseSlides.length > 1 && (
              <div className="ak-hero__dotsBar">
                <div className="ak-hero__dots">
                  {baseSlides.map((slide, dotIndex) => (
                    <button
                      key={slide.id}
                      type="button"
                      disabled={isAnimating}
                      onClick={() => {
                        if (isAnimating) return;
                        setTransitionEnabled(true);
                        setIsAnimating(true);
                        setIndex(dotIndex + 1);
                      }}
                      className={`ak-hero__dot ${activeIndex === dotIndex ? "is-active" : ""}`}
                      aria-label={`Go to slide ${dotIndex + 1}`}
                    />
                  ))}
                </div>

                <div className="ak-hero__dotsCounter">
                  <span className="ak-hero__dotsCounterStrong">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="ak-hero__dotsCounterSep">/</span>
                  <span>{String(baseSlides.length).padStart(2, "0")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}