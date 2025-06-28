'use client'

import { homeGet, ISeller } from '@/actions'
import { useQuery } from '@tanstack/react-query'

export const useHomeData = () => {
	return useQuery({
		queryKey: ['homeData'],
		queryFn: () => homeGet({ filters: { city_id: 1 } }),
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
		data: homeData?.data?.sliders,
	}
}

// Хук для получения категорий
export const useCategories = () => {
	const { data: homeData, ...rest } = useHomeData()

	return {
		...rest,
		data: homeData?.data?.categories || [],
	}
}
