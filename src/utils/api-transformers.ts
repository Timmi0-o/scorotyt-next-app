import {
	IProduct,
	ISeller,
	ISlider,
	ITransformedProduct,
	ITransformedSeller,
	ITransformedSlider,
	IWorkingHoursDay,
} from '@/types/api.types'

// Функция для обработки URL изображений
export const processImageUrl = (
	url: string | null,
	fallbackUrl: string,
	type: 'product' | 'seller' = 'product'
): string => {
	if (!url) {
		console.log('🖼️ No image URL provided, using fallback:', fallbackUrl)
		return fallbackUrl
	}

	const API_BASE_URL =
		process.env.NEXT_PUBLIC_API_URL || 'https://skorotut.kdigital.pro'

	// Если URL уже полный, проверяем и исправляем если нужно
	if (url.startsWith('http://') || url.startsWith('https://')) {
		// Если это URL с x.skorotut.ru, заменяем на правильный Yandex Cloud URL
		if (url.includes('x.skorotut.ru/storage/images/products/')) {
			const filename = url.split('/').pop()
			const correctedUrl = `https://storage.yandexcloud.net/skorotut/products/${filename}`
			console.log(
				'🖼️ Corrected x.skorotut.ru product URL:',
				url,
				'->',
				correctedUrl
			)
			return correctedUrl
		}

		if (url.includes('x.skorotut.ru/storage/images/sellers/')) {
			const filename = url.split('/').pop()
			const correctedUrl = `https://storage.yandexcloud.net/skorotut/sellers/${filename}`
			console.log(
				'🖼️ Corrected x.skorotut.ru seller URL:',
				url,
				'->',
				correctedUrl
			)
			return correctedUrl
		}

		// Если это уже Yandex Cloud URL, возвращаем как есть
		if (url.includes('storage.yandexcloud.net/skorotut/')) {
			console.log('🖼️ Yandex Cloud URL provided:', url)
			return url
		}

		// Если это уже правильный URL, возвращаем как есть
		console.log('🖼️ Full URL provided:', url)
		return url
	}

	// Если относительный путь, добавляем базовый URL API
	if (url.startsWith('/')) {
		const fullUrl = `${API_BASE_URL}${url}`
		console.log('🖼️ Relative path converted:', url, '->', fullUrl)
		return fullUrl
	}

	// Если просто имя файла, проверяем тип и добавляем правильный путь
	let fullUrl: string

	if (url.includes('_') && /^\d+_\d+\.(jpg|jpeg|png|webp)$/i.test(url)) {
		// Это файл из Yandex Cloud Storage
		if (type === 'seller') {
			fullUrl = `https://storage.yandexcloud.net/skorotut/sellers/${url}`
			console.log('🖼️ Yandex Cloud seller image:', url, '->', fullUrl)
		} else {
			fullUrl = `https://storage.yandexcloud.net/skorotut/products/${url}`
			console.log('🖼️ Yandex Cloud product image:', url, '->', fullUrl)
		}
	} else if (url.startsWith('categories/')) {
		// Это изображение категории
		const filename = url.replace('categories/', '')
		fullUrl = `https://storage.yandexcloud.net/skorotut/categories/${filename}`
		console.log('🖼️ Category image converted:', url, '->', fullUrl)
	} else if (url.startsWith('products/')) {
		// Это изображение продукта
		const filename = url.replace('products/', '')
		fullUrl = `https://storage.yandexcloud.net/skorotut/products/${filename}`
		console.log('🖼️ Product image converted:', url, '->', fullUrl)
	} else if (url.startsWith('sliders/')) {
		// Это изображение слайдера
		const filename = url.replace('sliders/', '')
		fullUrl = `https://storage.yandexcloud.net/skorotut/sliders/${filename}`
		console.log('🖼️ Slider image converted:', url, '->', fullUrl)
	} else {
		// Обычный файл - добавляем стандартный путь
		fullUrl = `${API_BASE_URL}/storage/images/${url}`
		console.log('🖼️ Standard filename converted:', url, '->', fullUrl)
	}

	return fullUrl
}

// Функции для преобразования данных API в формат приложения
export const transformSeller = (apiSeller: ISeller): ITransformedSeller => {
	// Обрабатываем categories_array - строка с ID через запятую
	let categories: number[] = []
	if (
		apiSeller.categories_array &&
		typeof apiSeller.categories_array === 'string'
	) {
		categories = apiSeller.categories_array
			.split(',')
			.map((id) => parseInt(id.trim()))
			.filter((id) => !isNaN(id))
	}

	// Парсим working_hours JSON
	let workingHours: IWorkingHoursDay[] | null = null
	if (apiSeller.working_hours) {
		try {
			workingHours = JSON.parse(apiSeller.working_hours) as IWorkingHoursDay[]
		} catch (error) {
			console.warn('Failed to parse working_hours:', error)
			workingHours = null
		}
	}

	// Fallback изображения для разных типов
	const fallbackLogo =
		apiSeller.type === 'restaurant'
			? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&crop=center'
			: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center'

	return {
		id: apiSeller.id,
		name: apiSeller.name,
		storeName: apiSeller.store_name,
		logoUrl: processImageUrl(apiSeller.logo_url, fallbackLogo, 'seller'),
		type:
			apiSeller.type === 'restaurant'
				? ('restaurant' as const)
				: ('shop' as const),
		status: apiSeller.status,
		acceptingOrders: apiSeller.accepting_orders === 1,
		deliveryTime: apiSeller.time_delivery,
		cookingTime: apiSeller.time_cooking,
		address: apiSeller.formatted_address,
		description: apiSeller.store_description,
		workingHours: workingHours,
		maxDeliveryDistance: parseInt(apiSeller.max_delivery_distance) || 0,
		categories,
		products: [], // Будет заполнено отдельно
	}
}

export const transformProduct = (
	apiProduct: IProduct,
	sellerId: number
): ITransformedProduct => {
	// Fallback изображение для товаров
	const fallbackImage =
		'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop'

	// Получаем цену из первого варианта, если есть
	let price = apiProduct.price || 0
	if (apiProduct.variants && apiProduct.variants.length > 0) {
		const firstVariant = apiProduct.variants[0]
		price =
			firstVariant.discounted_price > 0
				? firstVariant.discounted_price
				: firstVariant.price
	}

	// Используем image_url если есть, иначе обрабатываем image
	const imageUrl =
		apiProduct.image_url ||
		processImageUrl(apiProduct.image, fallbackImage, 'product')

	return {
		id: apiProduct.id,
		name: apiProduct.name,
		description:
			apiProduct.subtitle || apiProduct.description || apiProduct.name,
		price: price,
		imageUrl: imageUrl,
		sellerId: sellerId,
	}
}

// Функция для трансформации слайдера
export const transformSlider = (apiSlider: ISlider): ITransformedSlider => {
	// Fallback изображение для слайдеров
	const fallbackImage =
		'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop'

	return {
		id: apiSlider.id,
		imageUrl: processImageUrl(apiSlider.image_url, fallbackImage, 'product'),
		title: apiSlider.type_name || 'Акция',
		url: apiSlider.slider_url || '',
	}
}
