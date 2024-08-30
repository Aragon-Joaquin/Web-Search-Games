export function getPlatforms(arrayOfLogos, platformLogos, IMAGE_URL = 'logo_med') {
	return arrayOfLogos.map((logo) => {
		for (const key in platformLogos) {
			if (platformLogos[key].id === logo.platform_logo) {
				return <img key={platformLogos[key].image_id} src={`${IMAGE_URL}${platformLogos[key].image_id}.png`} />
			}
		}
	})
}
