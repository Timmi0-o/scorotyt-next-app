import { cartAddItem, cartRemoveItem, cartUpdateItem } from '@/actions'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Интерфейс товара в корзине
export interface CartItem {
	id: number
	productId: number
	name: string
	price: number
	quantity: number
	imageUrl?: string
}

// Интерфейс состояния корзины
interface CartStore {
	items: CartItem[]
	isLoading: boolean
	error: string | null

	// Действия
	addItem: (item: Omit<CartItem, 'id'>) => Promise<void>
	updateQuantity: (productId: number, quantity: number) => Promise<void>
	removeItem: (productId: number) => Promise<void>
	clearCart: () => void

	// Вычисляемые свойства
	totalItems: number
	totalPrice: number
}

// Создание хранилища с персистентностью в localStorage
export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			// Начальное состояние
			items: [],
			isLoading: false,
			error: null,

			// Добавление товара в корзину
			addItem: async (newItem) => {
				set({ isLoading: true, error: null })

				try {
					// Проверяем, есть ли уже такой товар в корзине
					const { items } = get()
					const existingItemIndex = items.findIndex(
						(item) => item.productId === newItem.productId
					)

					if (existingItemIndex >= 0) {
						// Если есть - обновляем количество
						const updatedItems = [...items]
						updatedItems[existingItemIndex].quantity += newItem.quantity

						// Отправляем запрос на сервер
						await cartUpdateItem({
							itemId: updatedItems[existingItemIndex].id,
							quantity: updatedItems[existingItemIndex].quantity,
						})

						set({ items: updatedItems, isLoading: false })
					} else {
						// Если нет - добавляем новый
						const response = await cartAddItem({
							productId: newItem.productId,
							quantity: newItem.quantity,
						})
						const newItemWithId = { ...newItem, id: response.data.id }

						set({ items: [...items, newItemWithId], isLoading: false })
					}

					// Виброотклик при добавлении
					if (
						typeof window !== 'undefined' &&
						window.Telegram?.WebApp?.HapticFeedback
					) {
						window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
					}
				} catch (error) {
					console.error('Ошибка при добавлении товара в корзину:', error)
					set({
						error: 'Не удалось добавить товар в корзину',
						isLoading: false,
					})
				}
			},

			// Обновление количества товара
			updateQuantity: async (productId, quantity) => {
				set({ isLoading: true, error: null })

				try {
					const { items } = get()
					const itemIndex = items.findIndex(
						(item) => item.productId === productId
					)

					if (itemIndex >= 0) {
						const updatedItems = [...items]
						const item = updatedItems[itemIndex]

						// Обновляем количество
						updatedItems[itemIndex].quantity = quantity

						// Отправляем запрос на сервер
						await cartUpdateItem({
							itemId: item.id,
							quantity,
						})

						set({ items: updatedItems, isLoading: false })
					}
				} catch (error) {
					console.error('Ошибка при обновлении количества:', error)
					set({ error: 'Не удалось обновить количество', isLoading: false })
				}
			},

			// Удаление товара из корзины
			removeItem: async (productId) => {
				set({ isLoading: true, error: null })

				try {
					const { items } = get()
					const itemToRemove = items.find(
						(item) => item.productId === productId
					)

					if (itemToRemove) {
						await cartRemoveItem(itemToRemove.id)

						set({
							items: items.filter((item) => item.productId !== productId),
							isLoading: false,
						})
					}
				} catch (error) {
					console.error('Ошибка при удалении товара:', error)
					set({ error: 'Не удалось удалить товар', isLoading: false })
				}
			},

			// Очистка корзины
			clearCart: () => set({ items: [], error: null }),

			// Геттеры для вычисляемых свойств
			get totalItems() {
				return get().items.reduce((sum, item) => sum + item.quantity, 0)
			},

			get totalPrice() {
				return get().items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				)
			},
		}),
		{
			name: 'skorotut-cart', // Имя для localStorage
			partialize: (state) => ({ items: state.items }), // Сохраняем только товары
		}
	)
)
