import { ConsentScreenConfig } from './types';

// Calculate shadow class based on intensity
export const getShadowClass = (config: ConsentScreenConfig) => {
  const intensity = config.customStyles?.shadowIntensity || 'medium';
  switch (intensity) {
    case 'light': return 'shadow-sm';
    case 'heavy': return 'shadow-lg';
    case 'medium':
    default: return 'shadow-md';
  }
};

// Get primary color styles
export const getPrimaryColorStyles = (config: ConsentScreenConfig) => {
  if (config.branding.primaryColor) {
    return {
      color: config.branding.primaryColor
    };
  }
  return {};
};

// Get button primary color styles
export const getButtonPrimaryColorStyles = (config: ConsentScreenConfig) => {
  if (config.branding.primaryColor) {
    return { 
      backgroundColor: config.branding.primaryColor,
      borderColor: config.branding.primaryColor
    };
  }
  return {};
};

// Get background color styles
export const getBackgroundColorStyles = (config: ConsentScreenConfig) => {
  if (config.branding.backgroundColor) {
    return { backgroundColor: config.branding.backgroundColor };
  }
  return {};
};

// Get header background color styles
export const getHeaderBackgroundStyles = (config: ConsentScreenConfig) => {
  if (config.branding.headerBackground) {
    return { backgroundColor: config.branding.headerBackground };
  }
  return {};
};