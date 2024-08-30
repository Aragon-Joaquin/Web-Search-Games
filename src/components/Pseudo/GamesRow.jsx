import { APIInfo } from '../../magicStrings.js'
import { Footer } from './gameRow/Footer.jsx'
import { Header } from './gameRow/Header.jsx'
import { Main } from './gameRow/Main.jsx'
import '../../styles/componentsStyles/gamesRow.css'

function reduceCategories(gamesCategories) {
	const apiCallKeys = Object.values(APIInfo.APICALLS)
	const data = apiCallKeys.map((call) => {
		const gameFound = gamesCategories.find((element) => element.at(0) === `Game ${call}`)
		return gameFound ? gameFound.at(1) : undefined
	})

	return data
}

// gameGeneral, gameCover, gameRatings, gameGenres, gameKeywords, gamePlatforms, gameThemes

export function GamesRow({ gameInformation }) {
	console.log('game', gameInformation)
	const { total_rating, name, storyline, id } = gameInformation.at(0)
	const [cover, ageRating, genres, keywords, platforms, themes] = reduceCategories(gameInformation.at(1))
	return (
		<li className="gameRow-Box">
			<Header props={{ platforms, total_rating, themes, name }} />
			<Main props={{ cover, ageRating }} />
			<Footer props={{ storyline }} />
		</li>
	)
}
