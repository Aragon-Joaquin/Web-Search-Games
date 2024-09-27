import '../styles/componentsStyles/SearchBar.css'
import { GamesContainer } from './GamesContainer'
import { FETCH_STATUS } from '../magicStrings'
import { useContext, useEffect, useState } from 'react'
import { GamesContext } from '../hooks/gamesContext'
import { LoadingBar } from '../assets/Loading.jsx'
import useSearch from '../hooks/useSearch.jsx'
import useGetGames from '../hooks/useGetGames.jsx'
import { ERROR_NAME_TYPE } from '../utils/error_handle.js'

export function SearchBar() {
	const { gamesState } = useContext(GamesContext)
	const { validSearch, setUpdateSearch } = useSearch()
	const { statusFetch } = useGetGames({ search: validSearch })
	const [isError, setIsError] = useState()

	const GamesValue = gamesState['games']

	useEffect(() => {
		if (validSearch?.name != ERROR_NAME_TYPE.SEARCH_ERROR) return setIsError(false)
		setIsError(validSearch)
	}, [validSearch])

	useEffect(() => {
		if (statusFetch?.status != 'Error') return setIsError(false)
		setIsError(statusFetch?.errorMessage)
	}, [statusFetch])

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
			{GamesValue?.length > 0 && <GamesContainer results={GamesValue} />}

			{isError && (
				<aside className="popup-error">
					<button onClick={() => setIsError(false)}>🗙</button>
					<h4>A {`${isError.name}`} has occured.</h4>
					<p>{`${isError.message}`}</p>
				</aside>
			)}
		</>
	)
}
