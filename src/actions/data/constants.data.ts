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
	},
	SELLERS: {
		tags: ['sellers'],
	},
	PRODUCTS: {
		tags: ['products'],
	},
	CART: {
		tags: ['cart'],
	},
	ORDERS: {
		tags: ['orders'],
	},
} as const
