import { toast } from 'sonner'
import { withErrorHandler } from './withErrorHandler'

type ApiResponse<T> =
	| { success: true; data: T }
	| {
			success: false
			error: { message: string; code: string }
			path: string
			timestamp: Date
	  }

export const requestManager = async <T = unknown>({
	fn,
	onOk,
	isResponse,
}: {
	fn: Promise<ApiResponse<T>>
	onOk?: () => void
	isResponse?: boolean
}): Promise<T | undefined> => {
	const { data, error } = await withErrorHandler(() => fn)

	if (error?.message) {
		toast.error(error.message)
		return undefined
	}

	if (onOk) {
		onOk()
	}

	return isResponse ? data || undefined : undefined
}
