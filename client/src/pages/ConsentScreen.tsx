import { ConsentScreen, ConsentFormData } from "@/components/oauth-consent";

export default function ConsentScreenPage() {
  // Example of handling the form submission
  const handleSubmit = (data: ConsentFormData) => {
    console.log('Form submitted with:', data);
    // In a real application, you would process the data here
    // For example, sending it to your backend API
  };

  // Example of handling cancel
  const handleCancel = () => {
    console.log('Authorization canceled by user');
    // In a real application, you might redirect the user
  };

  return (
    <ConsentScreen 
      config={{
        branding: {
          companyName: "API Gateway",
          serviceDescription: "Connect your application to our API services",
          primaryColor: "#0070f3"
        },
        onSubmit: handleSubmit,
        onCancel: handleCancel
      }}
      showDemoControls={true} // Enable demo controls for demonstration
    />
  );
}