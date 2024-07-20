/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "loader-fwd": "loader-fwd 8s linear infinite",
        pulse1: "pulse1 0.3s linear infinite",
        pulse2: "pulse2 0.3s linear infinite",
      },
      keyframes: {
        "loader-fwd": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        pulse1: {
          "0%": { transform: "rotate(-45deg) translateX(0px)", opacity: "0.7" },
          "100%": {
            transform: "rotate(-45deg) translateX(-45px)",
            opacity: "0",
          },
        },
        pulse2: {
          "0%": { transform: "rotate(45deg) translateX(0px)", opacity: "1" },
          "100%": {
            transform: "rotate(45deg) translateX(-45px)",
            opacity: "0.7",
          },
        },
      },
      colors: {
        "loader-bg": "#4a5568", // Background color for the loader
        "loader-progress": "#4a5568", // Background color of the progress bar
        "loader-animated": "#cbd5e0", // Color for animated lines
        "input-background": "#f0f0f0", // Example color
        "input-text": "#333", // Example color
        "input-placeholder": "#aaa", // Example color
        "input-button-background": "#007bff", // Example color
        "input-button-hover": "#0056b3", // Example color
      },
      boxShadow: {
        loader: "0 0 10px rgba(0, 0, 0, 0.1)", // Shadow for the loader
        input: "0 2px 4px rgba(0, 0, 0, 0.1)", // Example shadow
      },
    },
  },
  plugins: [],
};
