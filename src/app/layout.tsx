import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/providers/QueryProvider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Skorotut - Доставка еды и товаров',
	description: 'Telegram Web App для заказа еды и товаров',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<head>
				<script
					src='https://telegram.org/js/telegram-web-app.js'
					async
				></script>
			</head>
			<body className='antialiased' suppressHydrationWarning>
				<QueryProvider>
					{children}
					<BottomNavigation />
					{/* <DataStatus /> */}
					{/* <ApiTester /> */}
					<Toaster />
				</QueryProvider>
			</body>
		</html>
	)
}
