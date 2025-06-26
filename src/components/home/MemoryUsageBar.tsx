import styles from './MemoryUsageBar.module.css'

export function MemoryUsageBar() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<span className={styles.prefix}>от</span>
				<span className={styles.text}>
					Загрузка использует много памяти: 922 МБ
				</span>
			</div>
		</div>
	)
}
