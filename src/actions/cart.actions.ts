import { ActionOptions, MutateActionOptions } from '@/types/action-options'
import { IApiResponse } from '@/types/api.types'
import { METHODS, TAGS } from './data/constants.data'
import { ENDPOINTS } from './data/endpoint.data'
import { abstractGetAction } from './helpers/abstract-action.action'
import { abstractMutateAction } from './helpers/abstract-mutate-action.action'

interface ICartItem {
	id: number
	product_id: number
	quantity: number
	price: number
}

interface ICart {
	items: ICartItem[]
	total: number
}

export const cartGet = async (): Promise<IApiResponse<ICart>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.cart.get,
		params: {
			method: METHODS.GET,
			next: {
				tags: [...TAGS.CART.tags],
			},
		},
	}

	return abstractGetAction(defaultOptions)
}

export const cartAddItem = async (data: {
	productId: number | string
	quantity?: number
}): Promise<IApiResponse<ICartItem>> => {
	const defaultOptions: MutateActionOptions = {
		url: ENDPOINTS.cart.items,
		params: {
			method: METHODS.POST,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				productId: data.productId,
				quantity: data.quantity || 1,
			},
		},
		revalidateTags: [...TAGS.CART.tags],
	}

	return await abstractMutateAction(defaultOptions)
}

export const cartUpdateItem = async (data: {
	itemId: number | string
	quantity: number
}): Promise<IApiResponse<ICartItem>> => {
	const defaultOptions: MutateActionOptions = {
		url: ENDPOINTS.cart.item(data.itemId),
		params: {
			method: METHODS.PUT,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				quantity: data.quantity,
			},
		},
		revalidateTags: [...TAGS.CART.tags],
	}

	return await abstractMutateAction(defaultOptions)
}

export const cartRemoveItem = async (
	itemId: number | string
): Promise<IApiResponse<void>> => {
	const defaultOptions: MutateActionOptions = {
		url: ENDPOINTS.cart.item(itemId),
		params: {
			method: METHODS.DELETE,
		},
		revalidateTags: [...TAGS.CART.tags],
	}

	return await abstractMutateAction(defaultOptions)
}
