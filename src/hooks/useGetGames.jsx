/* eslint-disable react-hooks/exhaustive-deps */

import { GamesContext } from './gamesContext.jsx'
import { FETCH_STATUS, MAXIMUM_FETCH_QUERIES, queriesInfo } from '../magicStrings.js'
import { FETCH_DATA, getGamesSubcategory } from '../functions/APIPetitions.js'
import {
	createClassError,
	ERROR_MESSAGE_TYPE,
	ERROR_NAME_TYPE,
	ReturnErrorName,
	ValidateError
} from '../utils/error_handle.js'
import { useContext, useEffect, useState } from 'react'

const { searchFunction, FILTERS } = queriesInfo
const { IDLE, LOADING, SUCCESS, ERROR } = FETCH_STATUS

export default function useGetGames({ search }) {
	const [gamesRawData, setGamesRawData] = useState()
	const [statusFetch, setStatusFetch] = useState(IDLE)
	const { setGames } = useContext(GamesContext)

	useEffect(() => {
		if (search instanceof ValidateError) return
		//! its not the best way to do this but i wanted to do it anymays to test it out

		async function fetchGames() {
			setStatusFetch(LOADING)
			setGames([])
			try {
				const searchParams = searchFunction(FILTERS, MAXIMUM_FETCH_QUERIES, search)

				const data = await FETCH_DATA({
					route: '/api/games',
					searchParams
				})

				console.log(data)
				if (data?.length >= 1) setGamesRawData(data)
				else {
					setStatusFetch(SUCCESS)
					throw new createClassError(ERROR_NAME_TYPE.FETCH_ERROR, ERROR_MESSAGE_TYPE.SEARCH_GAME_NOT_FOUND)
				}
			} catch (e) {
				const errorMessage = ReturnErrorName(e)
				setStatusFetch(ERROR(errorMessage))
			}
		}
		if (!search) return
		fetchGames()
	}, [search])

	useEffect(() => {
		async function getFulfilledGames() {
			try {
				const gamesInfo = await getGamesSubcategory({ gamesRaw: gamesRawData })
				setGames(gamesInfo)
				setStatusFetch(SUCCESS)
			} catch (e) {
				const errorMessage = ReturnErrorName(e)
				setStatusFetch(ERROR(errorMessage))
			}
		}
		if (gamesRawData?.length >= 1) getFulfilledGames()
	}, [gamesRawData])

	return { statusFetch }
}
