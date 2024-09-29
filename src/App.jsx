import { SearchBar } from './components/SearchBar'
import { useContext, useEffect } from 'react'
import { GamesContext } from './hooks/gamesContext'
import { FETCH_ACCESS_TOKEN } from './functions/APIPetitions'
import { setSessionStorage } from './functions/functions'
import { ACCESS_TOKEN_NAME } from './magicStrings'
import { ReactLogo } from './assets/ReactLogo'

function App() {
	const { setSessionCookies, getSessionCookie } = useContext(GamesContext)
	const { access_token } = getSessionCookie()

	useEffect(() => {
		async function searchToken() {
			const response = await FETCH_ACCESS_TOKEN()
			const { expires_in, access_token, token_type } = response
			setSessionCookies({ expires_in, access_token, token_type })
			setSessionStorage(ACCESS_TOKEN_NAME, access_token) //! could be improve somehow
		}
		if (!access_token) searchToken()
		else setSessionStorage(ACCESS_TOKEN_NAME, access_token) //! could be improve somehow
	}, [access_token, setSessionCookies])

	return (
		<>
			<header className="header">
				<h2 className="header-title">Game Searcher</h2>
				<span className="header-description">
					<p className="header-subtitle">
						My first <strong className="header-strong">React</strong>
						<ReactLogo />
						proyect!
					</p>
					<p className="header-info">
						Check out my{' '}
						<a href="https://github.com/Aragon-Joaquin/Web-Search-Games" target="_blank">
							Github
						</a>{' '}
						repository for new updates.
					</p>
				</span>
			</header>

			<main className="main">
				<SearchBar />
			</main>
		</>
	)
}

export default App
