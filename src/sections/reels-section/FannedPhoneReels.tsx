import React, { useEffect, useMemo, useRef, useState } from "react";

import { normalizeImageUrl } from "../../components/HeroSection/heroSectionUtils";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  REELS_ACTIVE_TITLE_DEFAULT,
  REEL_CARD_KICKER_DEFAULT,
  REEL_CARD_SUBTITLE_DEFAULT,
  REEL_CARD_TITLE_DEFAULT,
  REELS_DESCRIPTION_DEFAULT,
  REELS_HEADING_DEFAULT,
  REELS_KICKER_DEFAULT,
} from "../../shared/textStyleDefaults/reelsSectionTextStyleDefaults";
import { resolveInlineVideoSource } from "../video-hero/inlineVideoPlayback";
import type { FannedPhoneReelsProps, ReelItemBlock, ReelsSectionPadding } from "./types";

type ReelModel = {
  id: string;
  key: string;
  kicker: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  posterImage: string;
  source: ReturnType<typeof resolveInlineVideoSource>;
};

const DEFAULT_SECTION_COPY = {
  kicker: "Behind the craft",
  heading: "Watch the evening come together.",
  description:
    "A few seconds inside our kitchen - the prep, the fire, the finish. Each reel plays through, then hands off to the next.",
};

