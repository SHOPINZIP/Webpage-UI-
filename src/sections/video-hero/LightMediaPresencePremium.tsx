import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  LMP_EYEBROW_DEFAULT,
  LMP_HEADING_DEFAULT,
  LMP_INFO_DARK_SURFACE_DEFAULT,
  LMP_INFO_LIGHT_SURFACE_DEFAULT,
  LMP_SUBHEADING_DEFAULT,
  LMP_VIDEO_CARD_SUBTITLE_DEFAULT,
  LMP_VIDEO_CARD_TITLE_DEFAULT,
} from "../../shared/textStyleDefaults/lightMediaPresencePremiumTextStyleDefaults";
import type {
  LightMediaPresencePremiumProps,
  LightPremiumInfoCardBlock,
  LightPremiumInfoIconType,
  LightPremiumInfoStyleType,
  LightPremiumSectionPadding,
  LightPremiumVideoCardBlock,
  LightPremiumVideoIconType,
} from "./lightMediaPresencePremiumTypes";
import { InlineVideoMedia, useInlineVideoPlayback } from "./inlineVideoPlayback";

const VIDEO_CARD_TYPE = "video_card";
const INFO_CARD_TYPE = "info_card";
const easing = [0.22, 1, 0.36, 1] as const;

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function readNestedFields<T extends Record<string, unknown>>(
  block: Record<string, unknown>
): T {
  const nested =
    block.props && typeof block.props === "object"
      ? (block.props as Record<string, unknown>)
      : {};
  return { ...nested, ...block } as T;
}

function readVideoCard(block: LightPremiumVideoCardBlock) {
  const fields = readNestedFields<LightPremiumVideoCardBlock>(
    block as Record<string, unknown>
  );
  const iconRaw = safeText(fields.iconType).toLowerCase();
  const iconMap: Record<string, LightPremiumVideoIconType> = {
    podcast: "podcast",
    sparkles: "sparkles",
    newspaper: "newspaper",
    radio: "radio",
    clapperboard: "clapperboard",
    arrowupright: "arrowUpRight",
    badgecheck: "badgeCheck",
    shieldcheck: "shieldCheck",
    play: "play",
    none: "none",
  };
  const iconType = iconMap[iconRaw] || "none";
  return {
    id: safeText(block.id) || "",
    tag: safeText(fields.tag),
    title: safeText(fields.title),
    subtitle: safeText(fields.subtitle),
    videoUrl: normalizeImageUrl(safeText(fields.videoUrl)),
    posterImage: normalizeImageUrl(safeText(fields.posterImage)),
    iconType,
  };
}

function readInfoCard(block: LightPremiumInfoCardBlock) {
  const fields = readNestedFields<LightPremiumInfoCardBlock>(
    block as Record<string, unknown>
  );
  const iconRaw = safeText(fields.iconType).toLowerCase();
  const validIcons: LightPremiumInfoIconType[] = [
    "shieldCheck",
    "badgeCheck",
    "newspaper",
    "sparkles",
    "radio",
    "none",
  ];
  const iconType = validIcons.find((v) => v.toLowerCase() === iconRaw) || "none";
  const styleType: LightPremiumInfoStyleType =
    safeText(fields.styleType).toLowerCase() === "dark" ? "dark" : "light";
  return {
    id: safeText(block.id) || "",
    iconType,
    eyebrow: safeText(fields.eyebrow),
    title: safeText(fields.title),
    subtitle: safeText(fields.subtitle),
    styleType,
  };
}

function paddingClass(padding: LightPremiumSectionPadding | string | undefined): string {
  const value = safeText(padding).toLowerCase();
  if (value === "small") return "ak-lmp--pad-sm";
  if (value === "medium") return "ak-lmp--pad-md";
  return "ak-lmp--pad-lg";
}

