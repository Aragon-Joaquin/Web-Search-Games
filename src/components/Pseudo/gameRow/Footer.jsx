import { useCallback, useRef } from 'react'
import GameController from '../../../assets/GameController'
import Lore from '../../../assets/Lore'
import { FooterButtons } from './FooterButtons'

const SVGNames = {
	Lore: 'ShowLore',
	GameController: 'ShowGame'
}

export function Footer({ props }) {
	const { storyline, platforms } = props
	const detailsInfo = useRef()

	//! explaining of param below the component
	const handleClickStyling = useCallback((svgName) => {
		const detailsRef = detailsInfo.current
		const getSVGName = SVGNames[svgName] ? SVGNames[svgName] : undefined

		if (!getSVGName) return console.error('HTML Element not found') //custom error?

		detailsRef.classList?.remove(`${getSVGName === SVGNames.GameController ? SVGNames.Lore : SVGNames.GameController}`)
		detailsRef.classList.toggle(`${getSVGName}`)
	}, [])

	return (
		<footer>
			<div className="footerRow-viewButtons">
				<GameController handleClick={handleClickStyling} />
				<Lore handleClick={handleClickStyling} />
			</div>

			<div className="footerRow-ShowDetails" ref={detailsInfo}>
				<FooterButtons storyline={storyline} platforms={platforms} />
			</div>
		</footer>
	)
}

/* 
I have no way to reach which svg triggered the classList
Unless i use another two useRefs but it will be more complex that it seems and accesing the elementClassName is impossible
since react will keep updating another elements and lost track in which i clicked.

My way to fix it is just passing the main function to the childs and create two more functions that
triggers the main one, but the difference is on the params that they will be passing

if there's another way to fix this better just lmk
*/
