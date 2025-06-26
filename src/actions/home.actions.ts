import { ActionOptions } from '@/types/action-options'
import { IApiResponse, IHomeData } from '@/types/api.types'
import { METHODS, TAGS } from './data/constants.data'
import { ENDPOINTS } from './data/endpoint.data'
import { abstractGetAction } from './helpers/abstract-action.action'

export const homeGet = async (params?: {
	latitude?: number
	longitude?: number
	sort?: string
}): Promise<IApiResponse<IHomeData>> => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.home.get,
		params: {
			method: METHODS.GET,
			next: {
				revalidate: TAGS.HOME.revalidate,
				tags: [...TAGS.HOME.tags],
			},
		},
		filters: {
			latitude: params?.latitude || 55.7558,
			longitude: params?.longitude || 37.6176,
			sort: params?.sort || 'new',
		},
	}

	return abstractGetAction(defaultOptions)
}
