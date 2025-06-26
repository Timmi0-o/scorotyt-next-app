import styles from './FreeDeliveryBanner.module.css'

export function FreeDeliveryBanner() {
	return (
		<div className={styles.banner}>
			<button className={styles.button}>доставка бесплатно</button>
		</div>
	)
}
