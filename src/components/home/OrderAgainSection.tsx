import { IProduct } from '@/types/api.types'
import { ProductItem } from '../entity/products/ProductItem/ProductItem'
import styles from './OrderAgainSection.module.css'

const orderAgainProducts: IProduct[] = [
	{
		id: 4,
		seller_id: 1,
		row_order: 1,
		name: 'Сэндвич с сыром',
		tags: '',
		tax_id: 0,
		brand_id: 0,
		slug: 'sandwich-cheese',
		category_id: 1,
		indicator: null,
		manufacturer: 'null',
		made_in: '0',
		return_status: 0,
		cancelable_status: 0,
		till_status: 'null',
		image: 'products/sandwich.jpg',
		other_images: null,
		description: 'Свежий сэндвич с сыром и овощами',
		status: 1,
		is_approved: 1,
		return_days: 0,
		type: 'packet',
		is_unlimited_stock: 0,
		cod_allowed: 0,
		total_allowed_quantity: 1,
		tax_included_in_price: 0,
		fssai_lic_no: '',
		featured: 0,
		proteins_per_100: null,
		fats_per_100: null,
		carbohydrates_per_100: null,
		kcal: null,
		composition: null,
		terms_and_conditions_of_storage: null,
		'1c_code': null,
		image_url:
			'https://storage.yandexcloud.net/food-delivery/products/sandwich.jpg',
		variants: [
			{
				id: 1,
				product_id: 4,
				type: 'packet',
				status: 1,
				measurement: 1,
				price: 250,
				discounted_price: 0,
				stock: 10,
				stock_unit_id: 1,
				unit: {
					id: 1,
					unit_short_code: 'шт.',
				},
			},
		],
	},
	{
		id: 5,
		seller_id: 1,
		row_order: 2,
		name: 'Круассан + капучино',
		tags: '',
		tax_id: 0,
		brand_id: 0,
		slug: 'croissant-cappuccino',
		category_id: 1,
		indicator: null,
		manufacturer: 'null',
		made_in: '0',
		return_status: 0,
		cancelable_status: 0,
		till_status: 'null',
		image: 'products/croissant.jpg',
		other_images: null,
		description: 'Свежий круассан с ароматным капучино',
		status: 1,
		is_approved: 1,
		return_days: 0,
		type: 'packet',
		is_unlimited_stock: 0,
		cod_allowed: 0,
		total_allowed_quantity: 1,
		tax_included_in_price: 0,
		fssai_lic_no: '',
		featured: 1,
		proteins_per_100: null,
		fats_per_100: null,
		carbohydrates_per_100: null,
		kcal: null,
		composition: null,
		terms_and_conditions_of_storage: null,
		'1c_code': null,
		image_url:
			'https://storage.yandexcloud.net/food-delivery/products/croissant.jpg',
		variants: [
			{
				id: 2,
				product_id: 5,
				type: 'packet',
				status: 1,
				measurement: 1,
				price: 100,
				discounted_price: 80,
				stock: 5,
				stock_unit_id: 1,
				unit: {
					id: 2,
					unit_short_code: 'шт.',
				},
			},
		],
	},
	{
		id: 6,
		seller_id: 1,
		row_order: 3,
		name: 'Комбо из 4-х пицц',
		tags: '',
		tax_id: 0,
		brand_id: 0,
		slug: 'pizza-combo-4',
		category_id: 1,
		indicator: null,
		manufacturer: 'null',
		made_in: '0',
		return_status: 0,
		cancelable_status: 0,
		till_status: 'null',
		image: 'products/pizza-combo.jpg',
		other_images: null,
		description: 'Набор из 4 разных пицц для компании',
		status: 1,
		is_approved: 1,
		return_days: 0,
		type: 'packet',
		is_unlimited_stock: 0,
		cod_allowed: 0,
		total_allowed_quantity: 1,
		tax_included_in_price: 0,
		fssai_lic_no: '',
		featured: 0,
		proteins_per_100: null,
		fats_per_100: null,
		carbohydrates_per_100: null,
		kcal: null,
		composition: null,
		terms_and_conditions_of_storage: null,
		'1c_code': null,
		image_url:
			'https://storage.yandexcloud.net/food-delivery/products/pizza-combo.jpg',
		variants: [
			{
				id: 3,
				product_id: 6,
				type: 'packet',
				status: 1,
				measurement: 1,
				price: 800,
				discounted_price: 0,
				stock: 3,
				stock_unit_id: 1,
				unit: {
					id: 3,
					unit_short_code: 'шт.',
				},
			},
		],
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
					<ProductItem product={product} key={product.id} />
				))}
			</div>
		</section>
	)
}
