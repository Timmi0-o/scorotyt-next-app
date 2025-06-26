import { ActionOptions } from '@/types/action-options'
import { IApiResponse, IProduct } from '@/types/api.types'
import { METHODS, TAGS } from './data/constants.data'
import { ENDPOINTS } from './data/endpoint.data'
import { abstractGetAction } from './helpers/abstract-action.action'

export const productsGet = async (params?: {
	page?: number
	limit?: number
}): Promise<IApiResponse<IProduct[]>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.products.get,
		params: {
			method: METHODS.GET,
			next: {
				revalidate: TAGS.PRODUCTS.revalidate,
				tags: [...TAGS.PRODUCTS.tags],
			},
		},
		filters: {
			page: params?.page || 1,
			limit: params?.limit || 10,
		},
	}

	return abstractGetAction(defaultOptions)
}

export const productsSearch = async (params: {
	query: string
	page?: number
	limit?: number
}): Promise<IApiResponse<IProduct[]>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.products.search,
		params: {
			method: METHODS.GET,
			next: {
				revalidate: TAGS.PRODUCTS.revalidate,
				tags: [...TAGS.PRODUCTS.tags],
			},
		},
		filters: {
			query: params.query,
			page: params?.page || 1,
			limit: params?.limit || 10,
		},
	}

	return abstractGetAction(defaultOptions)
}

export const productGet = async (
	id: number | string
): Promise<IApiResponse<IProduct>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.products.one(id),
		params: {
			method: METHODS.GET,
			next: {
				revalidate: TAGS.PRODUCTS.revalidate,
				tags: [...TAGS.PRODUCTS.tags, `product-${id}`],
			},
		},
	}

	return abstractGetAction(defaultOptions)
}
