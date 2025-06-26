import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['system-ui', 'sans-serif'],
				mono: [
					'ui-monospace',
					'SFMono-Regular',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace',
				],
			},
			animation: {
				'bounce-slow': 'bounce 2s infinite',
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			colors: {
				// Telegram цвета (оригинальные)
				'telegram-white': 'var(--tg-theme-bg-color)',
				'telegram-black': 'var(--tg-theme-text-color)',
				'telegram-hint': 'var(--tg-theme-hint-color)',
				'telegram-link': 'var(--tg-theme-link-color)',
				'telegram-button': 'var(--tg-theme-button-color)',
				'telegram-button-text': 'var(--tg-theme-button-text-color)',
				'telegram-secondary-bg': 'var(--tg-theme-secondary-bg-color)',
				'telegram-accent':
					'var(--tg-theme-accent-bg-color, var(--tg-theme-button-color))',

				// Shadcn/ui цвета (интегрированные с Telegram)
				background: 'var(--tg-theme-bg-color)',
				foreground: 'var(--tg-theme-text-color)',
				card: 'var(--tg-theme-bg-color)',
				'card-foreground': 'var(--tg-theme-text-color)',
				popover: 'var(--tg-theme-bg-color)',
				'popover-foreground': 'var(--tg-theme-text-color)',
				primary: 'var(--tg-theme-button-color)',
				'primary-foreground': 'var(--tg-theme-button-text-color)',
				secondary: 'var(--tg-theme-secondary-bg-color)',
				'secondary-foreground': 'var(--tg-theme-text-color)',
				muted: 'var(--tg-theme-secondary-bg-color)',
				'muted-foreground': 'var(--tg-theme-hint-color)',
				accent: 'var(--tg-theme-accent-bg-color, var(--tg-theme-button-color))',
				'accent-foreground': 'var(--tg-theme-text-color)',
				destructive: 'hsl(0 84.2% 60.2%)',
				'destructive-foreground': 'hsl(210 40% 98%)',
				border: 'var(--tg-theme-hint-color)',
				input: 'var(--tg-theme-secondary-bg-color)',
				ring: 'var(--tg-theme-button-color)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [],
}
export default config
