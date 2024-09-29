import { useEffect, useState } from 'react'
import { GamesRow } from './Pseudo/GamesRow'
import { reduceDuplicates, returnEveryResult } from '../functions/functions'
import useGetPlatforms from '../hooks/usePlatform'
import { searchLogos } from '../functions/componentsFunctions/containerFunctions'
import { TagSection } from './Pseudo/TagSection'
import '../styles/componentsStyles/tagSection.css'

export function GamesContainer({ results }) {
	const [dataInfo, setDataInfo] = useState([])
	const { cachePlatformLogos, setCachePlatformLogos, setSearchParams } = useGetPlatforms() //! somehow fix

	useEffect(() => {
		setDataInfo(returnEveryResult(results))
	}, [results])

	useEffect(() => {
		if (!dataInfo) return
		const logosArray = reduceDuplicates({
			array: dataInfo,
			comparative: 'platforms',
			selector: 'platform_logo',
			initialArrayValue: undefined
		})
		const [returnFullArray, searchString] = searchLogos(cachePlatformLogos, logosArray)
		setCachePlatformLogos(returnFullArray)
		setSearchParams(searchString)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataInfo])

	return (
		<>
			<section className="tagsSection">
				{/*
				//! Finish this and make it clickeable like a filter 
				<TagSection
					tagsArray={reduceDuplicates({
						array: dataInfo,
						comparative: 'keywords',
						selector: 'name',
						initialArrayValue: undefined
					})}
					tagName="Keywords"
				/> */}
			</section>

			<ul className="gameContainer">
				{dataInfo.length > 0 &&
					dataInfo.map(function (game) {
						const gameGeneral = game.at(0)
						return <GamesRow gameInformation={game} key={gameGeneral.id} />
					})}
			</ul>
		</>
	)
}
