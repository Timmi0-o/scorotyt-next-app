import { StoreItem } from './StoreItem'
import styles from './StoresGrid.module.css'

// Моковые данные магазинов согласно дизайну с текстовыми логотипами
const stores = [
	{
		id: 1,
		name: 'Пятёрочка',
		time: '40-60 мин',
		color: '#dc2626', // красный
		logo: 'Пятёрочка',
	},
	{
		id: 2,
		name: 'Магнит',
		time: '40-60 мин',
		color: '#dc2626', // красный
		logo: 'МАГНИТ',
	},
	{
		id: 3,
		name: 'Перекрёсток',
		time: '40-60 мин',
		color: '#16a34a', // зеленый
		logo: 'Перекрёсток',
	},
	{
		id: 4,
		name: 'Чижик',
		time: '40-60 мин',
		color: '#eab308', // желтый
		logo: 'чижик',
	},
	{
		id: 5,
		name: 'Дикси',
		time: '40-60 мин',
		color: '#ea580c', // оранжевый
		logo: 'дикси',
	},
	{
		id: 6,
		name: 'Ашан',
		time: '40-60 мин',
		color: '#dc2626', // красный
		logo: 'Ашан',
	},
	{
		id: 7,
		name: 'ВкусВилл',
		time: '40-60 мин',
		color: '#16a34a', // зеленый
		logo: 'ВкусВилл',
	},
	{
		id: 8,
		name: 'Лента',
		time: '40-60 мин',
		color: '#2563eb', // синий
		logo: 'лента',
	},
	{
		id: 9,
		name: 'Магнит Косметик',
		time: '40-60 мин',
		color: '#9333ea', // фиолетовый
		logo: 'МАГНИТ КОСМЕТИК',
	},
]

export function StoresGrid() {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<h2 className={styles.title}>Магазины</h2>
				<button className={styles.seeAllButton}>
					Все <span className={styles.arrow}>›</span>
				</button>
			</div>

			<div className={styles.grid}>
				{stores.map((store) => (
					<StoreItem key={store.id} store={store} />
				))}
			</div>
		</section>
	)
}
