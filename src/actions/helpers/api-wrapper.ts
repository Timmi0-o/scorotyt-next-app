export const api = async (url: string, params: RequestInit, json = true) => {
	// let session
	// if (ssr) {
	// 	session = await getServerSession(authOptions)
	// } else {
	// 	session = await getSession()
	// }

	let opts: RequestInit
	if (json) {
		opts = {
			...params,
			headers: {
				'Content-Type': 'application/json',
				// Authorization: 'Bearer ' + session?.accessToken,
				// 'Session-Id': session?.sessionId ?? '',
				...params.headers,
			},
		}
	} else {
		opts = {
			...params,
			headers: {
				// Authorization: 'Bearer ' + session?.accessToken,
				// 'Session-Id': session?.sessionId ?? '',
				...params.headers,
			},
		}
	}

	return await fetch(url, opts)
}
