import { useContext, useEffect, useState } from 'react'
import { GamesRow } from './Pseudo/GamesRow'
import { reduceDuplicates, returnEveryResult } from '../functions/functions'
import { searchLogos } from '../functions/componentsFunctions/containerFunctions'
import { APIInfo } from '../magicStrings'
import { FETCH_DATA } from '../functions/functions'
import { GamesContext } from '../hooks/gamesContext'

const { SECONDARY_APICALLS } = APIInfo
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export function GamesContainer({ results }) {
	const { gamesState, setPlatformLogo, setPlatformsRaw, getSessionCookie } = useContext(GamesContext)
	const [dataInfo, setDataInfo] = useState([])

	const { access_token } = getSessionCookie()
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
				CLIENT_ID,
				access_token,
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
