// Example of how to import and use the OAuth Consent Screen in another project

import React from 'react';
// Import the component and types from the package
import { 
  ConsentScreen, 
  ConsentFormData, 
  ConsentScreenConfig 
} from 'oauth-consent-screen';

function AuthPage() {
  // Define handlers for form submission and cancellation
  const handleFormSubmit = (data: ConsentFormData) => {
    console.log('Form submitted with:', data);
    
    // Example API call to verify the token
    fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: data.apiToken })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // Store the token in localStorage
          localStorage.setItem('auth_token', data.apiToken);
          // Redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          // Handle authentication error
          alert('Authentication failed: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during authentication');
      });
  };

  const handleCancel = () => {
    // Redirect to home page
    window.location.href = '/';
  };

  // Define the configuration for the consent screen
  const consentConfig: ConsentScreenConfig = {
    branding: {
      companyName: "DevHub API",
      serviceDescription: "Connect your application to our developer services",
      serviceProvider: "DevHub Inc.",
      primaryColor: "#6d28d9", // Purple color
      // You can also provide a logo URL or component
      // companyLogo: "https://example.com/logo.png"
    },
    // Customize field labels
    apiTokenLabel: "Developer API Key",
    apiTokenPlaceholder: "Enter your API key",
    // Advanced settings
    advancedConfigLabel: "Connection Options",
    showAdvancedByDefault: false,
    // Regions available for selection
    regions: [
      { value: "us-west", label: "US West (Oregon)" },
      { value: "us-east", label: "US East (Virginia)" },
      { value: "eu-central", label: "EU (Frankfurt)" },
      { value: "asia-south", label: "Asia (Mumbai)" }
    ],
    // Theme settings
    enableThemeToggle: true,
    defaultTheme: 'system',
    // Button text
    submitButtonText: "Authorize Access",
    cancelButtonText: "Cancel",
    // Default values
    defaultApiVersion: "v1.0",
    defaultTimeout: 60,
    // Show/hide fields
    showRegionSelector: true,
    showApiVersionField: true,
    showTimeoutField: true,
    // API key instructions
    apiKeyInstructions: {
      show: true,
      title: "How to get your Developer API Key",
      steps: [
        {
          text: "Log in to the DevHub Portal",
          url: "https://developers.example.com/login"
        },
        {
          text: "Navigate to 'API Keys' in your account settings"
        },
        {
          text: "Click 'Generate New Key' and select the required scopes"
        },
        {
          text: "Copy the generated key and paste it here"
        }
      ],
      additionalInfo: "Your API key is sensitive information. Never share it in public repositories or forums."
    },
    // Custom styling
    customStyles: {
      cardWidth: "max-w-xl", // wider card
      borderRadius: "rounded-xl",
      shadowIntensity: 'medium'
    },
    // Event handlers
    onSubmit: handleFormSubmit,
    onCancel: handleCancel
  };

  // Render the component with the configuration
  return (
    <ConsentScreen config={consentConfig} />
  );
}

export default AuthPage;