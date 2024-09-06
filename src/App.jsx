import { SearchBar } from './components/SearchBar'
import { useContext, useEffect } from 'react'
import { GamesContext } from './hooks/gamesContext'
import { FETCH_ACCESS_TOKEN } from './functions/APIPetitions'
import { setSessionStorage } from './functions/functions'
import { ACCESS_TOKEN_NAME } from './magicStrings'

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
				<h2 className="header-title">Title</h2>
				<p className="header-description">Lorem, ipsum dolor.</p>
			</header>

			<main className="main">
				<SearchBar />
			</main>
		</>
	)
}

export default App
