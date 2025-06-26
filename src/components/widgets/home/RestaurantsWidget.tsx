import { ISeller } from '@/actions'
import { ProductItem } from '@/components/entity/products/ProductItem/ProductItem'
import { toast } from 'sonner'

export const RestaurantWidget = ({ sellers }: { sellers: ISeller[] }) => {
	if (sellers.length === 0) return null

	return (
		<div className='mb-5'>
			{/* Заголовок секции */}
			<div className='px-[10px] mb-[14px]'>
				<div
					className='w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors'
					onClick={() => toast.info('Переход ко всем ресторанам')}
				>
					<h2 className='text-lg font-bold text-gray-900'>Готовая еда</h2>
					<div className='flex items-center text-green-600 hover:text-green-700'>
						<span className='text-sm font-medium'>Все</span>
						<span className='ml-1 text-lg'>›</span>
					</div>
				</div>
			</div>

			{/* Список ресторанов */}
			{sellers.map((seller) => {
				const openingSoon = seller.status === 4
				const notAvailable = !seller.accepting_orders
				const statusText = openingSoon
					? 'Скоро откроется'
					: notAvailable
					? 'Пока недоступен'
					: seller.time_delivery || '30-40 мин'
				const statusColor =
					notAvailable || openingSoon ? 'text-red-500' : 'text-green-600'

				return (
					<div key={seller.id} className='mb-[22px]'>
						{/* Информация о ресторане */}
						<div className='px-[10px] mb-[14px]'>
							<div
								className='w-full flex items-center cursor-pointer hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors'
								onClick={() => toast.info(`Переход к ${seller.store_name}`)}
							>
								{/* Логотип */}
								<div className='w-8 h-8 rounded-full bg-gray-200 mr-1 overflow-hidden'>
									<img
										src={
											seller.logo_url ||
											`https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&crop=center`
										}
										alt={seller.store_name}
										className='w-full h-full object-cover'
										onError={(e) => {
											const target = e.target as HTMLImageElement
											target.src = `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&crop=center`
										}}
									/>
								</div>

								<div className='flex-1 text-left ml-1'>
									<div className='flex items-center'>
										<span className='font-semibold text-gray-900 mr-2'>
											{seller.store_name}
										</span>
										<span className={`text-xs font-medium ${statusColor}`}>
											{statusText}
										</span>
									</div>
									<div className='text-xs text-gray-600 mt-0.5'>
										{seller.categories_array?.slice(0, 2)}
										{seller.categories_array?.length > 2 && '...'}
									</div>
								</div>

								{/* Кнопка избранного */}
								<div className='w-[34px] h-[34px] flex items-center justify-center'>
									<button
										className='w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-red-500'
										onClick={(e) => {
											e.stopPropagation()
											toast.info('Добавлено в избранное')
										}}
									>
										♡
									</button>
								</div>
							</div>
						</div>

						{/* Горизонтальный список товаров */}
						<div className='h-[220px]'>
							<div className='flex overflow-x-auto scrollbar-hide'>
								{seller.products.slice(0, 5).map((product) => (
									<ProductItem key={product.id} />
								))}
								{seller.products?.length > 5 && (
									<div
										className='p-[5px] flex-shrink-0'
										style={{ width: '116px' }}
									>
										<button
											className='w-full h-[192px] flex flex-col items-center justify-center hover:opacity-80 transition-opacity bg-gray-100 rounded-[12px]'
											onClick={() =>
												toast.info(`Показать все товары ${seller.store_name}`)
											}
										>
											<div className='text-gray-400 text-2xl mb-2'>•••</div>
											<div className='text-xs text-gray-500'>Еще товары</div>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