function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlaySmallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M8 5.14v13.72L19 12 8 5.14z" fill="currentColor" />
    </svg>
  );
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
      />
      <path
        d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function NewspaperIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke="currentColor"
        strokeWidth="2"
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
      />
      <path
        d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19.1 4.9C23 8.8 23 15.1 19.1 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M7 17 17 7M7 7h10v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PodcastIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClapperboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m4 11 2.5-5 3 1.5L12 4l2.5 3.5L17.5 6 20 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoCardIcon({ type }: { type: LightPremiumVideoIconType }) {
  switch (type) {
    case "podcast":
      return <PodcastIcon className="ak-lmp__cardIconSvg" />;
    case "sparkles":
      return <SparklesIcon className="ak-lmp__cardIconSvg" />;
    case "newspaper":
      return <NewspaperIcon className="ak-lmp__cardIconSvg" />;
    case "radio":
      return <RadioIcon className="ak-lmp__cardIconSvg" />;
    case "clapperboard":
      return <ClapperboardIcon className="ak-lmp__cardIconSvg" />;
    case "arrowUpRight":
      return <ArrowUpRightIcon className="ak-lmp__cardIconSvg" />;
    case "badgeCheck":
      return <BadgeCheckIcon className="ak-lmp__cardIconSvg" />;
    case "shieldCheck":
      return <ShieldCheckIcon className="ak-lmp__cardIconSvg" />;
    case "play":
      return <PlaySmallIcon className="ak-lmp__cardIconSvg" />;
    default:
      return null;
  }
}

function InfoCardIcon({ type }: { type: LightPremiumInfoIconType }) {
  switch (type) {
    case "shieldCheck":
      return <ShieldCheckIcon className="ak-lmp__infoIconSvg" />;
    case "badgeCheck":
      return <BadgeCheckIcon className="ak-lmp__infoIconSvg" />;
    case "newspaper":
      return <NewspaperIcon className="ak-lmp__infoIconSvg" />;
    case "sparkles":
      return <SparklesIcon className="ak-lmp__infoIconSvg" />;
    case "radio":
      return <RadioIcon className="ak-lmp__infoIconSvg" />;
    default:
      return null;
  }
}

type VideoCardModel = ReturnType<typeof readVideoCard> & { key: string };

