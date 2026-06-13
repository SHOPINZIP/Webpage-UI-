import React, { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { resolveBlockImageUrl } from "../HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import { NSP_FLOATING_SNACK_TITLE_DEFAULT } from "../../shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults";
import StorefrontImage from "../../shared/StorefrontImage";

export type FloatingSnackGalleryImageBlock = {
  id?: string;
  type?: string;
  image?: string;
  title?: string;
  altText?: string;
  alt?: string;
  props?: {
    image?: string;
    title?: string;
    altText?: string;
    alt?: string;
  };
};

export type FloatingSnackGalleryHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: Record<string, unknown>;
    blocks?: FloatingSnackGalleryImageBlock[];
  };
};

export type FloatingSnackGalleryHeroProps = {
  section: FloatingSnackGalleryHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

const MAX_RENDER_TILES = 12;
const SCROLL_HINT_TEXT = "Scroll to reveal";
const IMAGE_ALT_PREFIX = "Gallery image";
const SCROLL_OFFSET: [string, string] = ["start start", "end end"];
const SCROLLABLE_OVERFLOW_VALUES = new Set(["auto", "scroll", "overlay"]);
const TILE_CENTER_TRANSFORM = "translate(-50%, -50%)";

type LayoutTarget = { x: string; y: string; r: number };
type NormalizedLayoutTarget = { x: number; y: number; r: number };

type GalleryTile = {
  key: string;
  src: string;
  alt: string;
};

const FALLBACK_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=78",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=78",
];

const desktopLayouts: NormalizedLayoutTarget[] = [
  { x: -0.39, y: -0.28, r: -7 },
  { x: -0.14, y: -0.34, r: 5 },
  { x: 0.13, y: -0.3, r: -4 },
  { x: 0.38, y: -0.23, r: 6 },
  { x: -0.43, y: -0.01, r: 4 },
  { x: -0.17, y: 0.05, r: -3 },
  { x: 0.17, y: 0.03, r: 4 },
  { x: 0.41, y: 0.01, r: -5 },
  { x: -0.32, y: 0.3, r: -5 },
  { x: -0.04, y: 0.34, r: 4 },
  { x: 0.23, y: 0.28, r: -4 },
  { x: 0.43, y: 0.24, r: 5 },
];

const mobileLayouts: NormalizedLayoutTarget[] = [
  { x: -0.35, y: -0.38, r: 5 },
  { x: 0, y: -0.36, r: -4 },
  { x: 0.35, y: -0.38, r: 5 },
  { x: -0.34, y: -0.18, r: -5 },
  { x: 0.18, y: -0.16, r: 4 },
  { x: -0.16, y: -0.06, r: -3 },
  { x: 0.18, y: 0.06, r: 3 },
  { x: -0.32, y: 0.17, r: 5 },
  { x: 0.34, y: 0.18, r: -5 },
  { x: -0.35, y: 0.38, r: 5 },
  { x: 0, y: 0.36, r: -4 },
  { x: 0.35, y: 0.38, r: 5 },
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
    if (
      (isScrollableOverflowValue(ox) || isScrollableOverflowValue(oy)) &&
      isActuallyScrollable(parent)
    ) {
      return parent;
    }
    if (parent === document.body) break;
    parent = parent.parentElement;
  }
  return null;
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}

function readBlockFields(block: FloatingSnackGalleryImageBlock | undefined) {
  const nested = block?.props && typeof block.props === "object" ? block.props : {};
  return {
    image: resolveBlockImageUrl(nested.image ?? block?.image),
    altText: String(
      nested.altText ?? nested.alt ?? block?.altText ?? block?.alt ?? ""
    ).trim(),
  };
}

function buildGalleryTiles(
  blocks: FloatingSnackGalleryImageBlock[] | undefined
): GalleryTile[] {
  const tiles: GalleryTile[] = [];

  if (Array.isArray(blocks)) {
    for (let i = 0; i < blocks.length && tiles.length < MAX_RENDER_TILES; i += 1) {
      const block = blocks[i];
      const { image, altText } = readBlockFields(block);
      if (!image) continue;
      tiles.push({
        key: block?.id || `gallery-tile-${i}`,
        src: image,
        alt: altText || `${IMAGE_ALT_PREFIX} ${tiles.length + 1}`,
      });
    }
  }

  if (tiles.length > 0) return tiles;

  return FALLBACK_GALLERY_IMAGES.slice(0, MAX_RENDER_TILES).map((src, index) => ({
    key: `gallery-fallback-${index}`,
    src,
    alt: `${IMAGE_ALT_PREFIX} ${index + 1}`,
  }));
}

