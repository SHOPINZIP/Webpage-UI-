import React, { type ReactElement } from "react";

/**
 * Lead Form's own visual field design — icons, input chrome, CSS classes
 * (`ak-lead-form__*`). This is intentionally NOT shared with other sections:
 * the data/state/submit logic lives in the shared
 * `useDynamicFormBuilderState` hook, but how a field *looks* is owned per
 * section/layout so each can have its own design without touching the hook.
 */

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  const common = {
    className,
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const icons: Record<string, ReactElement> = {
    user: (
      <svg {...common}>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    phone: (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L9 10.67a16 16 0 0 0 4.33 4.33l1.24-1.24a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    message: (
      <svg {...common}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),
    layers: (
      <svg {...common}>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </svg>
    ),
    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    arrowRight: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    chevronDown: (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),
  };
  return icons[name] || icons.user;
}

const MOBILE_TYPE = "MOBILE_WITH_COUNTRY_CODE";
const APPOINTMENT_TYPE = "APPOINTMENT_SLOT";

export function fieldIconFor(dataType: string): string {
  switch (dataType) {
    case "EMAIL":
      return "mail";
    case "PHONE":
    case MOBILE_TYPE:
      return "phone";
    case "TEXTAREA":
      return "message";
    case "DROPDOWN":
    case "COUNTRY_CODE":
    case "MULTISELECT":
    case "BOOLEAN":
      return "layers";
    case "DATE":
    case "TIME":
    case "DATETIME":
    case APPOINTMENT_TYPE:
      return "calendar";
    default:
      return "user";
  }
}

type FieldShellProps = {
  iconName: string;
  compactMobile?: boolean;
  children: React.ReactNode;
};

export function FieldShell({ iconName, compactMobile, children }: FieldShellProps) {
  return (
    <div
      className={`ak-lead-form__field${
        compactMobile ? " ak-lead-form__field--compact" : ""
      }`}
    >
      <div className="ak-lead-form__field-icon">
        <Icon name={iconName} className="ak-lead-form__field-icon-svg" />
      </div>
      {children}
    </div>
  );
}

export function InputField({
  iconName,
  compactMobile,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  iconName: string;
  compactMobile?: boolean;
}) {
  return (
    <FieldShell iconName={iconName} compactMobile={compactMobile}>
      <input {...props} className="ak-lead-form__input" />
    </FieldShell>
  );
}

export function TextareaField({
  iconName,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { iconName: string }) {
  return (
    <div className="ak-lead-form__field ak-lead-form__field--textarea">
      <div className="ak-lead-form__field-icon ak-lead-form__field-icon--top">
        <Icon name={iconName} className="ak-lead-form__field-icon-svg" />
      </div>
      <textarea {...props} className="ak-lead-form__input" />
    </div>
  );
}

export function SelectField({
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
      <div className="ak-lead-form__field-chevron">
        <Icon name="chevronDown" className="ak-lead-form__field-icon-svg" />
      </div>
      <select
        value={value}
        onChange={onChange}
        className="ak-lead-form__input ak-lead-form__input--select"
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
