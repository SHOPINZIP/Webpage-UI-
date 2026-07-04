import React, { type ReactElement, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { sectionAppearanceStyle } from "../../../shared/sectionAppearance";
import {
  resolveTextStyle,
  resolvedTextStyleToInlineStyle,
} from "../../../shared/sectionTypography";
import { useDynamicFormBuilderState } from "../../../shared/formBuilder/useDynamicFormBuilderState";
import type {
  PublicFormField,
  PublicFormMobileValue,
  PublicFormSlotOption,
} from "../../../shared/publicFormTypes";
import type { ChecklistItemBlockProps, JourneySplitLeadFormProps } from "../types";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

// Deliberately does NOT trim — feeds a controlled input's `value`. See
// StandardFieldsLayout.tsx for why trimming here breaks typing a trailing space.
function inputValue(value: unknown): string {
  return String(value ?? "");
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

// Same rationale as ServiceInquiryForm.tsx: resolveTextStyle always resolves a
// fontSize (system default) which would override this layout's own CSS sizing
// if applied inline — keep only color/fontWeight/fontFamily theme-driven.
function textColorStyle(resolved: ReturnType<typeof resolvedTextStyleToInlineStyle>) {
  const { fontFamily, color, fontWeight } = resolved;
  return { fontFamily, color, fontWeight };
}

function paddingClass(value: unknown): string {
  const raw = safeText(value).toLowerCase();
  if (raw === "small") return "ak-lead-form-journey--pad-sm";
  if (raw === "medium") return "ak-lead-form-journey--pad-md";
  return "ak-lead-form-journey--pad-lg";
}

const MOBILE_TYPE = "MOBILE_WITH_COUNTRY_CODE";
const APPOINTMENT_TYPE = "APPOINTMENT_SLOT";
const WEEKDAY_CODES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const common = {
    className,
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const icons: Record<string, ReactElement> = {
    arrowRight: (
      <svg {...common} viewBox="0 0 16 16" width={16} height={16}>
        <path d="M6 12L10 8L6 4" />
      </svg>
    ),
    chevronDown: (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),
    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function ChecklistIcon({ type }: { type?: ChecklistItemBlockProps["iconType"] }) {
  if (type === "none") return null;
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "sparkle") {
    return (
      <svg {...common}>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type FieldShellProps = { iconName: string; compactMobile?: boolean; children: React.ReactNode };

function FieldShell({ iconName, compactMobile, children }: FieldShellProps) {
  return (
    <div
      className={`ak-lead-form-journey__field${
        compactMobile ? " ak-lead-form-journey__field--compact" : ""
      }`}
    >
      {iconName ? (
        <div className="ak-lead-form-journey__field-icon">
          <Icon name={iconName} className="ak-lead-form-journey__field-icon-svg" />
        </div>
      ) : null}
      {children}
    </div>
  );
}

function JInputField({
  iconName,
  compactMobile,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { iconName: string; compactMobile?: boolean }) {
  return (
    <FieldShell iconName={iconName} compactMobile={compactMobile}>
      <input {...props} className="ak-lead-form-journey__input" />
    </FieldShell>
  );
}

function JTextareaField({
  iconName,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { iconName: string }) {
  return (
    <FieldShell iconName={iconName}>
      <textarea {...props} className="ak-lead-form-journey__input ak-lead-form-journey__input--textarea" />
    </FieldShell>
  );
}

function JSelectField({
  iconName,
  compactMobile,
  value,
  onChange,
  options,
  placeholder,
}: {
  iconName: string;
  compactMobile?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <FieldShell iconName={iconName} compactMobile={compactMobile}>
      <div className="ak-lead-form-journey__field-chevron">
        <Icon name="chevronDown" className="ak-lead-form-journey__field-icon-svg" />
      </div>
      <select
        value={value}
        onChange={onChange}
        className="ak-lead-form-journey__input ak-lead-form-journey__input--select"
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/**
 * Same rationale as StandardFieldsLayout's AppointmentSlotField: the submitted
 * value is an opaque backend-generated token, never client-constructed.
 */
function AppointmentSlotField({
  field,
  value,
  onChange,
  onFetchFormSlots,
}: {
  field: PublicFormField;
  value: unknown;
  onChange: (value: string) => void;
  onFetchFormSlots?: (fieldKey: string, date: string) => Promise<PublicFormSlotOption[]>;
}) {
  const config = field.config || {};
  const [date, setDate] = useState("");
  const [slotState, setSlotState] = useState<{ options: PublicFormSlotOption[]; loading: boolean }>({
    options: [],
    loading: false,
  });
  const [weekdayError, setWeekdayError] = useState("");

  const today = new Date();
  const minDate = addDays(today, 0);
  const maxAdvanceDays = Number(config.maxAdvanceDays);
  const maxDate = Number.isFinite(maxAdvanceDays) && maxAdvanceDays > 0 ? addDays(today, maxAdvanceDays) : undefined;
  const allowedWeekdays = Array.isArray(config.availableWeekdays) ? (config.availableWeekdays as string[]) : null;
  const selected = inputValue(value);

  const handleDateChange = async (nextDate: string) => {
    onChange("");
    setWeekdayError("");
    setSlotState({ options: [], loading: false });
    if (!nextDate) {
      setDate("");
      return;
    }
    if (allowedWeekdays && allowedWeekdays.length > 0) {
      const weekday = WEEKDAY_CODES[new Date(`${nextDate}T00:00:00`).getDay()];
      if (!allowedWeekdays.includes(weekday)) {
        setWeekdayError("This date isn't available — please pick another day.");
        setDate("");
        return;
      }
    }
    setDate(nextDate);
    if (!onFetchFormSlots) return;
    setSlotState({ options: [], loading: true });
    try {
      const opts = await onFetchFormSlots(field.fieldKey, nextDate);
      setSlotState({ options: opts || [], loading: false });
    } catch {
      setSlotState({ options: [], loading: false });
    }
  };

  return (
    <div className="ak-lead-form-journey__slot">
      <JInputField
        iconName="calendar"
        type="date"
        min={minDate}
        max={maxDate}
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
      />
      {weekdayError ? (
        <div className="ak-lead-form-journey__slot-note">{weekdayError}</div>
      ) : !date ? null : slotState.loading ? (
        <div className="ak-lead-form-journey__slot-note">Loading times…</div>
      ) : slotState.options.length === 0 ? (
        <div className="ak-lead-form-journey__slot-note">No times available on this day.</div>
      ) : (
        <div className="ak-lead-form-journey__slot-grid">
          {slotState.options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              disabled={!opt.available}
              className={`ak-lead-form-journey__slot-btn${selected === opt.value ? " is-active" : ""}`}
              onClick={() => onChange(opt.value)}
            >
              {opt.start}–{opt.end}
              {opt.available ? "" : " · full"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type JourneyFieldsFormProps = {
  schema: JourneySplitLeadFormProps["formBuilderSchema"];
  loading: boolean;
  loadError?: string;
  orderedFields: PublicFormField[];
  values: Record<string, unknown>;
  setValue: (key: string, value: unknown) => void;
  toggleMulti: (key: string, option: string, checked: boolean) => void;
  hp: string;
  setHp: (value: string) => void;
  submitState: "idle" | "loading" | "success" | "error";
  formError: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitButtonText: string;
  loadingButtonText: string;
  successMessage: string;
  errorMessage: string;
  onFetchFormSlots?: JourneySplitLeadFormProps["onFetchFormSlots"];
};

function JourneyFieldsForm({
  schema,
  loading,
  loadError,
  orderedFields,
  values,
  setValue,
  toggleMulti,
  hp,
  setHp,
  submitState,
  formError,
  handleSubmit,
  submitButtonText,
  loadingButtonText,
  successMessage,
  errorMessage,
  onFetchFormSlots,
}: JourneyFieldsFormProps) {
  const renderControl = (field: PublicFormField) => {
    const key = field.fieldKey;
    const v = values[key];
    const options = field.options || [];
    const dt = field.dataType;

    if (dt === "TEXTAREA") {
      return (
        <JTextareaField
          iconName=""
          value={inputValue(v)}
          placeholder={field.placeholder || field.label || ""}
          onChange={(e) => setValue(key, e.target.value)}
          rows={4}
        />
      );
    }

    if (dt === "BOOLEAN") {
      return (
        <label className="ak-lead-form-journey__checkbox">
          <input
            type="checkbox"
            checked={Boolean(v)}
            onChange={(e) => setValue(key, e.target.checked)}
          />
          <span>{field.placeholder || field.label || "Yes"}</span>
        </label>
      );
    }

    if (dt === "DROPDOWN" || dt === "COUNTRY_CODE") {
      return (
        <JSelectField
          iconName=""
          value={inputValue(v)}
          onChange={(e) => setValue(key, e.target.value)}
          options={options.map((o) => ({ value: o, label: o }))}
          placeholder={field.placeholder || "Select…"}
        />
      );
    }

    if (dt === "MULTISELECT") {
      const arr = Array.isArray(v) ? (v as string[]) : [];
      return (
        <div className="ak-lead-form-journey__multi">
          {options.map((option) => (
            <label key={option} className="ak-lead-form-journey__checkbox">
              <input
                type="checkbox"
                checked={arr.includes(option)}
                onChange={(e) => toggleMulti(key, option, e.target.checked)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (dt === MOBILE_TYPE) {
      const mv = (v as PublicFormMobileValue) || { countryCode: "+91", number: "" };
      return (
        <div className="ak-lead-form-journey__phone-row">
          <JInputField
            iconName=""
            compactMobile
            value={mv.countryCode || ""}
            placeholder="+91"
            onChange={(e) => setValue(key, { ...mv, countryCode: e.target.value })}
          />
          <JInputField
            iconName=""
            compactMobile
            value={mv.number || ""}
            placeholder={field.placeholder || "Mobile number"}
            inputMode="numeric"
            onChange={(e) => setValue(key, { ...mv, number: e.target.value })}
          />
        </div>
      );
    }

    if (dt === APPOINTMENT_TYPE) {
      return (
        <AppointmentSlotField
          field={field}
          value={v}
          onChange={(next) => setValue(key, next)}
          onFetchFormSlots={onFetchFormSlots}
        />
      );
    }

    const typeMap: Record<string, string> = {
      EMAIL: "email",
      PHONE: "tel",
      URL: "url",
      DATE: "date",
      TIME: "time",
      DATETIME: "datetime-local",
      NUMBER: "number",
      DECIMAL: "number",
    };
    const step = dt === "DECIMAL" ? "any" : dt === "TIME" || dt === "DATETIME" ? "1" : undefined;

    return (
      <JInputField
        iconName=""
        type={typeMap[dt] || "text"}
        value={inputValue(v)}
        placeholder={field.placeholder || field.label || ""}
        step={step}
        onChange={(e) => setValue(key, e.target.value)}
      />
    );
  };

  if (loading) {
    return <div className="ak-lead-form-journey__form-state">Loading form…</div>;
  }
  if (loadError) {
    return <div className="ak-lead-form-journey__form-state">{loadError}</div>;
  }
  if (!schema) {
    return (
      <div className="ak-lead-form-journey__form-state">
        Select a Form Builder form to display this form.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ak-lead-form-journey__form">
      {orderedFields.map((field) => (
        <div key={field.fieldKey}>
          <label className="ak-lead-form-journey__label">{field.label || field.fieldKey}</label>
          {renderControl(field)}
        </div>
      ))}

      {/* Honeypot — visually hidden; bots fill it, real users don't. */}
      <div className="ak-lead-form-journey__honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {submitState === "success" ? (
        <p className="ak-lead-form-journey__message ak-lead-form-journey__message--success">
          {successMessage || "Thank you!"}
        </p>
      ) : null}
      {submitState === "error" ? (
        <p className="ak-lead-form-journey__message ak-lead-form-journey__message--error">
          {formError || errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "loading"}
        className="ak-lead-form-journey__submit"
      >
        <span className="ak-lead-form-journey__submit-bg" />
        <span className="ak-lead-form-journey__submit-shine" />
        <span className="ak-lead-form-journey__submit-content">
          {submitState === "loading" ? (
            <>
              <span className="ak-lead-form-journey__spinner" />
              {loadingButtonText}
            </>
          ) : (
            <>
              {submitButtonText}
              <Icon name="arrowRight" className="ak-lead-form-journey__submit-icon" />
            </>
          )}
        </span>
      </button>
    </form>
  );
}

export default function JourneySplitLeadForm({
  section,
  appearance,
  theme,
  formBuilderSchema,
  formBuilderLoading,
  formBuilderError,
  onSubmitDynamicForm,
  onFetchFormSlots,
}: JourneySplitLeadFormProps) {
  const reduceMotion = usePrefersReducedMotion();
  const props = section?.settings?.props ?? {};
  const enableMotion = props.enableMotion !== false && !reduceMotion;

  const eyebrow = safeText(props.eyebrow);
  const heading = safeText(props.heading) || "Let's Start Your Journey Today";
  const subheading = safeText(props.subheading);
  const showEyebrow = props.showEyebrow === true;
  const showSubheading = props.showSubheading !== false;
  const showChecklist = props.showChecklist !== false;
  const checklistTitle = safeText(props.checklistTitle);
  const formTitle = safeText(props.formTitle);
  const showFormTitle = props.showFormTitle === true;
  const submitButtonText = safeText(props.submitButtonText) || "Submit Request";
  const loadingButtonText = safeText(props.loadingButtonText) || "Submitting...";
  const successMessage = safeText(props.successMessage);
  const errorMessage = safeText(props.errorMessage);

  const blocks = useMemo(
    () => (Array.isArray(section?.settings?.blocks) ? section.settings.blocks : []),
    [section?.settings?.blocks]
  );
  const checklistItems = useMemo(
    () =>
      blocks
        .filter((block) => block?.type === "checklist_item")
        .filter((block) => safeText((block as { text?: string }).text)),
    [blocks]
  );

  // Section props never expose `enableSubmit`/`showSubmitMessage` for this
  // layout (per spec) — submission is always enabled and messages always shown.
  const formState = useDynamicFormBuilderState({
    schema: formBuilderSchema,
    enableSubmit: true,
    onSubmitDynamicForm,
  });

  const eyebrowStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "eyebrow",
            role: "body",
            defaultStyle: { color: "rgba(255,255,255,0.6)", fontWeight: "600" },
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
            defaultStyle: { color: "#ffffff", fontWeight: "600" },
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
            defaultStyle: { color: "rgba(255,255,255,0.6)", fontWeight: "400" },
          })
        )
      ),
    [section, theme]
  );

  const checklistTitleStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "checklistTitle",
            role: "body",
            defaultStyle: { color: "rgba(255,255,255,0.6)", fontWeight: "600" },
          })
        )
      ),
    [section, theme]
  );

  const checklistItemStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "checklistItem",
            role: "body",
            defaultStyle: { color: "rgba(255,255,255,0.82)", fontWeight: "400" },
          })
        )
      ),
    [section, theme]
  );

  const formTitleStyle = useMemo(
    () =>
      textColorStyle(
        resolvedTextStyleToInlineStyle(
          resolveTextStyle({
            section,
            theme,
            fieldId: "formTitle",
            role: "heading",
            defaultStyle: { color: "#ffffff", fontWeight: "600" },
          })
        )
      ),
    [section, theme]
  );

  const headlineMotion = enableMotion
    ? {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
      }
    : {};

  const formMotion = enableMotion
    ? {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, delay: 0.2 },
      }
    : {};

  return (
    <section
      className={`ak-lead-form-journey ${paddingClass(props.sectionPadding)}`}
      style={sectionAppearanceStyle(appearance)}
      aria-label={heading}
    >
      <div className="ak-lead-form-journey__wrap">
        <div className="ak-lead-form-journey__grid">
          <motion.div className="ak-lead-form-journey__content" {...headlineMotion}>
            {showEyebrow && eyebrow ? (
              <span className="ak-lead-form-journey__eyebrow" style={eyebrowStyle}>
                {eyebrow}
              </span>
            ) : null}
            <h2 className="ak-lead-form-journey__heading" style={headingStyle}>
              {heading}
            </h2>
            {showSubheading && subheading ? (
              <p className="ak-lead-form-journey__subheading" style={subheadingStyle}>
                {subheading}
              </p>
            ) : null}

            {showChecklist && checklistItems.length > 0 ? (
              <div className="ak-lead-form-journey__checklist">
                {checklistTitle ? (
                  <p className="ak-lead-form-journey__checklist-title" style={checklistTitleStyle}>
                    {checklistTitle}
                  </p>
                ) : null}
                {checklistItems.map((item, index) => {
                  const itemProps = item as { id?: string; text?: string; iconType?: string };
                  return (
                    <motion.p
                      key={itemProps.id ?? index}
                      className="ak-lead-form-journey__checklist-item"
                      style={checklistItemStyle}
                      initial={enableMotion ? { opacity: 0, x: -20 } : false}
                      whileInView={enableMotion ? { opacity: 1, x: 0 } : undefined}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChecklistIcon type={itemProps.iconType} />
                      <span>{safeText(itemProps.text)}</span>
                    </motion.p>
                  );
                })}
              </div>
            ) : null}
          </motion.div>

          <motion.div className="ak-lead-form-journey__form-wrap" {...formMotion}>
            <div className="ak-lead-form-journey__card">
              {showFormTitle && formTitle ? (
                <h3 className="ak-lead-form-journey__form-title" style={formTitleStyle}>
                  {formTitle}
                </h3>
              ) : null}
              <JourneyFieldsForm
                schema={formBuilderSchema}
                loading={Boolean(formBuilderLoading)}
                loadError={formBuilderError}
                onFetchFormSlots={onFetchFormSlots}
                submitButtonText={submitButtonText}
                loadingButtonText={loadingButtonText}
                successMessage={successMessage}
                errorMessage={errorMessage}
                {...formState}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
