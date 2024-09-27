import { queriesInfo } from '../../magicStrings'

const { IMAGE_ID } = queriesInfo

export function getPlatforms(arrayOfLogos, platformLogos, IMAGE_URL = 'logo_med') {
	return arrayOfLogos.map((logo) => {
		for (const key in platformLogos) {
			if (platformLogos[key].id === logo.platform_logo) {
				return {
					image_id: platformLogos[key].image_id,
					imgSource: `${IMAGE_ID(IMAGE_URL)}${platformLogos[key].image_id}.png`,
					altImg: `${logo.name}`
				}
			}
		}
	})
}
