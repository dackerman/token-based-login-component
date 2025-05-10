import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  EyeOff, 
  ChevronDown, 
  Sun, 
  Moon, 
  ShieldAlert,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// Define types for our configurable component
type BrandingConfig = {
  companyName: string;
  companyLogo?: string | React.ReactNode;
  serviceDescription: string;
  serviceProvider?: string;
  primaryColor?: string;
  backgroundColor?: string;
  headerBackground?: string;
};

type RegionOption = {
  value: string;
  label: string;
};

type ApiKeyInstructionConfig = {
  show: boolean;
  title?: string;
  steps?: Array<{
    text: string;
    url?: string;
  }>;
  additionalInfo?: string;
};

type ConsentScreenConfig = {
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
};

// Default configuration
const defaultConfig: ConsentScreenConfig = {
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

// Demo configuration - in a real app this would come from props or API
const demoConfig: ConsentScreenConfig = {
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

export default function ConsentScreen() {
  // For demo purposes, we'll toggle between configurations
  const [useAltConfig, setUseAltConfig] = useState(false);
  
  // Merge the selected configuration with defaults
  const config = useAltConfig 
    ? { ...defaultConfig, ...demoConfig } 
    : defaultConfig;
  
  // State for theme
  const [theme, setTheme] = useState<"light" | "dark">(
    config.defaultTheme === 'dark' ? "dark" : "light"
  );
  
  // State for form fields
  const [apiToken, setApiToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(config.showAdvancedByDefault || false);
  const [region, setRegion] = useState(config.regions?.[0]?.value || "");
  const [apiVersion, setApiVersion] = useState(config.defaultApiVersion || "");
  const [timeout, setTimeout] = useState(config.defaultTimeout || 30);
  
  // State for form validation
  const [errors, setErrors] = useState({
    apiToken: false
  });
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Theme toggling based on system preference by default
  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    
    if (config.defaultTheme === 'system') {
      if (savedTheme === "dark" || 
        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Use the specified default theme
      if (config.defaultTheme === 'dark') {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, [config.defaultTheme]);
  
  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newTheme;
    });
  };
  
  // Handle form validation
  const validateForm = () => {
    const newErrors = {
      apiToken: !apiToken.trim()
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setStatus("idle");
    
    // Simulate API request
    window.setTimeout(() => {
      // Simulate 70% success rate for demo
      const isSuccess = Math.random() > 0.3;
      
      setIsSubmitting(false);
      
      if (isSuccess) {
        setStatus("success");
        // Reset form after 2 seconds on success
        window.setTimeout(() => {
          // In a real app, this would redirect to another page
          setStatus("idle");
          resetForm();
        }, 2000);
      } else {
        setStatus("error");
        setErrorMessage("Invalid API token. Please check and try again.");
      }
    }, 1500);
  };
  
  // Reset form
  const resetForm = () => {
    setApiToken("");
    setStatus("idle");
    setErrors({
      apiToken: false
    });
  };
  
  // Handle cancel
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel the authorization?")) {
      resetForm();
    }
  };
  
  // Calculate shadow class based on intensity
  const getShadowClass = () => {
    const intensity = config.customStyles?.shadowIntensity || 'medium';
    switch (intensity) {
      case 'light': return 'shadow-sm';
      case 'heavy': return 'shadow-lg';
      case 'medium':
      default: return 'shadow-md';
    }
  };
  
  // Get primary color styles
  const getPrimaryColorStyles = () => {
    if (config.branding.primaryColor) {
      return {
        color: config.branding.primaryColor
      };
    }
    return {};
  };
  
  // Toggle between configuration examples (for demo purposes)
  const toggleConfigExample = () => {
    setUseAltConfig(!useAltConfig);
  };
  
  return (
    <div 
      className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-200 min-h-screen font-sans transition-colors duration-300"
      style={config.branding.backgroundColor ? { backgroundColor: config.branding.backgroundColor } : {}}
    >
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        
        {/* Demo controls - would be removed in production */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <button
            onClick={toggleConfigExample}
            className="text-xs bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            {useAltConfig ? "Show Default Config" : "Show Alternate Config"}
          </button>
        </div>
        
        {/* Theme Toggle */}
        {config.enableThemeToggle && (
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <label className="inline-flex items-center cursor-pointer">
              <span className="mr-2 text-sm">
                {theme === "light" ? (
                  <Sun className="text-slate-600" size={16} />
                ) : (
                  <Moon className="text-slate-400" size={16} />
                )}
              </span>
              <div className="relative inline-block">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${
                  theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                }`}></div>
                <div className={`absolute left-0.5 top-0.5 bg-white dark:bg-slate-200 w-5 h-5 rounded-full shadow transform transition-transform ${
                  theme === "dark" ? "translate-x-5" : ""
                }`}></div>
              </div>
            </label>
          </div>
        )}
        
        {/* Auth Card */}
        <Card className={`w-full ${config.customStyles?.cardWidth || 'max-w-md'} bg-white dark:bg-slate-900 ${config.customStyles?.borderRadius || 'rounded-xl'} ${getShadowClass()} p-6 md:p-8 transition-all duration-300`}>
          <CardContent className="p-0">
            
            {/* Brand Header */}
            <div 
              className="flex flex-col items-center justify-center mb-6 p-4 rounded-lg"
              style={config.branding.headerBackground ? { backgroundColor: config.branding.headerBackground } : {}}
            >
              <div className="w-20 h-20 mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {/* Company logo container */}
                {typeof config.branding.companyLogo === 'string' ? (
                  <img 
                    src={config.branding.companyLogo} 
                    alt={`${config.branding.companyName} logo`} 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : config.branding.companyLogo ? (
                  config.branding.companyLogo
                ) : (
                  <ShieldAlert 
                    className="text-primary text-4xl" 
                    style={getPrimaryColorStyles()}
                  />
                )}
              </div>
              <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white"
                  style={getPrimaryColorStyles()}>
                {config.branding.companyName}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">
                {config.branding.serviceDescription}
              </p>
              {config.branding.serviceProvider && (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-1">
                  Provided by {config.branding.serviceProvider}
                </p>
              )}
            </div>
            
            {/* Status Alerts */}
            {status === "success" && (
              <Alert className="mb-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <AlertDescription>
                  Authorization successful! Redirecting...
                </AlertDescription>
              </Alert>
            )}
            
            {status === "error" && (
              <Alert className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}
            
            {/* Auth Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* API Token Input */}
              <div className="space-y-2">
                <Label htmlFor="api-token" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {config.apiTokenLabel || "API Token"} <span className="text-red-500">*</span>
                </Label>
                <div className={`form-control relative rounded-md shadow-sm border transition-all duration-200 ${
                  errors.apiToken ? "error border-red-500" : "border-slate-300 dark:border-slate-700"
                }`}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="api-token"
                    className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={config.apiTokenPlaceholder || "Enter your API token"}
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle token visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="text-lg" />
                      ) : (
                        <Eye className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.apiToken && (
                  <p className="text-sm text-red-500">API token is required</p>
                )}
                
                {/* API Key Instructions */}
                {config.apiKeyInstructions?.show && (
                  <div className="mt-3 text-sm bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 border border-blue-100 dark:border-blue-900/50">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                      {config.apiKeyInstructions.title || "How to get your API token"}
                    </h4>
                    {config.apiKeyInstructions.steps && (
                      <ol className="list-decimal pl-5 text-slate-700 dark:text-slate-300 space-y-1">
                        {config.apiKeyInstructions.steps.map((step, index) => (
                          <li key={index}>
                            {step.url ? (
                              <a 
                                href={step.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                                style={config.branding.primaryColor ? { color: config.branding.primaryColor } : {}}
                              >
                                {step.text}
                              </a>
                            ) : (
                              step.text
                            )}
                          </li>
                        ))}
                      </ol>
                    )}
                    {config.apiKeyInstructions.additionalInfo && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic">
                        {config.apiKeyInstructions.additionalInfo}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Additional Configuration (collapsible) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {config.advancedConfigLabel || "Advanced Configuration"}
                  </h3>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 text-sm focus:outline-none flex items-center"
                    style={getPrimaryColorStyles()}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <span>{showAdvanced ? "Hide" : "Show"}</span>
                    <ChevronDown 
                      className={`ml-1 transition-transform ${showAdvanced ? "rotate-180" : ""}`} 
                      size={16}
                    />
                  </button>
                </div>
                
                {/* Advanced Configuration Fields */}
                {showAdvanced && (
                  <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4 mt-2">
                    {/* Region Selection */}
                    {config.showRegionSelector && config.regions && config.regions.length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="region" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Region
                        </Label>
                        <Select value={region} onValueChange={setRegion}>
                          <SelectTrigger className="w-full rounded-md border border-slate-300 dark:border-slate-700">
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                          <SelectContent>
                            {config.regions.map(region => (
                              <SelectItem key={region.value} value={region.value}>
                                {region.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {/* API Version */}
                    {config.showApiVersionField && (
                      <div className="space-y-2">
                        <Label htmlFor="api-version" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          API Version
                        </Label>
                        <Input
                          type="text"
                          id="api-version"
                          className="rounded-md border border-slate-300 dark:border-slate-700"
                          placeholder="e.g., v2.1"
                          value={apiVersion}
                          onChange={(e) => setApiVersion(e.target.value)}
                        />
                      </div>
                    )}
                    
                    {/* Timeout */}
                    {config.showTimeoutField && (
                      <div className="space-y-2">
                        <Label htmlFor="timeout" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Request Timeout (seconds)
                        </Label>
                        <Input
                          type="number"
                          id="timeout"
                          className="rounded-md border border-slate-300 dark:border-slate-700"
                          min={1}
                          max={60}
                          value={timeout}
                          onChange={(e) => setTimeout(parseInt(e.target.value) || 30)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Form Actions */}
              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  style={config.branding.primaryColor ? { 
                    backgroundColor: config.branding.primaryColor,
                    borderColor: config.branding.primaryColor
                  } : {}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-opacity-50 spinner mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    config.submitButtonText || "Authorize"
                  )}
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  {config.cancelButtonText || "Cancel"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}