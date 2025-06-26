'use client'

import { sellerProductsGet, sellersGet } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { toast } from 'sonner'

export const ApiTester = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [result, setResult] = useState<{
		type: string
		data?: unknown
		error?: string
	} | null>(null)

	const testSellersApi = async () => {
		setIsLoading(true)
		try {
			const sellers = (await sellersGet({ limit: 5 }))?.data

			setResult({ type: 'sellers', data: sellers })
			toast.success(`Загружено ${sellers?.length} продавцов`)
		} catch (error) {
			console.error('Error testing sellers API:', error)
			toast.error('Ошибка загрузки продавцов')
			setResult({
				type: 'error',
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		} finally {
			setIsLoading(false)
		}
	}

	const testProductsApi = async () => {
		setIsLoading(true)
		try {
			// Тестируем с первым продавцом
			const products = (await sellerProductsGet(1))?.data
			setResult({ type: 'products', data: products })
			toast.success(`Загружено ${products.length} категорий товаров`)
		} catch (error) {
			console.error('Error testing products API:', error)
			toast.error('Ошибка загрузки товаров')
			setResult({
				type: 'error',
				error: error instanceof Error ? error.message : 'Unknown error',
			})
		} finally {
			setIsLoading(false)
		}
	}

	if (process.env.NODE_ENV !== 'development') {
		return null
	}

	return (
		<Card className='fixed bottom-4 left-4 w-80 z-50 bg-white/95 backdrop-blur-sm'>
			<CardHeader className='pb-3'>
				<CardTitle className='text-sm'>API Tester</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='flex gap-2'>
					<Button
						size='sm'
						onClick={testSellersApi}
						disabled={isLoading}
						className='flex-1'
					>
						Test Sellers
					</Button>
					<Button
						size='sm'
						onClick={testProductsApi}
						disabled={isLoading}
						className='flex-1'
					>
						Test Products
					</Button>
				</div>

				{result && (
					<div className='mt-3 p-2 bg-gray-50 rounded text-xs font-mono max-h-32 overflow-y-auto'>
						<div className='font-semibold mb-1'>
							{result.type === 'error' ? '❌ Error' : '✅ Success'}
						</div>
						<pre className='whitespace-pre-wrap'>
							{JSON.stringify(result, null, 2)}
						</pre>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
