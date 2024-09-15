//Change them if you want. ACCEPTS HEX VALUES
const EXCLUSIVE_COLORS_THEMES = {
	Survival: '#2b6726',
	Action: '#473b6e',
	Comedy: '#704a00',
	Romance: '#6b2d64',
	Fantasy: '#277590',
	Erotic: '#6e1515',
	Kids: '#478ca4',
	Sandbox: '#383d03',
	Horror: '#191919',
	Drama: '#5c280d',
	'Open world': '#847e1d'
}

export function pickAColor(themeArray) {
	if (!themeArray) return
	const color = themeArray.map((element) => {
		const themeName = element.name
		if (EXCLUSIVE_COLORS_THEMES[themeName]) return EXCLUSIVE_COLORS_THEMES[themeName]
		const totalLength = Math.floor(themeName.length / 3)
		const r = themeName.slice(0, totalLength)
		const g = themeName.slice(totalLength, totalLength * 2)
		const b = themeName.slice(totalLength * 2)

		const numberValueR = transformToRGB([...r])
		const numberValueG = transformToRGB([...g])
		const numberValueB = transformToRGB([...b])

		return `#${numberValueR}${numberValueG}${numberValueB}`
	})

	return [...color]
}

function transformToRGB(c) {
	const DIVIDER = 10

	const colorResult = parseInt(
		c.reduce((accumulator, currentValue) => accumulator + currentValue.charCodeAt(0), 0),
		16
	)
	const result = Math.round(colorResult / DIVIDER)
	return new String(result).substring(0, 2)
}

//color somethings does not work. I THINK its because the value is too high or there's a ton of renders
