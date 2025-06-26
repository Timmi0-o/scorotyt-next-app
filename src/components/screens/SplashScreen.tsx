'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
	onComplete: () => void
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const initializeApp = async () => {
			try {
				// Имитируем загрузку настроек приложения
				await new Promise((resolve) => setTimeout(resolve, 2000))

				// Имитируем проверку языка и настроек
				await new Promise((resolve) => setTimeout(resolve, 500))

				setIsLoading(false)

				// Переходим к следующему экрану через небольшую задержку
				setTimeout(() => {
					onComplete()
				}, 500)
			} catch {
				setError('Что-то пошло не так')
				setIsLoading(false)
			}
		}

		initializeApp()
	}, [onComplete])

	const handleRetry = () => {
		setError(null)
		setIsLoading(true)
		// Перезапускаем инициализацию
		setTimeout(() => {
			setIsLoading(false)
			onComplete()
		}, 1000)
	}

	if (error) {
		return (
			<div className='min-h-screen bg-background flex flex-col items-center justify-center p-6'>
				<div className='text-center max-w-sm'>
					<div className='text-6xl mb-6'>⚠️</div>
					<h2 className='text-xl font-bold mb-2 text-foreground'>
						Что-то пошло не так
					</h2>
					<p className='text-muted-foreground mb-6'>Уже работаем над этим</p>
					<button
						onClick={handleRetry}
						className='bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium'
					>
						Обновить
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700'>
			<div className='text-center px-6'>
				{/* Логотип с анимацией */}
				<div className='flex flex-col items-center gap-2 relative mb-12'>
					<div className='w-36 h-36 mx-auto mb-10 bg-white rounded-xl flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-105'>
						<div className='text-5xl font-black text-green-600 tracking-wider'>
							S
						</div>
					</div>

					{/* Анимация загрузки */}
					{isLoading && (
						<div className='absolute -bottom-20 left-1/2 transform -translate-x-1/2'>
							<div className='flex items-center gap-2'>
								<div className='w-4 h-4 bg-white rounded-full animate-bounce'></div>
								<div
									className='w-4 h-4 bg-white rounded-full animate-bounce'
									style={{ animationDelay: '0.1s' }}
								></div>
								<div
									className='w-4 h-4 bg-white rounded-full animate-bounce'
									style={{ animationDelay: '0.2s' }}
								></div>
								<div
									className='w-4 h-4 bg-white rounded-full animate-bounce'
									style={{ animationDelay: '0.3s' }}
								></div>
								<div
									className='w-4 h-4 bg-white rounded-full animate-bounce'
									style={{ animationDelay: '0.4s' }}
								></div>
							</div>
						</div>
					)}
				</div>

				<h1 className='text-4xl font-black text-white mb-3 tracking-wide'>
					Скоротут
				</h1>
				<p className='text-lg text-white/90 font-medium'>
					Доставка еды и товаров
				</p>
			</div>
		</div>
	)
}
