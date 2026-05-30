import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "../MessageStyleTestimonialsSection/hooks";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveBlockGroupTextStyle,
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import {
  BENEFITS_DESCRIPTION_DEFAULT,
  BENEFITS_EYEBROW_DEFAULT,
  BENEFITS_HEADING_DEFAULT,
  BENEFIT_DESCRIPTION_DEFAULT,
  BENEFIT_POINT_DEFAULT,
  BENEFIT_TITLE_DEFAULT,
} from "../../shared/textStyleDefaults/benefitsTextStyleDefaults";
import type {
  MinimalTimelineBenefitsProps,
  MinimalTimelineBenefitBlockProps,
} from "./types";

const easing = [0.22, 1, 0.36, 1] as const;

function safeText(v: unknown): string {
  return String(v ?? "").trim();
}

function collectPoints(props: MinimalTimelineBenefitBlockProps): string[] {
  return [props.point1, props.point2, props.point3]
    .map((p) => safeText(p))
    .filter(Boolean);
}

function Row({
  item,
  index,
  isLast,
  showActiveRailFill,
  reduceMotion,
  benefitTitleStyle,
  benefitDescriptionStyle,
  benefitPointStyle,
}: {
  item: MinimalTimelineBenefitBlockProps;
  index: number;
  isLast: boolean;
  showActiveRailFill: boolean;
  reduceMotion: boolean;
  benefitTitleStyle?: React.CSSProperties;
  benefitDescriptionStyle?: React.CSSProperties;
  benefitPointStyle?: React.CSSProperties;
}) {
  const title = safeText(item.title);
  const desc = safeText(item.desc);
  const points = collectPoints(item);

  const motionProps = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.45 },
        transition: { duration: 0.6, delay: index * 0.06, ease: easing },
      };

  return (
    <motion.div
      {...motionProps}
      className="ak-mt-benefits__row"
    >
      <div className="ak-mt-benefits__rail-wrap">
        <div className="ak-mt-benefits__rail-base" aria-hidden />
        {!isLast && showActiveRailFill && !reduceMotion ? (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easing }}
            className="ak-mt-benefits__rail-fill"
            aria-hidden
          />
        ) : null}
        {!isLast && showActiveRailFill && reduceMotion ? (
          <div className="ak-mt-benefits__rail-fill ak-mt-benefits__rail-fill--static" aria-hidden />
        ) : null}

        <motion.span
          {...(reduceMotion
            ? { initial: false as const, animate: { scale: 1, opacity: 1 } }
            : {
                initial: { scale: 0.85, opacity: 0 },
                whileInView: { scale: 1, opacity: 1 },
                viewport: { once: true },
                transition: { duration: 0.45, delay: index * 0.05, ease: easing },
              })}
          className="ak-mt-benefits__dot"
        >
          <span className="ak-mt-benefits__dot-inner" />
        </motion.span>
      </div>

      <div className="ak-mt-benefits__row-body">
        <div className="ak-mt-benefits__row-inner">
          {title ? (
            <h3 className="ak-mt-benefits__item-title" style={benefitTitleStyle}>
              {title}
            </h3>
          ) : null}

          {desc ? (
            <p className="ak-mt-benefits__item-desc" style={benefitDescriptionStyle}>
              {desc}
            </p>
          ) : null}

          {points.length > 0 ? (
            <div className="ak-mt-benefits__points">
              {points.map((p, i) => (
                <motion.div
                  key={`${index}-${p}-${i}`}
                  {...(reduceMotion
                    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
                    : {
                        initial: { opacity: 0, y: 6 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true },
                        transition: {
                          duration: 0.35,
                          delay: 0.12 + i * 0.05,
                          ease: easing,
                        },
                      })}
                  className="ak-mt-benefits__point"
                >
                  <span className="ak-mt-benefits__point-bullet" aria-hidden />
                  <span className="ak-mt-benefits__point-text" style={benefitPointStyle}>
                    {p}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function MinimalTimelineBenefits({
  section,
  appearance,
  theme,
}: MinimalTimelineBenefitsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const rawBlocks = section?.settings?.blocks;

  const eyebrow = safeText(props.eyebrow);
  const heading = safeText(props.heading);
  const description = safeText(props.description);
  const showActiveRailFill = props.showActiveRailFill !== false;

  const eyebrowStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveTextStyle({
          section,
          theme,
          fieldId: "eyebrow",
          role: "body",
          defaultStyle: BENEFITS_EYEBROW_DEFAULT,
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
          defaultStyle: BENEFITS_HEADING_DEFAULT,
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
          defaultStyle: BENEFITS_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  const benefitTitleStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "benefitTitle",
          role: "heading",
          defaultStyle: BENEFIT_TITLE_DEFAULT,
        })
      ),
    [section, theme]
  );

  const benefitDescriptionStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "benefitDescription",
          role: "body",
          defaultStyle: BENEFIT_DESCRIPTION_DEFAULT,
        })
      ),
    [section, theme]
  );

  const benefitPointStyle = useMemo(
    () =>
      resolvedTextStyleToInlineStyle(
        resolveBlockGroupTextStyle({
          section,
          theme,
          groupKey: "benefitPoint",
          role: "body",
          defaultStyle: BENEFIT_POINT_DEFAULT,
        })
      ),
    [section, theme]
  );

  const blocks = useMemo(() => (Array.isArray(rawBlocks) ? rawBlocks : []), [rawBlocks]);

  const headerMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: easing },
      };

  return (
    <section className="ak-mt-benefits" style={sectionAppearanceStyle(appearance)}>
      <div className="ak-mt-benefits__container">
        <motion.div {...headerMotion} className="ak-mt-benefits__header">
          {eyebrow ? (
            <div className="ak-mt-benefits__eyebrow" style={eyebrowStyle}>
              {eyebrow}
            </div>
          ) : null}

          {heading ? (
            <h2
              className="ak-mt-benefits__heading"
              style={{ ...headingStyle, whiteSpace: "pre-line" }}
            >
              {heading}
            </h2>
          ) : null}

          {description ? (
            <p
              className="ak-mt-benefits__sub"
              style={{ ...descriptionStyle, whiteSpace: "pre-line" }}
            >
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="ak-mt-benefits__timeline">
          {blocks.map((b, i) => (
            <Row
              key={b?.id || `benefit-${i}`}
              item={b?.props ?? {}}
              index={i}
              isLast={i === blocks.length - 1}
              showActiveRailFill={showActiveRailFill}
              reduceMotion={reduceMotion}
              benefitTitleStyle={benefitTitleStyle}
              benefitDescriptionStyle={benefitDescriptionStyle}
              benefitPointStyle={benefitPointStyle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
