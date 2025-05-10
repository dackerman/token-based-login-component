import { ConsentScreenConfig } from './types';

// Default configuration for OAuth Consent Screen
export const defaultConfig: ConsentScreenConfig = {
  branding: {
    companyName: "Acme Inc",
    serviceDescription: "Requesting API access to your account",
    serviceProvider: "API Connect"
  },
  apiTokenLabel: "API Token",
  apiTokenPlaceholder: "Enter your API token",
  advancedConfigLabel: "Advanced Configuration",
  showAdvancedByDefault: false,
  regions: [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-1", label: "US West (N. California)" },
    { value: "eu-west-1", label: "EU (Ireland)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" }
  ],
  enableThemeToggle: true,
  defaultTheme: 'system',
  submitButtonText: "Authorize",
  cancelButtonText: "Cancel",
  defaultApiVersion: "v2.0",
  defaultTimeout: 30,
  showRegionSelector: true,
  showApiVersionField: true,
  showTimeoutField: true,
  apiKeyInstructions: {
    show: true,
    title: "How to get your API token",
    steps: [
      {
        text: "Log in to your account dashboard",
        url: "https://example.com/dashboard"
      },
      {
        text: "Navigate to API Settings in your profile"
      },
      {
        text: "Click on 'Generate New Token' and set permissions"
      },
      {
        text: "Copy the token and paste it here"
      }
    ],
    additionalInfo: "Your token will not be stored anywhere and is only used to authenticate this request."
  },
  customStyles: {
    cardWidth: "max-w-md",
    borderRadius: "rounded-xl",
    shadowIntensity: 'medium'
  }
};

// Alternative demo configuration
export const demoConfig: ConsentScreenConfig = {
  branding: {
    companyName: "DevService",
    serviceDescription: "Connect to your development environment",
    serviceProvider: "Dev Connect",
    primaryColor: "#4f46e5" // Indigo color
  },
  apiTokenLabel: "Access Key",
  apiTokenPlaceholder: "Paste your developer access key",
  showAdvancedByDefault: true,
  regions: [
    { value: "us-east", label: "US East" },
    { value: "us-west", label: "US West" },
    { value: "eu-central", label: "EU Central" },
    { value: "asia-east", label: "Asia East" }
  ],
  enableThemeToggle: true,
  defaultTheme: 'dark',
  submitButtonText: "Connect",
  cancelButtonText: "Decline",
  showApiVersionField: true,
  apiKeyInstructions: {
    show: true,
    title: "How to generate your Access Key",
    steps: [
      {
        text: "Log in to the Developer Portal",
        url: "https://dev.example.com/login"
      },
      {
        text: "Go to 'Account Settings' → 'API Access'"
      },
      {
        text: "Click 'Create New Key' and select the required permissions"
      },
      {
        text: "Give your key a name (e.g. 'Development') and click 'Generate'"
      }
    ],
    additionalInfo: "For security reasons, your key will only be shown once during generation. Store it safely."
  }
};