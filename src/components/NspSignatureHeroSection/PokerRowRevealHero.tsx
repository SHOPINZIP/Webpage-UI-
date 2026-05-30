import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
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
  NSP_POKER_DESCRIPTION_DEFAULT,
  NSP_POKER_EYEBROW_DEFAULT,
  NSP_POKER_HEADING_DEFAULT,
} from "../../shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults";

export type PokerRowRevealHeroBlock = {
  id?: string;
  type?: string;
  props?: {
    image?: string;
    alt?: string;
  };
};

export type PokerRowRevealHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: Record<string, unknown>;
    blocks?: PokerRowRevealHeroBlock[];
  };
};

export type PokerRowRevealHeroProps = {
  section: PokerRowRevealHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

const CARD_COUNT = 5;
const SCROLL_OFFSET: [string, string] = ["start start", "end end"];
const SCROLLABLE_OVERFLOW_VALUES = new Set(["auto", "scroll", "overlay"]);

type ScrollRoot = HTMLElement | Window;

const FALLBACK_CARDS = [
  {
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    alt: "Luxury packaging showcase",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    alt: "Brand card showcase",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1600&q=80",
    alt: "Label design showcase",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    alt: "Printed collateral showcase",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    alt: "Bag packaging showcase",
  },
];

function isScrollableOverflowValue(value: string) {
  return SCROLLABLE_OVERFLOW_VALUES.has(value.toLowerCase());
}

function isActuallyScrollable(el: HTMLElement) {
  return el.clientHeight > 0 && el.scrollHeight - el.clientHeight > 1;
}

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

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < breakpoint);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, [breakpoint]);
  return isMobile;
}

type CardData = {
  key: string;
  image: string;
  alt: string;
};

