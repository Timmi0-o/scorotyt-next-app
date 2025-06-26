import { jwtDecode } from 'jwt-decode'

export const parseJwt = (token: string | null) => {
	if (!token) {
		console.error('Token is null or undefined')
		return null
	}

	try {
		const decoded = jwtDecode<{ exp: number }>(token)

		return decoded
	} catch (e) {
		console.error('Error decoding token:', e)
		return null
	}
}
