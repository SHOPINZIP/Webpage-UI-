import React, { useEffect, useMemo, useRef, useState } from "react";

import { normalizeImageUrl } from "../HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  NSP_TYPING_DESCRIPTION_DEFAULT,
  NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT,
  NSP_TYPING_STATIC_HEADING_DEFAULT,
  NSP_TYPING_WORD_DEFAULT,
} from "../../shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults";

/** Internal animation / typography — not configurable via section props */
const TYPING_SPEED_MS = 90;
const DELETING_SPEED_MS = 50;
const PAUSE_DURATION_MS = 1200;
const MAX_FONT_SIZE_PX = 90;
const MIN_FONT_SIZE_PX = 28;

/** Used when every block has empty / missing text */
const FALLBACK_TYPING_WORD = "Mithai";

export type FullImageTypingWordBlock = {
  id?: string;
  type?: string;
  props?: {
    text?: string;
  };
};

export type FullImageTypingHeroSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: Record<string, unknown>;
    blocks?: FullImageTypingWordBlock[];
  };
};

export type FullImageTypingHeroProps = {
  section: FullImageTypingHeroSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

function adjustFontSize(el: HTMLElement | null, max: number, min: number) {
  if (!el) return;
  let size = max;
  el.style.fontSize = `${size}px`;

  while (el.scrollWidth > el.offsetWidth && size > min) {
    size -= 1;
    el.style.fontSize = `${size}px`;
  }
}

export default function FullImageTypingHero({
  section,
  appearance,
  theme,
}: FullImageTypingHeroProps) {
  const props = section.settings?.props ?? {};
  const blocks = section.settings?.blocks ?? [];

  const backgroundImage = normalizeImageUrl(props.backgroundImage);
  const backgroundAlt = String(props.backgroundAlt ?? "Hero background").trim() || "Hero background";
  const staticHeading = String(props.staticHeading ?? "").trim();
  const description = String(props.description ?? "").trim();
  const primaryButtonText = String(props.primaryButtonText ?? "").trim();
  const primaryButtonLink = String(props.primaryButtonLink ?? "").trim();
  const secondaryButtonText = String(props.secondaryButtonText ?? "").trim();
  const secondaryButtonLink = String(props.secondaryButtonLink ?? "").trim();
  const showSecondaryButton = props.showSecondaryButton !== false;

  const words = useMemo(() => {
    const list = (Array.isArray(blocks) ? blocks : [])
      .map((b) => String(b?.props?.text ?? "").trim())
      .filter(Boolean);
    return list.length > 0 ? list : [FALLBACK_TYPING_WORD];
  }, [blocks]);

  const wordsKey = words.join("\u0001");

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const dynamicRef = useRef<HTMLDivElement | null>(null);
  const staticRef = useRef<HTMLDivElement | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setWordIndex(0);
    setDisplayedText("");
    setIsDeleting(false);
  }, [wordsKey]);

  useEffect(() => {
    if (!words.length) {
      return;
    }

    const currentWord = words[wordIndex % words.length];
    const speed = isDeleting ? DELETING_SPEED_MS : TYPING_SPEED_MS;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, displayedText.length + 1);
        setDisplayedText(next);

        if (next === currentWord) {
          if (pauseTimeoutRef.current !== null) {
            window.clearTimeout(pauseTimeoutRef.current);
          }
          pauseTimeoutRef.current = window.setTimeout(() => {
            pauseTimeoutRef.current = null;
            setIsDeleting(true);
          }, PAUSE_DURATION_MS);
        }
      } else {
        const next = currentWord.slice(0, displayedText.length - 1);
        setDisplayedText(next);

        if (next.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => {
      window.clearTimeout(timer);
      if (pauseTimeoutRef.current !== null) {
        window.clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [displayedText, isDeleting, wordIndex, words]);

  useEffect(() => {
    const resize = () => {
      adjustFontSize(staticRef.current, MAX_FONT_SIZE_PX, MIN_FONT_SIZE_PX);
      adjustFontSize(dynamicRef.current, MAX_FONT_SIZE_PX, MIN_FONT_SIZE_PX);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [displayedText, staticHeading, wordsKey]);

  const staticHeadingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "staticHeading",
          role: "heading",
          defaultStyle: NSP_TYPING_STATIC_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const typingWordStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "typingWord",
          role: "heading",
          defaultStyle: NSP_TYPING_WORD_DEFAULT,
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
          defaultStyle: NSP_TYPING_DESCRIPTION_DEFAULT,
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
          defaultStyle: NSP_TYPING_PRIMARY_BUTTON_TEXT_DEFAULT,
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
          defaultStyle: NSP_TYPING_SECONDARY_BUTTON_TEXT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const headingLineBaseStyle: React.CSSProperties = {
    fontSize: `${MAX_FONT_SIZE_PX}px`,
  };

  if (section.enabled === false) {
    return null;
  }

  const primaryHref = primaryButtonLink || "#";
  const secondaryHref = secondaryButtonLink || "#";

  return (
    <section className="ak-nsp-typing-hero" style={sectionAppearanceStyle(appearance)}>
      <div className="ak-nsp-typing-hero__bg" aria-hidden={!backgroundImage}>
        {backgroundImage ? (
          <img
            className="ak-nsp-typing-hero__bg-img"
            src={backgroundImage}
            alt={backgroundAlt}
          />
        ) : null}
        <div className="ak-nsp-typing-hero__overlay-solid" />
        <div className="ak-nsp-typing-hero__overlay-gradient" />
      </div>

      <div className="ak-nsp-typing-hero__inner">
        <div className="ak-nsp-typing-hero__content">
          {staticHeading ? (
            <div
              ref={staticRef}
              className="ak-nsp-typing-hero__line"
              style={{ ...staticHeadingStyle, ...headingLineBaseStyle }}
            >
              {staticHeading}
            </div>
          ) : null}

          {words.length > 0 ? (
            <div
              ref={dynamicRef}
              className="ak-nsp-typing-hero__line ak-nsp-typing-hero__line--dynamic"
              style={{ ...typingWordStyle, ...headingLineBaseStyle }}
            >
              {displayedText}
              <span className="ak-nsp-typing-hero__cursor" aria-hidden />
            </div>
          ) : null}

          {description ? (
            <p className="ak-nsp-typing-hero__desc" style={descriptionStyle}>
              {description}
            </p>
          ) : null}

          {(primaryButtonText || (showSecondaryButton && secondaryButtonText)) ? (
            <div className="ak-nsp-typing-hero__actions">
              {primaryButtonText ? (
                <a
                  className="ak-nsp-typing-hero__btn ak-nsp-typing-hero__btn--primary"
                  href={primaryHref}
                  style={primaryButtonTextStyle}
                >
                  {primaryButtonText}
                </a>
              ) : null}
              {showSecondaryButton && secondaryButtonText ? (
                <a
                  className="ak-nsp-typing-hero__btn ak-nsp-typing-hero__btn--secondary"
                  href={secondaryHref}
                  style={secondaryButtonTextStyle}
                >
                  {secondaryButtonText}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
