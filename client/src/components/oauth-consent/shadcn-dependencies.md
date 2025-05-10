# Shadcn UI Dependencies

This component uses Shadcn UI components which are not published as an npm package. When using this component in another project, you'll need to make sure the required Shadcn UI components are available.

## Required Shadcn UI Components

The OAuth Consent Screen uses the following Shadcn UI components:

- Card, CardContent
- Label
- Input
- Button
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Alert, AlertDescription

## Installation Options

### Option 1: Install Shadcn UI in your project (Recommended)

The best way to use this component is to properly install Shadcn UI in your project following their documentation:

https://ui.shadcn.com/docs/installation

This ensures that all the required components are available and styled correctly.

### Option 2: Copy Required Components

If you don't want to install the entire Shadcn UI library, you can copy just the required components from the Shadcn UI website:

1. Visit https://ui.shadcn.com/docs/components
2. For each required component (listed above), click on the component and then "Installation"
3. Follow the instructions to add the component to your project

### Option 3: Use the Bundled Version (Coming Soon)

In a future version, we plan to provide a fully bundled version of the OAuth Consent Screen that includes all necessary UI components.

## Styling Requirements

The component requires Tailwind CSS for styling. Make sure Tailwind CSS is installed and configured in your project.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

And configure your `tailwind.config.js` to include the necessary paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/oauth-consent-screen/**/*.{js,ts,jsx,tsx}" // Add this line
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## CSS Variables

The component uses CSS variables for theming. Make sure to include these in your global CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 215 20.2% 65.1%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
 
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
 
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
 
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
 
    --border: 216 34% 17%;
    --input: 216 34% 17%;
 
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
 
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
 
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
 
    --ring: 216 34% 17%;
 
    --radius: 0.5rem;
  }
}