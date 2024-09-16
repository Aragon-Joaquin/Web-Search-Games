export const ERROR_MESSAGE_TYPE = {
	FETCH_TIMEOUT_DATA: 'Fetching timeout. Check your internet connection.',
	FETCH_SERVER_ERROR: 'Something went wrong... Try later if the problem persist.',
	FETCH_TOKEN_ERROR: 'Access Token not provided. Restart the page if the problem persist.',

	SEARCH_SAME_NAME: 'The name provided is the same as the previous one.',
	SEARCH_LESS_THAN: 'A game needs to be AT LEAST 2 characters long.',

	ERROR_CODE_NOT_PROVIDED: 'An unknown error has ocurred, please reload the website.'
}

export class ValidateError extends Error {
	constructor(customError) {
		super(customError)
		// this.message = ''
		this.stack = ''
		customError ? (this.name = `${customError}`) : (this.name = ERROR_MESSAGE_TYPE.ERROR_CODE_NOT_PROVIDED)
	}
}

export function createClassError(customError = undefined) {
	return new ValidateError(customError)
}
