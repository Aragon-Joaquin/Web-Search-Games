import { getSessionStorage, reduceMultipleQuery } from './functions'
import { ACCESS_TOKEN_NAME, FETCH_TIMEOUT_SECONDS } from '../magicStrings'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
export const TWITCH_AUTH = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

//
//
//

export async function FETCH_ACCESS_TOKEN() {
	try {
		const result = await fetch(TWITCH_AUTH, {
			method: 'POST',
			mode: 'cors',
			signal: AbortSignal.timeout(FETCH_TIMEOUT_SECONDS)
		})
		return await result.json()
	} catch (e) {
		console.log(e)
	}
}

export async function FETCH_DATA({ route, searchParams }) {
	const access_token = getSessionStorage(ACCESS_TOKEN_NAME)
	if (!access_token) return

	try {
		const result = await fetch(route, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Client-ID': `${CLIENT_ID}`,
				Authorization: `Bearer ${access_token}`
			},
			body: searchParams,
			signal: AbortSignal.timeout(FETCH_TIMEOUT_SECONDS)
		})
		return await result.json()
	} catch (e) {
		console.log(e)
	}
}

//
//
//

export async function getGamesSubcategory({ gamesRaw }) {
	const results = gamesRaw.map(async (games) => {
		const { id, total_rating, name, storyline } = games
		const searchParams = reduceMultipleQuery(games)

		const data = await FETCH_DATA({
			route: '/api/multiquery',
			searchParams
		})
		return [{ name, id, total_rating, storyline }, data]
	})
	return await Promise.all(results)
}
