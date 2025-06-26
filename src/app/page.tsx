'use client'

import { DevTools } from '@/components/DevTools'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { AppInitializer } from '@/components/screens/AppInitializer'
import MainHomeScreen from '@/components/screens/MainHomeScreen'
import { useTelegramInitData } from '@/hooks/useTelegramInitData'

function MainApp() {
	const { initData, isReady } = useTelegramInitData()

	return (
		<div className='min-h-screen bg-background'>
			{/* Основной экран с продавцами и товарами */}
			<MainHomeScreen />

			{/* Навигация внизу */}
			<BottomNavigation />

			{/* DevTools для разработки */}
			<DevTools />

			{/* Статус Telegram WebApp (скрытый оверлей для отладки) */}
			{process.env.NEXT_PUBLIC_MOCK_TELEGRAM === 'true' && (
				<div className='fixed top-2 left-2 z-50 bg-black/50 text-white text-xs px-2 py-1 rounded'>
					{!isReady
						? '🔄 Загрузка...'
						: initData?.user
						? `👋 ${initData.user.first_name}`
						: '❌ Нет данных'}
				</div>
			)}
		</div>
	)
}

export default function Home() {
	return (
		<AppInitializer>
			<MainApp />
		</AppInitializer>
	)
}
