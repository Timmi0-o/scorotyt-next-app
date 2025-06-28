export const CartPage = () => {
	return (
		<div style={{ padding: '2rem 1rem 5rem', minHeight: '100vh' }}>
			<h1
				style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}
			>
				Корзина
			</h1>
			<div
				style={{
					backgroundColor: '#f9fafb',
					padding: '2rem',
					borderRadius: '0.5rem',
					textAlign: 'center',
					marginTop: '2rem',
				}}
			>
				<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
				<p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
					Ваша корзина пуста
				</p>
				<p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
					Добавьте товары из главного меню
				</p>
			</div>
		</div>
	)
}
