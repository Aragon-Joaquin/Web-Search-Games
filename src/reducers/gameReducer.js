export const gamesInitialValues = {
	games: [],
	platformsLogos: []
}

export const gamesActions = {
	setGames: 'SET_GAMES',
	platformsLogos: 'SET_PLATFORMLOGOS'
}

const STATE_ACTIONS = {
	[gamesActions.setGames]: function (state, action) {
		const { payload } = action
		return { ...state, games: payload }
	},
	[gamesActions.platformsLogos]: function (state, action) {
		const { payload } = action
		return { ...state, platformsLogos: payload }
	}
}

export function gameReducer(state, action) {
	const { type: gameAction } = action
	const updateState = STATE_ACTIONS[gameAction]
	return updateState ? updateState(state, action) : state
}
