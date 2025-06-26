/**
 * Обрабатывает ошибки ответа от сервера и возвращает объект ошибки.
 *
 * @param {Response} res - Ответ от сервера
 * @returns {Promise<{error: {statusCode: number, timestamp: string, message: string, error: string}} | void>} - Объект ошибки или ничего, если все прошло успешно
 *
 * @example
 * const response = await fetch('/api/data');
 * const error = await ErrorObjectSetup(response);
 * if (error) {
 *   console.error(error.error.message);
 * }
 */

export const ErrorObjectSetup = async (res: Response) => {
	if (!res.ok) {
		let errorData

		try {
			const errorResponse = await res.json()

			console.log('errorResponse', errorResponse)
			errorData = {
				statusCode: errorResponse.statusCode,
				timestamp: errorResponse.timestamp || new Date().toISOString(),
				message: errorResponse?.error
					? `${errorResponse?.error?.message} (${errorResponse?.error?.code}) (${errorResponse?.path})`
					: `Ошибка запроса (${res.status})`,
				error: errorResponse.error || res.statusText || 'Unknown Error',
			}
		} catch {
			errorData = {
				statusCode: res.status,
				timestamp: new Date().toISOString(),
				message: `Ошибка запроса (${res.status})`,
				error: res.statusText || 'Unknown Error',
			}
		}

		return { error: errorData }
	}
}
