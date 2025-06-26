'use client'

import { useTelegramInitData } from '@/hooks/useTelegramInitData'

const profileMenuItems = [
	{ id: 1, title: 'Мои заказы', icon: '📦', href: '/profile/orders' },
	{ id: 2, title: 'Адреса доставки', icon: '📍', href: '/profile/addresses' },
	{ id: 3, title: 'Способы оплаты', icon: '💳', href: '/profile/payments' },
	{ id: 4, title: 'Уведомления', icon: '🔔', href: '/profile/notifications' },
	{ id: 5, title: 'Поддержка', icon: '💬', href: '/profile/support' },
	{ id: 6, title: 'О приложении', icon: 'ℹ️', href: '/profile/about' },
]

export default function ProfilePage() {
	const { initData, isReady } = useTelegramInitData()

	return (
		<div style={{ padding: '2rem 1rem 5rem', minHeight: '100vh' }}>
			<h1
				style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}
			>
				Профиль
			</h1>

			<div
				style={{
					backgroundColor: '#f9fafb',
					padding: '1.5rem',
					borderRadius: '0.5rem',
					marginBottom: '1rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '1rem',
					}}
				>
					<div
						style={{
							width: '3rem',
							height: '3rem',
							backgroundColor: '#fbbf24',
							borderRadius: '50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '1.5rem',
							marginRight: '1rem',
						}}
					>
						👤
					</div>
					<div>
						<h2
							style={{
								fontSize: '1.125rem',
								fontWeight: '600',
								marginBottom: '0.25rem',
							}}
						>
							Пользователь
						</h2>
						<p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
							@telegram_user
						</p>
					</div>
				</div>
			</div>

			<div
				style={{
					backgroundColor: 'white',
					borderRadius: '0.5rem',
					overflow: 'hidden',
					boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
				}}
			>
				<div
					style={{
						padding: '1rem',
						borderBottom: '1px solid #e5e7eb',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<span>Мои заказы</span>
					<span style={{ color: '#9ca3af' }}>›</span>
				</div>
				<div
					style={{
						padding: '1rem',
						borderBottom: '1px solid #e5e7eb',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<span>Настройки</span>
					<span style={{ color: '#9ca3af' }}>›</span>
				</div>
				<div
					style={{
						padding: '1rem',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<span>Поддержка</span>
					<span style={{ color: '#9ca3af' }}>›</span>
				</div>
			</div>
		</div>
	)
}
