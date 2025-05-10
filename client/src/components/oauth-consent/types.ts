// Types for OAuth Consent Screen Component

export type BrandingConfig = {
  companyName: string;
  companyLogo?: string | React.ReactNode;
  serviceDescription: string;
  serviceProvider?: string;
  primaryColor?: string;
  backgroundColor?: string;
  headerBackground?: string;
};

export type RegionOption = {
  value: string;
  label: string;
};

export type ApiKeyInstructionConfig = {
  show: boolean;
  title?: string;
  steps?: Array<{
    text: string;
    url?: string;
  }>;
  additionalInfo?: string;
};

export type ConsentScreenConfig = {
  branding: BrandingConfig;
  apiTokenLabel?: string;
  apiTokenPlaceholder?: string;
  advancedConfigLabel?: string;
  showAdvancedByDefault?: boolean;
  regions?: RegionOption[];
  enableThemeToggle?: boolean;
  defaultTheme?: 'light' | 'dark' | 'system';
  submitButtonText?: string;
  cancelButtonText?: string;
  defaultApiVersion?: string;
  defaultTimeout?: number;
  showRegionSelector?: boolean;
  showApiVersionField?: boolean;
  showTimeoutField?: boolean;
  apiKeyInstructions?: ApiKeyInstructionConfig;
  customStyles?: {
    cardWidth?: string;
    borderRadius?: string;
    shadowIntensity?: 'light' | 'medium' | 'heavy';
  };
  onSubmit?: (data: ConsentFormData) => void;
  onCancel?: () => void;
};

export type ConsentFormData = {
  apiToken: string;
  region?: string;
  apiVersion?: string;
  timeout?: number;
};

export type ConsentScreenProps = {
  config: ConsentScreenConfig;
  showDemoControls?: boolean;
};