import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function ConsentScreen() {
  // State for theme
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // State for form fields
  const [apiToken, setApiToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [region, setRegion] = useState("us-east-1");
  const [apiVersion, setApiVersion] = useState("v2.0");
  const [timeout, setTimeout] = useState(30);
  
  // State for permissions
  const [permissions, setPermissions] = useState({
    read: true,
    write: true,
    delete: false
  });
  
  // State for terms agreement
  const [termsAgreed, setTermsAgreed] = useState(false);
  
  // State for form validation
  const [errors, setErrors] = useState({
    apiToken: false,
    termsAgreed: false
  });
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // State for branding (would be loaded from API or props in real app)
  const [branding, setBranding] = useState({
    companyName: "Acme Inc",
    serviceDescription: "Requesting API access to your account",
    serviceProvider: "API Connect"
  });
  
  // Theme toggling based on system preference by default
  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || 
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
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
      apiToken: !apiToken.trim(),
      termsAgreed: !termsAgreed
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
    setTimeout(() => {
      // Simulate 70% success rate for demo
      const isSuccess = Math.random() > 0.3;
      
      setIsSubmitting(false);
      
      if (isSuccess) {
        setStatus("success");
        // Reset form after 2 seconds on success
        setTimeout(() => {
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
    setTermsAgreed(false);
    setStatus("idle");
    setErrors({
      apiToken: false,
      termsAgreed: false
    });
  };
  
  // Handle cancel
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel the authorization?")) {
      // In a real app, this would redirect back to the application
      resetForm();
    }
  };
  
  // Toggle permission
  const togglePermission = (permission: keyof typeof permissions) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };
  
  return (
    <div className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-200 min-h-screen font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        
        {/* Theme Toggle */}
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
        
        {/* Auth Card */}
        <Card className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 md:p-8 transition-all duration-300">
          <CardContent className="p-0">
            
            {/* Brand Header */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-20 h-20 mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {/* Company logo container */}
                <ShieldAlert className="text-primary text-4xl" />
              </div>
              <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
                {branding.companyName}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">
                {branding.serviceDescription}
              </p>
            </div>
            
            {/* Auth Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* API Token Input */}
              <div className="space-y-2">
                <Label htmlFor="api-token" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  API Token <span className="text-red-500">*</span>
                </Label>
                <div className={`form-control relative rounded-md shadow-sm border transition-all duration-200 ${
                  errors.apiToken ? "error border-red-500" : "border-slate-300 dark:border-slate-700"
                }`}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="api-token"
                    className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your API token"
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
              </div>
              
              {/* Additional Configuration (collapsible) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Advanced Configuration
                  </h3>
                  <button
                    type="button"
                    className="text-primary-600 dark:text-primary-400 text-sm focus:outline-none hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
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
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Region
                      </Label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger className="w-full rounded-md border border-slate-300 dark:border-slate-700">
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                          <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                          <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                          <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* API Version */}
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
                    
                    {/* Timeout */}
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
                  </div>
                )}
              </div>
              
              {/* Permissions and Consent */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-5">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Application Permissions
                </h3>
                
                {/* Permission Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Checkbox
                      id="permission-read"
                      checked={permissions.read}
                      onCheckedChange={() => togglePermission("read")}
                      className="mt-1"
                    />
                    <div className="ml-3 text-sm">
                      <Label
                        htmlFor="permission-read"
                        className="font-medium text-slate-700 dark:text-slate-300"
                      >
                        Read Access
                      </Label>
                      <p className="text-slate-500 dark:text-slate-400">View and read data from your account</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Checkbox
                      id="permission-write"
                      checked={permissions.write}
                      onCheckedChange={() => togglePermission("write")}
                      className="mt-1"
                    />
                    <div className="ml-3 text-sm">
                      <Label
                        htmlFor="permission-write"
                        className="font-medium text-slate-700 dark:text-slate-300"
                      >
                        Write Access
                      </Label>
                      <p className="text-slate-500 dark:text-slate-400">Create and modify data in your account</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Checkbox
                      id="permission-delete"
                      checked={permissions.delete}
                      onCheckedChange={() => togglePermission("delete")}
                      className="mt-1"
                    />
                    <div className="ml-3 text-sm">
                      <Label
                        htmlFor="permission-delete"
                        className="font-medium text-slate-700 dark:text-slate-300"
                      >
                        Delete Access
                      </Label>
                      <p className="text-slate-500 dark:text-slate-400">Remove data from your account</p>
                    </div>
                  </div>
                </div>
                
                {/* Terms Agreement */}
                <div className="flex items-start mt-6">
                  <Checkbox
                    id="terms-agreement"
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                    className="mt-1"
                  />
                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="terms-agreement"
                      className="font-medium text-slate-700 dark:text-slate-300"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                </div>
                {errors.termsAgreed && (
                  <p className="text-sm text-red-500">You must agree to the terms</p>
                )}
              </div>
              
              {/* Form Actions */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner inline-block w-4 h-4 border-2 border-white border-t-transparent mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    "Authorize"
                  )}
                </Button>
              </div>
              
              {/* Submission Status Messages */}
              {status !== "idle" && (
                <div className="mt-4">
                  {status === "success" ? (
                    <Alert className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800">
                      <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                      <AlertDescription>
                        Authorization successful! Redirecting...
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800">
                      <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
                      <AlertDescription>
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </form>
            
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secured by <span className="font-medium">{branding.serviceProvider}</span> •{" "}
                <a href="#" className="text-primary hover:underline">
                  Need help?
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
