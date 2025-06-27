'use client'

import { ISeller } from '@/actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './VendorScreen.module.css'

interface VendorScreenProps {
	seller: ISeller
}

export default function VendorScreen({ seller }: VendorScreenProps) {
	const router = useRouter()

	const handleBack = () => {
		router.back()
	}

	console.log('seller', seller)

	return (
		<div className={styles.container}>
			{/* Header с изображением ресторана */}
			<div className={styles.header}>
				<div className={styles.headerImage}>
					<Image
						src={seller.logo_url}
						alt='Пиццерия Неаполь'
						className={styles.restaurantImage}
						width={100}
						height={100}
					/>

					{/* Время доставки */}
					<div className={styles.deliveryBadges}>
						<div className={styles.badge}>
							<span className={styles.badgeIcon}>👨‍🍳</span>
							<span className={styles.badgeText}>{seller.time_delivery}</span>
						</div>
						<div className={styles.badge}>
							<span className={styles.badgeIcon}>🚴</span>
							<span className={styles.badgeText}>{seller.time_delivery}</span>
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
					<h1 className={styles.restaurantName}>{seller.name}</h1>
				</div>
			</div>

			{/* Категории */}
			{/* <div className={styles.categoriesContainer}>
				<div className={styles.categories}>
					{seller.categories.map((category: ISellerCategory) => (
						<button key={category.id} className={clsx(styles.categoryButton)}>
							{category.}
						</button>
					))}
				</div>
			</div> */}

			{/* Заголовок секции */}
			{/* <div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>Популярное</h2>
			</div> */}

			{/* Сетка товаров */}
			{/* <div className={styles.productsGrid}>
				{seller.products.map((product: IProduct) => (
					<ProductItem key={product.id} product={product} />
				))} */}
			{/* </div> */}
		</div>
	)
}
