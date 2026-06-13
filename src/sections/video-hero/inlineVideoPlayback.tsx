import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const IOS_SAFE_VIDEO_EXTENSIONS = new Set(["mp4", "m4v", "mov"]);
const KNOWN_UNSUPPORTED_VIDEO_EXTENSIONS = new Set([
  "avi",
  "flv",
  "mkv",
  "ogg",
  "ogv",
  "webm",
  "wmv",
]);

export type InlineVideoSource = {
  src: string;
  type: "video/mp4";
};

type PlaybackAttemptOptions = {
  forceMuted?: boolean;
  userInitiated?: boolean;
};

export type InlineVideoPlaybackController = {
  autoplayBlocked: boolean;
  canRenderVideo: boolean;
  hasError: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isReady: boolean;
  loop: boolean;
  mutedByDefault: boolean;
  preload: "metadata";
  retryPlayback: () => Promise<boolean>;
  source: InlineVideoSource | null;
  toggleMute: () => void;
  togglePlay: () => Promise<void>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  videoEventHandlers: {
    onCanPlay: () => void;
    onError: () => void;
    onLoadedMetadata: () => void;
    onPause: () => void;
    onPlay: () => void;
    onVolumeChange: () => void;
  };
};

type UseInlineVideoPlaybackOptions = {
  autoPlay: boolean;
  loop: boolean;
  mutedByDefault?: boolean;
  videoUrl?: string | null;
};

type InlineVideoMediaProps = {
  controller: InlineVideoPlaybackController;
  placeholderClassName: string;
  posterClassName: string;
  posterUrl?: string | null;
  title?: string;
  videoClassName: string;
};

function extractVideoExtension(url: string): string {
  const sanitized = url.split("#")[0]?.split("?")[0] ?? "";
  const lastSegment = sanitized.split("/").pop() ?? "";
  const match = /\.([a-z0-9]+)$/i.exec(lastSegment);
  return match ? match[1].toLowerCase() : "";
}

export function resolveInlineVideoSource(
  videoUrl?: string | null
): InlineVideoSource | null {
  const src = String(videoUrl ?? "").trim();
  if (!src) return null;

  const extension = extractVideoExtension(src);
  if (extension && KNOWN_UNSUPPORTED_VIDEO_EXTENSIONS.has(extension)) {
    return null;
  }

  if (!extension || IOS_SAFE_VIDEO_EXTENSIONS.has(extension)) {
    return { src, type: "video/mp4" };
  }

  return { src, type: "video/mp4" };
}

function applyInlineVideoAttributes(
  video: HTMLVideoElement,
  muted: boolean,
  loop: boolean
) {
  video.defaultMuted = muted;
  video.muted = muted;
  video.loop = loop;
  video.playsInline = true;
  video.preload = "metadata";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  if (muted) {
    video.setAttribute("muted", "");
  } else {
    video.removeAttribute("muted");
  }
}

