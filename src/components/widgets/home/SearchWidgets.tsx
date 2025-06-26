import { toast } from 'sonner'

export const SearchWidget = () => {
	return (
		<div className='px-[10px] pt-[10px]'>
			<div className='flex gap-1'>
				<button
					className='flex-1 flex items-center justify-start bg-gray-100 text-gray-500 rounded-full px-3 py-2.5 text-sm hover:bg-gray-200 transition-colors'
					onClick={() => toast.info('Переход к поиску')}
				>
					<span className='mr-2'>🔍</span>
					Поиск
				</button>

				<button
					className='bg-gray-100 text-gray-700 rounded-full px-3 py-2.5 text-sm hover:bg-gray-200 transition-colors flex items-center'
					onClick={() => toast.info('Переход к избранному')}
				>
					<span className='mr-1'>❤️</span>
					Лайки
				</button>
			</div>
		</div>
	)
}
