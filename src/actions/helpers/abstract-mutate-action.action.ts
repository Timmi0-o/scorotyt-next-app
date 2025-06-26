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

	if (params?.body) {
		params.body = JSON.stringify(params.body)
	}

	const res = await api(finalUrl, params, isServerAction)

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
