import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { normalizeImageUrl } from "../HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import type { ResolvedSectionAppearance, StorefrontTheme } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  NSP_MARQUEE_CARD_SUBTITLE_DEFAULT,
  NSP_MARQUEE_CARD_TITLE_DEFAULT,
  NSP_MARQUEE_EYEBROW_DEFAULT,
  NSP_MARQUEE_HEADING_DEFAULT,
  NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT,
  NSP_MARQUEE_SUBHEADING_DEFAULT,
} from "../../shared/textStyleDefaults/nspSignatureHeroTextStyleDefaults";

export type NSPSignatureHeroMarqueeBlock = {
  id?: string;
  type?: string;
  props?: {
    title?: string;
    subtitle?: string;
    image?: string;
    link?: string;
  };
};

export type NSPSignatureHeroMarqueeSectionDoc = {
  id?: string;
  type?: string;
  enabled?: boolean;
  settings?: {
    props?: Record<string, unknown>;
    blocks?: NSPSignatureHeroMarqueeBlock[];
  };
};

export type NSPSignatureHeroMarqueeProps = {
  section: NSPSignatureHeroMarqueeSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;
};

type MarqueeCardModel = {
  key: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="ak-nsp-marquee-hero__sparklesIcon">
      <path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="20" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="ak-nsp-marquee-hero__badgeCheckIcon">
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function toOverlayOpacity(raw: unknown) {
  const num = Number(raw);
  if (!Number.isFinite(num)) return 0.4;
  return Math.min(0.8, Math.max(0, num));
}

function MarqueeCard({
  item,
  index,
  cardTitleStyle,
  cardSubtitleStyle,
}: {
  item: MarqueeCardModel;
  index: number;
  cardTitleStyle?: React.CSSProperties;
  cardSubtitleStyle?: React.CSSProperties;
}) {
  const cardBody = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      className="ak-nsp-marquee-hero__marqueeCard"
    >
      <div className="ak-nsp-marquee-hero__marqueeMediaWrap">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title || ""}
            className="ak-nsp-marquee-hero__marqueeImage"
            decoding="async"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              e.currentTarget.removeAttribute("src");
            }}
          />
        ) : (
          <div className="ak-nsp-marquee-hero__marqueeImagePlaceholder" aria-hidden />
        )}
        <div className="ak-nsp-marquee-hero__marqueeGradient" />
      </div>
      <div className="ak-nsp-marquee-hero__marqueeMeta">
        {item.title ? <h3 style={cardTitleStyle}>{item.title}</h3> : null}
        {item.subtitle ? <p style={cardSubtitleStyle}>{item.subtitle}</p> : null}
      </div>
    </motion.div>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        className="ak-nsp-marquee-hero__marqueeCardLink"
        aria-label={item.title || "Marquee card link"}
      >
        {cardBody}
      </a>
    );
  }

  return cardBody;
}

