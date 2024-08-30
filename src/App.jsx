import { SearchBar } from './components/SearchBar'
import { useContext, useState } from 'react'
import { GamesContext } from './hooks/gamesContext'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
const TWITCH_AUTH = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

function App() {
	const { setSessionCookies, getSessionCookie } = useContext(GamesContext)
	const [token, setToken] = useState(false)

	function connectWithAPI(e) {
		e.preventDefault()
		const validate = getSessionCookie()
		if (validate) setToken(true)
		else searchToken()
	}

	async function searchToken() {
		const response = await fetch(TWITCH_AUTH, { method: 'POST' })
		const data = await response.json()
		const { expires_in, access_token, token_type } = data
		setSessionCookies({ expires_in, access_token, token_type })
		setToken(true)
	}

	return (
		<>
			{!token ? (
				<a onClick={connectWithAPI}>
					<button>Connect NOW!</button>
				</a>
			) : (
				<button>Connection established</button>
			)}

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
