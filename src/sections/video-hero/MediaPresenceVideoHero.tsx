import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { normalizeImageUrl } from "../../components/HeroSection/heroSectionUtils";
import { usePrefersReducedMotion } from "../../components/MessageStyleTestimonialsSection/hooks";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupSurfaceStyle,
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  INFO_CARD_DARK_SURFACE_DEFAULT,
  INFO_CARD_LIGHT_SURFACE_DEFAULT,
  VIDEO_CARD_EYEBROW_DEFAULT,
  VIDEO_CARD_TITLE_DEFAULT,
  VIDEO_HERO_EYEBROW_DEFAULT,
  VIDEO_HERO_HEADING_DEFAULT,
  VIDEO_HERO_SUBHEADING_DEFAULT,
} from "../../shared/textStyleDefaults/videoHeroTextStyleDefaults";
import type {
  InfoCardBlock,
  MediaPresenceVideoHeroProps,
  VideoCardBlock,
  VideoHeroIconType,
  VideoHeroInfoStyleType,
  VideoHeroSectionPadding,
} from "./types";
import { InlineVideoMedia, useInlineVideoPlayback } from "./inlineVideoPlayback";

const VIDEO_CARD_TYPE = "video_card";
const INFO_CARD_TYPE = "info_card";
const easing = [0.22, 1, 0.36, 1] as const;

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function readNestedFields<T extends Record<string, unknown>>(block: Record<string, unknown>): T {
  const nested =
    block.props && typeof block.props === "object"
      ? (block.props as Record<string, unknown>)
      : {};
  return { ...nested, ...block } as T;
}

function readVideoCard(block: VideoCardBlock) {
  const fields = readNestedFields<VideoCardBlock>(block as Record<string, unknown>);
  return {
    id: safeText(block.id) || "",
    eyebrow: safeText(fields.eyebrow),
    title: safeText(fields.title),
    videoUrl: normalizeImageUrl(safeText(fields.videoUrl)),
    posterImage: normalizeImageUrl(safeText(fields.posterImage)),
    statLabel: safeText(fields.statLabel),
  };
}

function readInfoCard(block: InfoCardBlock) {
  const fields = readNestedFields<InfoCardBlock>(block as Record<string, unknown>);
  const iconRaw = safeText(fields.iconType).toLowerCase();
  const styleRaw = safeText(fields.styleType).toLowerCase();
  const iconType: VideoHeroIconType =
    iconRaw === "sparkles" ||
    iconRaw === "newspaper" ||
    iconRaw === "radio" ||
    iconRaw === "badge" ||
    iconRaw === "none"
      ? iconRaw
      : "none";
  const styleType: VideoHeroInfoStyleType = styleRaw === "dark" ? "dark" : "light";
  return {
    id: safeText(block.id) || "",
    iconType,
    title: safeText(fields.title),
    styleType,
  };
}

