import { ActionOptions, IActionOptions } from '@/types/action-options'
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

export const productGetOne = async ({
	...options
}: { id: number | string } & Partial<ActionOptions>): Promise<
	IApiResponse<IProduct>
> => {
	const defaultOptions: IActionOptions = {
		url: ENDPOINTS.products.one(options.id),
		params: {
			method: METHODS.POST,
			next: {
				tags: [...TAGS.PRODUCTS.tags, `product-${options.id}`],
			},
		},
	}

	return abstractGetAction(defaultOptions)
}
