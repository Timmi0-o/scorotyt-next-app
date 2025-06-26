export const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
	PATCH: 'PATCH',
} as const

export const TAGS = {
	HOME: {
		tags: ['home'],
		revalidate: 300,
	},
	SELLERS: {
		tags: ['sellers'],
		revalidate: 600,
	},
	PRODUCTS: {
		tags: ['products'],
		revalidate: 300,
	},
	CART: {
		tags: ['cart'],
		revalidate: 0,
	},
	ORDERS: {
		tags: ['orders'],
		revalidate: 60,
	},
} as const
