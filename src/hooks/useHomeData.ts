'use client'

import { homeGet, IProduct, ISeller } from '@/actions'
import { useQuery } from '@tanstack/react-query'

export interface Slider {
	id: string
	imageUrl: string
	title: string
	url: string
}

export interface Seller {
	id: number
	storeName: string
	logoUrl?: string | null
	type: 'restaurant' | 'shop'
	status: number
	acceptingOrders: boolean
	deliveryTime?: string
	categories: string[]
	products: IProduct[]
}

export interface Product {
	id: number
	name: string
	description: string
	price: number
	imageUrl?: string
	sellerId: number
}

export interface HomeData {
	sliders: Slider[]
	sellers: Seller[]
}

export const useHomeData = () => {
	return useQuery({
		queryKey: ['homeData'],
		queryFn: () => homeGet(),
		staleTime: 5 * 60 * 1000, // 5 минут
		gcTime: 10 * 60 * 1000, // 10 минут (заменил cacheTime на gcTime)
		retry: 2,
		refetchOnWindowFocus: false,
	})
}

// Хук для получения только ресторанов
export const useRestaurants = () => {
	const { data: homeData, ...rest } = useHomeData()

	return {
		...rest,
		data:
			homeData?.data?.sellers?.filter(
				(seller: ISeller) => seller.type === 'restaurant'
			) || [],
	}
}

// Хук для получения только магазинов
export const useShops = () => {
	const { data: homeData, ...rest } = useHomeData()

	return {
		...rest,
		data:
			homeData?.data?.sellers?.filter(
				(seller: ISeller) => seller.type === 'shop'
			) || [],
	}
}

// Хук для получения слайдеров
export const useSliders = () => {
	const { data: homeData, ...rest } = useHomeData()

	return {
		...rest,
		data: homeData?.data?.sliders || [],
	}
}
