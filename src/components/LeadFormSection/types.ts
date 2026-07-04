import type {
  ResolvedSectionAppearance,
  SectionAppearance,
  StorefrontTheme,
} from "../../shared/sectionAppearance";
import type {
  PublicFormSchema,
  PublicFormSlotOption,
  PublicFormSubmitBody,
} from "../../shared/publicFormTypes";

export type ShowcaseItemBlockProps = {
  title?: string;
  image?: string;
  altText?: string;
};

export type ShowcaseItemBlock = {
  id: string;
  type: "showcase_item";
  props: ShowcaseItemBlockProps;
};

export type ChecklistItemBlockProps = {
  text?: string;
  iconType?: "check" | "sparkle" | "shield" | "none" | string;
};

export type ChecklistItemBlock = {
  id: string;
  type: "checklist_item";
  text?: string;
  iconType?: ChecklistItemBlockProps["iconType"];
};

export type LeadFormBlock = ShowcaseItemBlock | ChecklistItemBlock;

export type LeadFormSectionProps = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  showEyebrow?: boolean;
  showSubheading?: boolean;

  showcaseEyebrow?: string;
  showShowcaseCard?: boolean;
  autoRotateShowcase?: boolean;
  showcaseRotationDuration?: number | string;

  formSubmitButtonText?: string;
  loadingButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  formActionType?: string;

  /** Numeric Form Builder form id (admin reference only — the storefront uses `formBuilderPublicId`). */
  formBuilderFormId?: string;
  /** Public Form Builder form id — the storefront always renders that form's own fields. */
  formBuilderPublicId?: string;
  /** Which field-rendering layout to use; unset/unknown values fall back to "standard". */
  formLayoutStyle?: string;

  enableSubmit?: boolean;
  showSubmitMessage?: boolean;
  sectionPadding?: "small" | "medium" | "large" | string;

  // JourneySplitLeadForm variant only
  showChecklist?: boolean;
  checklistTitle?: string;
  formTitle?: string;
  showFormTitle?: boolean;
  /** JourneySplitLeadForm's own submit-button-text prop (distinct name from formSubmitButtonText above — matches this variant's schema exactly). */
  submitButtonText?: string;
  enableMotion?: boolean;

  appearance?: SectionAppearance;
};

export type LeadFormSettings = {
  props?: LeadFormSectionProps;
  blocks?: LeadFormBlock[];
};

export type LeadFormSectionDoc = {
  id: string;
  type: "lead_form";
  enabled?: boolean;
  variant?: string;
  settings: LeadFormSettings;
};

export type ServiceInquiryFormProps = {
  section: LeadFormSectionDoc;
  appearance?: ResolvedSectionAppearance | null;
  theme?: StorefrontTheme | null;

  /**
   * This package does no networking itself — the host app owns fetching the
   * linked Form Builder form's schema and submitting to it, and supplies the
   * results here. This component only renders from what it's given.
   */
  formBuilderSchema?: PublicFormSchema | null;
  formBuilderLoading?: boolean;
  formBuilderError?: string;
  onSubmitDynamicForm?: (
    payload: PublicFormSubmitBody
  ) => Promise<{ redirectUrl?: string } | void>;
  /**
   * APPOINTMENT_SLOT fields submit an opaque `value` the backend itself
   * generates — the client cannot construct a valid one from date+time alone.
   * Same no-networking rule: the host fetches, this component only renders.
   */
  onFetchFormSlots?: (
    fieldKey: string,
    date: string
  ) => Promise<PublicFormSlotOption[]>;
};

/** Same host-supplied contract as ServiceInquiryForm — every `lead_form` variant shares it. */
export type JourneySplitLeadFormProps = ServiceInquiryFormProps;
