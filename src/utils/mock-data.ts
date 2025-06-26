import { ICategory, ISeller } from '@/types/api.types'

export const mockProductsData: Record<number, ICategory[]> = {
	1: [
		// Пицца Хаус
		{
			id: 1,
			name: 'Пицца',
			slug: 'pizza',
			subtitle: 'Горячие пиццы',
			image:
				'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=300&fit=crop',
			type: 'category',
			products_count: 3,
			products: [
				{
					id: 1,
					name: 'Маргарита',
					slug: 'margarita',
					subtitle: 'Классическая пицца с томатами и моцареллой',
					image:
						'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=300&fit=crop',
					type: 'product',
					price: 450,
				},
				{
					id: 2,
					name: 'Пепперони',
					slug: 'pepperoni',
					subtitle: 'Острая пицца с колбасой пепперони',
					image:
						'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop',
					type: 'product',
					price: 520,
				},
				{
					id: 3,
					name: 'Четыре сыра',
					slug: 'four-cheese',
					subtitle: 'Пицца с четырьмя видами сыра',
					image:
						'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=300&fit=crop',
					type: 'product',
					price: 580,
				},
			],
		},
	],
	2: [
		// Суши Мастер
		{
			id: 2,
			name: 'Роллы',
			slug: 'rolls',
			subtitle: 'Свежие роллы',
			image:
				'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
			type: 'category',
			products_count: 2,
			products: [
				{
					id: 4,
					name: 'Филадельфия',
					slug: 'philadelphia',
					subtitle: 'Ролл с лососем и сливочным сыром',
					image:
						'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=300&fit=crop',
					type: 'product',
					price: 320,
				},
				{
					id: 5,
					name: 'Калифорния',
					slug: 'california',
					subtitle: 'Ролл с крабом и авокадо',
					image:
						'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=300&fit=crop',
					type: 'product',
					price: 280,
				},
			],
		},
	],
	3: [
		// Продукты 24/7
		{
			id: 3,
			name: 'Продукты',
			slug: 'products',
			subtitle: 'Свежие продукты',
			image:
				'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
			type: 'category',
			products_count: 2,
			products: [
				{
					id: 6,
					name: 'Молоко 3.2%',
					slug: 'milk',
					subtitle: 'Свежее молоко 1л',
					image:
						'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
					type: 'product',
					price: 85,
				},
				{
					id: 7,
					name: 'Хлеб белый',
					slug: 'bread',
					subtitle: 'Свежий белый хлеб',
					image:
						'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
					type: 'product',
					price: 45,
				},
			],
		},
	],
}

export const mockSellersData: ISeller[] = [
	{
		id: 1,
		name: 'Пицца Хаус',
		store_name: 'Пицца Хаус',
		status: 1,
		latitude: '55.7558',
		longitude: '37.6176',
		logo: 'pizza-house-logo.png',
		type: 'restaurant',
		store_description: 'Лучшая пицца в городе',
		working_hours:
			'[{"day": "monday", "open": "10:00", "close": "23:00", "type": "daily"}, {"day": "tuesday", "open": "10:00", "close": "23:00", "type": "daily"}]',
		time_delivery: '25',
		time_cooking: '15',
		formatted_address: 'ул. Пушкина, д. 10, Москва',
		accepting_orders: 1,
		max_delivery_distance: '5000',
		row_order: 100,
		logo_url:
			'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop&crop=center',
		categories_array: '9,17',
		products: mockProductsData[1],
	},
	{
		id: 2,
		name: 'Суши Мастер',
		store_name: 'Суши Мастер',
		status: 1,
		latitude: '55.7558',
		longitude: '37.6176',
		logo: 'sushi-master-logo.png',
		type: 'restaurant',
		store_description: 'Свежие суши каждый день',
		working_hours:
			'[{"day": "monday", "open": "11:00", "close": "22:00", "type": "daily"}, {"day": "tuesday", "open": "11:00", "close": "22:00", "type": "daily"}]',
		time_delivery: '30',
		time_cooking: '20',
		formatted_address: 'ул. Ленина, д. 25, Москва',
		accepting_orders: 1,
		max_delivery_distance: '8000',
		row_order: 100,
		logo_url:
			'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop&crop=center',
		categories_array: '33,34',
		products: mockProductsData[2],
	},
	{
		id: 3,
		name: 'Продукты 24/7',
		store_name: 'Продукты 24/7',
		status: 1,
		latitude: '55.7558',
		longitude: '37.6176',
		logo: 'products-247-logo.png',
		type: 'shop',
		store_description: 'Продукты круглосуточно',
		working_hours:
			'[{"day": "monday", "open": "00:00", "close": "23:59", "type": "daily"}, {"day": "tuesday", "open": "00:00", "close": "23:59", "type": "daily"}]',
		time_delivery: '15',
		time_cooking: '5',
		formatted_address: 'пр. Мира, д. 45, Москва',
		accepting_orders: 1,
		max_delivery_distance: '3000',
		row_order: 100,
		logo_url:
			'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
		categories_array: '236,321',
		products: mockProductsData[3],
	},
]