const DEFAULT_REEL_BLOCKS: ReelItemBlock[] = [
  {
    id: "reel-default-1",
    type: "reel_item",
    kicker: "The pass",
    title: "Plating the evening special",
    subtitle: "Chef Aarav - head chef",
    videoUrl: "https://videos.pexels.com/video-files/4253333/4253333-sd_506_960_25fps.mp4",
    posterImage:
      "https://images.pexels.com/videos/4253333/pexels-photo-4253333.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "reel-default-2",
    type: "reel_item",
    kicker: "The tandoor",
    title: "Straight from the clay oven",
    subtitle: "Tandoor station",
    videoUrl: "https://videos.pexels.com/video-files/8626672/8626672-sd_640_360_25fps.mp4",
    posterImage:
      "https://images.pexels.com/videos/8626672/pexels-photo-8626672.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "reel-default-3",
    type: "reel_item",
    kicker: "Mise en place",
    title: "Morning prep, all by hand",
    subtitle: "The kitchen, 7am",
    videoUrl: "https://videos.pexels.com/video-files/8094293/8094293-sd_640_360_25fps.mp4",
    posterImage:
      "https://images.pexels.com/videos/8094293/adult-analogue-asian-bamboo-8094293.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "reel-default-4",
    type: "reel_item",
    kicker: "The garnish",
    title: "The last finishing touch",
    subtitle: "Chef Aarav",
    videoUrl: "https://videos.pexels.com/video-files/8626672/8626672-sd_640_360_25fps.mp4",
    posterImage:
      "https://images.pexels.com/videos/8626672/pexels-photo-8626672.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "reel-default-5",
    type: "reel_item",
    kicker: "The first pour",
    title: "Pouring the house chai",
    subtitle: "The counter",
    videoUrl: "https://videos.pexels.com/video-files/8094293/8094293-sd_640_360_25fps.mp4",
    posterImage:
      "https://images.pexels.com/videos/8094293/adult-analogue-asian-bamboo-8094293.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function readTextWithDefault(value: unknown, fallback: string): string {
  return value == null ? fallback : safeText(value);
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

function readReelBlock(block: ReelItemBlock, index: number): ReelModel {
  const fields = readNestedFields<ReelItemBlock>(block as Record<string, unknown>);
  const videoUrl = normalizeImageUrl(safeText(fields.videoUrl));
  const posterImage = normalizeImageUrl(safeText(fields.posterImage));
  return {
    id: safeText(block.id) || `reel-${index + 1}`,
    key: safeText(block.id) || `reel-${index + 1}`,
    kicker: safeText(fields.kicker),
    title: safeText(fields.title),
    subtitle: safeText(fields.subtitle),
    videoUrl,
    posterImage,
    source: resolveInlineVideoSource(videoUrl),
  };
}

function paddingClass(padding: ReelsSectionPadding | string | undefined): string {
  const value = safeText(padding).toLowerCase();
  if (value === "small") return "ak-fpr--pad-sm";
  if (value === "medium") return "ak-fpr--pad-md";
  return "ak-fpr--pad-lg";
}

function applyInlineVideoAttributes(
  video: HTMLVideoElement,
  muted: boolean,
  preload: "metadata" | "auto"
) {
  video.defaultMuted = muted;
  video.muted = muted;
  video.playsInline = true;
  video.preload = preload;
  video.controls = false;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  if (muted) {
    video.setAttribute("muted", "");
  } else {
    video.removeAttribute("muted");
  }
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="1.9" />
      <line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="1.9" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline
        points="15 18 9 12 15 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline
        points="9 18 15 12 9 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FannedPhoneReels({
  section,
  appearance,
  theme,
}: FannedPhoneReelsProps) {
  const props = section.settings?.props ?? {};
  const rawBlocks = Array.isArray(section.settings?.blocks)
    ? section.settings.blocks
    : DEFAULT_REEL_BLOCKS;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const lastAutoplayAttemptRef = useRef("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(props.mutedByDefault !== false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [brokenVideoIds, setBrokenVideoIds] = useState<Record<string, true>>({});

  const reels = useMemo(() => {
    return rawBlocks
      .filter((block) => block && typeof block === "object")
      .map((block, index) => readReelBlock(block as ReelItemBlock, index));
  }, [rawBlocks]);

  const reelCount = reels.length;
  const hasReels = reelCount > 0;
  const isMobile = viewportWidth < 760;
  const shouldPlay = props.autoplayOnScroll !== false ? isInView : true;

  useEffect(() => {
    setIsMuted(props.mutedByDefault !== false);
  }, [props.mutedByDefault]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!hasReels) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((current) => (current >= reelCount ? 0 : current));
  }, [hasReels, reelCount]);

  useEffect(() => {
    setProgress(0);
    setHasStartedPlayback(false);
    setAutoplayBlocked(false);
  }, [activeIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !hasReels || props.autoplayOnScroll === false) {
      setIsInView(props.autoplayOnScroll === false);
      return undefined;
    }

    if (typeof IntersectionObserver !== "function") {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(Boolean(entry?.isIntersecting) && (entry?.intersectionRatio ?? 0) >= 0.4);
      },
      {
        threshold: [0, 0.25, 0.4, 0.6, 0.85],
      }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [hasReels, props.autoplayOnScroll]);

  const activeReel = hasReels ? reels[activeIndex] : null;
  const activeVideoBroken = activeReel ? Boolean(brokenVideoIds[activeReel.key]) : false;
  const activeHasVideo = Boolean(activeReel?.source) && !activeVideoBroken;
  const kickerText = readTextWithDefault(props.kicker, DEFAULT_SECTION_COPY.kicker);
  const headingText = readTextWithDefault(props.heading, DEFAULT_SECTION_COPY.heading);
  const descriptionText = readTextWithDefault(
    props.description,
    DEFAULT_SECTION_COPY.description
  );
  const cardBackgroundColor = safeText(props.cardBackgroundColor);

  const tryPlayVideoAt = async (index: number, userInitiated = false) => {
    const video = videoRefs.current[index];
    const reel = reels[index];
    const reelIsBroken = reel ? Boolean(brokenVideoIds[reel.key]) : true;
    if (!video || !reel?.source || reelIsBroken) return false;

    applyInlineVideoAttributes(video, isMuted, index === activeIndex ? "auto" : "metadata");

    try {
      const playResult = video.play();
      if (playResult && typeof playResult.then === "function") {
        await playResult;
      }
      if (index === activeIndex) {
        setAutoplayBlocked(false);
        setHasStartedPlayback(true);
      }
      return true;
    } catch {
      if (index === activeIndex && !userInitiated) {
        setAutoplayBlocked(true);
      }
      return false;
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const reel = reels[index];
      const reelIsBroken = reel ? Boolean(brokenVideoIds[reel.key]) : true;
      const isActive = index === activeIndex;

      applyInlineVideoAttributes(video, isMuted, isActive ? "auto" : "metadata");

      if (!isActive || !shouldPlay || !reel?.source || reelIsBroken) {
        video.pause();
        if (!isActive) {
          try {
            video.currentTime = 0;
          } catch {
            // Ignore browser reset errors for unloaded media.
          }
        }
      }
    });
  }, [activeIndex, brokenVideoIds, isMuted, reels, shouldPlay]);

  useEffect(() => {
    if (!activeHasVideo || !shouldPlay || !activeReel?.source) return;
    const attemptKey = `${activeIndex}:${activeReel.source.src}:${shouldPlay ? "play" : "stop"}`;
    if (lastAutoplayAttemptRef.current === attemptKey) return;
    lastAutoplayAttemptRef.current = attemptKey;
    void tryPlayVideoAt(activeIndex);
  }, [activeHasVideo, activeIndex, activeReel, shouldPlay]);

  const geometry = useMemo(() => {
    const phoneWidth = isMobile ? Math.min(248, Math.round(viewportWidth * 0.62)) : 300;
    const phoneHeight = Math.round((phoneWidth * 16) / 9);
    const stageHeight = phoneHeight + (isMobile ? 16 : 44);
    const step = isMobile ? phoneWidth * 0.46 : phoneWidth * 0.62;
    const total = reelCount;

    const items = reels.map((reel, index) => {
      let offset = index - activeIndex;

      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const absoluteOffset = Math.abs(offset);
      const isActive = absoluteOffset === 0;
      const preload: "auto" | "metadata" = isActive ? "auto" : "metadata";
      let scale = 1;
      let opacity = 1;
      let brightness = 1;
      let zIndex = 30;
      let visible = true;

      if (absoluteOffset === 1) {
        scale = isMobile ? 0.78 : 0.84;
        opacity = 0.96;
        brightness = 0.6;
        zIndex = 20;
      } else if (absoluteOffset >= 2) {
        scale = 0.66;
        opacity = isMobile ? 0 : 0.5;
        brightness = 0.42;
        zIndex = 10;
        if (isMobile) visible = false;
      }

      const translateX = offset * step;
      return {
        ...reel,
        index,
        isActive,
        preload,
        hasVideo: Boolean(reel.source) && !brokenVideoIds[reel.key],
        style: {
          width: `${phoneWidth}px`,
          height: `${phoneHeight}px`,
          transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
          opacity: visible ? opacity : 0,
          zIndex,
          filter: `brightness(${brightness})`,
          pointerEvents: visible ? "auto" : "none",
          cursor: isActive ? "default" : "pointer",
          boxShadow: isActive
            ? "0 34px 70px rgba(5, 29, 48, 0.34)"
            : "0 14px 34px rgba(5, 29, 48, 0.18)",
        } as React.CSSProperties,
      };
    });

    return { items, stageHeight };
  }, [activeIndex, brokenVideoIds, isMobile, reelCount, reels, viewportWidth]);

  const nextReel = () => {
    if (!hasReels) return;
    setActiveIndex((current) => (current + 1) % reelCount);
    setProgress(0);
  };

  const prevReel = () => {
    if (!hasReels) return;
    setActiveIndex((current) => (current + reelCount - 1) % reelCount);
    setProgress(0);
  };

  const kickerStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "kicker",
          role: "body",
          defaultStyle: REELS_KICKER_DEFAULT,
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
          defaultStyle: REELS_HEADING_DEFAULT,
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
          defaultStyle: REELS_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  const activeTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "heading",
          role: "heading",
          defaultStyle: REELS_ACTIVE_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const reelKickerStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "reelKicker",
          role: "body",
          defaultStyle: REEL_CARD_KICKER_DEFAULT,
        })
      ),
    [section, theme]
  );

  const reelTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "reelTitle",
          role: "heading",
          defaultStyle: REEL_CARD_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const reelSubtitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "reelSubtitle",
          role: "body",
          defaultStyle: REEL_CARD_SUBTITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const accentColor = safeText(kickerStyle.color) || "#f71c5b";
  const sectionStyle = {
    ...sectionAppearanceStyle(appearance),
    "--ak-fpr-accent": accentColor,
  } as React.CSSProperties;
  const cardStyle = cardBackgroundColor
    ? ({ backgroundColor: cardBackgroundColor } as React.CSSProperties)
    : undefined;

  if (section.enabled === false) return null;

  return (
    <section className={`ak-fpr ${paddingClass(props.sectionPadding)}`} style={sectionStyle}>
      <div className="ak-fpr__shell">
        <div className="ak-fpr__card" style={cardStyle}>
          {(kickerText || headingText || descriptionText) && (
            <div className="ak-fpr__header">
              {kickerText ? (
                <p className="ak-fpr__kicker" style={kickerStyle}>
                  {kickerText}
                </p>
              ) : null}
              {headingText ? (
                <h2 className="ak-fpr__heading" style={headingStyle}>
                  {headingText}
                </h2>
              ) : null}
              {descriptionText ? (
                <p className="ak-fpr__description" style={descriptionStyle}>
                  {descriptionText}
                </p>
              ) : null}
            </div>
          )}

          {hasReels ? (
            <>
              <div
                ref={stageRef}
                className="ak-fpr__stage"
                style={{ height: `${geometry.stageHeight}px` }}
              >
                {geometry.items.map((reel) => {
                  const videoVisible =
                    reel.isActive && reel.hasVideo && shouldPlay && hasStartedPlayback && !autoplayBlocked;

                  return (
                    <article
                      key={reel.key}
                      className="ak-fpr__phone"
                      style={reel.style}
                      onClick={() => {
                        if (!reel.isActive) {
                          setActiveIndex(reel.index);
                          setProgress(0);
                          return;
                        }

                        if (reel.hasVideo && (!videoVisible || autoplayBlocked)) {
                          void tryPlayVideoAt(reel.index, true);
                        }
                      }}
                    >
                      <div className="ak-fpr__phoneInner">
                        {reel.posterImage ? (
                          <img
                            src={reel.posterImage}
                            alt=""
                            className="ak-fpr__media ak-fpr__poster"
                            loading={reel.isActive ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                          />
                        ) : null}

                        {reel.hasVideo ? (
                          <video
                            ref={(node) => {
                              videoRefs.current[reel.index] = node;
                              if (node) {
                                applyInlineVideoAttributes(node, isMuted, reel.preload);
                              }
                            }}
                            src={reel.source?.src}
                            poster={reel.posterImage || undefined}
                            autoPlay={reel.isActive && shouldPlay}
                            muted={isMuted}
                            playsInline
                            preload={reel.preload}
                            className="ak-fpr__media ak-fpr__video"
                            style={{ opacity: videoVisible ? 1 : 0 }}
                            onPlay={() => {
                              if (reel.index !== activeIndex) return;
                              setHasStartedPlayback(true);
                              setAutoplayBlocked(false);
                            }}
                            onPlaying={() => {
                              if (reel.index !== activeIndex) return;
                              setHasStartedPlayback(true);
                              setAutoplayBlocked(false);
                            }}
                            onPause={() => {
                              if (reel.index !== activeIndex) return;
                              if (!shouldPlay) return;
                              setHasStartedPlayback(false);
                            }}
                            onEnded={() => {
                              if (reel.index !== activeIndex) return;
                              if (reelCount > 1 && props.autoAdvanceOnEnd !== false) {
                                nextReel();
                              }
                            }}
                            onError={() => {
                              setBrokenVideoIds((current) => ({
                                ...current,
                                [reel.key]: true,
                              }));
                              if (reel.index === activeIndex && reelCount > 1 && props.autoAdvanceOnEnd !== false) {
                                window.setTimeout(nextReel, 400);
                              }
                            }}
                            onTimeUpdate={(event) => {
                              if (reel.index !== activeIndex) return;
                              const video = event.currentTarget;
                              const nextProgress =
                                video.duration > 0
                                  ? Math.min(100, (video.currentTime / video.duration) * 100)
                                  : 0;
                              setProgress(nextProgress);
                            }}
                          />
                        ) : null}

                        {!reel.hasVideo && !reel.posterImage ? (
                          <div className="ak-fpr__placeholder" aria-hidden>
                            <span>{reel.title || "Reel preview"}</span>
                          </div>
                        ) : null}

                        {reel.isActive ? (
                          <div className="ak-fpr__overlay">
                            {props.showProgress !== false ? (
                              <div className="ak-fpr__progressTrack">
                                <div
                                  className="ak-fpr__progressFill"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            ) : null}

                            {props.showMuteButton !== false ? (
                              <button
                                type="button"
                                className="ak-fpr__muteButton"
                                aria-label="Toggle sound"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  const video = videoRefs.current[reel.index];
                                  const nextMuted = !isMuted;
                                  setIsMuted(nextMuted);
                                  if (video) {
                                    applyInlineVideoAttributes(video, nextMuted, "auto");
                                  }
                                }}
                                disabled={!reel.hasVideo}
                              >
                                {isMuted ? <MutedIcon /> : <SoundIcon />}
                              </button>
                            ) : null}

                            <div className="ak-fpr__caption">
                              {reel.kicker ? (
                                <p className="ak-fpr__captionKicker" style={reelKickerStyle}>
                                  {reel.kicker}
                                </p>
                              ) : null}
                              {reel.title ? (
                                <p className="ak-fpr__captionTitle" style={reelTitleStyle}>
                                  {reel.title}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="ak-fpr__controls">
                {props.showActiveText !== false && activeReel ? (
                  <div className="ak-fpr__activeText">
                    {activeReel.kicker ? (
                      <p className="ak-fpr__activeKicker" style={kickerStyle}>
                        {activeReel.kicker}
                      </p>
                    ) : null}
                    {activeReel.title ? (
                      <p className="ak-fpr__activeTitle" style={activeTitleStyle}>
                        {activeReel.title}
                      </p>
                    ) : null}
                    {activeReel.subtitle ? (
                      <p className="ak-fpr__activeWho" style={reelSubtitleStyle}>
                        {activeReel.subtitle}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {(props.showNavigation !== false && reelCount > 1) || (props.showDots !== false && reelCount > 1) ? (
                  <div className="ak-fpr__nav">
                    {props.showNavigation !== false && reelCount > 1 ? (
                      <button
                        type="button"
                        className="ak-fpr__arrow"
                        aria-label="Previous reel"
                        onClick={prevReel}
                      >
                        <ChevronLeftIcon />
                      </button>
                    ) : null}

                    {props.showDots !== false && reelCount > 1 ? (
                      <div className="ak-fpr__dots">
                        {reels.map((reel, index) => (
                          <button
                            key={`${reel.key}-dot`}
                            type="button"
                            className="ak-fpr__dot"
                            aria-label={`Go to reel ${index + 1}`}
                            onClick={() => {
                              setActiveIndex(index);
                              setProgress(0);
                            }}
                            style={{
                              width: index === activeIndex ? "26px" : "8px",
                              background:
                                index === activeIndex
                                  ? "var(--ak-fpr-accent, #f71c5b)"
                                  : "rgba(5, 29, 48, 0.18)",
                            }}
                          />
                        ))}
                      </div>
                    ) : null}

                    {props.showNavigation !== false && reelCount > 1 ? (
                      <button
                        type="button"
                        className="ak-fpr__arrow"
                        aria-label="Next reel"
                        onClick={nextReel}
                      >
                        <ChevronRightIcon />
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