/** Same keyframes as reference PremiumSnackGalleryLivingFloat */
function useTileMotion(
  progress: MotionValue<number>,
  index: number,
  target: NormalizedLayoutTarget,
  containerWidth: number,
  containerHeight: number
) {
  const fromLeft = index % 2 === 0;
  const start = 0.025 + index * 0.018;
  const settle = start + 0.22;
  const hold = Math.min(settle + 0.2, 1);
  const safeWidth = Math.max(containerWidth, 1);
  const safeHeight = Math.max(containerHeight, 1);

  const startX = (fromLeft ? -1 : 1) * safeWidth * 1.18;
  const startY = (index < 6 ? -1 : 1) * safeHeight * 0.07;
  const targetX = safeWidth * target.x;
  const targetY = safeHeight * target.y;

  const xRaw = useTransform(
    progress,
    [start, settle, hold],
    [startX, targetX, targetX]
  );
  const yRaw = useTransform(
    progress,
    [start, settle, hold],
    [startY, targetY, targetY]
  );
  const rotateRaw = useTransform(progress, [start, settle], [fromLeft ? -12 : 12, target.r]);
  const scaleRaw = useTransform(progress, [start, settle], [0.72, 0.75]);
  const opacityRaw = useTransform(progress, [start, start + 0.055, settle], [0, 1, 1]);

  return {
    x: useSpring(xRaw, { stiffness: 108, damping: 27, mass: 0.72 }),
    y: useSpring(yRaw, { stiffness: 108, damping: 27, mass: 0.72 }),
    rotate: useSpring(rotateRaw, { stiffness: 116, damping: 27, mass: 0.72 }),
    scale: useSpring(scaleRaw, { stiffness: 116, damping: 27, mass: 0.72 }),
    opacity: useSpring(opacityRaw, { stiffness: 140, damping: 24, mass: 0.55 }),
  };
}

