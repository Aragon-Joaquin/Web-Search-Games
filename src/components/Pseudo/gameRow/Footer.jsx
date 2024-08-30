export function Footer({ props }) {
	const { storyline } = props
	return (
		<footer>
			<section>
				{storyline ? (
					<span className="storyline-available">{storyline}</span>
				) : (
					<span className="storyline-not-available">Storyline without data</span>
				)}
			</section>
		</footer>
	)
}
