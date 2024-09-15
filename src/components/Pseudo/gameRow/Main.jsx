import { getAgeRatingImages } from '../../../functions/componentsFunctions/containerFunctions'
import { queriesInfo } from '../../../magicStrings'

const { IMAGE_ID } = queriesInfo

export function Main({ props }) {
	const { cover, ageRating, name } = props
	const { image_id } = cover?.at(0) || false
	const IMAGE_URL = IMAGE_ID('1080p')

	const IMAGE_RATING = getAgeRatingImages(ageRating)

	return (
		<main className="mainRow-Cover">
			{image_id ? (
				<>
					<img className="mainRow-AgeRating" src={IMAGE_RATING} loading="lazy"></img>
					<img
						className="mainRow-MainCover"
						src={`${IMAGE_URL}${image_id}.jpg`}
						alt={`Showing up the cover of the game "${name}"`}
						loading="lazy"
					/>
				</>
			) : (
				<img className="mainRow-MainCover" src="../../../../public/notFound.jpg" alt="Image Cover not found" />
			)}
		</main>
	)
}
