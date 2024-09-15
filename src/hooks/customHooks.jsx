import { useContext, useEffect, useRef, useState } from 'react'
import { GamesContext } from './gamesContext'
import { FETCH_STATUS, MAXIMUM_FETCH_QUERIES, queriesInfo } from '../magicStrings'
import { FETCH_DATA, getGamesSubcategory } from '../functions/APIPetitions.js'

const { searchFunction, FILTERS } = queriesInfo

export function useSearch() {
	const [updateSearch, setUpdateSearch] = useState('')
	const firstRender = useRef(true)

	useEffect(() => {
		if (firstRender) {
			firstRender.current = false
			return
		}

		//! implement better error handleing
		// console.log(updateSearch.length)
		// if (updateSearch.length === 0) {
		// 	setError('Cannot search a empty game')
		// 	return
		// }

		// setError(null)
	}, [updateSearch])

	return { updateSearch, setUpdateSearch }
}

export function useGetGames({ search }) {
	const [gamesRawData, setGamesRawData] = useState()
	const [statusFetch, setStatusFetch] = useState()

	const { setGames } = useContext(GamesContext)
	const prevValue = useRef('')

	useEffect(() => {
		console.log(search)
		async function fetchGames() {
			setStatusFetch(FETCH_STATUS.LOADING)
			setGames([])
			try {
				const searchParams = searchFunction(FILTERS, MAXIMUM_FETCH_QUERIES, search)

				const data = await FETCH_DATA({
					route: '/api/games',
					searchParams
				})
				setGamesRawData(data)
			} catch (e) {
				setStatusFetch(FETCH_STATUS.ERROR(e.message))
			}
		}
		if (!search) return console.error('!')
		if (prevValue.current === search) return console.error('!!')
		prevValue.current = search
		fetchGames()
	}, [search])

	useEffect(() => {
		async function getFulfilledGames() {
			const gamesInfo = await getGamesSubcategory({ gamesRaw: gamesRawData })
			setGames(gamesInfo)
			setStatusFetch(FETCH_STATUS.SUCCESS)
		}
		if (gamesRawData) getFulfilledGames()
	}, [gamesRawData])

	return { statusFetch }
}
