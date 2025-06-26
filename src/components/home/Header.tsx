import styles from './Header.module.css'

export function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.addressSection}>
				<div className={styles.address}>
					Комсомольская, 3<span className={styles.dropdown}>▼</span>
				</div>
				<div className={styles.deliveryTime}>Доставка 40-60 минут</div>
			</div>

			<div className={styles.avatar}>👤</div>
		</div>
	)
}
