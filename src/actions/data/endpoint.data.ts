export const apiBase =
	process.env.NEXT_PUBLIC_API_URL || 'https://skorotut.kdigital.pro'

export const ENDPOINTS = {
	home: {
		get: `${apiBase}/customer/shop`,
	},
	sellers: {
		get: `${apiBase}/customer/sellers`,
		products: (sellerId: string | number) =>
			`${apiBase}/customer/products/sellers/${sellerId}`,
	},
	products: {
		get: `${apiBase}/products`,
		search: `${apiBase}/products/search`,
		one: (id: string | number) => `${apiBase}/products/${id}`,
	},
	cart: {
		get: `${apiBase}/cart`,
		items: `${apiBase}/cart/items`,
		item: (itemId: string | number) => `${apiBase}/cart/items/${itemId}`,
	},
	orders: {
		create: `${apiBase}/orders`,
	},
} as const
