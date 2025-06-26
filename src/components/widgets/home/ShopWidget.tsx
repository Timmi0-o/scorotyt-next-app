import { ISeller } from '@/actions'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export const ShopWidget = ({ sellers }: { sellers: ISeller[] }) => {
	if (sellers.length === 0) return null

	return (
		<div className='mb-5'>
			{/* Заголовок секции */}
			<div className='px-[10px] mb-[14px]'>
				<div
					className='w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors'
					onClick={() => toast.info('Переход ко всем магазинам')}
				>
					<h2 className='text-lg font-bold text-gray-900'>Магазины</h2>
					<div className='flex items-center text-green-600 hover:text-green-700'>
						<span className='text-sm font-medium'>Все</span>
						<span className='ml-1 text-lg'>›</span>
					</div>
				</div>
			</div>

			{/* Сетка магазинов */}
			<div className='px-[10px]'>
				<div className='grid grid-cols-3 gap-2 max-h-[180px] overflow-hidden'>
					{sellers.slice(0, 6).map((seller) => {
						const openingSoon = seller.status === 4
						const notAvailable = !seller.accepting_orders

						return (
							<Card
								key={seller.id}
								className={`aspect-[110/100] ${
									openingSoon || notAvailable ? 'opacity-50' : ''
								} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
								onClick={() => {
									if (openingSoon) {
										toast.info(`${seller.store_name} скоро откроется`)
									} else {
										toast.info(`Переход к ${seller.store_name}`)
									}
								}}
							>
								<CardContent className='p-2 h-full flex flex-col'>
									<div className='flex-1 flex flex-col items-center justify-center'>
										{/* Логотип */}
										<div className='w-10 h-10 rounded-full bg-gray-200 mb-1.5 overflow-hidden'>
											<img
												src={
													seller.logo_url ||
													`https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center`
												}
												alt={seller.store_name}
												className='w-full h-full object-cover'
												onError={(e) => {
													const target = e.target as HTMLImageElement
													target.src = `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center`
												}}
											/>
										</div>

										{/* Название */}
										<h3 className='text-xs font-semibold text-center text-gray-900 line-clamp-2 leading-tight'>
											{seller.store_name}
										</h3>

										{/* Время доставки */}
										<p className='text-xs text-gray-500 text-center mt-1'>
											{openingSoon
												? 'Скоро откроется'
												: notAvailable
												? 'Недоступен'
												: seller.time_delivery || '20-30 мин'}
										</p>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</div>
	)
}
