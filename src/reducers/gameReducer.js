export const gamesInitialValues = {
	games: [],
	platformsRawData: [],
	platformsLogos: []
}

export const gamesActions = {
	setGames: 'SET_GAMES',
	platformsRawData: 'SET_PLATFORMSRAW',
	platformsLogos: 'SET_PLATFORMLOGOS'
}

const STATE_ACTIONS = {
	[gamesActions.setGames]: function (state, action) {
		const { payload } = action
		return { ...state, games: payload }
	},
	[gamesActions.platformsRawData]: function (state, action) {
		const { payload } = action
		return { ...state, platformsRawData: payload }
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
