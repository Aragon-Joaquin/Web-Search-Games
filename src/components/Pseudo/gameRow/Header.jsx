import { useContext, useEffect, useState } from 'react'
import { queriesInfo } from '../../../magicStrings'
import { getPlatforms } from '../../../functions/componentsFunctions/RowFunctions'
import { GamesContext } from '../../../hooks/gamesContext'
import { StarSVG } from '../../../assets/StarSVG'
import { pickAColor } from '../../../styles/pickAColor'

const { IMAGE_ID } = queriesInfo

export function Header({ props }) {
	const { gamesState } = useContext(GamesContext)
	const [plaformsState, setPlatformsState] = useState([])
	const platformLogos = gamesState['platformsLogos']
	const { platforms, themes, total_rating, name } = props

	const color = pickAColor(themes)

	useEffect(() => {
		if (!platforms) return
		const data = getPlatforms(platforms, platformLogos, IMAGE_ID('logo_med'))
		setPlatformsState(data)
	}, [platformLogos, platforms])
	return (
		<header className="headerRow">
			<span className="headerRow-Title">
				<h2 className="headerRow-Name">{name}</h2>
				<p className="headerRow-ToolTip">{name}</p>
			</span>
			<aside className="headerRow-Themes">
				{themes &&
					themes.map((theme, index) => {
						return (
							<span key={theme.id} className="headerRow-ThemeName" style={{ backgroundColor: `${color[index]}` }}>
								{theme.name}
							</span>
						)
					})}
			</aside>
			<div className="headerRow-Platform">
				{plaformsState?.length > 0 ? plaformsState.map((element) => element) : <></>}
			</div>
			<p className="headerRow-Rating">
				<span>
					{total_rating ? (
						<>
							{Math.trunc(total_rating)}
							<StarSVG />
						</>
					) : (
						''
					)}
				</span>
			</p>

			<div />
		</header>
	)
}
