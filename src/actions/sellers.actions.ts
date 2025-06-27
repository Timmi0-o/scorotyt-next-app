import { ActionOptions } from '@/types/action-options'
import { IApiResponse, IProduct, ISeller } from '@/types/api.types'
import { METHODS, TAGS } from './data/constants.data'
import { ENDPOINTS } from './data/endpoint.data'
import { abstractGetAction } from './helpers/abstract-action.action'

export const sellersGet = async (params?: {
	latitude?: number
	longitude?: number
	limit?: number
	seller_id?: number
}): Promise<IApiResponse<ISeller[]>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.sellers.get,
		params: {
			method: METHODS.GET,
			next: {
				tags: [...TAGS.SELLERS.tags],
			},
		},
		filters: {
			limit: params?.limit,
			latitude: params?.latitude,
			longitude: params?.longitude,
			seller_id: params?.seller_id,
		},
	}

	return abstractGetAction(defaultOptions)
}

export const sellerProductsGet = async ({
	...options
}: { sellerId: number } & Partial<ActionOptions>): Promise<
	IApiResponse<IProduct[]>
> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.sellers.products(options.sellerId),
		params: {
			method: METHODS.GET,
			next: {
				tags: [...TAGS.PRODUCTS.tags, `seller-${options.sellerId}`],
			},
		},
	}

	return abstractGetAction(defaultOptions)
}

export const sellerProductsByCategoryGet = async ({
	...options
}: { categoryId: number } & Partial<ActionOptions>): Promise<
	IApiResponse<IProduct[]>
> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.sellers.productsByCategory(options.categoryId),
		params: {
			method: METHODS.GET,
			next: {
				tags: [...TAGS.PRODUCTS.tags, `category-${options.categoryId}`],
			},
		},
	}

	return abstractGetAction(defaultOptions)
}
