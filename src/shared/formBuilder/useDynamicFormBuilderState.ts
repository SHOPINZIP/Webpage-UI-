import { useEffect, useMemo, useState, type FormEvent } from "react";
import type {
  PublicFormField,
  PublicFormMobileValue,
  PublicFormSchema,
  PublicFormSubmitBody,
} from "../publicFormTypes";

const MOBILE_TYPE = "MOBILE_WITH_COUNTRY_CODE";

function safeText(value: unknown): string {
  return String(value ?? "").trim();
}

function emptyDynamicValue(field: PublicFormField): unknown {
  switch (field.dataType) {
    case "BOOLEAN":
      return false;
    case "MULTISELECT":
      return [];
    case MOBILE_TYPE:
      return { countryCode: "+91", number: "" } as PublicFormMobileValue;
    default:
      return "";
  }
}

function hasDynamicValue(field: PublicFormField, value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (field.dataType === "BOOLEAN") return value === true;
  if (field.dataType === "MULTISELECT") return Array.isArray(value) && value.length > 0;
  if (field.dataType === MOBILE_TYPE) {
    const mv = value as PublicFormMobileValue;
    return Boolean(mv) && safeText(mv.number) !== "";
  }
  return safeText(value) !== "";
}

export type DynamicFormBuilderState = {
  orderedFields: PublicFormField[];
  values: Record<string, unknown>;
  setValue: (key: string, value: unknown) => void;
  toggleMulti: (key: string, option: string, checked: boolean) => void;
  hp: string;
  setHp: (value: string) => void;
  submitState: "idle" | "loading" | "success" | "error";
  formError: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  /**
   * Bumps every time values are reset (schema change or a successful submit).
   * Field components that hold their own local UI state beyond `values` (e.g.
   * a date picker's chosen day) should key themselves off this so a
   * successful submit fully clears them too, not just the plain text fields.
   */
  resetKey: number;
};

/**
 * Field values, honeypot, validation, and the submit lifecycle for a linked
 * Form Builder form. Shared across every section/layout that renders one —
 * it only knows about `schema`/`onSubmitDynamicForm` (the host does the actual
 * fetch/submit networking), never how fields look. Any section can pair this
 * with its own visual field-rendering component.
 */
export function useDynamicFormBuilderState({
  schema,
  enableSubmit,
  onSubmitDynamicForm,
}: {
  schema?: PublicFormSchema | null;
  enableSubmit: boolean;
  onSubmitDynamicForm?: (
    payload: PublicFormSubmitBody
  ) => Promise<{ redirectUrl?: string } | void>;
}): DynamicFormBuilderState {
  const orderedFields = useMemo(
    () =>
      (schema?.fields ?? [])
        .slice()
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    [schema]
  );

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [hp, setHp] = useState("");
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const resetValues = () => {
    const init: Record<string, unknown> = {};
    orderedFields.forEach((field) => {
      init[field.fieldKey] = emptyDynamicValue(field);
    });
    setValues(init);
    setHp("");
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    resetValues();
    setSubmitState("idle");
    setFormError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  const setValue = (key: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const toggleMulti = (key: string, option: string, checked: boolean) =>
    setValues((prev) => {
      const cur = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      return {
        ...prev,
        [key]: checked ? [...cur, option] : cur.filter((o) => o !== option),
      };
    });

  const buildData = (): Record<string, unknown> => {
    const data: Record<string, unknown> = {};
    orderedFields.forEach((field) => {
      const v = values[field.fieldKey];
      if (!hasDynamicValue(field, v)) return;
      if (field.dataType === MOBILE_TYPE) {
        const mv = v as PublicFormMobileValue;
        data[field.fieldKey] = {
          countryCode: mv.countryCode || "+91",
          number: safeText(mv.number),
        };
      } else if (field.dataType === "NUMBER" || field.dataType === "DECIMAL") {
        data[field.fieldKey] = Number(v);
      } else if (field.dataType === "BOOLEAN") {
        data[field.fieldKey] = true;
      } else if (field.dataType === "MULTISELECT") {
        data[field.fieldKey] = v;
      } else {
        data[field.fieldKey] = safeText(v);
      }
    });
    return data;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enableSubmit || submitState === "loading" || !onSubmitDynamicForm) return;

    setFormError("");

    const missing = orderedFields.find(
      (field) => field.required && !hasDynamicValue(field, values[field.fieldKey])
    );
    if (missing) {
      setSubmitState("error");
      setFormError(`Please fill "${missing.label || missing.fieldKey}".`);
      return;
    }

    setSubmitState("loading");
    try {
      const result = await onSubmitDynamicForm({ data: buildData(), hp });
      const redirect = safeText(
        (result as { redirectUrl?: string } | undefined)?.redirectUrl
      );
      if (/^https?:\/\//i.test(redirect) && typeof window !== "undefined") {
        window.location.href = redirect;
        return;
      }
      setSubmitState("success");
      resetValues();
    } catch (err) {
      setSubmitState("error");
      const status = (err as { status?: number } | undefined)?.status;
      setFormError(
        status === 429
          ? "Too many attempts. Please try again in a little while."
          : (err as Error | undefined)?.message || ""
      );
    }
  };

  return {
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
  };
}
