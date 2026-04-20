/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#121212",
        glass: "rgba(255, 255, 255, 0.03)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#CCFF00", // Electric Lime
          hover: "#E6FF66",
        },
        cyan: "#00F0FF",
        amber: "#FFB800",
        danger: "#FF003C",
        muted: "#444444",
        "soft-white": "#E0E0E0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        'glow-lime': '0 0 20px rgba(204, 255, 0, 0.15)',
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.15)',
      },
      backgroundImage: {
        'noise': "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
      },
      animation: {
        'radar-sweep': 'radar 8s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}
