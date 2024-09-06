import { useContext, useEffect, useState } from 'react'
import { GamesRow } from './Pseudo/GamesRow'
import { reduceDuplicates, returnEveryResult } from '../functions/functions'
import { searchLogos } from '../functions/componentsFunctions/containerFunctions'
import { APIInfo } from '../magicStrings'
import { GamesContext } from '../hooks/gamesContext'
import { FETCH_DATA } from '../functions/APIPetitions'

const { SECONDARY_APICALLS } = APIInfo

export function GamesContainer({ results }) {
	const { gamesState, setPlatformLogo, setPlatformsRaw } = useContext(GamesContext)
	const [dataInfo, setDataInfo] = useState([])

	const logosNumber = gamesState['platformsRawData']

	useEffect(() => {
		setDataInfo(returnEveryResult(results))
		const logosArray = reduceDuplicates({
			array: dataInfo,
			comparative: 'platforms',
			selector: 'platform_logo',
			initialArrayValue: undefined
		})
		const [returnFullArray, searchParams] = searchLogos(logosNumber, logosArray)
		setPlatformsRaw(returnFullArray)
		async function getQuery() {
			const data = await FETCH_DATA({
				route: `/api/${SECONDARY_APICALLS.platform_logos}`,
				searchParams: searchParams
			})
			setPlatformLogo([...gamesState['platformsLogos'], ...data])
		}
		if (searchParams) getQuery() //! else give toast

		//todo: fix this somehow
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [results])

	return (
		<ul className="gameContainer">
			{dataInfo.length > 0 &&
				dataInfo.map(function (game) {
					const gameGeneral = game.at(0)
					return <GamesRow gameInformation={game} key={gameGeneral.id} />
				})}
		</ul>
	)
}