function paddingClass(padding: VideoHeroSectionPadding | string | undefined): string {
  const value = safeText(padding).toLowerCase();
  if (value === "small") return "ak-video-hero--pad-sm";
  if (value === "medium") return "ak-video-hero--pad-md";
  return "ak-video-hero--pad-lg";
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="ak-video-hero__infoIconSvg">
      <path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewspaperIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="ak-video-hero__infoIconSvg">
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RadioIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1 4.9C23 8.8 23 15.1 19.1 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="ak-video-hero__infoIconSvg">
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

function InfoIcon({ type }: { type: VideoHeroIconType }) {
  switch (type) {
    case "sparkles":
      return <SparklesIcon />;
    case "newspaper":
      return <NewspaperIcon />;
    case "radio":
      return <RadioIcon className="ak-video-hero__infoIconSvg" />;
    case "badge":
      return <BadgeIcon />;
    default:
      return null;
  }
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.14v13.72L19 12 8 5.14z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m22 9-6 6M16 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type VideoCardModel = ReturnType<typeof readVideoCard> & { key: string };

function VideoCardItem({
  card,
  index,
  total,
  staggerMiddleCard,
  autoPlayVideos,
  loopVideos,
  reduceMotion,
  cardEyebrowStyle,
  cardTitleStyle,
}: {
  card: VideoCardModel;
  index: number;
  total: number;
  staggerMiddleCard: boolean;
  autoPlayVideos: boolean;
  loopVideos: boolean;
  reduceMotion: boolean;
  cardEyebrowStyle?: React.CSSProperties;
  cardTitleStyle?: React.CSSProperties;
}) {
  const playback = useInlineVideoPlayback({
    videoUrl: card.videoUrl,
    autoPlay: autoPlayVideos,
    loop: loopVideos,
    mutedByDefault: true,
  });
  const hasVideo = Boolean(playback.source);
  const showStagger =
    staggerMiddleCard && total === 3 && index === 1 && !reduceMotion;

  const motionProps = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0, scale: 1 } }
    : {
        initial: { opacity: 0, y: 50, scale: 0.96 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.8, delay: index * 0.12, ease: easing },
      };

  return (
    <div
      className={
        showStagger
          ? "ak-video-hero__cardWrap ak-video-hero__cardWrap--stagger"
          : "ak-video-hero__cardWrap"
      }
    >
      <motion.article
        {...motionProps}
        className="ak-video-hero__card"
      >
      <div className="ak-video-hero__cardMedia">
        <InlineVideoMedia
          controller={playback}
          videoClassName="ak-video-hero__cardVideo"
          posterClassName="ak-video-hero__cardPoster"
          placeholderClassName="ak-video-hero__cardPlaceholder"
          posterUrl={card.posterImage}
          title={card.title}
        />

        <div className="ak-video-hero__cardOverlay" aria-hidden />

        <div className="ak-video-hero__cardTopBar">
          {card.eyebrow ? (
            <p className="ak-video-hero__cardEyebrowPill" style={cardEyebrowStyle}>
              {card.eyebrow}
            </p>
          ) : (
            <span />
          )}
          {card.statLabel ? (
            <span className="ak-video-hero__cardStat" aria-hidden>
              {card.statLabel}
            </span>
          ) : null}
        </div>

        <div className="ak-video-hero__cardBottom">
          {card.title ? (
            <h3 className="ak-video-hero__cardTitle" style={cardTitleStyle}>
              {card.title}
            </h3>
          ) : null}

          {hasVideo ? (
            <div className="ak-video-hero__cardControls">
              <button
                type="button"
                className="ak-video-hero__controlBtn ak-video-hero__controlBtn--play"
                onClick={() => void playback.togglePlay()}
                aria-label={playback.isPlaying ? "Pause video" : "Play video"}
              >
                {playback.isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                className="ak-video-hero__controlBtn ak-video-hero__controlBtn--mute"
                onClick={playback.toggleMute}
                aria-label={playback.isMuted ? "Unmute video" : "Mute video"}
              >
                {playback.isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
            </div>
          ) : null}
        </div>

        {playback.autoplayBlocked && hasVideo ? (
          <button
            type="button"
            className="ak-video-hero__autoplayFallback"
            onClick={() => void playback.retryPlayback()}
            aria-label="Tap to play video"
          >
            <PlayIcon />
          </button>
        ) : null}
      </div>
    </motion.article>
    </div>
  );
}

export default function MediaPresenceVideoHero({
  section,
  appearance,
  theme,
}: MediaPresenceVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const props = section.settings?.props ?? {};
  const rawBlocks = Array.isArray(section.settings?.blocks) ? section.settings.blocks : [];
  const reduceMotion = usePrefersReducedMotion();
  const framerReduceMotion = useReducedMotion();
  const motionDisabled = reduceMotion || Boolean(framerReduceMotion);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const titleY = useTransform(scrollYProgress, [0, 0.45], [28, 0]);

  const eyebrow = safeText(props.eyebrow);
  const heading = safeText(props.heading);
  const subheading = safeText(props.subheading);
  const showEyebrow = props.showEyebrow !== false;
  const showSubheading = props.showSubheading !== false;
  const showBottomInfoStrip = props.showBottomInfoStrip !== false;
  const autoPlayVideos = props.autoPlayVideos !== false;
  const loopVideos = props.loopVideos !== false;
  const staggerMiddleCard = props.staggerMiddleCard !== false;

  const videoCards = useMemo(() => {
    return rawBlocks
      .filter((block) => block && typeof block === "object")
      .filter((block) => safeText((block as { type?: string }).type) === VIDEO_CARD_TYPE)
      .map((block, index) => {
        const card = readVideoCard(block as VideoCardBlock);
        return {
          ...card,
          key: card.id || `video-card-${index + 1}`,
        };
      });
  }, [rawBlocks]);

  const infoCards = useMemo(() => {
    return rawBlocks
      .filter((block) => block && typeof block === "object")
      .filter((block) => safeText((block as { type?: string }).type) === INFO_CARD_TYPE)
      .map((block, index) => {
        const card = readInfoCard(block as InfoCardBlock);
        return {
          ...card,
          key: card.id || `info-card-${index + 1}`,
        };
      })
      .filter((card) => card.title);
  }, [rawBlocks]);

  const showVideoGrid = videoCards.length > 0;
  const showInfoStrip = showBottomInfoStrip && infoCards.length > 0;

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: VIDEO_HERO_EYEBROW_DEFAULT,
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
          defaultStyle: VIDEO_HERO_HEADING_DEFAULT,
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
          defaultStyle: VIDEO_HERO_SUBHEADING_DEFAULT,
        })
      ),
    [section, theme]
  );

  const cardEyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "videoCardEyebrow",
          role: "body",
          defaultStyle: VIDEO_CARD_EYEBROW_DEFAULT,
        })
      ),
    [section, theme]
  );

  const cardTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "videoCardTitle",
          role: "heading",
          defaultStyle: VIDEO_CARD_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const infoLightSurface = useMemo(
    () =>
      resolveBlockGroupSurfaceStyle({
        section,
        groupKey: "infoCardLight",
        defaultStyle: INFO_CARD_LIGHT_SURFACE_DEFAULT,
      }),
    [section]
  );

  const infoDarkSurface = useMemo(
    () =>
      resolveBlockGroupSurfaceStyle({
        section,
        groupKey: "infoCardDark",
        defaultStyle: INFO_CARD_DARK_SURFACE_DEFAULT,
      }),
    [section]
  );

  const gridClass =
    videoCards.length === 3
      ? "ak-video-hero__grid ak-video-hero__grid--three"
      : videoCards.length <= 2
        ? "ak-video-hero__grid ak-video-hero__grid--compact"
        : "ak-video-hero__grid ak-video-hero__grid--multi";

  if (section.enabled === false) return null;

  const headerMotion = motionDisabled
    ? { initial: false as const, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.7 },
      };

  return (
    <section
      ref={sectionRef}
      className={`ak-video-hero ${paddingClass(props.sectionPadding)}`}
      style={sectionAppearanceStyle(appearance)}
    >
      {!motionDisabled ? (
        <motion.div style={{ y: glowY }} className="ak-video-hero__glow" aria-hidden />
      ) : (
        <div className="ak-video-hero__glow" aria-hidden />
      )}
      <div className="ak-video-hero__topFade" aria-hidden />

      <div className="ak-video-hero__inner">
        {(showEyebrow && eyebrow) || heading || (showSubheading && subheading) ? (
          <motion.header
            {...headerMotion}
            style={motionDisabled ? undefined : { y: titleY }}
            className="ak-video-hero__header"
          >
            {showEyebrow && eyebrow ? (
              <div className="ak-video-hero__eyebrowPill" style={eyebrowStyle}>
                <RadioIcon className="ak-video-hero__eyebrowPillIcon" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            {heading ? (
              <h2 className="ak-video-hero__heading" style={headingStyle}>
                {heading}
              </h2>
            ) : null}
            {showSubheading && subheading ? (
              <p className="ak-video-hero__subheading" style={subheadingStyle}>
                {subheading}
              </p>
            ) : null}
          </motion.header>
        ) : null}

        {showVideoGrid ? (
          <div className={gridClass}>
            {videoCards.map((card, index) => (
              <VideoCardItem
                key={card.key}
                card={card}
                index={index}
                total={videoCards.length}
                staggerMiddleCard={staggerMiddleCard}
                autoPlayVideos={autoPlayVideos}
                loopVideos={loopVideos}
                reduceMotion={motionDisabled}
                cardEyebrowStyle={cardEyebrowStyle}
                cardTitleStyle={cardTitleStyle}
              />
            ))}
          </div>
        ) : null}

        {showInfoStrip ? (
          <motion.div
            initial={motionDisabled ? false : { opacity: 0, y: 24 }}
            whileInView={motionDisabled ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="ak-video-hero__infoStripWrap"
          >
            <div className="ak-video-hero__infoStrip">
              {infoCards.map((card) => {
                const surface =
                  card.styleType === "dark" ? infoDarkSurface : infoLightSurface;
                return (
                  <div
                    key={card.key}
                    className={`ak-video-hero__infoCard ak-video-hero__infoCard--${card.styleType}`}
                    style={{
                      backgroundColor: surface.backgroundColor || undefined,
                    }}
                  >
                    {card.iconType !== "none" ? (
                      <div
                        className="ak-video-hero__infoIconWrap"
                        aria-hidden
                        style={{ color: surface.color || undefined }}
                      >
                        <InfoIcon type={card.iconType} />
                      </div>
                    ) : null}
                    <div className="ak-video-hero__infoContent">
                      {card.title ? (
                        <p
                          className="ak-video-hero__infoTitle"
                          style={{
                            color: surface.color || undefined,
                          }}
                        >
                          {card.title}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
