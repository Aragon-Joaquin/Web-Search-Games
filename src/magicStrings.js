export const PORT = 5173
export const FETCH_TIMEOUT_SECONDS = 5000
export const ACCESS_TOKEN_NAME = 'ACCESS_TOKEN'
export const MAXIMUM_FETCH_QUERIES = 3

export const FETCH_STATUS = {
	IDLE: { status: 'Idle' },
	LOADING: { status: 'Loading' },
	SUCCESS: { status: 'Success' },
	ERROR: function (error) {
		return { status: 'Error', errorMessage: error }
	}
}

export const magicStrings = {
	PORT,
	LOCAL_URL: `http://localhost:${PORT}`,
	COOKIE_NAME: 'sessionCookie'
}

export const APIInfo = {
	GAMES_ENDPOINT: 'https://api.igdb.com/v4/',
	APICALLS: {
		// id ,name && total_rating aren't data we need to search
		cover: 'covers',
		age_ratings: 'age_ratings',
		genres: 'genres',
		keywords: 'keywords', // good for filter
		platforms: 'platforms',
		themes: 'themes'
	},
	SECONDARY_APICALLS: {
		platform_logos: 'platform_logos'
	}
}

export const queriesInfo = {
	FILTERS: `id,name,age_ratings,cover,keywords,
		genres,platforms,total_rating,themes,storyline`,

	multipleQuery: function (endpoint, queryName = 'games', fields = '*', limit = '1', condition, searcher) {
		return `query ${endpoint} "${queryName}" {
			f ${fields};
			limit ${limit};
			w ${condition} = (${searcher});
		};`
	},
	searchFunction: function (filters = '*', limit = 1, gameValue) {
		return `f ${filters}; limit ${limit}; search "${gameValue}";`
	},
	searchWhereFunction: function (filters = '*', limit = 1, condition, ArrParams) {
		return `f ${filters}; limit ${limit}; where ${condition}=(${ArrParams});`
	},
	IMAGE_ID: function (size = 'thumb') {
		return `https://images.igdb.com/igdb/image/upload/t_${size}/`
	},
	AGE_RATING_IMAGE: function (CATEGORY, RATING) {
		return `https://www.igdb.com/icons/rating_icons/${CATEGORY}/${RATING}.png`
		// for e.g. https://www.igdb.com/icons/rating_icons/esrb/esrb_ao.png
	}

	// searchPlatformsGames: function (gamePlatforms) {
	// 	return `fields image_id; w id = (${gamePlatforms});`
	// }
}

// todo: finish this
/*
function filtersToQuery(id) {
	const filterCall = {
		cover: 'f url',
		age_ratings: `f rating,category; w category=1&id=("${id}");`, // first category is ESRB, second would be PEGI
		themes: 'f name'
	}
}
*/
