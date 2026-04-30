import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },

        wipeLeft: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },

        wipeRight: {
          "0%": { clipPath: "inset(0 0 0 100%)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },

        wipeRightLoop: {
          "0%": { clipPath: "inset(0 0 0 100%)" },
          "40%": { clipPath: "inset(0 0 0 0)" },
          "80%": { clipPath: "inset(0 0 0 0)" },
          "100%": { clipPath: "inset(0 0 0 100%)" },
        },

        slideX: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(calc(100% - 1980px))" },
          "100%": { transform: "translateX(0%)" },
        },

        brainFadeGlow: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
            filter: "drop-shadow(0 0 0px rgba(124,90,235,0))",
            WebkitFilter: "drop-shadow(0 0 0px rgba(124,90,235,0))",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "drop-shadow(0 0 20px rgba(124,90,235,0.6))",
            WebkitFilter: "drop-shadow(0 0 20px rgba(124,90,235,0.6))",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "drop-shadow(0 0 12px rgba(124,90,235,0.4))",
            WebkitFilter: "drop-shadow(0 0 12px rgba(124,90,235,0.4))",
          },
        },

        diagonalWipe: {
          "0%": {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            WebkitClipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          },
          "100%": {
            clipPath: "polygon(0 0, 100% 0, 120% 100%, 0 100%)",
            WebkitClipPath: "polygon(0 0, 100% 0, 120% 100%, 0 100%)",
          },
        },
      },

      animation: {
        brainFadeGlow: "brainFadeGlow 2.5s ease-out forwards",
        diagonalWipe: "diagonalWipe 1.5s ease-out forwards",
        fadeIn: "fadeIn 2s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        wipeLeft: "wipeLeft 2s ease-out forwards",
        wipeRight: "wipeRight 2s ease-out forwards",
        "wipe-right-loop":
          "wipeRightLoop 10s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        slideX: "slideX 10s linear infinite",
      },

      animationDelay: {
        2500: "2500ms",
      },

      rotate: {
        "y-0": "rotateY(0deg)",
        "y-180": "rotateY(180deg)",
      },

      backfaceVisibility: {
        hidden: "hidden",
      },

      transformStyle: {
        "preserve-3d": "preserve-3d",
      },

      perspective: {
        1000: "1000px",
      },
    },
  },

  // corePlugins: {
  //   filter: true, // needed for drop-shadow in keyframes
  //   backdropFilter: true,
  // },

  plugins: [
    function ({ addUtilities }:any) {
      addUtilities({
        ".backface-hidden": { backfaceVisibility: "hidden" },
        ".transform-style-preserve-3d": { transformStyle: "preserve-3d" },
        ".rotate-y-0": { transform: "rotateY(0deg)" },
        ".rotate-y-180": { transform: "rotateY(180deg)" },
        ".perspective-1000": { perspective: "1000px" },
      });
    },
  ],
};

export default config;