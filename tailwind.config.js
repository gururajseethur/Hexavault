/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#02040a",
        surface: "#0a0f1d",
        glass: "rgba(10, 15, 30, 0.4)",
        "glass-border": "rgba(0, 180, 255, 0.2)",
        primary: {
          DEFAULT: "#00d2ff", // Electric Cyan
          vibrant: "#0072ff", // Royal Blue
          indigo: "#6366f1",
        },
        cyan: "#00d2ff",
        blue: "#0072ff",
        purple: "#a855f7",
        "soft-white": "#f0f9ff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'scan': 'scan 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.1)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
