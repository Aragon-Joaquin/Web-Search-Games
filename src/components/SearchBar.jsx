import { GamesContainer } from './GamesContainer'
import { FETCH_STATUS } from '../magicStrings'
import { useContext } from 'react'
import { GamesContext } from '../hooks/gamesContext'
import { LoadingBar } from '../assets/Loading.jsx'
import { useGetGames, useSearch } from '../hooks/customHooks.jsx'

export function SearchBar() {
	const { gamesState } = useContext(GamesContext)
	const { updateSearch, setUpdateSearch } = useSearch()
	const { statusFetch } = useGetGames({ search: updateSearch })

	function handleSubmit(evt) {
		evt.preventDefault()
		const gameValue = evt.target[0].value
		setUpdateSearch(gameValue)
	}
	return (
		<>
			<section>
				<form className="main-form" onSubmit={handleSubmit}>
					<input type="text" placeholder="Search the game you preffer" />
					<input type="submit" value="Search" />
				</form>
			</section>

			<section className="tagsSection">
				<div>
					<p>section of tags loremupsuim</p>
				</div>
			</section>
			{statusFetch === FETCH_STATUS.LOADING && <LoadingBar />}
			{gamesState['games'].length > 0 && <GamesContainer results={gamesState['games']} />}
		</>
	)
}