function VideoTile({
  card,
  index,
  featured,
  compact,
  autoPlayVideos,
  loopVideos,
  showVideoControls,
  reduceMotion,
  titleStyle,
  subtitleStyle,
}: {
  card: VideoCardModel;
  index: number;
  featured?: boolean;
  compact?: boolean;
  autoPlayVideos: boolean;
  loopVideos: boolean;
  showVideoControls: boolean;
  reduceMotion: boolean;
  titleStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
}) {
  const playback = useInlineVideoPlayback({
    videoUrl: card.videoUrl,
    autoPlay: autoPlayVideos,
    loop: loopVideos,
    mutedByDefault: true,
  });
  const hasVideo = Boolean(playback.source);
  const showAutoplayFallback =
    hasVideo && playback.autoplayBlocked && !playback.isPlaying;
  const showInlineControls = showVideoControls && hasVideo && !showAutoplayFallback;
  const showMuteControl = playback.hasStartedPlayback;
  const motionProps = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0, scale: 1 } }
    : {
        initial: { opacity: 0, y: 42, scale: 0.96 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-70px" },
        transition: { duration: 0.75, delay: index * 0.07, ease: easing },
      };

  const mediaClass = featured
    ? "ak-lmp__cardMedia ak-lmp__cardMedia--featured"
    : compact
      ? "ak-lmp__cardMedia ak-lmp__cardMedia--compact"
      : "ak-lmp__cardMedia";

  return (
    <motion.article
      {...motionProps}
      className={`ak-lmp__card${featured ? " ak-lmp__card--featured" : ""}`}
    >
      <div className={mediaClass}>
        <InlineVideoMedia
          controller={playback}
          videoClassName="ak-lmp__cardVideo"
          posterClassName="ak-lmp__cardPoster"
          placeholderClassName="ak-lmp__cardPlaceholder"
          posterUrl={card.posterImage}
          title={card.title}
        />

        <div className="ak-lmp__cardOverlay" aria-hidden />

        {(card.tag || card.iconType !== "none") ? (
          <div className="ak-lmp__cardTag">
            {card.iconType !== "none" ? <VideoCardIcon type={card.iconType} /> : null}
            {card.tag ? <span>{card.tag}</span> : null}
          </div>
        ) : null}

        {showInlineControls ? (
          <div className="ak-lmp__cardControls">
            <button
              type="button"
              className="ak-lmp__controlBtn"
              onClick={() => void playback.togglePlay()}
              aria-label={playback.isPlaying ? "Pause video" : "Play video"}
            >
              {playback.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            {showMuteControl ? (
              <button
                type="button"
                className="ak-lmp__controlBtn"
                onClick={playback.toggleMute}
                aria-label={playback.isMuted ? "Unmute video" : "Mute video"}
              >
                {playback.isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
            ) : null}
          </div>
        ) : null}

        {showAutoplayFallback ? (
          <button
            type="button"
            className="ak-lmp__autoplayFallback"
            onClick={() => void playback.retryPlayback()}
            aria-label="Tap to play video"
          >
            <PlayIcon />
          </button>
        ) : null}

        <div className="ak-lmp__cardBottom">
          {card.title ? (
            <h3
              className={`ak-lmp__cardTitle${featured ? " ak-lmp__cardTitle--featured" : ""}`}
              style={titleStyle}
            >
              {card.title}
            </h3>
          ) : null}
          {card.subtitle ? (
            <p className="ak-lmp__cardSubtitle" style={subtitleStyle}>
              {card.subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function LightMediaPresencePremium({
  section,
  appearance,
  theme,
}: LightMediaPresencePremiumProps) {
  const props = section.settings?.props ?? {};
  const rawBlocks = Array.isArray(section.settings?.blocks) ? section.settings.blocks : [];
  const reduceMotion = usePrefersReducedMotion();
  const framerReduceMotion = useReducedMotion();
  const motionDisabled = reduceMotion || Boolean(framerReduceMotion);

  const showEyebrow = props.showEyebrow !== false;
  const showSubheading = props.showSubheading !== false;
  const showBottomInfoStrip = props.showBottomInfoStrip !== false;
  const autoPlayVideos = props.autoPlayVideos !== false;
  const loopVideos = props.loopVideos !== false;
  const showVideoControls = props.showVideoControls !== false;

  const eyebrow = safeText(props.eyebrow);
  const heading = safeText(props.heading);
  const subheading = safeText(props.subheading);

  const videoCards = useMemo(() => {
    return rawBlocks
      .filter((block) => block && typeof block === "object")
      .filter((block) => safeText((block as { type?: string }).type) === VIDEO_CARD_TYPE)
      .map((block, index) => {
        const card = readVideoCard(block as LightPremiumVideoCardBlock);
        return { ...card, key: card.id || `video-card-${index + 1}` };
      });
  }, [rawBlocks]);

  const infoCards = useMemo(() => {
    return rawBlocks
      .filter((block) => block && typeof block === "object")
      .filter((block) => safeText((block as { type?: string }).type) === INFO_CARD_TYPE)
      .map((block, index) => {
        const card = readInfoCard(block as LightPremiumInfoCardBlock);
        return { ...card, key: card.id || `info-card-${index + 1}` };
      })
      .filter((card) => card.title || card.eyebrow || card.subtitle);
  }, [rawBlocks]);

  const showVideoGrid = videoCards.length > 0;
  const showInfoStrip = showBottomInfoStrip && infoCards.length > 0;
  const useMultiGrid = videoCards.length > 6;

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: LMP_EYEBROW_DEFAULT,
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
          defaultStyle: LMP_HEADING_DEFAULT,
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
          defaultStyle: LMP_SUBHEADING_DEFAULT,
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
          groupKey: "premiumVideoCardTitle",
          role: "heading",
          defaultStyle: LMP_VIDEO_CARD_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const cardSubtitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "premiumVideoCardSubtitle",
          role: "body",
          defaultStyle: LMP_VIDEO_CARD_SUBTITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const infoLightSurface = useMemo(
    () =>
      resolveBlockGroupSurfaceStyle({
        section,
        groupKey: "premiumInfoCardLight",
        defaultStyle: LMP_INFO_LIGHT_SURFACE_DEFAULT,
      }),
    [section]
  );

  const infoDarkSurface = useMemo(
    () =>
      resolveBlockGroupSurfaceStyle({
        section,
        groupKey: "premiumInfoCardDark",
        defaultStyle: LMP_INFO_DARK_SURFACE_DEFAULT,
      }),
    [section]
  );

  const tileProps = {
    autoPlayVideos,
    loopVideos,
    showVideoControls,
    reduceMotion: motionDisabled,
    titleStyle: cardTitleStyle,
    subtitleStyle: cardSubtitleStyle,
  };

  if (section.enabled === false) return null;

  const headerMotion = motionDisabled
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.75 },
      };

  const renderTile = (
    card: VideoCardModel,
    index: number,
    options: { featured?: boolean; compact?: boolean } = {}
  ) => (
    <VideoTile
      key={card.key}
      card={card}
      index={index}
      featured={options.featured}
      compact={options.compact}
      {...tileProps}
    />
  );

  return (
    <section
      className={`ak-lmp ${paddingClass(props.sectionPadding)}`}
      style={sectionAppearanceStyle(appearance)}
    >
      <div className="ak-lmp__inner">
        {(showEyebrow && eyebrow) || heading || (showSubheading && subheading) ? (
          <motion.header {...headerMotion} className="ak-lmp__header">
            {showEyebrow && eyebrow ? (
              <div className="ak-lmp__eyebrowPill" style={eyebrowStyle}>
                <RadioIcon className="ak-lmp__eyebrowIcon" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            {heading ? (
              <h2 className="ak-lmp__heading" style={headingStyle}>
                {heading}
              </h2>
            ) : null}
            {showSubheading && subheading ? (
              <p className="ak-lmp__subheading" style={subheadingStyle}>
                {subheading}
              </p>
            ) : null}
          </motion.header>
        ) : null}

        {showVideoGrid ? (
          useMultiGrid ? (
            <div className="ak-lmp__grid ak-lmp__grid--multi">
              {videoCards.map((card, index) => renderTile(card, index))}
            </div>
          ) : (
            <>
              <div className="ak-lmp__mobileStack">
                {renderTile(videoCards[0], 0, { featured: true })}
                {videoCards.length > 1 ? (
                  <div className="ak-lmp__mobileScroll">
                    {videoCards.slice(1).map((card, index) => (
                      <div key={card.key} className="ak-lmp__mobileScrollItem">
                        {renderTile(card, index + 1, { compact: true })}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="ak-lmp__desktopGrid">
                {renderTile(videoCards[0], 0, { featured: true })}
                {videoCards.slice(1).map((card, index) =>
                  renderTile(card, index + 1)
                )}
              </div>
            </>
          )
        ) : null}

        {showInfoStrip ? (
          <motion.div
            initial={motionDisabled ? false : { opacity: 0, y: 24 }}
            whileInView={motionDisabled ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="ak-lmp__infoStrip"
          >
            {infoCards.map((card) => {
              const surface =
                card.styleType === "dark" ? infoDarkSurface : infoLightSurface;
              return (
                <div
                  key={card.key}
                  className={`ak-lmp__infoCard ak-lmp__infoCard--${card.styleType}`}
                  style={{ backgroundColor: surface.backgroundColor || undefined }}
                >
                  {card.iconType !== "none" ? (
                    <div
                      className="ak-lmp__infoIconWrap"
                      style={{ color: surface.color || undefined }}
                      aria-hidden
                    >
                      <InfoCardIcon type={card.iconType} />
                    </div>
                  ) : null}
                  <div className="ak-lmp__infoContent">
                    {card.eyebrow ? (
                      <p className="ak-lmp__infoEyebrow" style={{ color: surface.color || undefined }}>
                        {card.eyebrow}
                      </p>
                    ) : null}
                    {card.title ? (
                      <p className="ak-lmp__infoTitle" style={{ color: surface.color || undefined }}>
                        {card.title}
                      </p>
                    ) : null}
                    {card.subtitle ? (
                      <p className="ak-lmp__infoSubtitle" style={{ color: surface.color || undefined }}>
                        {card.subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
