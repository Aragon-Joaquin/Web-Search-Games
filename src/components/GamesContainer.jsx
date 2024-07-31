import { useContext, useEffect } from 'react'
import { APIInfo } from '../magicStrings'
import { GamesContext } from '../hooks/gamesContext'
import { GamesRow } from './Pseudo/GamesRow'
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

async function getPlatformLogos({ gamePlatforms, access_token }) {
	const platforms_numbers = []
	const { SECONDARY_APICALLS, FETCH_DATA } = APIInfo

	gamePlatforms.forEach((platforms) => {
		if (platforms_numbers.includes(platforms)) return
		const result = platforms_numbers.every((platLogo) => platLogo.platform_logo != platforms.platform_logo)
		if (result) platforms_numbers.push(platforms)
	})

	const searchParams = `fields image_id; w id = (${platforms_numbers});`
	const data = await FETCH_DATA(`/api/${SECONDARY_APICALLS.platform_logos}`, CLIENT_ID, access_token, searchParams)
	console.log(data)
	// const data = response.json()
}

export function GamesContainer({ results }) {
	const { getSessionCookie } = useContext(GamesContext)

	useEffect(() => {
		async function LogosResult() {
			const { access_token } = getSessionCookie()
			if (!access_token) return
			const logosResult = await getPlatformLogos({
				gamePlatforms: results.at(5),
				access_token
			})
		}

		LogosResult()
	}, [results])

	return (
		<ul className="game">
			{results.map(function (game) {
				const gameGeneral = game.at(0)
				return (
					<GamesRow
						gameGeneral={gameGeneral}
						gameCover={game[1]}
						gameRatings={game[2]}
						gameGenres={game[3]}
						gameKeywords={game[4]}
						gamePlatforms={game[5]}
						gameThemes={game[6]}
						key={gameGeneral.id}
					/>
				)
			})}
		</ul>
	)
}
