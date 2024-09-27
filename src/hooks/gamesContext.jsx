import { createContext, useReducer } from 'react'
import { useCookies } from 'react-cookie'
import { magicStrings } from '../magicStrings'
import { gameReducer, gamesInitialValues } from '../reducers/gameReducer'

export const GamesContext = createContext()

function useCookieProps() {
	const { COOKIE_NAME } = magicStrings
	const [allCookies, setSession] = useCookies([COOKIE_NAME])

	const COOKIES_FUNCTIONS = {
		getSessionCookie: function () {
			const checkIfCookies = allCookies[COOKIE_NAME]
			if (checkIfCookies == undefined) return false
			const cookieValue = checkIfCookies
			return cookieValue
		},

		setSessionCookies: function ({ expires_in = 0, access_token, token_type }) {
			setSession(COOKIE_NAME, { access_token, token_type }, { maxAge: expires_in, secure: true, sameSite: true })
		}
	}

	return COOKIES_FUNCTIONS
}

function useGameReducer() {
	const [state, dispatch] = useReducer(gameReducer, gamesInitialValues)

	const setGames = (gamesState) =>
		dispatch({
			type: 'SET_GAMES',
			payload: gamesState
		})

	const setPlatformLogo = (gamesState) => {
		dispatch({
			type: 'SET_PLATFORMLOGOS',
			payload: gamesState
		})
	}

	return { state, setGames, setPlatformLogo }
}

export function GameProvider({ children }) {
	const { getSessionCookie, setSessionCookies } = useCookieProps()
	const { state: gamesState, setGames, setPlatformLogo } = useGameReducer()
	/* 
		maybe a custom Hook could prevent making the values reactives
	*/
	return (
		<GamesContext.Provider
			value={{
				gamesState,
				setGames,
				setPlatformLogo,

				getSessionCookie,
				setSessionCookies
			}}
		>
			{children}
		</GamesContext.Provider>
	)
}
