import { ProductItem } from '../entity/products/ProductItem/ProductItem'
import styles from './OrderAgainSection.module.css'

// Моковые товары для секции "Заказать снова"
const orderAgainProducts = [
	{
		id: 4,
		name: 'Сэндвич с сыром',
		price: 250,
		weight: '200 г',
		image:
			'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop',
	},
	{
		id: 5,
		name: 'Круассан+ капучино',
		price: 100,
		weight: '300 г',
		image:
			'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
	},
	{
		id: 6,
		name: 'Комбо из 4-х пицц',
		price: 800,
		weight: '100 г',
		image:
			'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
	},
]

export function OrderAgainSection() {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>Заказать снова</h2>
				<button className={styles.seeAllButton}>
					Все <span className={styles.arrow}>›</span>
				</button>
			</div>

			<div className={styles.productsScroll}>
				{orderAgainProducts.map((product) => (
					<ProductItem key={product.id} />
				))}
			</div>
		</section>
	)
}
