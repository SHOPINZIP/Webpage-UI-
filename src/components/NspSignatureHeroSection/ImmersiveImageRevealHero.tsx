import React, { useEffect, useMemo, useRef, useState } from "react";

import { resolveBlockImageUrl } from "../HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  pickNonEmpty,
  resolveBlockGroupTextStyle,
  resolveScrollRevealColors,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  NSP_IMMERSIVE_STATIC_HEADING_DEFAULT,
  NSP_IMMERSIVE_TYPING_WORD_DEFAULT,
} from "../../shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults";

const TYPING_WORD_BLOCK_TYPE = "typing_word";
const REVEAL_IMAGE_BLOCK_TYPE = "reveal_image";

const FALLBACK_SECTION_HEIGHT_VH = 680;
const FALLBACK_HEADING_COLOR_OVER_IMAGE = "rgba(255, 255, 255, 0.96)";
const HEADING_REVEAL_COLOR_THRESHOLD = 0.42;
const FALLBACK_OVERLAY_OPACITY = 0.34;
const FALLBACK_TYPING_SPEED = 58;
const FALLBACK_DELETING_SPEED = 34;
const FALLBACK_PAUSE_DURATION = 950;
const LEGACY_IMAGE_CARD_BLOCK_TYPE = "imageCard";

function readBlockFields(block: Record<string, unknown> | undefined) {
  const nested =
    block?.props && typeof block.props === "object"
      ? (block.props as Record<string, unknown>)
      : {};
  return { ...nested, ...block } as Record<string, unknown>;
}

function resolveImmersiveBlockType(block: Record<string, unknown> | undefined) {
  const type = String(block?.type ?? "").trim();
  if (type === TYPING_WORD_BLOCK_TYPE) return TYPING_WORD_BLOCK_TYPE;
  if (type === REVEAL_IMAGE_BLOCK_TYPE) return REVEAL_IMAGE_BLOCK_TYPE;
  if (type === LEGACY_IMAGE_CARD_BLOCK_TYPE) return REVEAL_IMAGE_BLOCK_TYPE;

  const fields = readBlockFields(block);
  if (resolveBlockImageUrl(fields.image)) return REVEAL_IMAGE_BLOCK_TYPE;
  if (String(fields.text ?? "").trim()) return TYPING_WORD_BLOCK_TYPE;
  return "";
}

export type ImmersiveImageRevealTypingWordBlock = {
  id?: string;
  type?: string;
  props?: {
    text?: string;
  };
};

export type ImmersiveImageRevealImageBlock = {
  id?: string;
  type?: string;
  props?: {
    image?: unknown;
    mobileImage?: unknown;
    altText?: string;
  };
};

export type ImmersiveImageRevealHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: Record<string, unknown>;
    blocks?: Array<ImmersiveImageRevealTypingWordBlock | ImmersiveImageRevealImageBlock>;
  };
};

export type ImmersiveImageRevealHeroProps = {
  section: ImmersiveImageRevealHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

type RevealImage = {
  id: string;
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
};

function normalizeSectionHeightVh(raw: unknown, fallback: number) {
  if (typeof raw === "number" && Number.isFinite(raw) && raw > 0) {
    return `${Math.round(raw)}vh`;
  }
  const stripped = String(raw ?? "")
    .trim()
    .replace(/vh$/i, "");
  const n = Number(stripped);
  if (Number.isFinite(n) && n > 0) return `${Math.round(n)}vh`;
  return `${fallback}vh`;
}

function resolveScrollHeadingColor(
  strongestReveal: number,
  colorLight: string,
  colorOverImage: string,
  themeFallbackLight: string
) {
  const light = pickNonEmpty(colorLight, themeFallbackLight);
  const overImage = pickNonEmpty(colorOverImage, FALLBACK_HEADING_COLOR_OVER_IMAGE);
  return strongestReveal > HEADING_REVEAL_COLOR_THRESHOLD ? overImage : light;
}

function RevealSlidePicture({
  desktopSrc,
  mobileSrc,
  alt,
  loading,
  imageStyle,
}: {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  loading: "eager" | "lazy";
  imageStyle: React.CSSProperties;
}) {
  const sharedImgProps = {
    alt,
    className: "ak-immersive-image-reveal-hero__image",
    loading,
    decoding: "async" as const,
    referrerPolicy: "no-referrer" as const,
    draggable: false,
    style: imageStyle,
  };

  if (mobileSrc) {
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <img src={desktopSrc} {...sharedImgProps} />
      </picture>
    );
  }

  return <img src={desktopSrc} {...sharedImgProps} />;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMin === inMax) return outMax;
  const p = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * p;
}

