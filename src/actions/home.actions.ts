import { ActionOptions } from '@/types/action-options'
import { METHODS, TAGS } from './data/constants.data'
import { ENDPOINTS } from './data/endpoint.data'
import { abstractGetAction } from './helpers/abstract-action.action'

export const homeGet = async ({ ...options }: Partial<ActionOptions>) => {
	const defaultOptions: ActionOptions = {
		url: ENDPOINTS.home.get,
		params: {
			method: METHODS.GET,
			next: {
				tags: [...TAGS.HOME.tags],
			},
		},
	}

	return abstractGetAction({
		...defaultOptions,
		...options,
	})
}
