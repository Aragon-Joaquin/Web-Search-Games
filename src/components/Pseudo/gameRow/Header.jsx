import { useContext, useEffect, useState } from 'react'
import { queriesInfo } from '../../../magicStrings'
import { getPlatforms } from '../../../functions/componentsFunctions/RowFunctions'
import { GamesContext } from '../../../hooks/gamesContext'
import { StarSVG } from '../../../assets/StarSVG'

const { IMAGE_ID } = queriesInfo

export function Header({ props }) {
	const { gamesState } = useContext(GamesContext)
	const [plaformsState, setPlatformsState] = useState([])
	const platformLogos = gamesState['platformsLogos']
	const { platforms, themes, total_rating, name } = props

	useEffect(() => {
		const data = getPlatforms(platforms, platformLogos, IMAGE_ID('logo_med'))
		setPlatformsState(data)
	}, [platformLogos, platforms])
	return (
		<header>
			<aside className="headerRow-Themes">
				{themes.map((theme) => {
					return <div key={theme.id}>{theme.name}</div>
				})}
			</aside>
			<div className="headerRow-Platform">
				{plaformsState?.length > 0 ? plaformsState.map((element) => element) : <></>}
			</div>
			<h2>{name}</h2>
			<p>
				{total_rating ? Math.trunc(total_rating) : '?'}/100
				<StarSVG />
			</p>

			<div />
		</header>
	)
}
