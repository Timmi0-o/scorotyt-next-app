'use client'

import { OrderAgainSection } from '@/components/home/OrderAgainSection'
import { RestaurantSection } from '@/components/home/RestaurantSection'
import { StoresGrid } from '@/components/home/StoresGrid'
import { mockSellersData } from '@/utils/mock-data'
import styles from './MainHomeScreen.module.css'

export default function MainHomeScreen() {
	return (
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
					<button className={`${styles.tab} ${styles.tabActive}`}>
						Популярное
					</button>
					<button className={`${styles.tab} ${styles.tabInactive}`}>
						Роллы
					</button>
					<button className={`${styles.tab} ${styles.tabInactive}`}>
						Пицца
					</button>
					<button className={`${styles.tab} ${styles.tabInactive}`}>
						Бургеры
					</button>
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

				{/* Повторяющиеся секции ресторанов как в макете */}
				<RestaurantSection sellers={mockSellersData?.slice(0, 1) || []} />
				<RestaurantSection sellers={mockSellersData?.slice(1, 2) || []} />
				<RestaurantSection sellers={mockSellersData?.slice(2, 3) || []} />

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
	)
}
