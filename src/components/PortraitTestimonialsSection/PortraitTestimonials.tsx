import React, { useEffect, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";

type PortraitBlock = {
  id?: string;
  props?: { image?: string; alt?: string };
};

type Offset = { x: number; y: number };

const DESKTOP_POS = [
  { posClass: "ak-pt__p0", rotate: -5, delayMs: 0 },
  { posClass: "ak-pt__p1", rotate: 2, delayMs: 100 },
  { posClass: "ak-pt__p2", rotate: -3, delayMs: 220 },
  { posClass: "ak-pt__p3", rotate: 3, delayMs: 320 },
  { posClass: "ak-pt__p4", rotate: -2, delayMs: 420 },
  { posClass: "ak-pt__p5", rotate: 5, delayMs: 520 },
  { posClass: "ak-pt__p6", rotate: 4, delayMs: 620 },
  { posClass: "ak-pt__p7", rotate: -4, delayMs: 720 },
] as const;

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function computeMagneticOffset(
  pointerX: number,
  pointerY: number,
  centerX: number,
  centerY: number,
  radius = 220,
  maxPull = 14
): Offset {
  const dx = pointerX - centerX;
  const dy = pointerY - centerY;
  const distance = Math.hypot(dx, dy) || 1;
  if (distance > radius) return { x: 0, y: 0 };
  const strength = (1 - distance / radius) * maxPull;
  return { x: (dx / distance) * strength, y: (dy / distance) * strength };
}

function easeOffset(offset: Offset, factor = 0.84): Offset {
  const x = Math.abs(offset.x) < 0.12 ? 0 : offset.x * factor;
  const y = Math.abs(offset.y) < 0.12 ? 0 : offset.y * factor;
  return { x, y };
}

export default function PortraitTestimonials({
  section,
}: {
  section: { settings?: any };
}) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const eyebrow = safeText(props.eyebrow) || "TESTIMONIALS";
  const heading = safeText(props.heading) || "Trusted by leaders";
  const highlightText = safeText(props.highlightText) || "from various industries";
  const description =
    safeText(props.description) ||
    "Learn why professionals trust thoughtful digital experiences to elevate customer journeys.";
  const showButton = props.showButton !== false;
  const buttonText = safeText(props.buttonText) || "Read Success Stories";
  const buttonLink = safeText(props.buttonLink);
  const enableMagnetic = props.enableMagneticEffect !== false;

  const blocks: PortraitBlock[] = useMemo(() => {
    const raw = section?.settings?.blocks;
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, 8);
  }, [section?.settings?.blocks]);

  const [loaded, setLoaded] = useState(false);
  const [offsets, setOffsets] = useState<Record<number, Offset>>(() =>
    Object.fromEntries(DESKTOP_POS.map((_, i) => [i, { x: 0, y: 0 }]))
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const restFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;
    if (!enableMagnetic) return undefined;

    const stopRest = () => {
      if (restFrameRef.current !== null) {
        window.cancelAnimationFrame(restFrameRef.current);
        restFrameRef.current = null;
      }
    };

    const animateBack = () => {
      setOffsets((prev) => {
        const next: Record<number, Offset> = {};
        let moving = false;
        for (let i = 0; i < DESKTOP_POS.length; i += 1) {
          const eased = easeOffset(prev[i] ?? { x: 0, y: 0 });
          next[i] = eased;
          if (eased.x !== 0 || eased.y !== 0) moving = true;
        }
        if (moving) {
          restFrameRef.current = window.requestAnimationFrame(animateBack);
        } else {
          restFrameRef.current = null;
        }
        return next;
      });
    };

    const updateFromPointer = (clientX: number, clientY: number) => {
      setOffsets(() => {
        const next: Record<number, Offset> = {};
        for (let i = 0; i < DESKTOP_POS.length; i += 1) {
          const el = cardRefs.current[i];
          if (!el) {
            next[i] = { x: 0, y: 0 };
            continue;
          }
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          next[i] = computeMagneticOffset(clientX, clientY, cx, cy);
        }
        return next;
      });
    };

    const onMove = (e: PointerEvent) => {
      stopRest();
      updateFromPointer(e.clientX, e.clientY);
    };

    const onLeave = () => {
      stopRest();
      restFrameRef.current = window.requestAnimationFrame(animateBack);
    };

    sectionEl.addEventListener("pointermove", onMove);
    sectionEl.addEventListener("pointerleave", onLeave);
    return () => {
      sectionEl.removeEventListener("pointermove", onMove);
      sectionEl.removeEventListener("pointerleave", onLeave);
      stopRest();
    };
  }, [enableMagnetic, reduceMotion]);

  return (
    <section ref={sectionRef} className="ak-pt" aria-label={heading}>
      <div className="ak-pt__container">
        <div className="ak-pt__desktop">
          {DESKTOP_POS.map((pos, index) => {
            const p = blocks[index]?.props ?? {};
            const img = safeText(p.image);
            const alt = safeText(p.alt) || "Testimonial portrait";
            const magnetic = offsets[index] ?? { x: 0, y: 0 };

            return (
              <div
                key={index}
                className={`ak-pt__portrait ${pos.posClass}`}
                style={{
                  transition:
                    "transform 1400ms cubic-bezier(0.22,1,0.36,1), opacity 1200ms cubic-bezier(0.22,1,0.36,1), filter 1400ms cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${pos.delayMs}ms`,
                  opacity: loaded ? 1 : 0,
                  filter: loaded ? "blur(0px)" : "blur(10px)",
                  transform: loaded
                    ? "translate3d(0px, 0px, 0px) scale(1)"
                    : "translate3d(0px, 48px, 0px) scale(0.9)",
                }}
              >
                <div
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="ak-pt__card"
                  style={{
                    transform: `translate3d(${magnetic.x}px, ${magnetic.y}px, 0) rotate(${pos.rotate}deg)`,
                    transition:
                      "transform 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms cubic-bezier(0.22,1,0.36,1)",
                    boxShadow:
                      magnetic.x !== 0 || magnetic.y !== 0
                        ? "0 34px 84px rgba(0,0,0,0.1)"
                        : "0 26px 70px rgba(0,0,0,0.08)",
                    willChange: "transform",
                  }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={alt}
                      className="ak-pt__img"
                      style={{
                        transform: loaded ? "scale(1)" : "scale(1.08)",
                        transitionDelay: `${pos.delayMs + 60}ms`,
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="ak-pt__img ak-pt__img--fallback" aria-hidden />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="ak-pt__mobile">
          {blocks.slice(0, 8).map((b, index) => {
            const p = b?.props ?? {};
            const img = safeText(p.image);
            const alt = safeText(p.alt) || "Testimonial portrait";
            const settledY = index % 2 === 0 ? 16 : -4;
            const startY = index % 2 === 0 ? 36 : 12;

            return (
              <div
                key={`m-${index}`}
                className={`ak-pt__mcard ${index % 2 === 0 ? "ak-pt__mcard--down" : "ak-pt__mcard--up"}`}
                style={{
                  transitionDelay: `${DESKTOP_POS[index]?.delayMs ?? 0}ms`,
                  transform: loaded
                    ? `translateY(${settledY}px) scale(1)`
                    : `translateY(${startY}px) scale(0.92)`,
                  opacity: loaded ? 1 : 0,
                  filter: loaded ? "blur(0px)" : "blur(4px)",
                }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={alt}
                    className="ak-pt__mimg"
                    style={{
                      transform: loaded ? "scale(1)" : "scale(1.06)",
                      transitionDelay: `${(DESKTOP_POS[index]?.delayMs ?? 0) + 60}ms`,
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div className="ak-pt__mimg ak-pt__mimg--fallback" aria-hidden />
                )}
              </div>
            );
          })}
        </div>

        <div className="ak-pt__center">
          <div
            className="ak-pt__eyebrow"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {eyebrow}
          </div>

          <h2
            className="ak-pt__heading"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {heading}
            <br />
            <span className="ak-pt__highlight">{highlightText}</span>
          </h2>

          <p
            className="ak-pt__desc"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
            }}
          >
            {description}
          </p>

          {showButton ? (
            buttonLink ? (
              <a
                className="ak-pt__btn"
                href={buttonLink}
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(24px)",
                }}
              >
                {buttonText} <span aria-hidden>→</span>
              </a>
            ) : (
              <button
                className="ak-pt__btn"
                type="button"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(24px)",
                }}
              >
                {buttonText} <span aria-hidden>→</span>
              </button>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}

