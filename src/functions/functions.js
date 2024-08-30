export async function FETCH_DATA({ route, CLIENT_ID, access_token, searchParams }) {
	const result = await fetch(route, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Client-ID': `${CLIENT_ID}`,
			Authorization: `Bearer ${access_token}`
		},
		body: searchParams
	})
	//* fetch(url, { signal: AbortSignal.timeout(5000) })
	const data = await result.json()
	return data
}

//!
//! Helps when fetching a singular category. It removes ID's that are identical and only it keeps one
//!

//todo: improve .flat()
export function reduceDuplicates({ array, comparative, selector = 'id', initialArrayValue = [] }) {
	const comparativeArray = initialArrayValue
	if (!comparative) return
	const categoriesResumed = array.map((upperGame) => {
		return upperGame
			.at(1)
			.filter((category) => {
				if (category[0] !== `Game ${comparative}`) return
				return category
			})
			.flat(1) // so it can return [string,[]] instead of [[string,[]]]
	})

	categoriesResumed.forEach((game) => {
		const gameResults = game[1]
		gameResults.forEach((lastStep) => {
			if (comparativeArray.includes(lastStep[selector])) return
			else comparativeArray.push(lastStep[selector])
		})
	})
	return comparativeArray
}

//!
//! Helps with the fetch multiquery that provides the API
//!

import { APIInfo, queriesInfo } from '../magicStrings'
const { APICALLS } = APIInfo
const apiCallKeys = Object.keys(APIInfo.APICALLS)

export function reduceMultipleQuery(gamesRaw) {
	let searchParams = ''
	for (const key in gamesRaw) {
		if (apiCallKeys.includes(key)) {
			searchParams += queriesInfo.multipleQuery(
				APICALLS[key],
				`Game ${APICALLS[key]}`,
				undefined,
				4,
				'id',
				gamesRaw[key]
			)
		}
	}
	return searchParams
}

//!
//! Simplifies the array
//!

export function returnEveryResult(results) {
	/*
	 * gameInfo.at(0) = non fetchable results since they dont require an ID
	 * gameInfo.at(1) = fetch result from SearchBar
	 */
	const dataInfo = results.map((gameInfo) => {
		const { name, id, total_rating, storyline } = gameInfo.at(0)

		const data = gameInfo.at(1).map((category) => {
			return [category.name, category.result]
		})
		return [{ name, id, total_rating, storyline }, data]
	})
	return dataInfo
}

//!
//! LocalStorage functions
//!

export function getLocalStorage(TOKEN_NAME) {
	const localStorage = globalThis.localStorage.getItem(TOKEN_NAME)
	return JSON.parse(localStorage)
}

export function setLocalStorage({ TOKEN_NAME, data }) {
	return globalThis.localStorage?.setItem(TOKEN_NAME, JSON.stringify(data))
}

//!
//!
//!