export default function NSPSignatureHeroMarquee({
  section,
  appearance,
  theme,
}: NSPSignatureHeroMarqueeProps) {
  const props = section.settings?.props ?? {};
  const rawBlocks = Array.isArray(section.settings?.blocks) ? section.settings.blocks : [];

  const eyebrow = String(props.eyebrow ?? "").trim();
  const heading = String(props.heading ?? "").trim();
  const subheading = String(props.subheading ?? "").trim();
  const heroBadgeText = String(props.heroBadgeText ?? "").trim();
  const heroImage = normalizeImageUrl(String(props.heroImage ?? ""));
  const heroImageAlt = String(props.heroImageAlt ?? "").trim() || "NSP signature hero image";
  const overlayOpacity = toOverlayOpacity(props.overlayOpacity);

  const bottomStripEyebrow = String(props.bottomStripEyebrow ?? "").trim();
  const bottomStripText = String(props.bottomStripText ?? "").trim();
  const bottomStripItemsText = String(props.bottomStripItemsText ?? "").trim();
  const showBottomStrip = Boolean(bottomStripEyebrow || bottomStripText || bottomStripItemsText);

  const marqueeCards = useMemo(() => {
    const baseCards = rawBlocks
      .filter((block) => block && typeof block === "object")
      .map((block, index) => {
        const blockProps = block.props ?? {};
        return {
          key: String(block.id ?? `nsp-marquee-card-${index + 1}`),
          title: String(blockProps.title ?? "").trim(),
          subtitle: String(blockProps.subtitle ?? "").trim(),
          image: normalizeImageUrl(String(blockProps.image ?? "")),
          link: String(blockProps.link ?? "").trim(),
        } as MarqueeCardModel;
      });

    if (baseCards.length === 0) return [];

    const minimumLoopCards = baseCards.length === 1
      ? [...baseCards, { ...baseCards[0], key: `${baseCards[0].key}-clone` }]
      : baseCards;

    return [...minimumLoopCards, ...minimumLoopCards].map((item, index) => ({
      ...item,
      key: `${item.key}-${index}`,
    }));
  }, [rawBlocks]);

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: NSP_MARQUEE_EYEBROW_DEFAULT,
        })
      ),
    [section, theme]
  );

  const heroBadgeTextStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "heroBadgeText",
          role: "body",
          defaultStyle: NSP_MARQUEE_HERO_BADGE_TEXT_DEFAULT,
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
          defaultStyle: NSP_MARQUEE_HEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const subheadingStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "subheading",
          role: "body",
          defaultStyle: NSP_MARQUEE_SUBHEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const marqueeCardTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "marqueeCardTitle",
          role: "heading",
          defaultStyle: NSP_MARQUEE_CARD_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const marqueeCardSubtitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "marqueeCardSubtitle",
          role: "body",
          defaultStyle: NSP_MARQUEE_CARD_SUBTITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  if (section.enabled === false) return null;

  return (
    <section className="ak-nsp-marquee-hero" style={sectionAppearanceStyle(appearance)}>

      <div className="ak-nsp-marquee-hero__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="ak-nsp-marquee-hero__copy"
        >
          {eyebrow ? (
            <p className="ak-nsp-marquee-hero__eyebrow" style={eyebrowStyle}>
              <SparklesIcon />
              <span>{eyebrow}</span>
            </p>
          ) : null}
          {heading ? (
            <h2 className="ak-nsp-marquee-hero__heading" style={headingStyle}>
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className="ak-nsp-marquee-hero__subheading" style={subheadingStyle}>
              {subheading}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="ak-nsp-marquee-hero__heroMedia"
        >
          {heroImage ? (
            <img
              src={heroImage}
              alt={heroImageAlt}
              className="ak-nsp-marquee-hero__heroImage"
              decoding="async"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.removeAttribute("src");
              }}
            />
          ) : (
            <div className="ak-nsp-marquee-hero__heroImagePlaceholder" aria-hidden />
          )}
          <div
            className="ak-nsp-marquee-hero__heroImageOverlay"
            style={{ opacity: overlayOpacity }}
          />
          {heroBadgeText ? (
            <div className="ak-nsp-marquee-hero__heroMediaBadge" style={heroBadgeTextStyle}>
              {heroBadgeText}
            </div>
          ) : null}
        </motion.div>

        {marqueeCards.length > 0 ? (
          <div className="ak-nsp-marquee-hero__marqueeViewport">
            <div className="ak-nsp-marquee-hero__marqueeTrack">
              {marqueeCards.map((item, index) => (
                <MarqueeCard
                  key={item.key}
                  item={item}
                  index={index}
                  cardTitleStyle={marqueeCardTitleStyle}
                  cardSubtitleStyle={marqueeCardSubtitleStyle}
                />
              ))}
            </div>
          </div>
        ) : null}

        {showBottomStrip ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="ak-nsp-marquee-hero__bottomStrip"
          >
            <div className="ak-nsp-marquee-hero__bottomStripLeft">
              <div className="ak-nsp-marquee-hero__bottomStripIconWrap">
                <BadgeCheckIcon />
              </div>
              <div className="ak-nsp-marquee-hero__bottomStripContent">
                {bottomStripEyebrow ? <p>{bottomStripEyebrow}</p> : null}
                {bottomStripText ? <h3>{bottomStripText}</h3> : null}
              </div>
            </div>
            {bottomStripItemsText ? (
              <div className="ak-nsp-marquee-hero__bottomStripItems">{bottomStripItemsText}</div>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

