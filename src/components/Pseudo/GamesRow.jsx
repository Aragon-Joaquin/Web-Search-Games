import { APIInfo } from '../../magicStrings.js'
import { Footer } from './gameRow/Footer.jsx'
import { Header } from './gameRow/Header.jsx'
import { Main } from './gameRow/Main.jsx'
import '../../styles/componentsStyles/gamesRow.css'
import { useContext, useEffect, useState } from 'react'
import { GamesContext } from '../../hooks/gamesContext.jsx'
import { getPlatforms } from '../../functions/componentsFunctions/RowFunctions.js'

function reduceCategories(gamesCategories) {
	const apiCallKeys = Object.values(APIInfo.APICALLS)
	const data = apiCallKeys.map((call) => {
		const gameFound = gamesCategories.find((element) => element.at(0) === `Game ${call}`)
		return gameFound ? gameFound.at(1) : undefined
	})

	return data
}

// gameGeneral, gameCover, gameRatings, gameGenres, gameKeywords, _, gameThemes
// gamePlatforms is in a Reducer, its going to be passed to Footer

export function GamesRow({ gameInformation }) {
	const [logos, setLogos] = useState()
	const { gamesState } = useContext(GamesContext)
	const platformLogos = gamesState['platformsLogos']

	const { total_rating, name, storyline } = gameInformation.at(0) //id
	const [cover, ageRating, genres, keywords, platforms, themes] = reduceCategories(gameInformation.at(1))

	useEffect(() => {
		if (!platformLogos?.length || !platforms?.length) return
		setLogos(getPlatforms(platforms, platformLogos)) //! this executes X times for each Game we have fetched.
	}, [platformLogos, platforms])

	return (
		<li className="gameRow-Box">
			<Header props={{ total_rating, themes, name }} />
			<Main props={{ cover, ageRating, name }} />
			<Footer props={{ storyline, platforms: logos }} />
		</li>
	)
}
