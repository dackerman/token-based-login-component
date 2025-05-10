// OAuth Consent Screen Component Library
import './styles.css';

// Export the main component
export { ConsentScreen } from './ConsentScreen';

// Export types
export type {
  BrandingConfig,
  RegionOption,
  ApiKeyInstructionConfig,
  ConsentScreenConfig,
  ConsentFormData,
  ConsentScreenProps
} from './types';

// Export default configurations
export { defaultConfig, demoConfig } from './default-config';

// Export utility functions
export {
  getShadowClass,
  getPrimaryColorStyles,
  getButtonPrimaryColorStyles,
  getBackgroundColorStyles,
  getHeaderBackgroundStyles
} from './utils';