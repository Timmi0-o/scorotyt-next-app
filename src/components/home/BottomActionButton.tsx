import styles from './BottomActionButton.module.css'

export function BottomActionButton() {
	return (
		<div className={styles.container}>
			<button className={styles.button}>
				<span className={styles.time}>40-60 мин</span>
				<span className={styles.text}>Далее</span>
				<span className={styles.price}>170 ₽</span>
			</button>
		</div>
	)
}
