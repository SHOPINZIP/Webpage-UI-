export type MinimalTimelineBenefitBlockProps = {
  title?: string;
  desc?: string;
  point1?: string;
  point2?: string;
  point3?: string;
};

export type MinimalTimelineBenefitBlock = {
  id: string;
  type: "benefitItem";
  props: MinimalTimelineBenefitBlockProps;
};

export type MinimalTimelineBenefitsControls = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  showActiveRailFill?: boolean;
};

export type MinimalTimelineBenefitsSettings = {
  props?: MinimalTimelineBenefitsControls;
  blocks?: MinimalTimelineBenefitBlock[];
};

export type MinimalTimelineBenefitsSectionDoc = {
  id: string;
  type: "benefits-points";
  enabled?: boolean;
  settings: MinimalTimelineBenefitsSettings;
};

export type MinimalTimelineBenefitsProps = {
  section: MinimalTimelineBenefitsSectionDoc;
};
