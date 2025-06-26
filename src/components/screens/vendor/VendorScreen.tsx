'use client'

import { ProductItem } from '@/components/entity/products/ProductItem/ProductItem'
import { useRouter } from 'next/navigation'
import styles from './VendorScreen.module.css'

const restaurantData = {
	name: 'Пиццерия Неаполь',
	deliveryTime: '~15 мин',
	bikeTime: '~15 мин',
	categories: ['Популярное', 'Скидки', 'Комбо', 'Категория'],
	activeCategory: 'Популярное',
	products: [
		{
			id: 1,
			name: 'Пицца 4 сыра',
			weight: '100 г',
			price: 100,
			image:
				'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop',
			isPromo: true,
			promoText: 'Акция',
		},
		{
			id: 2,
			name: 'Пицца Пепперони',
			weight: '100 г',
			price: 100,
			image:
				'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop',
			isPromo: true,
			promoText: 'Акция',
		},
		{
			id: 3,
			name: 'Пицца Грибная',
			weight: '100 г',
			price: 100,
			image:
				'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop',
			isPromo: true,
			promoText: 'Акция',
		},
		{
			id: 4,
			name: 'Комбо из 4-х пицц 25 см',
			weight: '100 г',
			price: 100,
			image:
				'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
			isPromo: true,
			promoText: 'Акция',
		},
		{
			id: 5,
			name: 'Весенняя',
			weight: '100 г',
			price: 100,
			image:
				'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=200&fit=crop',
			isPromo: true,
			promoText: 'Акция',
		},
		{
			id: 6,
			name: 'Название',
			weight: '100 г',
			price: 100,
			image:
				'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=300&h=200&fit=crop',
			isPromo: true,
			promoText: 'Акция',
		},
	],
}

export default function VendorScreen() {
	const router = useRouter()

	const handleBack = () => {
		router.back()
	}

	return (
		<div className={styles.container}>
			{/* Header с изображением ресторана */}
			<div className={styles.header}>
				<div className={styles.headerImage}>
					<img
						src='https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop'
						alt='Пиццерия Неаполь'
						className={styles.restaurantImage}
					/>

					{/* Время доставки */}
					<div className={styles.deliveryBadges}>
						<div className={styles.badge}>
							<span className={styles.badgeIcon}>👨‍🍳</span>
							<span className={styles.badgeText}>
								{restaurantData.deliveryTime}
							</span>
						</div>
						<div className={styles.badge}>
							<span className={styles.badgeIcon}>🚴</span>
							<span className={styles.badgeText}>
								{restaurantData.bikeTime}
							</span>
						</div>
						<button className={styles.infoButton}>i</button>
					</div>

					{/* Кнопка назад */}
					<button className={styles.backButton} onClick={handleBack}>
						‹
					</button>
				</div>

				{/* Название ресторана */}
				<div className={styles.restaurantInfo}>
					<h1 className={styles.restaurantName}>{restaurantData.name}</h1>
				</div>
			</div>

			{/* Категории */}
			<div className={styles.categoriesContainer}>
				<div className={styles.categories}>
					{restaurantData.categories.map((category) => (
						<button
							key={category}
							className={`${styles.categoryButton} ${
								category === restaurantData.activeCategory
									? styles.categoryActive
									: styles.categoryInactive
							}`}
						>
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Заголовок секции */}
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>Популярное</h2>
			</div>

			{/* Сетка товаров */}
			<div className={styles.productsGrid}>
				{restaurantData.products.map((product) => (
					<ProductItem key={product.id} />
				))}
			</div>
		</div>
	)
}
