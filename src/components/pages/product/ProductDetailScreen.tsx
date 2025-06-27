'use client'

import { IProduct } from '@/actions'
import { ProductItem } from '@/components/entity/products/ProductItem/ProductItem'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './ProductDetailScreen.module.css'

interface ProductDetailScreenProps {
	product: IProduct
}

export function ProductDetailScreen({ product }: ProductDetailScreenProps) {
	const router = useRouter()

	console.log('product', product)

	return (
		<div className={styles.productCard}>
			<button className={styles.closeButton} onClick={() => router.back()}>
				×
			</button>

			<div className={styles.productImageContainer}>
				{product?.image_url ? (
					<Image
						src={product.image_url}
						alt={product.name}
						className={styles.productImage}
						width={100}
						height={100}
					/>
				) : (
					<div className={styles.productImage}></div>
				)}
				<div className={styles.slideIndicators}>
					<div className={styles.indicator}></div>
					<div className={styles.indicator}></div>
					<div className={styles.indicator}></div>
					<div className={`${styles.indicator} ${styles.active}`}></div>
				</div>
			</div>

			{/* Информация о товаре */}
			<div className={styles.productInfo}>
				<h1 className={styles.productName}>{product?.name}</h1>
				{product?.variants[0].measurement ? (
					<p className={styles.productWeight}>
						{product?.variants[0].measurement}{' '}
						{product?.variants[0]?.unit?.unit_short_code}
					</p>
				) : null}

				<p className={styles.productDescription}>{product.description}</p>

				<div className={styles.manufacturerInfo}>
					<span className={styles.manufacturerLabel}>Производитель</span>
					<span className={styles.manufacturerName}>
						{product.manufacturer}
					</span>
				</div>
			</div>

			{/* Секция рекомендаций */}
			<div className={styles.recommendationsSection}>
				<h2 className={styles.recommendationsTitle}>Рекомендуем</h2>

				<div className={styles.recommendationsList}>
					{product.variants.map((item) => (
						<ProductItem key={item.id} product={product} />
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
						{product.variants[0].price} ₽
					</span>
					<span className={styles.currentPrice}>
						{product.variants[0].discounted_price} ₽
					</span>
					<span className={styles.addButton}>+</span>
				</button>
			</div>
		</div>
	)
}
