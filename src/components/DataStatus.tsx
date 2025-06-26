'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useHomeData } from '@/hooks/useHomeData'

interface DataStatusProps {
	isLoading?: boolean
	error?: Error
	isEmpty?: boolean
}

export const DataStatus = ({
	isLoading,
	error,
	isEmpty,
}: DataStatusProps = {}) => {
	const homeData = useHomeData()

	// Если передаются пропы, используем их для отображения состояний
	if (isLoading) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
					<p className='text-gray-600'>Загрузка...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center px-6'>
					<div className='text-6xl mb-4'>⚠️</div>
					<h3 className='text-xl font-bold mb-2'>Ошибка загрузки данных</h3>
					<p className='text-gray-500 mb-6'>
						{error.message || 'Проверьте подключение к интернету'}
					</p>
					<Button onClick={() => window.location.reload()}>
						Попробовать снова
					</Button>
				</div>
			</div>
		)
	}

	if (isEmpty) {
		return (
			<div className='min-h-screen bg-white flex items-center justify-center'>
				<div className='text-center px-6'>
					<div className='text-6xl mb-4'>📍</div>
					<h3 className='text-xl font-bold mb-2'>Нет данных</h3>
					<p className='text-gray-500 mb-6'>
						Данные отсутствуют или не найдены
					</p>
					<Button onClick={() => window.location.reload()}>Обновить</Button>
				</div>
			</div>
		)
	}

	// Если пропы не переданы, показываем статус разработчика
	if (process.env.NODE_ENV !== 'development') {
		return null
	}

	const { data, isLoading: hookLoading, error: hookError, isSuccess } = homeData

	return (
		<div className='fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border'>
			<div className='text-xs font-mono space-y-1'>
				<div className='flex items-center gap-2 p-4'>
					<span>API Status:</span>
					{hookLoading && <Badge variant='secondary'>Loading...</Badge>}
					{hookError && <Badge variant='destructive'>Error</Badge>}
					{isSuccess && <Badge variant='default'>Success</Badge>}
				</div>

				{data && (
					<div className='text-xs text-gray-600'>
						Loaded: {data?.data?.sellers?.length || 0} sellers
					</div>
				)}

				{hookError && (
					<div className='text-xs text-red-600 max-w-xs'>
						{hookError instanceof Error ? hookError.message : 'Unknown error'}
					</div>
				)}
			</div>
		</div>
	)
}
