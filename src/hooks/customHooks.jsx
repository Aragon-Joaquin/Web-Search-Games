import { useContext, useEffect, useRef, useState } from 'react'
import { GamesContext } from './gamesContext'
import { FETCH_STATUS, MAXIMUM_FETCH_QUERIES, queriesInfo } from '../magicStrings'
import { FETCH_DATA, getGamesSubcategory } from '../functions/APIPetitions.js'
import { createClassError, ERROR_MESSAGE_TYPE, ValidateError } from '../utils/error_handle.js'

const { searchFunction, FILTERS } = queriesInfo

export function useSearch() {
	const [updateSearch, setUpdateSearch] = useState('') //! could be a better way to do this
	const [validSearch, setValidSearch] = useState('')

	const prevValue = useRef('')
	const firstRender = useRef(true)

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
			return
		}
		console.log('length', updateSearch.length)

		if (updateSearch.length < 3) return setValidSearch(createClassError(ERROR_MESSAGE_TYPE.SEARCH_LESS_THAN))

		if (prevValue.current === updateSearch) return setValidSearch(createClassError(ERROR_MESSAGE_TYPE.SEARCH_SAME_NAME))
		prevValue.current = updateSearch

		setValidSearch(updateSearch)
	}, [updateSearch])

	return { validSearch, setUpdateSearch }
}

export function useGetGames({ search }) {
	const [gamesRawData, setGamesRawData] = useState()
	const [statusFetch, setStatusFetch] = useState()

	const { setGames } = useContext(GamesContext)

	useEffect(() => {
		console.log(search)
		if (search instanceof ValidateError) return
		//! its not the best way to do this but i wanted to do it anymays to test it out

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
		if (!search) return
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
