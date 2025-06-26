import { IActionOptions } from '@/types/action-options'
import { ErrorObjectSetup } from '@/utils/error-object-setup'
import { api } from './api-wrapper'

export const abstractGetAction = async ({
	url,
	params = {
		method: 'GET',
	},
	filters,
	customFormatter,
}: IActionOptions) => {
	let finalUrl = url

	console.log('1', 1)

	if (filters) {
		const formattedParams = customFormatter
			? customFormatter(filters)
			: defaultQueryFormatter(filters)

		if (formattedParams && Object.keys(formattedParams).length > 0) {
			finalUrl += `?${new URLSearchParams(formattedParams)}`
		}
	}

	const res = await api(finalUrl, params)

	const errorResult = await ErrorObjectSetup(res)

	if (errorResult?.error) {
		return errorResult
	}

	const data = await res.json()

	return data
}

function defaultQueryFormatter(
	filters: Record<string, unknown>
): Record<string, string> | undefined {
	if (!filters) {
		return undefined
	}

	const params: Record<string, string> = {}

	// Общие параметры пагинации и поиска
	if (filters._limit) {
		params._limit = String(filters._limit)
	}

	if (filters._offset) {
		params._offset = String(filters._offset)
	}

	if (filters._status) {
		params._status = String(filters._status)
	}

	if (filters._value) {
		params._value = String(filters._value)
	}

	if (filters._id) {
		params._id = String(filters._id)
	}

	if (filters._slug) {
		params._slug = String(filters._slug)
	}

	// Параметры для skorotut API
	if (filters.latitude !== undefined) {
		params.latitude = String(filters.latitude)
	}

	if (filters.longitude !== undefined) {
		params.longitude = String(filters.longitude)
	}

	if (filters.sort) {
		params.sort = String(filters.sort)
	}

	if (filters.limit) {
		params.limit = String(filters.limit)
	}

	if (filters.page) {
		params.page = String(filters.page)
	}

	if (filters.query) {
		params.query = String(filters.query)
	}

	if (filters.seller_id) {
		params.seller_id = String(filters.seller_id)
	}

	return Object.keys(params).length > 0 ? params : undefined
}
