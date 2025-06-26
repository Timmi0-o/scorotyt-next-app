import { MutateActionOptions } from '@/types/action-options'
import { IApiResponse } from '@/types/api.types'
import { METHODS, TAGS } from './data/constants.data'
import { ENDPOINTS } from './data/endpoint.data'
import { abstractMutateAction } from './helpers/abstract-mutate-action.action'

interface IOrder {
	id: number
	status: string
	total: number
	// другие поля заказа
}

export const orderCreate = async (): Promise<IApiResponse<IOrder>> => {
	const defaultOptions: MutateActionOptions = {
		url: ENDPOINTS.orders.create,
		params: {
			method: METHODS.POST,
			headers: {
				'Content-Type': 'application/json',
			},
		},
		revalidateTags: [...TAGS.ORDERS.tags, ...TAGS.CART.tags],
	}

	return await abstractMutateAction(defaultOptions)
}