function SafeImageCard({ image, alt }: { image: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(image) && !failed;

  return (
    <div className="ak-nsp-poker-hero__cardSurface">
      {hasImage ? (
        <img
          src={image}
          alt={alt}
          className="ak-nsp-poker-hero__cardImg"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="ak-nsp-poker-hero__cardPlaceholder" aria-hidden>
          <span>No image</span>
        </div>
      )}
    </div>
  );
}

function SpreadCard({
  card,
  index,
  openProgress,
  spreadOpacity,
  spreadScale,
  isMobile,
}: {
  card: CardData;
  index: number;
  openProgress: MotionValue<number>;
  spreadOpacity: MotionValue<number>;
  spreadScale: MotionValue<number>;
  isMobile: boolean;
}) {
  const desktopOffsets = [-280, -140, 0, 140, 280];
  const mobileOffsets = [-100, -50, 0, 50, 100];
  const desktopRotations = [-8, -4, 0, 4, 8];
  const mobileRotations = [-6, -3, 0, 3, 6];

  const x = useTransform(
    openProgress,
    [0, 1],
    [0, isMobile ? mobileOffsets[index] : desktopOffsets[index]]
  );
  const rotate = useTransform(
    openProgress,
    [0, 1],
    [0, isMobile ? mobileRotations[index] : desktopRotations[index]]
  );
  const eachScale = useTransform(
    openProgress,
    [0, 1],
    [1, index === 2 ? 1.01 : 0.975]
  );
  const zIndex = index === 2 ? 30 : 20 - Math.abs(2 - index);

  return (
    <motion.div
      className="ak-nsp-poker-hero__spreadCardWrap"
      style={{ opacity: spreadOpacity, scale: spreadScale, zIndex }}
    >
      <motion.div
        className="ak-nsp-poker-hero__spreadCard"
        style={{ x, rotate, scale: eachScale }}
      >
        <SafeImageCard image={card.image} alt={card.alt} />
      </motion.div>
    </motion.div>
  );
}

function PokerSpread({
  cards,
  progress,
  isMobile,
}: {
  cards: CardData[];
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  const smooth = useSpring(progress, {
    stiffness: 130,
    damping: 30,
    mass: 0.95,
  });

  const flip = useTransform(smooth, [0, 0.18, 0.34], [0, 88, 180]);
  const singleOpacity = useTransform(smooth, [0, 0.12, 0.24], [1, 1, 0]);
  const openProgress = useTransform(smooth, [0.24, 0.58, 1], [0, 1, 1]);
  const spreadOpacity = useTransform(openProgress, [0, 0.12, 1], [0, 1, 1]);
  const spreadScale = useTransform(openProgress, [0, 0.2, 1], [0.95, 1, 1]);

  return (
    <div className="ak-nsp-poker-hero__cardStack">
      {cards.map((card, index) => (
        <SpreadCard
          key={card.key}
          card={card}
          index={index}
          openProgress={openProgress}
          spreadOpacity={spreadOpacity}
          spreadScale={spreadScale}
          isMobile={isMobile}
        />
      ))}

      <motion.div
        className="ak-nsp-poker-hero__singleFlip"
        style={{ rotateY: flip, opacity: singleOpacity }}
      >
        <div className="ak-nsp-poker-hero__singleFace ak-nsp-poker-hero__singleFace--front">
          <SafeImageCard image={cards[2]?.image || ""} alt={cards[2]?.alt || ""} />
          <div className="ak-nsp-poker-hero__frontShade" />
          <div className="ak-nsp-poker-hero__frontMeta">
            <p>FEATURED SHOWCASE</p>
            <h3>One card flips, then opens into the row.</h3>
          </div>
        </div>

        <div className="ak-nsp-poker-hero__singleFace ak-nsp-poker-hero__singleFace--back">
          <div className="ak-nsp-poker-hero__backInner">
            <p>OPENING THE COLLECTION</p>
            <p>Scroll down to open. Scroll up to close.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PokerRowRevealHeroInner({
  section,
  sectionRef,
  scrollRoot,
  theme,
}: {
  section: PokerRowRevealHeroSectionDoc;
  sectionRef: React.RefObject<HTMLElement>;
  scrollRoot: ScrollRoot;
  theme?: StorefrontTheme | null;
}) {
  const p = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];
  const isMobile = useIsMobile();

  const scrollOpts = useMemo(() => {
    const base = {
      target: sectionRef as React.RefObject<HTMLElement>,
      offset: SCROLL_OFFSET,
    };
    if (scrollRoot === window) return base;
    return {
      ...base,
      container: { current: scrollRoot as HTMLElement } as React.RefObject<HTMLElement>,
    };
  }, [sectionRef, scrollRoot]);

  const { scrollYProgress } = useScroll(
    scrollOpts as Parameters<typeof useScroll>[0]
  );
  const pinnedProgress = useTransform(scrollYProgress, [0.08, 0.55, 1], [0, 1, 1]);

  const cards = useMemo(() => {
    return Array.from({ length: CARD_COUNT }).map((_, i) => {
      const b = blocks[i];
      const bp = b?.props ?? {};
      const image = normalizeImageUrl(String(bp.image ?? "")) || FALLBACK_CARDS[i].image;
      const alt = String(bp.alt ?? "").trim() || FALLBACK_CARDS[i].alt;
      return {
        key: String(b?.id ?? `poker-reveal-card-${i + 1}`),
        image,
        alt,
      };
    });
  }, [blocks]);

  const eyebrow = String(p.eyebrow ?? "").trim();
  const heading = String(p.heading ?? "").trim();
  const description = String(p.description ?? "").trim();
  const showSparklesIcon = p.showSparklesIcon !== false;

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: NSP_POKER_EYEBROW_DEFAULT,
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
          defaultStyle: NSP_POKER_HEADING_DEFAULT,
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
          defaultStyle: NSP_POKER_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  return (
    <div className="ak-nsp-poker-hero__sticky">
      <div className="ak-nsp-poker-hero__inner">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="ak-nsp-poker-hero__copy"
        >
          {(showSparklesIcon || eyebrow) && (
            <div className="ak-nsp-poker-hero__eyebrow" style={eyebrowStyle}>
              {showSparklesIcon ? (
                <span aria-hidden className="ak-nsp-poker-hero__eyebrowIcon">
                  *
                </span>
              ) : null}
              {eyebrow}
            </div>
          )}
          {heading ? (
            <h2 className="ak-nsp-poker-hero__heading" style={headingStyle}>
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className="ak-nsp-poker-hero__description" style={descriptionStyle}>
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="ak-nsp-poker-hero__cardsWrap">
          <PokerSpread cards={cards} progress={pinnedProgress} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}

export default function PokerRowRevealHero({
  section,
  appearance,
  theme,
}: PokerRowRevealHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollRoot, setScrollRoot] = useState<ScrollRoot | null>(null);
  const p = section.settings?.props ?? {};
  const sectionHeight = String(p.sectionHeight ?? "200vh").trim() || "200vh";

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      setScrollRoot(window);
      return;
    }
    setScrollRoot(findScrollContainer(el) ?? window);
  }, []);

  if (section.enabled === false) return null;

  return (
    <section
      ref={sectionRef}
      className="ak-nsp-poker-hero"
      style={{ height: sectionHeight, ...sectionAppearanceStyle(appearance) }}
    >
      {scrollRoot ? (
        <PokerRowRevealHeroInner
          section={section}
          sectionRef={sectionRef}
          scrollRoot={scrollRoot}
          theme={theme}
        />
      ) : null}
    </section>
  );
}
