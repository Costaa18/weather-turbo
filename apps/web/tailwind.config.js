/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				keyframes: {
					'jello-vertical': {
						'0%': { transform: 'scale3d(1, 1, 1)' },
						'30%': { transform: 'scale3d(0.75, 1.25, 1)' },
						'40%': { transform: 'scale3d(1.25, 0.75, 1)' },
						'50%': { transform: 'scale3d(0.85, 1.15, 1)' },
						'65%': { transform: 'scale3d(1.05, 0.95, 1)' },
						'75%': { transform: 'scale3d(0.95, 1.05, 1)' },
						'100%': { transform: 'scale3d(1, 1, 1)' },
					},
				},
				animation: {
					'jello-vertical': 'jello-vertical 0.9s both',
				},
				screens: {
					'sm': '640px',
					// => @media (min-width: 640px) { ... }

					'md': '768px',
					// => @media (min-width: 768px) { ... }

					'lg': '1024px',
					// => @media (min-width: 1024px) { ... }

					'xl': '1280px',
					// => @media (min-width: 1280px) { ... }

					'2xl': '1536px',
					// => @media (min-width: 1536px) { ... }
				}
			}
		},

	},
	plugins: [require("tailwindcss-animate")],
}

