import { toast } from 'sonner'
import { withErrorHandler } from './withErrorHandler'

export const requestManager = async <T = unknown>({
	fn,
	onOk,
	isResponse,
}: {
	fn: () => Promise<{
		status: number
		message: string
		total?: number
		data: T
		success?: boolean
	}>
	onOk?: () => void
	isResponse?: boolean
}): Promise<T | undefined> => {
	const { data, error } = await withErrorHandler(fn)

	if (error?.message) {
		toast.error(error.message)
		return undefined
	}

	if (onOk) {
		onOk()
	}

	return isResponse ? data || undefined : undefined
}
