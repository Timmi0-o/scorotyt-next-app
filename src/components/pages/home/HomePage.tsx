'use client'

import { IHomeData } from '@/actions'
import { OrderAgainSection } from '@/components/home/OrderAgainSection'
import { RestaurantSection } from '@/components/home/RestaurantSection'
import { StoresGrid } from '@/components/home/StoresGrid'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { useTelegramInitData } from '@/hooks/useTelegramInitData'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './HomePage.module.css'

export const HomePage = ({ data }: { data: IHomeData }) => {
	const sections = [
		{
			title: 'Популярное',
			items: data?.sellers,
		},
		{
			title: 'Роллы',
			items: data.sellers,
		},
		{
			title: 'Пицца',
			items: data.sellers,
		},
		{
			title: 'Бургеры',
			items: data.sellers,
		},
	]

	const { initData, isReady } = useTelegramInitData()

	const [activeSection, setActiveSection] = useState(0)

	return (
		<div className='min-h-screen bg-background'>
			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<div className={styles.addressSection}>
						<div className={styles.address}>
							Комсомольская, 3<span className={styles.dropdown}>▼</span>
						</div>
						<div className={styles.deliveryTime}>Доставка 40-60 минут</div>
					</div>
					<div className={styles.avatar}>👤</div>
				</div>

				{/* Category Tabs */}
				<div className={styles.tabsContainer}>
					<div className={styles.tabsWrapper}>
						{sections.map((section, index) => (
							<button
								key={section.title}
								className={clsx(
									styles.tab,
									activeSection === index
										? styles.tabActive
										: styles.tabInactive
								)}
								onClick={() => setActiveSection(index)}
							>
								{section.title}
							</button>
						))}
					</div>
				</div>

				<div className={styles.content}>
					{/* Заголовок Рестораны */}
					<div className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Рестораны</h2>
						<button className={styles.seeAllButton}>
							Все <span className={styles.arrow}>›</span>
						</button>
					</div>

					<RestaurantSection sellers={data.sellers || []} />

					<OrderAgainSection />
					<StoresGrid />

					{/* Delivery Banner */}
					{/* <div className={styles.deliveryBanner}>
					<button className={styles.deliveryLink}>
						доставка бесплатно
						<span className={styles.arrow}>›</span>
					</button>
				</div> */}
				</div>

				{/* Bottom Action Button - временно скрыт */}
				{/* 
			<div className={styles.bottomButton}>
				<button className={styles.actionButton}>
					<span className={styles.time}>40-60 мин</span>
					<span className={styles.text}>Далее</span>
					<span className={styles.price}>170 ₽</span>
				</button>
			</div>
			*/}
			</div>

			<BottomNavigation />

			{/* <DevTools /> */}

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
