'use client'

import { ProductItem } from '@/components/entity/products/ProductItem/ProductItem'
import { useRouter } from 'next/navigation'
import styles from './ProductDetailScreen.module.css'

interface ProductDetailScreenProps {
	productId: string
}

export function ProductDetailScreen({ productId }: ProductDetailScreenProps) {
	const router = useRouter()

	const productData = {
		id: productId,
		name: 'Суперсалат',
		weight: '200 г',
		description:
			'Описание продукта, его потребительских свойств, способа приготовления или другие подробности о товаре или особенности блюда',
		manufacturer: 'ООО Компания',
		price: 170,
		originalPrice: 200,
		image: '/image 76.png',
	}

	const recommendations = [
		{
			id: '1',
			name: 'Название',
			weight: '100 г',
			price: 100,
			isPromo: true,
			image: '/images/cake.jpg',
		},
		{
			id: '2',
			name: 'Название',
			weight: '100 г',
			price: 100,
			isPromo: true,
			image: '/images/cake.jpg',
		},
		{
			id: '3',
			name: 'Название',
			weight: '100 г',
			price: 100,
			isPromo: true,
			image: '/images/cake.jpg',
		},
	]

	return (
		<div className={styles.productCard}>
			{/* Кнопка закрыть */}
			<button className={styles.closeButton} onClick={() => router.back()}>
				×
			</button>

			{/* Изображение товара */}
			<div className={styles.productImageContainer}>
				<img
					src={productData.image}
					alt={productData.name}
					className={styles.productImage}
				/>
				{/* Индикаторы слайдов */}
				<div className={styles.slideIndicators}>
					<div className={styles.indicator}></div>
					<div className={styles.indicator}></div>
					<div className={styles.indicator}></div>
					<div className={`${styles.indicator} ${styles.active}`}></div>
				</div>
			</div>

			{/* Информация о товаре */}
			<div className={styles.productInfo}>
				<h1 className={styles.productName}>{productData.name}</h1>
				<p className={styles.productWeight}>{productData.weight}</p>

				<p className={styles.productDescription}>{productData.description}</p>

				<div className={styles.manufacturerInfo}>
					<span className={styles.manufacturerLabel}>Производитель</span>
					<span className={styles.manufacturerName}>
						{productData.manufacturer}
					</span>
				</div>
			</div>

			{/* Секция рекомендаций */}
			<div className={styles.recommendationsSection}>
				<h2 className={styles.recommendationsTitle}>Рекомендуем</h2>

				<div className={styles.recommendationsList}>
					{recommendations.map((item) => (
						<ProductItem key={item.id} />
					))}
				</div>

				{/* Ссылка на бесплатную доставку */}
				<div className={styles.deliveryInfo}>
					<span className={styles.deliveryText}>доставка бесплатно</span>
					<span className={styles.deliveryArrow}>{'>'}</span>
				</div>
			</div>

			{/* Кнопка добавления в корзину */}
			<div className={styles.addToCartSection}>
				<button className={styles.addToCartButton}>
					<span className={styles.originalPrice}>
						{productData.originalPrice} ₽
					</span>
					<span className={styles.currentPrice}>{productData.price} ₽</span>
					<span className={styles.addButton}>+</span>
				</button>
			</div>
		</div>
	)
}
