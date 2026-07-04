// Type-only contract for the Form Builder module's public form schema. No fetching/submitting
// happens in this package — each consumer (areakart-frontend, Project-Web) already has its own API
// layer and is responsible for fetching/submitting; these shapes just keep both sides consistent
// with what they pass into `ServiceInquiryForm` as props.

export type PublicFormFieldDataType =
  | "TEXT"
  | "TEXTAREA"
  | "EMAIL"
  | "PHONE"
  | "URL"
  | "DATE"
  | "TIME"
  | "DATETIME"
  | "NUMBER"
  | "DECIMAL"
  | "BOOLEAN"
  | "DROPDOWN"
  | "COUNTRY_CODE"
  | "MULTISELECT"
  | "MOBILE_WITH_COUNTRY_CODE"
  | "APPOINTMENT_SLOT"
  | string;

export type PublicFormField = {
  fieldKey: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  sortOrder?: number;
  options?: string[];
  dataType: PublicFormFieldDataType;
  /** e.g. APPOINTMENT_SLOT's { dayStartTime, dayEndTime, slotDurationMinutes, availableWeekdays, ... } */
  config?: Record<string, unknown>;
  validation?: Record<string, unknown>;
};

export type PublicFormSchema = {
  name?: string;
  description?: string;
  redirectUrl?: string;
  thankYouMessage?: string;
  fields?: PublicFormField[];
};

export type PublicFormSlotOption = {
  value: string;
  start: string;
  end: string;
  available: boolean;
};

export type PublicFormMobileValue = {
  countryCode: string;
  number: string;
};

export type PublicFormSubmitBody = {
  data: Record<string, unknown>;
  hp: string;
};
