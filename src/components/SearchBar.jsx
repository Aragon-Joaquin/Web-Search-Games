import { GamesContainer } from './GamesContainer'
import { FETCH_STATUS } from '../magicStrings'
import { useContext, useEffect, useState } from 'react'
import { GamesContext } from '../hooks/gamesContext'
import { LoadingBar } from '../assets/Loading.jsx'
import { useGetGames, useSearch } from '../hooks/customHooks.jsx'
import { ValidateError } from '../utils/error_handle.js'
import '../styles/componentsStyles/SearchBar.css'

export function SearchBar() {
	const { gamesState } = useContext(GamesContext)
	const { validSearch, setUpdateSearch } = useSearch()
	const { statusFetch } = useGetGames({ search: validSearch })
	const [isError, setIsError] = useState()

	// i know this is so verbose but i really like working this classes
	useEffect(() => {
		if (validSearch instanceof ValidateError) setIsError(true)
		else setIsError(false)
	}, [validSearch])

	function handleSubmit(evt) {
		evt.preventDefault()
		const gameValue = evt.target[0].value
		setUpdateSearch(gameValue)
	}
	return (
		<>
			<section>
				<form className={`${isError ? 'main-form main-form-error' : 'main-form'}`} onSubmit={handleSubmit}>
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

			{isError && (
				<aside className="popup-error">
					<button onClick={() => setIsError(false)}>🗙</button>
					<h4>An error has occured.</h4>
					<p>{`${validSearch.message}`}</p>
				</aside>
			)}
		</>
	)
}
