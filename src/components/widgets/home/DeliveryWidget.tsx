import { toast } from 'sonner'

export const DeliveryWidget = () => {
	return (
		<div className='flex items-center justify-between px-[10px] py-[10px]'>
			<div className='flex-1'>
				<button
					className='flex items-center text-left hover:opacity-80 transition-opacity'
					onClick={() => toast.info('Выбор адреса доставки')}
				>
					<div>
						<div className='text-white font-medium'>Москва, Центр</div>
						<div className='text-gray-300 text-sm'>Доставка от 15 минут</div>
					</div>
					<span className='ml-2 text-white'>▼</span>
				</button>
			</div>

			<button
				className='p-2.5 hover:bg-white/10 rounded-full transition-colors'
				onClick={() => toast.info('Переход к профилю')}
			>
				<span className='text-white text-xl'>👤</span>
			</button>
		</div>
	)
}
