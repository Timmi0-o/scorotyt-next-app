import { ISeller } from '@/types/api.types'
import Image from 'next/image'
import Link from 'next/link'
import { ProductItem } from '../entity/products/ProductItem/ProductItem'
import styles from './RestaurantCard.module.css'

interface RestaurantCardProps {
	seller: ISeller
}

export function RestaurantCard({ seller }: RestaurantCardProps) {
	return (
		<div className={styles.card}>
			<Link href={`/vendor/${seller.id}`} className={styles.restaurantLink}>
				<div className={styles.restaurantHeader}>
					<Image
						src={seller.logo_url}
						alt={seller.name}
						className={styles.logo}
						width={48}
						height={48}
					/>
					<div className={styles.info}>
						<div className={styles.nameAndTime}>
							<h3 className={styles.name}>
								{seller.store_name || seller.name}
							</h3>
							<span className={styles.deliveryTime}>
								{seller.time_delivery} мин
							</span>
						</div>
						<div className={styles.meta}>
							<div className={styles.rating}>
								⭐{' '}
								{seller.status === 1
									? 'Открыт'
									: seller.status === 4
									? 'Скоро откроется'
									: 'Закрыт'}
							</div>
							<div className={styles.category}>
								{seller.type === 'restaurant' ? 'Ресторан' : 'Магазин'}
							</div>
						</div>
					</div>
				</div>
			</Link>

			<div className={styles.productsScroll}>
				{seller.products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
