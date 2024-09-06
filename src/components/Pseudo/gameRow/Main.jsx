import { getAgeRatingImages } from '../../../functions/componentsFunctions/containerFunctions'
import { queriesInfo } from '../../../magicStrings'

const { IMAGE_ID } = queriesInfo

export function Main({ props }) {
	const { cover, ageRating } = props
	const { image_id } = cover[0]
	const IMAGE_URL = IMAGE_ID('1080p')

	const IMAGE_RATING = getAgeRatingImages(ageRating)

	return (
		<main className="mainRow-Cover">
			{<img src={`${IMAGE_URL}${image_id}.jpg`} alt="" />}
			{<img src={IMAGE_RATING}></img>}
		</main>
	)
}
