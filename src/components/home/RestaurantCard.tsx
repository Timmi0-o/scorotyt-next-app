import { ISeller } from '@/types/api.types'
import Link from 'next/link'
import { ProductItem } from '../entity/products/ProductItem/ProductItem'
import styles from './RestaurantCard.module.css'

interface RestaurantCardProps {
	seller: ISeller
}

// Товары точно как на фото - с разными состояниями кнопок
const restaurantProducts = [
	{
		id: 1,
		name: 'Сэндвич с сыром',
		price: 250,
		weight: '200 г',
		image:
			'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop',
		isCombo: false,
		quantity: 0, // серая кнопка только с +
	},
	{
		id: 2,
		name: 'Круассан+ капучино',
		price: 250,
		weight: '300 г',
		image:
			'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
		isCombo: true,
		quantity: 0, // серая кнопка только с +
	},
	{
		id: 3,
		name: 'Комбо из 4-х пицц 25 см',
		price: 800,
		weight: '900 г',
		image:
			'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
		isCombo: true,
		isSpecial: true,
		quantity: 1, // зеленая кнопка с - и +
	},
]

export function RestaurantCard({ seller }: RestaurantCardProps) {
	return (
		<div className={styles.card}>
			<Link href={`/vendor/${seller.id}`} className={styles.restaurantLink}>
				<div className={styles.restaurantHeader}>
					<img
						src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23f59e0b'/%3E%3Ctext x='24' y='30' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3EП%3C/text%3E%3C/svg%3E"
						alt={seller.name || 'Пиццерия Неаполь'}
						className={styles.logo}
					/>
					<div className={styles.info}>
						<div className={styles.nameAndTime}>
							<h3 className={styles.name}>Пиццерия Неаполь</h3>
							<span className={styles.deliveryTime}>40-60 мин</span>
						</div>
						<div className={styles.meta}>
							<div className={styles.rating}>⭐ 4.5</div>
							<div className={styles.category}>Пиццерия, фастфуд</div>
						</div>
					</div>
				</div>
			</Link>

			<div className={styles.productsScroll}>
				{restaurantProducts.map((product) => (
					<ProductItem key={product.id} />
				))}
			</div>
		</div>
	)
}
