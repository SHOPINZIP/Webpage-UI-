import React, { useState } from "react";
import { motion } from "framer-motion";
import type { DynamicFormBuilderState } from "../../../shared/formBuilder/useDynamicFormBuilderState";
import type {
  PublicFormField,
  PublicFormMobileValue,
  PublicFormSchema,
  PublicFormSlotOption,
} from "../../../shared/publicFormTypes";
import {
  Icon,
  InputField,
  SelectField,
  TextareaField,
  fieldIconFor,
} from "../fieldPrimitives";

// Deliberately does NOT trim: this feeds a controlled input's `value`. Trimming
// here would strip a trailing space the instant it's typed (React writes the
// trimmed value straight back into the DOM after every keystroke), making it
// look like the spacebar does nothing while typing between words.
function inputValue(value: unknown): string {
  return String(value ?? "");
}

const MOBILE_TYPE = "MOBILE_WITH_COUNTRY_CODE";
const APPOINTMENT_TYPE = "APPOINTMENT_SLOT";
const WEEKDAY_CODES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export type StandardFieldsLayoutProps = DynamicFormBuilderState & {
  schema?: PublicFormSchema | null;
  loading: boolean;
  loadError?: string;
  submitButtonText: string;
  loadingButtonText: string;
  successMessage: string;
  errorMessage: string;
  showSubmitMessage: boolean;
  enableSubmit: boolean;
  onFetchFormSlots?: (
    fieldKey: string,
    date: string
  ) => Promise<PublicFormSlotOption[]>;
};

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * An APPOINTMENT_SLOT field submits an opaque `value` the backend itself
 * generates via its slots endpoint — the client cannot construct a valid one
 * from date+time alone (confirmed by the backend rejecting a client-built
 * "date and time" string). Picking a date fetches that day's real slots
 * (host-supplied, no networking here) and clicking a slot submits its exact
 * `value` verbatim, same as the reference `PublicFormRenderer.jsx` flow.
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
  onFetchFormSlots?: (
    fieldKey: string,
    date: string
  ) => Promise<PublicFormSlotOption[]>;
}) {
  const config = field.config || {};
  const [date, setDate] = useState("");
  const [slotState, setSlotState] = useState<{
    options: PublicFormSlotOption[];
    loading: boolean;
  }>({ options: [], loading: false });
  const [weekdayError, setWeekdayError] = useState("");

  const today = new Date();
  const minDate = addDays(today, 0);
  const maxAdvanceDays = Number(config.maxAdvanceDays);
  const maxDate = Number.isFinite(maxAdvanceDays) && maxAdvanceDays > 0
    ? addDays(today, maxAdvanceDays)
    : undefined;
  const allowedWeekdays = Array.isArray(config.availableWeekdays)
    ? (config.availableWeekdays as string[])
    : null;

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
    <div className="ak-lead-form__slot">
      <InputField
        iconName="calendar"
        type="date"
        min={minDate}
        max={maxDate}
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
      />
      {weekdayError ? (
        <div className="ak-lead-form__slot-note">{weekdayError}</div>
      ) : !date ? null : slotState.loading ? (
        <div className="ak-lead-form__slot-note">Loading times…</div>
      ) : slotState.options.length === 0 ? (
        <div className="ak-lead-form__slot-note">No times available on this day.</div>
      ) : (
        <div className="ak-lead-form__slot-grid">
          {slotState.options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              disabled={!opt.available}
              className={`ak-lead-form__slot-btn${selected === opt.value ? " is-active" : ""}`}
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

/**
 * Lead Form's default field-rendering design. This is the only piece that's
 * specific to "standard" — everything about values/validation/submit comes
 * from the shared hook via props. A new layout (e.g. "compact") is just a
 * sibling file that renders `orderedFields`/`values`/`handleSubmit` however
 * it wants, reusing this exact same state.
 */
export default function StandardFieldsLayout({
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
  resetKey,
  submitButtonText,
  loadingButtonText,
  successMessage,
  errorMessage,
  showSubmitMessage,
  enableSubmit,
  onFetchFormSlots,
}: StandardFieldsLayoutProps) {
  const renderControl = (field: PublicFormField) => {
    const key = field.fieldKey;
    const v = values[key];
    const options = field.options || [];
    const dt = field.dataType;
    const iconName = fieldIconFor(dt);

    if (dt === "TEXTAREA") {
      return (
        <TextareaField
          iconName={iconName}
          value={inputValue(v)}
          placeholder={field.placeholder || field.label || ""}
          onChange={(e) => setValue(key, e.target.value)}
          rows={3}
        />
      );
    }

    if (dt === "BOOLEAN") {
      return (
        <label className="ak-lead-form__checkbox">
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
        <SelectField
          iconName={iconName}
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
        <div className="ak-lead-form__multi">
          {options.map((option) => (
            <label key={option} className="ak-lead-form__checkbox">
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
        <div className="ak-lead-form__phone-row">
          <InputField
            iconName="phone"
            compactMobile
            value={mv.countryCode || ""}
            placeholder="+91"
            onChange={(e) => setValue(key, { ...mv, countryCode: e.target.value })}
          />
          <InputField
            iconName="phone"
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
      <InputField
        iconName={iconName}
        type={typeMap[dt] || "text"}
        value={inputValue(v)}
        placeholder={field.placeholder || field.label || ""}
        step={step}
        onChange={(e) => setValue(key, e.target.value)}
      />
    );
  };

  if (loading) {
    return <div className="ak-lead-form__form-state">Loading form…</div>;
  }

  if (loadError) {
    return <div className="ak-lead-form__form-state">{loadError}</div>;
  }

  if (!schema) {
    return (
      <div className="ak-lead-form__form-state">
        No form selected yet. Choose a Form Builder form in the section editor.
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="ak-lead-form__form"
    >
      {orderedFields.map((field) => (
        <div key={`${field.fieldKey}-${resetKey}`}>{renderControl(field)}</div>
      ))}

      {/* Honeypot — visually hidden; bots fill it, real users don't. */}
      <div className="ak-lead-form__honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <button
        type="submit"
        disabled={!enableSubmit || submitState === "loading"}
        className="ak-lead-form__submit"
      >
        {submitState === "loading" ? loadingButtonText : submitButtonText}
        <Icon name="arrowRight" className="ak-lead-form__submit-icon" />
      </button>

      {showSubmitMessage && submitState === "success" ? (
        <p className="ak-lead-form__message ak-lead-form__message--success">
          {successMessage || (schema.thankYouMessage ?? "").trim() || "Thank you!"}
        </p>
      ) : null}
      {showSubmitMessage && submitState === "error" ? (
        <p className="ak-lead-form__message ak-lead-form__message--error">
          {formError || errorMessage}
        </p>
      ) : null}
    </motion.form>
  );
}
