<div align="center">
  <h1>OAuth Consent Screen Component</h1>
  <p>A customizable OAuth-style consent screen with API token input and branding options</p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT">
  <img src="https://img.shields.io/badge/react-18.x-61dafb.svg" alt="React 18+">
  <img src="https://img.shields.io/badge/shadcn-ui-000000.svg" alt="Shadcn UI">
</div>

<p align="center">
  <img src="docs/screenshots/demo.png" alt="OAuth Consent Screen Demo" width="600">
</p>

## Project Overview

This project contains a fully customizable OAuth-style consent screen component built with React, TypeScript, and Shadcn UI. It's designed to be used in applications that require API token authentication with a professional, modern interface.

### Key Features

- **Fully customizable branding** - Add your company logo, name, colors, and descriptions
- **Dark/light mode support** - Built-in theme toggle with system preference detection
- **API token input** with toggleable visibility
- **Step-by-step API key instructions** - Show users how to obtain their API tokens
- **Advanced settings panel** - Configure regions, API versions, and timeouts
- **Responsive design** - Looks great on all devices
- **Built with Shadcn UI** - Beautiful, consistent design using Shadcn UI components

## Quick Demo

```jsx
import { ConsentScreen } from './client/src/components/oauth-consent';

function App() {
  return (
    <ConsentScreen 
      config={{
        branding: {
          companyName: "Your API",
          serviceDescription: "Connect to your API",
          primaryColor: "#0070f3"
        },
        onSubmit: (data) => {
          console.log("API token:", data.apiToken);
          // Handle auth here
        }
      }}
    />
  );
}
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── oauth-consent/     # Main component package
│   │   │   │   ├── ConsentScreen.tsx  # Main component
│   │   │   │   ├── types.ts           # TypeScript definitions
│   │   │   │   ├── default-config.ts  # Default configuration
│   │   │   │   ├── utils.ts           # Utility functions
│   │   │   │   ├── styles.css         # Component-specific styles
│   │   │   │   ├── README.md          # Detailed documentation
│   │   │   │   ├── package.json       # Package configuration
│   │   │   │   └── ...
│   │   │   └── ui/                # Shadcn UI components
│   │   ├── pages/
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── server/
│   └── ...
└── ...
```

## Getting Started

### Using the Component in this Project

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/oauth-consent-screen.git
   cd oauth-consent-screen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

### Using the Component in Your Own Project

The component is designed to be easily importable into other projects. Detailed instructions on how to do this can be found in the [component documentation](client/src/components/oauth-consent/README.md).

## Documentation

For detailed documentation of the component, including all available configuration options, please see:

- [Component Documentation](client/src/components/oauth-consent/README.md)
- [Usage Examples](client/src/components/oauth-consent/examples)
- [Shadcn UI Dependencies](client/src/components/oauth-consent/shadcn-dependencies.md)

## Publishing as an NPM Package

Instructions for publishing this component as an NPM package can be found in the [component usage guide](client/src/components/oauth-consent/USAGE.md).

## License

MIT © [Your Name]

---

<div align="center">
  <p>Made with ❤️ for the developer community</p>
</div>