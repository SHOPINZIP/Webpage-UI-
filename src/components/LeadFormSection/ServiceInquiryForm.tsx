import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sectionAppearanceStyle } from "../../shared/sectionAppearance";
import {
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../shared/sectionTypography";
import StorefrontImage from "../../shared/StorefrontImage";
import { useDynamicFormBuilderState } from "../../shared/formBuilder/useDynamicFormBuilderState";
import type { ServiceInquiryFormProps, ShowcaseItemBlockProps } from "./types";
import StandardFieldsLayout from "./variants/StandardFieldsLayout";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function paddingClass(value: unknown): string {
  const raw = safeText(value).toLowerCase();
  if (raw === "small") return "ak-lead-form--pad-sm";
  if (raw === "medium") return "ak-lead-form--pad-md";
  return "ak-lead-form--pad-lg";
}

function clampRotationDuration(value: unknown): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 3500;
  return Math.min(20000, Math.max(1500, Math.round(numeric)));
}

/**
 * `resolveTextStyle` always resolves a `fontSize` (falling back to the global
 * system default, e.g. 18px for body text) — as an inline style that would
 * override this component's own CSS sizing (11px eyebrow pills, responsive
 * clamp() heading). Only color/fontWeight/fontFamily should be theme-driven
 * here; size stays owned by index.scss.
 */
function textColorStyle(resolved: ReturnType<typeof resolvedTextStyleToInlineStyle>) {
  const { fontFamily, color, fontWeight } = resolved;
  return { fontFamily, color, fontWeight };
}

/**
 * Maps `formLayoutStyle` to a field-rendering layout. Adding a new layout is
 * just a new case here plus a new sibling file in `variants/` — the shared
 * `useDynamicFormBuilderState` hook below is passed to whichever one is
 * chosen, so no layout ever re-implements fetch/validation/submit logic.
 */
function resolveFieldsLayoutComponent(_formLayoutStyle: string) {
  return StandardFieldsLayout;
}

