# Publishing and Using the OAuth Consent Screen Component

## Publishing to NPM

To publish this component as an NPM package:

1. **Navigate to the component directory**

```bash
cd client/src/components/oauth-consent
```

2. **Install the dependencies**

```bash
npm install
```

3. **Build the package**

```bash
npm run build
```

4. **Log in to NPM**

```bash
npm login
```

5. **Publish the package**

```bash
npm publish
```

## Using the Component in Another Project

### Installation

```bash
npm install oauth-consent-screen
```

or

```bash
yarn add oauth-consent-screen
```

### Basic Usage

```jsx
import React from 'react';
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

export default App;
```

### Complete Example with Form Handling

```jsx
import React from 'react';
import { ConsentScreen, ConsentFormData } from 'oauth-consent-screen';

function AuthPage() {
  const handleSubmit = (data: ConsentFormData) => {
    console.log('Submitting data:', data);
    
    // Make API call to authenticate
    fetch('/api/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        // Handle successful authentication, e.g., redirect
        window.location.href = '/dashboard';
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleCancel = () => {
    // Redirect user back to home page or previous page
    window.location.href = '/';
  };

  return (
    <ConsentScreen
      config={{
        branding: {
          companyName: "API Service",
          serviceDescription: "Connect to our developer API",
          primaryColor: "#3b82f6",
          serviceProvider: "Developer Platform"
        },
        apiTokenLabel: "Developer Token",
        apiTokenPlaceholder: "Enter your developer token",
        submitButtonText: "Connect",
        cancelButtonText: "Go Back",
        onSubmit: handleSubmit,
        onCancel: handleCancel,
        apiKeyInstructions: {
          show: true,
          title: "How to get your Developer Token",
          steps: [
            {
              text: "Log in to the Developer Portal",
              url: "https://developers.mycompany.com/login"
            },
            {
              text: "Go to 'API Keys' in your account settings"
            },
            {
              text: "Click 'Generate New Token' and set permissions"
            }
          ],
          additionalInfo: "Keep your token secure. Don't share it publicly."
        }
      }}
    />
  );
}

export default AuthPage;
```

### Using with Next.js

In Next.js projects, you might need to use dynamic imports to avoid server-side rendering issues:

```jsx
import dynamic from 'next/dynamic';
import { ConsentScreenConfig } from 'oauth-consent-screen';

// Dynamically import the component
const ConsentScreen = dynamic(
  () => import('oauth-consent-screen').then(mod => mod.ConsentScreen),
  { ssr: false }
);

export default function AuthPage() {
  const config: ConsentScreenConfig = {
    branding: {
      companyName: "My Next.js App",
      serviceDescription: "Connect to our API"
    }
  };

  return <ConsentScreen config={config} />;
}
```

### Integration with Popular Frameworks

#### Using with React Router

```jsx
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ConsentScreen } from 'oauth-consent-screen';

function AuthScreen() {
  const navigate = useNavigate();
  
  const handleSubmit = (data) => {
    // Process auth...
    navigate('/dashboard');
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  return (
    <ConsentScreen 
      config={{
        branding: {
          companyName: "My App",
          serviceDescription: "API Access"
        },
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

#### Using with React Context for Global State

```jsx
import { createContext, useContext, useState } from 'react';
import { ConsentScreen } from 'oauth-consent-screen';

// Create auth context
const AuthContext = createContext(null);

// Auth provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (token) => {
    // Authenticate user with token
    setUser({ token });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
function useAuth() {
  return useContext(AuthContext);
}

// Auth screen
function AuthScreen() {
  const { login } = useAuth();
  
  const handleSubmit = (data) => {
    login(data.apiToken);
  };
  
  return (
    <ConsentScreen 
      config={{
        branding: {
          companyName: "My App",
          serviceDescription: "API Access"
        },
        onSubmit: handleSubmit
      }}
    />
  );
}

// App
function App() {
  return (
    <AuthProvider>
      {/* Your app here */}
    </AuthProvider>
  );
}
```

## Customization

The component is highly customizable through the `config` prop. You can customize the branding, labels, behaviors, and styles. See the README.md file for comprehensive documentation of all available options.