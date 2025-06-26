'use client'

import { useState } from 'react'

const mockCartItems = [
	{
		id: 1,
		name: 'Пицца Маргарита',
		price: 450,
		quantity: 1,
		vendor: 'Додо Пицца',
	},
	{ id: 2, name: 'Кола 0.5л', price: 120, quantity: 2, vendor: 'Додо Пицца' },
	{ id: 3, name: 'Хлеб белый', price: 45, quantity: 1, vendor: 'Пятерочка' },
]

export default function CartPage() {
	const [cartItems, setCartItems] = useState(mockCartItems)

	const updateQuantity = (id: number, newQuantity: number) => {
		if (newQuantity <= 0) {
			setCartItems((items) => items.filter((item) => item.id !== id))
		} else {
			setCartItems((items) =>
				items.map((item) =>
					item.id === id ? { ...item, quantity: newQuantity } : item
				)
			)
		}
	}

	const totalAmount = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)

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
