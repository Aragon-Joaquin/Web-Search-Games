/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { GamesContainer } from './GamesContainer'
import { APIInfo } from '../magicStrings'
import { useContext, useEffect } from 'react'
import { GamesContext } from '../hooks/gamesContext'
import { FETCH_DATA } from '../functions/functions'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const { FILTERS, APICALLS } = APIInfo

export function SearchBar() {
	const { games, setGames, gamesRawData, setGamesRawData, getSessionCookie } = useContext(GamesContext)

	async function getGames(evt) {
		evt.preventDefault()
		const gameValue = evt.target[0].value
		const access_token = getSessionCookie()
		if (gameValue === '' || !access_token) return

		const searchParams = `
    f ${FILTERS}; limit ${2}; search "${gameValue}";`
		const data = await FETCH_DATA({
			route: '/api/games',
			CLIENT_ID,
			access_token,
			searchParams
		})

		setGamesRawData(data)
	}

	useEffect(() => {
		const apiCallEntries = Object.entries(APICALLS)

		const access_token = getSessionCookie()
		async function getGamesSubcategory({ gamesRaw }) {
			// todo: fix this logic
			const result = await gamesRaw.map(async (game) => {
				const { id, total_rating, name, storyline } = game
				const resultsOfFetch = apiCallEntries.map(async function (url) {
					const gameUrl = game[url[0]]
					if (!gameUrl) return []
					let ArrLength = gameUrl
					if (gameUrl?.length >= 6) ArrLength = gameUrl.slice(0, 5).toString() // maximum per category

					const searchParams = `
    f *; where id=(${ArrLength});
    `
					const data = await FETCH_DATA({
						route: `/api/${url[1]}`,
						CLIENT_ID,
						access_token,
						searchParams
					})
					return data
				})
				const addingRest = await Promise.all(resultsOfFetch)
				return [{ name, id, total_rating, storyline }, ...addingRest]
			})
			const names = await Promise.all(result)
			setGames(names)
		}
		if (gamesRawData != undefined) {
			getGamesSubcategory({ gamesRaw: gamesRawData })
		}
	}, [gamesRawData])
	return (
		<>
			<section>
				<form className="main-form" onSubmit={getGames}>
					<input type="text" placeholder="Search the game you preffer" />
					<input type="submit" value="Search" />
				</form>
			</section>

			<section className="tagsSection">
				<div>
					<p>section of tags loremupsuim</p>
				</div>
			</section>

			<ul>{games.length ? <GamesContainer results={games} /> : <></>}</ul>
		</>
	)
}