export function useInlineVideoPlayback({
  videoUrl,
  autoPlay,
  loop,
  mutedByDefault = true,
}: UseInlineVideoPlaybackOptions): InlineVideoPlaybackController {
  const source = useMemo(() => resolveInlineVideoSource(videoUrl), [videoUrl]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoplayAttemptedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(Boolean(mutedByDefault));
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const canRenderVideo = Boolean(source) && !hasError;

  useEffect(() => {
    autoplayAttemptedRef.current = false;
    setIsReady(false);
    setIsPlaying(false);
    setIsMuted(Boolean(mutedByDefault));
    setAutoplayBlocked(false);
    setHasError(false);
  }, [mutedByDefault, source?.src]);

  const syncMutedState = useCallback(
    (nextMuted: boolean) => {
      const video = videoRef.current;
      if (video) {
        applyInlineVideoAttributes(video, nextMuted, loop);
      }
      setIsMuted(nextMuted);
    },
    [loop]
  );

  const attemptPlayback = useCallback(
    async ({ forceMuted = false, userInitiated = false }: PlaybackAttemptOptions = {}) => {
      const video = videoRef.current;
      if (!video || !source || hasError) return false;

      const nextMuted = forceMuted ? true : video.muted;
      applyInlineVideoAttributes(video, nextMuted, loop);
      if (forceMuted || nextMuted !== isMuted) {
        setIsMuted(nextMuted);
      }

      try {
        const playResult = video.play();
        if (playResult && typeof playResult.then === "function") {
          await playResult;
        }
        setAutoplayBlocked(false);
        setHasError(false);
        return true;
      } catch {
        if (!userInitiated) {
          setAutoplayBlocked(true);
        }
        setIsPlaying(!video.paused);
        return false;
      }
    },
    [hasError, isMuted, loop, source]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source || hasError) return;

    applyInlineVideoAttributes(video, mutedByDefault, loop);

    if (!autoPlay) {
      video.pause();
      return;
    }

    const tryAutoplay = () => {
      if (autoplayAttemptedRef.current) return;
      if (video.readyState < 1) return;
      autoplayAttemptedRef.current = true;
      void attemptPlayback({ forceMuted: true });
    };

    if (video.readyState >= 1) {
      tryAutoplay();
      return;
    }

    video.addEventListener("loadedmetadata", tryAutoplay);
    video.addEventListener("canplay", tryAutoplay);

    return () => {
      video.removeEventListener("loadedmetadata", tryAutoplay);
      video.removeEventListener("canplay", tryAutoplay);
    };
  }, [attemptPlayback, autoPlay, hasError, loop, mutedByDefault, source]);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !source || hasError) return;

    if (video.paused || video.ended) {
      await attemptPlayback({ userInitiated: true });
      return;
    }

    video.pause();
  }, [attemptPlayback, hasError, source]);

  const retryPlayback = useCallback(async () => {
    return attemptPlayback({ userInitiated: true });
  }, [attemptPlayback]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video || !source || hasError) return;
    syncMutedState(!video.muted);
  }, [hasError, source, syncMutedState]);

  const videoEventHandlers = useMemo(
    () => ({
      onPlay: () => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      },
      onPause: () => {
        setIsPlaying(false);
      },
      onVolumeChange: () => {
        const video = videoRef.current;
        if (!video) return;
        setIsMuted(video.muted || video.volume === 0);
      },
      onLoadedMetadata: () => {
        setIsReady(true);
      },
      onCanPlay: () => {
        setIsReady(true);
      },
      onError: () => {
        setHasError(true);
        setIsReady(false);
        setIsPlaying(false);
        setAutoplayBlocked(false);
      },
    }),
    []
  );

  return {
    autoplayBlocked,
    canRenderVideo,
    hasError,
    isMuted,
    isPlaying,
    isReady,
    loop,
    mutedByDefault,
    preload: "metadata",
    retryPlayback,
    source,
    toggleMute,
    togglePlay,
    videoEventHandlers,
    videoRef,
  };
}

export function InlineVideoMedia({
  controller,
  placeholderClassName,
  posterClassName,
  posterUrl,
  title,
  videoClassName,
}: InlineVideoMediaProps) {
  if (controller.canRenderVideo && controller.source) {
    return (
      <video
        key={controller.source.src}
        ref={controller.videoRef}
        className={videoClassName}
        poster={posterUrl || undefined}
        muted={controller.isMuted}
        defaultMuted={controller.mutedByDefault}
        loop={controller.loop}
        playsInline
        preload={controller.preload}
        onPlay={controller.videoEventHandlers.onPlay}
        onPause={controller.videoEventHandlers.onPause}
        onVolumeChange={controller.videoEventHandlers.onVolumeChange}
        onLoadedMetadata={controller.videoEventHandlers.onLoadedMetadata}
        onCanPlay={controller.videoEventHandlers.onCanPlay}
        onError={controller.videoEventHandlers.onError}
      >
        <source src={controller.source.src} type={controller.source.type} />
      </video>
    );
  }

  if (posterUrl) {
    return (
      <img
        className={posterClassName}
        src={posterUrl}
        alt={title || "Video poster"}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return <div className={placeholderClassName} aria-hidden />;
}
