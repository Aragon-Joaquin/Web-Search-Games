// const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export function GamesRow({ gameGeneral, gameCover, gameRatings, gameGenres, gameKeywords, gamePlatforms, gameThemes }) {
	const { image_id } = gameCover[0]
	const IMAGE_URL = 'https://images.igdb.com/igdb/image/upload/t_1080p/'

	const { total_rating, name, id, storyline } = gameGeneral

	return (
		<li>
			<header>
				<aside>
					{gameThemes.map((theme) => {
						return <div key={theme.id}>{theme.name}</div>
					})}
				</aside>
				<h2>{name}</h2>
				<p>{total_rating ? Math.trunc(total_rating) : '?'}/100⭐</p>
				{/* //todo: svg instead of star */}

				<div />
			</header>

			<main>
				<img src={`${IMAGE_URL}${image_id}.jpg`} alt="" />
			</main>

			<footer>
				<section>
					{storyline ? (
						<span className="storyline-available">{storyline}</span>
					) : (
						<span className="storyline-not-available">Storyline without data</span>
					)}
				</section>
			</footer>
		</li>
	)
}
