import { ISlider } from '@/actions'
import { useEffect, useState } from 'react'

export const StoriesCarousel = ({ sliders }: { sliders: ISlider[] }) => {
	const [currentSlide, setCurrentSlide] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % sliders.length)
		}, 7000)
		return () => clearInterval(interval)
	}, [sliders.length])

	return (
		<div className='relative h-[67vh] overflow-hidden'>
			{sliders.map((slider, index) => (
				<div
					key={slider.id}
					className={`absolute inset-0 transition-opacity duration-300 ${
						index === currentSlide ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<div
						className='w-full h-full bg-cover bg-center relative'
						style={{ backgroundImage: `url(${slider.image_url})` }}
					>
						{/* Градиентные оверлеи сверху и снизу */}
						<div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50' />

						{/* Кнопка "Подробнее" */}
						{slider.slider_url && (
							<div className='absolute bottom-20 left-2.5'>
								<button
									className='bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white rounded-2xl px-4 py-2 font-medium shadow-lg transition-all hover:shadow-xl'
									onClick={() => window.open(slider.slider_url || '', '_blank')}
								>
									Подробнее
									<span className='ml-2'>→</span>
								</button>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
