import Arrow from '../../../assets/Arrow'
import { List } from '../../../assets/List'
import imgNotFound from '../../../assets/notFound.jpg'

import { useState } from 'react'

export function FooterButtons({ storyline, platforms }) {
	const [carrouselPosition, setCarrouselPosition] = useState(0)
	const [expandText, setExpandText] = useState(false) //could be done in a different way

	const handleLeftArrowClick = () => {
		if (carrouselPosition !== 0) setCarrouselPosition((prev) => prev - 1)
		else return
	}

	const handleRightArrowClick = () => {
		if (carrouselPosition !== platforms?.length - 1) setCarrouselPosition((prev) => prev + 1)
		else return
	}
	return (
		<>
			<div className="Footer-Carrousel">
				<div className="footerRow-Platforms">
					{platforms?.length > 0 ? (
						platforms.map((platformRow, index) => {
							return (
								<img
									className={carrouselPosition === index ? 'ActiveCarrouselRow' : ''}
									key={`${platformRow?.image_id},${index}`}
									src={platformRow?.imgSource ? platformRow?.imgSource : imgNotFound}
									alt={`Logo name: ${platformRow?.altImg ? platformRow?.altImg : 'An error has occured'}`}
									title={platformRow?.altImg ? platformRow?.altImg : 'An error has occured'}
								/>
							)
						})
					) : (
						<>Unknown Platforms</>
					)}
				</div>
				<span className="IndicatorsRow">
					{platforms?.length &&
						platforms.map((_, index) => {
							return (
								<a
									key={index}
									onClick={() => setCarrouselPosition(index)}
									className={carrouselPosition !== index ? 'indicator' : 'indicator indicatorActive'}
								></a>
							)
						})}
				</span>
				<Arrow classCSS="Arrow leftArrow" onClickFunction={() => handleLeftArrowClick()}></Arrow>
				<Arrow classCSS="Arrow rightArrow" onClickFunction={() => handleRightArrowClick()}></Arrow>
			</div>

			<span className="footerRow-storyline">
				{storyline ? (
					<>
						<p className={`footerRow-available ${expandText ? 'expandText' : ''}`}>{storyline}</p>
						<List classCSS="storylineIcon" onClickFunction={() => setExpandText((prev) => !prev)} />
					</>
				) : (
					<p className="footerRow-unavailable">Storyline without data </p>
				)}
			</span>
		</>
	)
}
