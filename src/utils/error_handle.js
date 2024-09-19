export const ERROR_MESSAGE_TYPE = {
	FETCH_TIMEOUT_DATA: 'Fetching timeout. Check your internet connection.',
	FETCH_SERVER_ERROR: 'Something went wrong... Try later if the problem persist.',
	FETCH_TOKEN_ERROR: 'Access Token not provided. Restart the page if the problem persist.',

	SEARCH_SAME_NAME: 'The name provided is the same as the previous one.',
	SEARCH_LESS_THAN: 'A game needs to be AT LEAST 2 characters long.',
	SEARCH_GAME_NOT_FOUND: "There's not a game called like that. Please, retry with another name.",

	ERROR_CODE_NOT_PROVIDED: 'An unknown error has ocurred, please reload the website.'
}

export const ERROR_NAME_TYPE = {
	SEARCH_ERROR: 'Search error',
	FETCH_ERROR: 'Fetch error'
}

export class ValidateError extends Error {
	constructor(errorName, errorMessage) {
		super(errorName)
		this.message = errorMessage ? errorMessage : ERROR_MESSAGE_TYPE.ERROR_CODE_NOT_PROVIDED
		this.name = errorName ? errorName : 'Unknown'
		this.stack = ''
	}
}

export function createClassError(errorName, customError = undefined) {
	return new ValidateError(errorName, customError)
}

export function ReturnErrorName(error) {
	const errorFounded = Object.values(ERROR_MESSAGE_TYPE).find((errorMessage) => {
		return errorMessage === error.message
	})
	const errorMessage = errorFounded ? errorFounded : ERROR_MESSAGE_TYPE.FETCH_SERVER_ERROR

	return { name: error.name, message: errorMessage }
}