function easeApple(value: number) {
  const p = clamp(value, 0, 1);
  return 1 - Math.pow(1 - p, 3.2);
}

function easeInOutApple(value: number) {
  const p = clamp(value, 0, 1);
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

function getImageReveal(index: number, progress: number, imageCount: number) {
  if (imageCount <= 0) return 0;

  const segmentSize = 1 / imageCount;
  const segmentStart = index * segmentSize;
  const segmentEnd = segmentStart + segmentSize;
  const local = clamp((progress - segmentStart) / (segmentEnd - segmentStart), 0, 1);

  if (progress < segmentStart || progress > segmentEnd) return 0;

  if (index === 0 && local < 0.52) return 1;

  if (local < 0.26) return easeApple(mapRange(local, 0, 0.26, 0, 1));
  if (local < 0.54) return 1;
  if (local < 0.96) return 1 - easeInOutApple(mapRange(local, 0.54, 0.96, 0, 1));

  return 0;
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;
    let mounted = true;

    const update = () => {
      frame = null;
      const section = ref.current;
      if (!section || !mounted) return;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const next = total <= 0 ? 0 : clamp(-rect.top / total, 0, 1);

      setProgress((prev) => (Math.abs(prev - next) > 0.001 ? next : prev));
    };

    const request = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      mounted = false;
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

function useTypingWords(
  words: string[],
  enabled: boolean,
  typingSpeed: number,
  deletingSpeed: number,
  pauseDuration: number
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const wordsKey = words.join("\u0001");

  useEffect(() => {
    setWordIndex(0);
    setTypedText("");
    setIsDeleting(false);
  }, [wordsKey]);

  useEffect(() => {
    if (!enabled || words.length === 0) {
      setTypedText("");
      return;
    }

    const current = words[wordIndex % words.length] || "";
    const isFull = typedText === current;
    const isEmpty = typedText.length === 0;
    const delay = isFull && !isDeleting ? pauseDuration : isDeleting ? deletingSpeed : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && !isFull) {
        setTypedText(current.slice(0, typedText.length + 1));
        return;
      }

      if (!isDeleting && isFull) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isEmpty) {
        setTypedText(current.slice(0, typedText.length - 1));
        return;
      }

      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    words,
    wordsKey,
    wordIndex,
    typedText,
    isDeleting,
    enabled,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  if (!enabled && words.length > 0) {
    return words[0];
  }

  return typedText;
}

function coerceNumber(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function ImmersiveImageRevealHero({
  section,
  appearance,
  theme,
}: ImmersiveImageRevealHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  const props = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];

  const staticHeading = String(props.staticHeading ?? "").trim();
  const headingColorLight = String(
    props.headingColorLight ?? props.headingPrimaryColor ?? ""
  ).trim();
  const headingColorOverImage = String(
    props.headingColorOverImage ?? props.headingSecondaryColor ?? ""
  ).trim();
  const showTypingAnimation = props.showTypingAnimation !== false;
  const showCursor = props.showCursor !== false;
  const typingSpeed = coerceNumber(props.typingSpeed, FALLBACK_TYPING_SPEED);
  const deletingSpeed = coerceNumber(props.deletingSpeed, FALLBACK_DELETING_SPEED);
  const pauseDuration = coerceNumber(props.pauseDuration, FALLBACK_PAUSE_DURATION);
  const overlayOpacityMax = coerceNumber(props.overlayOpacity, FALLBACK_OVERLAY_OPACITY);

  const sectionHeightDesktop = normalizeSectionHeightVh(
    props.sectionHeightDesktop,
    FALLBACK_SECTION_HEIGHT_VH
  );
  const sectionHeightMobile = normalizeSectionHeightVh(
    props.sectionHeightMobile,
    FALLBACK_SECTION_HEIGHT_VH
  );

  const typingWords = useMemo(() => {
    return (Array.isArray(blocks) ? blocks : [])
      .map((block) => {
        const record = block as Record<string, unknown>;
        if (resolveImmersiveBlockType(record) !== TYPING_WORD_BLOCK_TYPE) return "";
        const fields = readBlockFields(record);
        return String(fields.text ?? "").trim();
      })
      .filter(Boolean);
  }, [blocks]);

  const revealImages = useMemo<RevealImage[]>(() => {
    const images: RevealImage[] = [];

    (Array.isArray(blocks) ? blocks : []).forEach((block, index) => {
      const record = block as Record<string, unknown>;
      if (resolveImmersiveBlockType(record) !== REVEAL_IMAGE_BLOCK_TYPE) return;

      const fields = readBlockFields(record);
      const desktopSrc = resolveBlockImageUrl(fields.image);
      if (!desktopSrc) return;

      const mobileRaw = resolveBlockImageUrl(fields.mobileImage);
      const mobileSrc = mobileRaw || undefined;

      const alt =
        String(fields.altText ?? fields.alt ?? "").trim() ||
        `Reveal image ${images.length + 1}`;

      images.push({
        id: String(record.id ?? `reveal-image-${index + 1}`),
        desktopSrc,
        mobileSrc,
        alt,
      });
    });

    return images;
  }, [blocks]);

  const typedText = useTypingWords(
    typingWords,
    showTypingAnimation,
    typingSpeed,
    deletingSpeed,
    pauseDuration
  );

  const staticHeadingTypography = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "staticHeading",
          role: "heading",
          defaultStyle: NSP_IMMERSIVE_STATIC_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const typingWordTypography = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "typingWord",
          role: "heading",
          defaultStyle: NSP_IMMERSIVE_TYPING_WORD_DEFAULT,
        })
      ),
    [section, theme]
  );

  const staticScrollColors = useMemo(
    () =>
      resolveScrollRevealColors({
        section,
        theme,
        fieldId: "staticHeading",
        role: "heading",
        defaultStyle: NSP_IMMERSIVE_STATIC_HEADING_DEFAULT,
      }),
    [section, theme]
  );

  const typingScrollColors = useMemo(
    () =>
      resolveScrollRevealColors({
        section,
        theme,
        groupKey: "typingWord",
        role: "heading",
        defaultStyle: NSP_IMMERSIVE_TYPING_WORD_DEFAULT,
      }),
    [section, theme]
  );

  const values = useMemo(() => {
    const imageCount = revealImages.length;
    const reveals = revealImages.map((_, index) => getImageReveal(index, progress, imageCount));
    const strongestReveal = reveals.length > 0 ? Math.max(...reveals) : 0;
    const longestWordLength = typingWords.reduce(
      (max, word) => Math.max(max, word.length),
      18
    );
    const dynamicScale = mapRange(typedText.length, 18, longestWordLength || 28, 1, 0.78);

    const staticHeadingColor = resolveScrollHeadingColor(
      strongestReveal,
      staticScrollColors.colorLight,
      staticScrollColors.colorOverImage,
      staticScrollColors.colorLight
    );
    const typingHeadingColor = resolveScrollHeadingColor(
      strongestReveal,
      typingScrollColors.colorLight,
      typingScrollColors.colorOverImage,
      typingScrollColors.colorLight
    );

    return {
      reveals,
      strongestReveal,
      dynamicScale,
      staticHeadingColor,
      typingHeadingColor,
      titleLift: mapRange(strongestReveal, 0, 1, 0, -18),
      titleScale: mapRange(strongestReveal, 0, 1, 1, 0.92),
    };
  }, [
    progress,
    typedText.length,
    revealImages,
    typingWords,
    staticScrollColors,
    typingScrollColors,
  ]);

  const staticHeadingStyle: React.CSSProperties = {
    ...staticHeadingTypography,
    color: values.staticHeadingColor,
    transition: "color 180ms linear",
  };

  const typingWordStyle: React.CSSProperties = {
    ...typingWordTypography,
    color: values.typingHeadingColor,
    transition: "color 180ms linear",
  };

  if (section.enabled === false) {
    return null;
  }

  const sectionStyle: React.CSSProperties = {
    ...sectionAppearanceStyle(appearance),
    ["--ak-immersive-reveal-height-mobile" as string]: sectionHeightMobile,
    ["--ak-immersive-reveal-height-desktop" as string]: sectionHeightDesktop,
  };

  return (
    <section
      ref={sectionRef}
      className="ak-immersive-image-reveal-hero"
      style={sectionStyle}
    >
      <div className="ak-immersive-image-reveal-hero__sticky">
        <div className="ak-immersive-image-reveal-hero__backdrop" aria-hidden />

        {revealImages.map((image, index) => {
          const reveal = values.reveals[index] ?? 0;
          const topInset = mapRange(reveal, 0, 1, 48, 0);
          const rightInset = mapRange(reveal, 0, 1, 18, 0);
          const bottomInset = mapRange(reveal, 0, 1, 34, 0);
          const leftInset = mapRange(reveal, 0, 1, 18, 0);
          const radius = mapRange(reveal, 0, 1, 42, 0);
          const imageScale = mapRange(reveal, 0, 1, 1.12, 1);
          const imageY = mapRange(reveal, 0, 1, 70, 0);
          const imageOpacity = mapRange(reveal, 0, 0.16, 0, 1);
          const overlayOpacity = mapRange(reveal, 0.22, 1, 0, overlayOpacityMax);

          return (
            <div
              key={image.id}
              className="ak-immersive-image-reveal-hero__image-layer"
              style={{
                clipPath: `inset(${topInset}% ${rightInset}% ${bottomInset}% ${leftInset}% round ${radius}px)`,
                opacity: imageOpacity,
                zIndex: index + 1,
              }}
            >
              <RevealSlidePicture
                desktopSrc={image.desktopSrc}
                mobileSrc={image.mobileSrc}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                imageStyle={{
                  transform: `translate3d(0, ${imageY}px, 0) scale(${imageScale})`,
                }}
              />

              <div
                className="ak-immersive-image-reveal-hero__overlay"
                style={{ opacity: overlayOpacity }}
              />
            </div>
          );
        })}

        {(staticHeading || typingWords.length > 0) && (
          <div
            className="ak-immersive-image-reveal-hero__heading"
            style={{
              transform: `translate3d(0, ${values.titleLift}px, 0) scale(${values.titleScale})`,
              transition: "transform 180ms linear",
            }}
          >
            {staticHeading ? (
              <p
                className="ak-immersive-image-reveal-hero__static-line"
                style={staticHeadingStyle}
              >
                {staticHeading}
              </p>
            ) : null}

            {typingWords.length > 0 ? (
              <p className="ak-immersive-image-reveal-hero__typing-line">
                <span
                  className="ak-immersive-image-reveal-hero__typing-text"
                  style={{
                    ...typingWordStyle,
                    transform: `scale(${values.dynamicScale})`,
                  }}
                >
                  {typedText}
                  {showCursor && showTypingAnimation ? (
                    <span
                      className="ak-immersive-image-reveal-hero__cursor"
                      aria-hidden
                    />
                  ) : null}
                </span>
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export default ImmersiveImageRevealHero;