export default function ServiceInquiryForm({
  section,
  appearance,
  theme,
  formBuilderSchema,
  formBuilderLoading,
  formBuilderError,
  onSubmitDynamicForm,
  onFetchFormSlots,
}: ServiceInquiryFormProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};

  const eyebrow = safeText(props.eyebrow);
  const heading = safeText(props.heading);
  const subheading = safeText(props.subheading);
  const showEyebrow = props.showEyebrow !== false;
  const showSubheading = props.showSubheading !== false;

  const showcaseEyebrow = safeText(props.showcaseEyebrow);
  const showShowcaseCardPref = props.showShowcaseCard !== false;
  const autoRotateShowcase = !reduceMotion && props.autoRotateShowcase !== false;
  const rotationDuration = clampRotationDuration(props.showcaseRotationDuration);

  const submitButtonText = safeText(props.formSubmitButtonText) || "Submit";
  const loadingButtonText = safeText(props.loadingButtonText) || "Submitting...";
  const successMessage = safeText(props.successMessage);
  const errorMessage = safeText(props.errorMessage);

  const enableSubmit = props.enableSubmit !== false;
  const showSubmitMessage = props.showSubmitMessage !== false;

  const blocks = useMemo(
    () => (Array.isArray(section?.settings?.blocks) ? section.settings.blocks : []),
    [section?.settings?.blocks]
  );

  const showcaseItems = useMemo<ShowcaseItemBlockProps[]>(
    () =>
      blocks
        .filter((block) => block?.type === "showcase_item")
        .map((block) => (block?.props ?? {}) as ShowcaseItemBlockProps)
        .filter((item) => safeText(item.title) || safeText(item.image)),
    [blocks]
  );

  const showShowcaseCard = showShowcaseCardPref && showcaseItems.length > 0;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = showcaseItems[activeIndex] ?? showcaseItems[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [showcaseItems.length]);

  useEffect(() => {
    if (!autoRotateShowcase || showcaseItems.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcaseItems.length);
    }, rotationDuration);
    return () => window.clearInterval(timer);
  }, [autoRotateShowcase, rotationDuration, showcaseItems.length]);

  const eyebrowStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "eyebrow",
            role: "body",
            defaultStyle: { color: "#6e6e73", fontWeight: "600" },
          })
        )
      ),
    [section, theme]
  );

  const headingStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "heading",
            role: "heading",
            defaultStyle: { color: "#111111", fontWeight: "700" },
          })
        )
      ),
    [section, theme]
  );

  const subheadingStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "subheading",
            role: "body",
            defaultStyle: { color: "#444444", fontWeight: "400" },
          })
        )
      ),
    [section, theme]
  );

  const showcaseEyebrowStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "showcaseEyebrow",
            role: "body",
            defaultStyle: { color: "#6e6e73", fontWeight: "600" },
          })
        )
      ),
    [section, theme]
  );

  // Shared across every layout — field values, honeypot, validation, submit
  // lifecycle. Called unconditionally here regardless of which layout ends up
  // rendering it (satisfies the rules of hooks; the layout switch below only
  // decides how the resulting state is displayed).
  const formState = useDynamicFormBuilderState({
    schema: formBuilderSchema,
    enableSubmit,
    onSubmitDynamicForm,
  });

  const formLayoutStyle = safeText(props.formLayoutStyle) || "standard";
  const FieldsLayout = resolveFieldsLayoutComponent(formLayoutStyle);

  return (
    <section
      className={`ak-lead-form ${paddingClass(props.sectionPadding)}`}
      style={sectionAppearanceStyle(appearance)}
      aria-label={heading || eyebrow || "Contact form"}
    >
      <div className="ak-lead-form__wrap">
        {(showEyebrow && eyebrow) || heading || (showSubheading && subheading) ? (
          <div className="ak-lead-form__header">
            {showEyebrow && eyebrow ? (
              <span className="ak-lead-form__eyebrow" style={eyebrowStyle}>
                {eyebrow}
              </span>
            ) : null}
            {heading ? (
              <h2 className="ak-lead-form__heading" style={headingStyle}>
                {heading}
              </h2>
            ) : null}
            {showSubheading && subheading ? (
              <p className="ak-lead-form__subheading" style={subheadingStyle}>
                {subheading}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className={`ak-lead-form__grid${
            showShowcaseCard ? "" : " ak-lead-form__grid--single"
          }`}
        >
          {showShowcaseCard && activeItem ? (
            <div className="ak-lead-form__showcase">
              {showcaseEyebrow ? (
                <span
                  className="ak-lead-form__showcase-eyebrow"
                  style={showcaseEyebrowStyle}
                >
                  {showcaseEyebrow}
                </span>
              ) : null}
              <div className="ak-lead-form__showcase-card">
                <div className="ak-lead-form__showcase-title-wrap">
                  <AnimatePresence exitBeforeEnter>
                    <motion.h3
                      key={activeItem.title}
                      className="ak-lead-form__showcase-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                    >
                      {safeText(activeItem.title)}
                    </motion.h3>
                  </AnimatePresence>
                </div>
                <div className="ak-lead-form__showcase-image-wrap">
                  <AnimatePresence exitBeforeEnter>
                    <motion.div
                      key={activeItem.image || activeItem.title}
                      className="ak-lead-form__showcase-image"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <StorefrontImage
                        desktopSrc={safeText(activeItem.image)}
                        alt={safeText(activeItem.altText) || safeText(activeItem.title)}
                        className="ak-lead-form__showcase-image-el"
                        fallback={
                          <div className="ak-lead-form__showcase-image-fallback" />
                        }
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : null}

          <div className="ak-lead-form__form-card">
            <FieldsLayout
              {...formState}
              schema={formBuilderSchema}
              loading={Boolean(formBuilderLoading)}
              loadError={formBuilderError}
              submitButtonText={submitButtonText}
              loadingButtonText={loadingButtonText}
              successMessage={successMessage}
              errorMessage={errorMessage}
              showSubmitMessage={showSubmitMessage}
              enableSubmit={enableSubmit}
              onFetchFormSlots={onFetchFormSlots}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
