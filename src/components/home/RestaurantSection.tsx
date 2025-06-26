import { ISeller } from '@/types/api.types'
import { RestaurantCard } from './RestaurantCard'
import styles from './RestaurantSection.module.css'

interface RestaurantSectionProps {
	sellers: ISeller[]
}

export function RestaurantSection({ sellers }: RestaurantSectionProps) {
	return (
		<section className={styles.section}>
			<div className={styles.restaurants}>
				{sellers.map((seller) => (
					<RestaurantCard key={seller.id} seller={seller} />
				))}
			</div>
		</section>
	)
}
