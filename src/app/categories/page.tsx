'use client'

// const categories = [
// 	{ id: 1, name: 'Рестораны', icon: '🍽️', count: 25 },
// 	{ id: 2, name: 'Продукты', icon: '🛒', count: 15 },
// 	{ id: 3, name: 'Аптеки', icon: '💊', count: 8 },
// 	{ id: 4, name: 'Цветы', icon: '🌸', count: 5 },
// 	{ id: 5, name: 'Подарки', icon: '🎁', count: 12 },
// 	{ id: 6, name: 'Электроника', icon: '📱', count: 7 },
// ]

export default function CategoriesPage() {
	return (
		<div style={{ padding: '2rem 1rem 5rem', minHeight: '100vh' }}>
			<h1
				style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}
			>
				Категории
			</h1>
			<p style={{ color: '#6b7280' }}>
				Здесь будут отображаться категории товаров
			</p>
		</div>
	)
}
