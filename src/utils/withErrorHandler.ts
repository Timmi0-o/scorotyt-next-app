type ErrorResponse = {
	message: string
	code: string
}

type SuccessResponse<T> = {
	success: true
	data: T
}

type ApiResponse<T> =
	| SuccessResponse<T>
	| { error: ErrorResponse; success: false; path: string; timestamp: Date }

type HandlerResult<T> = {
	data: T | null
	error?: {
		message: string
	}
	success: boolean
	timestamp?: Date
	path?: string
}

export async function withErrorHandler<T>(
	fn: () => Promise<ApiResponse<T>>
): Promise<HandlerResult<T>> {
	try {
		const res = await fn()

		if (!res.success) {
			return {
				success: res.success,
				error: {
					message: `${res.error.message} (${res.error.code}, ${
						res.path || 'unknown'
					})`,
				},
				timestamp: res.timestamp,
				path: res.path,
				data: null,
			}
		}

		return {
			data: res.data,
			success: res.success,
		}
	} catch {
		return {
			data: null,
			error: {
				message: 'Неизвестная ошибка',
			},
			success: false,
			timestamp: new Date(),
			path: '',
		}
	}
}
