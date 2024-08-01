import { createContext, useReducer } from 'react'
import { useCookies } from 'react-cookie'
import { magicStrings } from '../magicStrings'
import { gameReducer, gamesActions, gamesInitialValues } from '../reducers/gameReducer'

export const GamesContext = createContext()

function useCookieProps() {
	const { COOKIE_NAME } = magicStrings //! ESTE ES EL PROBLEMA
	const [allCookies, setSession] = useCookies([COOKIE_NAME])
	console.log(allCookies.sessionCookie)

	const COOKIES_FUNCTIONS = {
		getSessionCookie: function () {
			const checkIfCookies = allCookies?.COOKIE_NAME
			if (checkIfCookies == undefined) return false
			const { access_token } = checkIfCookies
			return access_token
		},

		setSessionCookies: function ({ expires_in = 0, access_token, token_type }) {
			setSession(
				COOKIE_NAME,
				{ access_token, token_type },
				{ maxAge: expires_in, secure: true, httpOnly: true, sameSite: true }
			)
		}
	}

	return COOKIES_FUNCTIONS
}

function useGameReducer() {
	const [state, dispatch] = useReducer(gameReducer, gamesInitialValues)

	const setGames = (gamesState) =>
		dispatch({
			type: gamesActions.setGames,
			payload: gamesState
		})

	const setGamesRawData = (gamesState) =>
		dispatch({
			type: gamesActions.setGamesRawData,
			payload: gamesState
		})

	return { state, setGames, setGamesRawData }
}

export function GameProvider({ children }) {
	const { getSessionCookie, setSessionCookies } = useCookieProps()
	const { state: gamesState, setGames, setGamesRawData } = useGameReducer()

	return (
		<GamesContext.Provider
			value={{
				gamesState,
				setGames,
				setGamesRawData,
				getSessionCookie,
				setSessionCookies
			}}
		>
			{children}
		</GamesContext.Provider>
	)
}
