'use server'

import { MutateActionOptions } from '@/types/action-options'
import { ErrorObjectSetup } from '@/utils/error-object-setup'
import { revalidatePath, revalidateTag } from 'next/cache'
import { api } from './api-wrapper'

export const abstractMutateAction = async ({
	url,
	params = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	},
	isServerAction = true,
	revalidateTags,
	revalidatePaths,
}: MutateActionOptions) => {
	const finalUrl = url

	const fetchParams: RequestInit = {
		method: params?.method || 'POST',
		headers: params?.headers || {
			'Content-Type': 'application/json',
		},
	}

	if (params?.body) {
		if (typeof params.body === 'object') {
			fetchParams.body = JSON.stringify(params.body)
		} else {
			fetchParams.body = params.body
		}
	}

	const res = await api(finalUrl, fetchParams, isServerAction)

	const errorResult = await ErrorObjectSetup(res)
	if (errorResult?.error) {
		return errorResult
	}

	if (revalidateTags?.length) {
		revalidateTags.forEach((tag) => revalidateTag(tag))
	}

	if (revalidatePaths?.length) {
		revalidatePaths.forEach((path) => revalidatePath(path))
	}

	return res.json()
}
