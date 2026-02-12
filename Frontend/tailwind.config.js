/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F97316',
        error: '#DC2626',
        'blue-dark': '#003D99',
        'blue-light': '#E3F2FD',
        'trust': '#0066CC',
        'accent': '#F59E0B',
        'card': '#FFFFFF',
        'border': '#E5E7EB',
        'foreground': '#1F2937',
        'muted-foreground': '#6B7280',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
}
