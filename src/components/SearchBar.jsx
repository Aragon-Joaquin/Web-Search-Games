import { GamesContainer } from './GamesContainer'
import { FETCH_STATUS, queriesInfo } from '../magicStrings'
import { useContext, useEffect, useState } from 'react'
import { GamesContext } from '../hooks/gamesContext'
import { FETCH_DATA, reduceMultipleQuery } from '../functions/functions'
import { LoadingBar } from '../assets/Loading.jsx'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const { searchFunction, FILTERS } = queriesInfo
let newValue = ''

export function SearchBar() {
	const { gamesState, setGames, setGamesRawData, getSessionCookie } = useContext(GamesContext)
	const [statusFetch, setStatusFetch] = useState(FETCH_STATUS.IDLE)

	const { access_token } = getSessionCookie()
	const gamesRaw = gamesState['gamesRawData']

	async function getGames(evt) {
		evt.preventDefault()

		const gameValue = evt.target[0].value
		if (gameValue === '' || !access_token || gameValue === newValue) return

		newValue = gameValue
		setStatusFetch(FETCH_STATUS.LOADING) //! first Loading
		setGames([])

		const searchParams = searchFunction(FILTERS, 2, gameValue)
		const data = await FETCH_DATA({
			route: '/api/games',
			CLIENT_ID,
			access_token,
			searchParams
		})
		setGamesRawData(data)
	}

	useEffect(() => {
		async function getGamesSubcategory({ gamesRaw }) {
			const results = gamesRaw.map(async (games) => {
				const { id, total_rating, name, storyline } = games
				const searchParams = reduceMultipleQuery(games)

				const data = await FETCH_DATA({
					route: '/api/multiquery',
					CLIENT_ID,
					access_token,
					searchParams
				})
				return [{ name, id, total_rating, storyline }, data]
			})
			const data = await Promise.all(results)
			setGames(data)
			setStatusFetch(FETCH_STATUS.SUCCESS) //! secondLoading
		}
		if (gamesState['gamesRawData'] != undefined) {
			getGamesSubcategory({ gamesRaw: gamesRaw })
		} //! else give a toast

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gamesState['gamesRawData']])

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
			{statusFetch === FETCH_STATUS.LOADING && <LoadingBar />}
			{gamesState['games'].length > 0 && <GamesContainer results={gamesState['games']} />}
		</>
	)
}
