export const api = async (
	url: string,
	params: RequestInit,
	// ssr = true,
	json = true
) => {
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
				...params.headers,
				'Content-Type': 'application/json',
				// Authorization: 'Bearer ' + session?.accessToken,
			},
		}
	} else {
		opts = {
			...params,
			headers: {
				...params.headers,
				// Authorization: 'Bearer ' + session?.accessToken,
			},
		}
	}

	return await fetch(url, opts)
}
