import { ActionOptions } from '@/types/action-options'
import { IApiResponse, ICategory, ISeller } from '@/types/api.types'
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
				revalidate: TAGS.SELLERS.revalidate,
				tags: [...TAGS.SELLERS.tags],
			},
		},
		filters: {
			limit: params?.limit || 100,
			latitude: params?.latitude,
			longitude: params?.longitude,
			seller_id: params?.seller_id,
		},
	}

	return abstractGetAction(defaultOptions)
}

export const sellerProductsGet = async (
	sellerId: number
): Promise<IApiResponse<ICategory[]>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.sellers.products(sellerId),
		params: {
			method: METHODS.GET,
			next: {
				revalidate: TAGS.PRODUCTS.revalidate,
				tags: [...TAGS.PRODUCTS.tags, `seller-${sellerId}`],
			},
		},
	}

	return abstractGetAction(defaultOptions)
}
