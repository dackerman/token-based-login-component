# OAuth Consent Screen Component

A customizable React component that provides an OAuth-style consent screen with configurable branding, fields, and behavior.

## Features

- Fully customizable branding (company name, logo, colors, descriptions)
- Light/dark mode with system preference detection
- API token input with toggleable visibility
- Configurable advanced settings (regions, API version, timeout)
- Step-by-step API key instructions with links
- Responsive design
- Customizable styles and appearance
- Form validation and error handling
- Event hooks for form submission and cancellation

## Installation

```bash
# Assuming you're using npm
npm install oauth-consent-screen

# Or using yarn
yarn add oauth-consent-screen
```

## Basic Usage

```jsx
import { ConsentScreen } from 'oauth-consent-screen';

function App() {
  return (
    <ConsentScreen 
      config={{
        branding: {
          companyName: "My Company",
          serviceDescription: "Connect to our API"
        }
      }}
    />
  );
}
```

## Advanced Usage

```jsx
import { ConsentScreen, ConsentFormData } from 'oauth-consent-screen';

function App() {
  // Handle form submission
  const handleSubmit = (data: ConsentFormData) => {
    console.log('Form submitted with:', data);
    // Send data to your backend API
    fetch('/api/authorize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  // Handle cancellation
  const handleCancel = () => {
    console.log('Authorization canceled');
    // Redirect user or show a different screen
  };

  return (
    <ConsentScreen 
      config={{
        branding: {
          companyName: "API Gateway",
          serviceDescription: "Connect your application to our API services",
          serviceProvider: "My API Provider",
          primaryColor: "#0070f3",
          backgroundColor: "#f5f5f5",
          headerBackground: "#f0f7ff"
        },
        apiTokenLabel: "Access Key",
        apiTokenPlaceholder: "Paste your developer access key",
        advancedConfigLabel: "Connection Settings",
        showAdvancedByDefault: false,
        regions: [
          { value: "us-east", label: "US East" },
          { value: "eu-west", label: "EU West" }
        ],
        enableThemeToggle: true,
        defaultTheme: 'system',
        submitButtonText: "Connect",
        cancelButtonText: "Cancel",
        showRegionSelector: true,
        showApiVersionField: true,
        showTimeoutField: true,
        apiKeyInstructions: {
          show: true,
          title: "How to get your Access Key",
          steps: [
            {
              text: "Log in to the Developer Portal",
              url: "https://developer.example.com/login"
            },
            { text: "Navigate to 'API Keys' under your account" },
            { text: "Click 'Generate New Key'" }
          ],
          additionalInfo: "Your key will only be shown once. Store it securely."
        },
        customStyles: {
          cardWidth: "max-w-lg",
          borderRadius: "rounded-2xl",
          shadowIntensity: 'heavy'
        },
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }}
    />
  );
}
```

## Configuration Options

### BrandingConfig

| Property | Type | Description |
|----------|------|-------------|
| companyName | string | The name of the company or service |
| companyLogo | string \| React.ReactNode | URL to logo image or a React component |
| serviceDescription | string | Description of the service requesting access |
| serviceProvider | string | Optional name of the service provider |
| primaryColor | string | Primary color (hex code) for branding elements |
| backgroundColor | string | Background color for the page |
| headerBackground | string | Background color for the header section |

### ApiKeyInstructionConfig

| Property | Type | Description |
|----------|------|-------------|
| show | boolean | Whether to show the API key instructions |
| title | string | Title for the instructions section |
| steps | Array<{text: string, url?: string}> | Step-by-step instructions, with optional URLs |
| additionalInfo | string | Additional information text |

### ConsentScreenConfig

| Property | Type | Description |
|----------|------|-------------|
| branding | BrandingConfig | Branding configuration object |
| apiTokenLabel | string | Label for the API token input |
| apiTokenPlaceholder | string | Placeholder text for the API token input |
| advancedConfigLabel | string | Label for the advanced configuration section |
| showAdvancedByDefault | boolean | Whether to expand advanced settings by default |
| regions | RegionOption[] | Array of available regions |
| enableThemeToggle | boolean | Whether to show the theme toggle |
| defaultTheme | 'light' \| 'dark' \| 'system' | Default theme setting |
| submitButtonText | string | Text for the submit button |
| cancelButtonText | string | Text for the cancel button |
| defaultApiVersion | string | Default API version value |
| defaultTimeout | number | Default timeout value in seconds |
| showRegionSelector | boolean | Whether to show the region selector |
| showApiVersionField | boolean | Whether to show the API version field |
| showTimeoutField | boolean | Whether to show the timeout field |
| apiKeyInstructions | ApiKeyInstructionConfig | Configuration for API key instructions |
| customStyles | object | Custom styling options |
| onSubmit | (data: ConsentFormData) => void | Callback function when form is submitted |
| onCancel | () => void | Callback function when form is canceled |

## Form Data

The `onSubmit` callback receives a `ConsentFormData` object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| apiToken | string | The API token value entered by the user |
| region | string | The selected region (if enabled) |
| apiVersion | string | The API version (if enabled) |
| timeout | number | The timeout value in seconds (if enabled) |

## License

MIT