import styles from './DeliveryBanner.module.css'

export function DeliveryBanner() {
	return (
		<div className={styles.banner}>
			<button className={styles.link}>
				доставка бесплатно
				<span className={styles.arrow}>›</span>
			</button>
		</div>
	)
}
