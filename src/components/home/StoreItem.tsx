import styles from './StoreItem.module.css'

interface StoreItemProps {
	store: {
		id: number
		name: string
		time: string
		color: string
		logo: string
	}
}

export function StoreItem({ store }: StoreItemProps) {
	return (
		<div className={styles.item}>
			<div
				className={styles.iconContainer}
				style={{ backgroundColor: store.color }}
			>
				{store.logo}
			</div>
			<div className={styles.info}>
				<h4 className={styles.name}>{store.name}</h4>
				<p className={styles.time}>{store.time}</p>
			</div>
		</div>
	)
}