const TileShell = memo(function TileShell({
  src,
  alt,
  index,
  isMobile = false,
}: {
  src: string;
  alt: string;
  index: number;
  isMobile?: boolean;
}) {
  const driftY = index % 3 === 0 ? 12 : index % 3 === 1 ? -10 : 9;
  const driftX = index % 4 === 0 ? 6 : index % 4 === 1 ? -5 : index % 4 === 2 ? 4 : -6;
  const driftRotate = index % 2 === 0 ? 1.8 : -1.8;
  const duration = 5.8 + (index % 5) * 0.45;

  return (
    <motion.div
      animate={{
        y: [0, driftY, 0],
        x: [0, driftX, 0],
        rotate: [0, driftRotate, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.12,
      }}
      className={`tile-shell ${isMobile ? "mobile" : "desktop"}`}
    >
      <StorefrontImage
        desktopSrc={src}
        alt={alt}
        loading={index < 4 ? "eager" : "lazy"}
        fallback={<div className="tile-image-fallback" aria-hidden />}
      />
      <div className="tile-overlay" />
      <div className="tile-ring" />
      {!isMobile ? <div className="tile-line" /> : null}
    </motion.div>
  );
});

function FloatingTile({
  src,
  alt,
  index,
  progress,
  containerWidth,
  containerHeight,
  isMobile,
}: {
  src: string;
  alt: string;
  index: number;
  progress: MotionValue<number>;
  containerWidth: number;
  containerHeight: number;
  isMobile: boolean;
}) {
  const target = isMobile
    ? mobileLayouts[index] ?? mobileLayouts[mobileLayouts.length - 1]
    : desktopLayouts[index] ?? desktopLayouts[desktopLayouts.length - 1];
  const tileMotion = useTileMotion(
    progress,
    index,
    target,
    containerWidth,
    containerHeight
  );

  return (
    <motion.div
      style={tileMotion}
      className="floating-tile"
      transformTemplate={(_transform: Record<string, string | number>, generatedTransform: string) =>
        `${TILE_CENTER_TRANSFORM} ${generatedTransform}`.trim()
      }
    >
      <TileShell src={src} alt={alt} index={index} isMobile={isMobile} />
    </motion.div>
  );
}

function renderTwoLineTitle(titleRaw: string) {
  const normalized = String(titleRaw ?? "").replace(/\s+/g, " ").trim();
  const title = normalized || "Snack Gallery";

  if (title.includes("\n")) {
    const [a, b] = title.split("\n");
    return (
      <>
        {a}
        <br />
        {b || ""}
      </>
    );
  }

  const parts = title.split(" ").filter(Boolean);
  if (parts.length <= 1) return title;

  return (
    <>
      {parts[0]}
      <br />
      {parts.slice(1).join(" ")}
    </>
  );
}

function omitFontSize(style: React.CSSProperties): React.CSSProperties {
  const { fontSize: _fontSize, ...rest } = style;
  return rest;
}

function FloatingSnackGalleryHeroContent({
  section,
  sectionRef,
  scrollContainer,
  theme,
}: {
  section: FloatingSnackGalleryHeroSectionDoc;
  sectionRef: React.RefObject<HTMLElement>;
  scrollContainer: HTMLElement | null;
  theme?: StorefrontTheme | null;
}) {
  const props = section?.settings?.props ?? {};
  const blocks = section?.settings?.blocks;

  const title = String(props.title ?? "Snack Gallery").trim() || "Snack Gallery";
  const showScrollHint = props.showScrollHint !== false;

  const tiles = useMemo(() => buildGalleryTiles(blocks), [blocks]);
  const [containerSize, setContainerSize] = useState({ width: 1366, height: 768 });
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const readSize = () => {
      const el = sectionRef.current;
      const rect = el?.getBoundingClientRect();
      setContainerSize({
        width: Math.max(rect?.width ?? window.innerWidth, 1),
        height: Math.max(window.innerHeight, 1),
      });
    };

    readSize();
    window.addEventListener("resize", readSize);
    return () => window.removeEventListener("resize", readSize);
  }, [sectionRef]);

  const scrollContainerRef = useRef<HTMLElement | null>(scrollContainer);
  scrollContainerRef.current = scrollContainer;

  const scrollOpts = useMemo(() => {
    const base = {
      target: sectionRef,
      offset: SCROLL_OFFSET,
    };
    if (!scrollContainer) {
      return base;
    }
    return { ...base, container: scrollContainerRef };
  }, [sectionRef, scrollContainer]);

  const { scrollYProgress } = useScroll(
    scrollOpts as Parameters<typeof useScroll>[0]
  );

  const titleScale = useSpring(useTransform(scrollYProgress, [0, 0.72], [1, 0.955]), {
    stiffness: 72,
    damping: 28,
    mass: 0.8,
  });

  const titleY = useSpring(useTransform(scrollYProgress, [0, 0.72], [0, -10]), {
    stiffness: 72,
    damping: 28,
    mass: 0.8,
  });

  const glowScale = useSpring(useTransform(scrollYProgress, [0, 0.8], [0.9, 1.14]), {
    stiffness: 55,
    damping: 30,
    mass: 1,
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.92]);

  const titleStyle = useMemo(
    () =>
      omitFontSize(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "title",
            role: "heading",
            defaultStyle: NSP_FLOATING_SNACK_TITLE_DEFAULT,
          })
        )
      ),
    [section, theme]
  );

  return (
    <div className="sticky-wrapper">
      <div className="bg-layer" />
      <div className="gradient-layer" />

      <motion.div style={{ scale: glowScale }} className="center-glow" />

      {showScrollHint ? (
        <div className="scroll-indicator">
          <span>{SCROLL_HINT_TEXT}</span>
          <span className="line" />
        </div>
      ) : null}

      <div className="floating-cluster">
        {tiles.map((tile, index) => (
          <FloatingTile
            key={tile.key}
            src={tile.src}
            alt={tile.alt}
            index={index}
            progress={scrollYProgress}
            containerWidth={containerSize.width}
            containerHeight={containerSize.height}
            isMobile={isMobile}
          />
        ))}
      </div>

      <div className="title-wrapper">
        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="title-inner"
        >
          <div className="title-glow-one" />
          <div className="title-glow-two" />
          <h1 style={titleStyle}>{renderTwoLineTitle(title)}</h1>
        </motion.div>
      </div>
    </div>
  );
}

export default function FloatingSnackGalleryHero({
  section,
  appearance,
  theme,
}: FloatingSnackGalleryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    const el = sectionRef.current;
    setScrollContainer(el ? findScrollContainer(el) : null);
  }, []);

  if (section?.enabled === false) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="premium-snack-gallery"
      style={sectionAppearanceStyle(appearance)}
    >
      {scrollContainer !== undefined ? (
        <FloatingSnackGalleryHeroContent
          section={section}
          sectionRef={sectionRef}
          scrollContainer={scrollContainer}
          theme={theme}
        />
      ) : null}
    </section>
  );
}
