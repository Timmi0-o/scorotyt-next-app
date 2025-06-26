'use client'

import { IProduct } from '@/actions'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cartStore'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface AnimatedCartButtonProps {
	product: IProduct
	isStockAvailable?: boolean
	className?: string
}

export function AnimatedCartButton({
	product,
	isStockAvailable = true,
	className = '',
}: AnimatedCartButtonProps) {
	const { addItem, removeItem, getItemQuantity } = useCartStore()

	const quantity = getItemQuantity(product.id)
	const inCart = quantity > 0

	const [isAnimating, setIsAnimating] = useState(false)
	const [showCartControls, setShowCartControls] = useState(inCart)

	useEffect(() => {
		setShowCartControls(inCart)
	}, [inCart])

	const handleAddToCart = async () => {
		if (!isStockAvailable) {
			toast.error('Товар временно недоступен')
			return
		}

		setIsAnimating(true)
		addItem({
			id: product.id,
			name: product.name,
			price: product.price || 0,
			imageUrl: product.image_url,
			sellerId: product.seller_id || 0,
		})
		toast.success(`${product.name} добавлен в корзину`)

		// Анимация добавления
		setTimeout(() => {
			setShowCartControls(true)
			setIsAnimating(false)
		}, 500)
	}

	const handleIncrement = () => {
		addItem({
			id: product.id,
			name: product.name,
			price: product.price || 0,
			imageUrl: product.image_url,
			sellerId: product.seller_id || 0,
		})
		toast.success('Количество увеличено')
	}

	const handleDecrement = () => {
		if (quantity === 1) {
			setShowCartControls(false)
			setTimeout(() => {
				removeItem(product.id)
			}, 300)
			toast.success('Товар удален из корзины')
		} else {
			removeItem(product.id)
			toast.success('Количество уменьшено')
		}
	}

	if (!isStockAvailable) {
		return (
			<Button disabled variant='outline' className={`opacity-50 ${className}`}>
				Недоступен
			</Button>
		)
	}

	return (
		<div className={`relative ${className}`}>
			<AnimatePresence mode='wait'>
				{!showCartControls ? (
					// Кнопка "Добавить в корзину"
					<motion.div
						key='add-button'
						initial={{ opacity: 1, scale: 1 }}
						exit={{
							opacity: 0,
							scale: 0.8,
							y: -10,
						}}
						transition={{ duration: 0.2 }}
					>
						<Button
							onClick={handleAddToCart}
							disabled={isAnimating}
							className='bg-green-600 hover:bg-green-700 text-white relative overflow-hidden h-7 px-2 text-xs font-medium'
							size='sm'
						>
							<AnimatePresence>
								{isAnimating && (
									<>
										{/* Анимация тележки */}
										<motion.div
											key='cart-icon-animation'
											initial={{ x: -30, opacity: 0, rotate: -25 }}
											animate={{
												x: [0, 10, -5, 5, 0],
												rotate: [-25, 0, 15, -10, 0],
												opacity: 1,
												scale: [1, 1.2, 1, 1.1, 1],
											}}
											exit={{
												x: 30,
												opacity: 0,
												rotate: 25,
												transition: { duration: 0.3, ease: 'easeIn' },
											}}
											transition={{
												duration: 0.7, // Более короткая и резкая анимация
												ease: 'easeInOut',
												times: [0, 0.3, 0.5, 0.7, 1], // Более распределенные ключевые кадры
											}}
											className='absolute inset-0 flex items-center justify-center'
										>
											<ShoppingCart className='w-5 h-5' />
										</motion.div>

										{/* Анимация линии (дорожки) */}
										<motion.div
											key='line-animation'
											initial={{ scaleX: 0, opacity: 0, x: '-50%' }}
											animate={{
												scaleX: 1,
												opacity: [0, 0.5, 1, 0.5, 0],
												x: '0%',
											}}
											exit={{
												scaleX: 0,
												opacity: 0,
												x: '50%',
												transition: { duration: 0.3, ease: 'easeIn' },
											}}
											transition={{
												duration: 0.7, // Синхронизируем с тележкой
												ease: 'linear',
												times: [0, 0.2, 0.5, 0.8, 1],
											}}
											className='absolute bottom-1 left-1/2 w-2/3 h-0.5 bg-white/40 origin-center'
											style={{ transform: 'translateX(-50%)' }} // Для центрирования при scaleX
										/>
									</>
								)}
							</AnimatePresence>

							<motion.span
								animate={{
									opacity: isAnimating ? 0 : 1,
									y: isAnimating ? -5 : 0,
								}}
								transition={{ duration: 0.2 }}
								className='text-xs'
							>
								+
							</motion.span>
						</Button>
					</motion.div>
				) : (
					// Контролы количества
					<motion.div
						key='cart-controls'
						initial={{
							opacity: 0,
							y: 20,
							scale: 0.8,
						}}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
						}}
						exit={{
							opacity: 0,
							y: 20,
							scale: 0.8,
						}}
						transition={{
							duration: 0.3,
							type: 'spring',
							stiffness: 400,
							damping: 30,
						}}
						className='flex items-center gap-1 bg-white border border-gray-200 rounded-md p-0.5'
					>
						{/* Кнопка уменьшения */}
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
							<Button
								onClick={handleDecrement}
								variant='ghost'
								size='sm'
								className='h-6 w-6 p-0 hover:bg-gray-100 text-xs'
							>
								<Minus className='w-3 h-3' />
							</Button>
						</motion.div>

						{/* Количество с анимацией */}
						<motion.div
							key={quantity}
							initial={{ scale: 1.2, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.15 }}
							className='min-w-[20px] text-center font-semibold text-xs'
						>
							{quantity}
						</motion.div>

						{/* Кнопка увеличения */}
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								onClick={handleIncrement}
								variant='ghost'
								size='sm'
								className='h-6 w-6 p-0 hover:bg-green-100 text-green-600 text-xs'
							>
								<Plus className='w-3 h-3' />
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
