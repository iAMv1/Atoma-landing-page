/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            /* Color Palette - Premium EV Design System */
            colors: {
                void: "#000000",
                obsidian: "#0A0A0A",
                charcoal: "#141414",
                graphite: "#1C1C1C",
                smoke: "#2A2A2A",

                mist: "#F5F5F5",
                cloud: "#A3A3A3",
                ash: "#6B6B6B",

                /* Primary Accent - Electric Amber */
                accent: {
                    DEFAULT: "#FF6B00",
                    primary: "#FF6B00",
                    glow: "#FF8C33",
                    ember: "#CC5500",
                    fade: "rgba(255, 107, 0, 0.15)",
                    warm: "hsl(25, 90% 55%)",
                    "warm-foreground": "hsl(0, 0%, 95%)",
                },

                /* Secondary Accent - Electric Blue */
                tech: {
                    DEFAULT: "#00A8FF",
                    glow: "#33BFFF",
                    fade: "rgba(0, 168, 255, 0.12)",
                },

                /* Surface Colors */
                glass: "rgba(255, 255, 255, 0.03)",
                frost: "rgba(255, 255, 255, 0.05)",
                ice: "rgba(255, 255, 255, 0.08)",

                /* Border Colors */
                "border-subtle": "rgba(255, 255, 255, 0.06)",
                "border-default": "rgba(255, 255, 255, 0.12)",
                "border-emphasis": "rgba(255, 255, 255, 0.24)",

                /* Tailwind compatibility */
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
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },

            /* Font Families */
            fontFamily: {
                heading: ['Outfit', 'system-ui', 'sans-serif'],
                body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },

            /* Typography Scale - Fluid */
            fontSize: {
                'display': 'clamp(3rem, 10vw, 6rem)',
                'h1': 'clamp(2.5rem, 8vw, 5.5rem)',
                'h2': 'clamp(2rem, 5vw, 4rem)',
                'h3': 'clamp(1.5rem, 3vw, 2.5rem)',
                'h4': 'clamp(1.25rem, 2vw, 1.75rem)',
                'body-lg': 'clamp(1.125rem, 1vw, 1.25rem)',
                'body': '1rem',
                'body-sm': 'clamp(0.875rem, 0.5vw, 0.9375rem)',
                'caption': 'clamp(0.75rem, 0.3vw, 0.8125rem)',
            },

            /* Line Heights */
            leading: {
                'display': '1.02',
                'h1': '1.05',
                'h2': '1.1',
                'h3': '1.2',
                'body': '1.7',
                'body-lg': '1.7',
                'body-sm': '1.6',
                'caption': '1.5',
            },

            /* Letter Spacing */
            tracking: {
                'tightest': '-0.05em',
                'tighter': '-0.03em',
                'tight': '-0.02em',
                'normal': '0',
                'wide': '0.02em',
                'wider': '0.04em',
                'widest': '0.08em',
            },

            /* Border Radius */
            borderRadius: {
                'sm': '4px',
                'md': '8px',
                'lg': '16px',
                'xl': '24px',
                '2xl': '40px',
                '3xl': '64px',
            },

            /* Backdrop Blur */
            blur: {
                'xs': '4px',
                'sm': '8px',
                'md': '16px',
                'lg': '24px',
                'xl': '40px',
                '2xl': '64px',
            },

            /* Spacing */
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
                '50': '12.5rem',
                '70': '17.5rem',
            },

            /* Keyframes */
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(255, 107, 0, 0.5)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },

            /* Animation */
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-out": "fade-out 0.5s ease-out forwards",
                "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
            },

            /* Transition Timing Functions */
            transitionTimingFunction: {
                'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'snap': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'reveal': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                'momentum': 'cubic-bezier(0.42, 0, 0.58, 1)',
            },

            /* Box Shadow */
            boxShadow: {
                'glow': '0 0 40px rgba(255, 107, 0, 0.3)',
                'glow-sm': '0 0 20px rgba(255, 107, 0, 0.2)',
                'glow-lg': '0 0 60px rgba(255, 107, 0, 0.4)',
                'glow-tech': '0 0 40px rgba(0, 168, 255, 0.3)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
                'elevated': '0 8px 48px rgba(0, 0, 0, 0.6)',
                'inner-glow': 'inset 0 0 20px rgba(255, 107, 0, 0.1)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
