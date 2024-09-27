import { StarSVG } from '../../../assets/StarSVG'
import { pickAColor } from '../../../styles/pickAColor'

export function Header({ props }) {
	const { themes, total_rating, name } = props
	const color = pickAColor(themes)

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
