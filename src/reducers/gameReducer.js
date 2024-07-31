export const gamesInitialValues = {
	games: [],
	gamesRawData: []
}

export const gamesActions = {
	// games: 'GET_GAMES',
	setGames: 'SET_GAMES',
	// gamesRawData: 'GET_GAMESRAW',
	setGamesRawData: 'SET_GAMESRAW'
}

const STATE_ACTIONS = {
	[gamesActions.setGames]: function (state, action) {
		const { payload } = action
		return { ...state, setGames: payload }
	},
	[gamesActions.setGamesRawData]: function (state, action) {
		const { payload } = action
		return { ...state, setGamesRawData: payload }
	}
}

export function gameReducer({ state, action }) {
	const { type: gameAction } = action
	const updateState = STATE_ACTIONS[gameAction]
	return updateState ? updateState(state, action) : state
}
