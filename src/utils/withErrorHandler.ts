type SuccessResponse<T> = {
	status: number
	message: string
	total?: number
	data: T
	success?: boolean
}

type ApiResponse<T> = SuccessResponse<T>

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

		if (res.message !== 'success') {
			return {
				success: false,
				error: {
					message: `Ошибка API: ${res.message}`,
				},
				timestamp: new Date(),
				data: null,
			}
		}

		return {
			data: res.data,
			success: true,
		}
	} catch (error) {
		console.log('error', error)
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
