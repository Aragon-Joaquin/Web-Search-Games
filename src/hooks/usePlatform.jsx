import { useContext, useEffect, useState } from 'react'
import { GamesContext } from './gamesContext'
import { FETCH_DATA } from '../functions/APIPetitions'
import { APIInfo } from '../magicStrings'

const { SECONDARY_APICALLS } = APIInfo

export default function useGetPlatforms() {
	const { setPlatformLogo } = useContext(GamesContext)
	const [cachePlatformLogos, setCachePlatformLogos] = useState([])
	const [searchParams, setSearchParams] = useState()

	useEffect(() => {
		async function getQuery() {
			const data = await FETCH_DATA({
				route: `/api/${SECONDARY_APICALLS.platform_logos}`,
				searchParams: searchParams
			})
			setPlatformLogo(data)
		}
		if (searchParams) getQuery()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

	return { cachePlatformLogos, setCachePlatformLogos, setSearchParams }
}
