import { SearchBar } from './components/SearchBar'
import { useContext, useEffect, useState } from 'react'
import { GamesContext } from './hooks/gamesContext'
import { magicStrings } from './magicStrings'
import { getLocalStorage, setLocalStorage } from './functions/functions'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

const TWITCH_AUTH = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
const { TOKEN_NAME } = magicStrings

function App() {
	const [effect, setEffect] = useState({ action: '', name: '', data: '' })
	const [token, setToken] = useState()
	const [cookiesAvailable, setCookiesAvailable] = useState(false)
	const { setSessionCookies, getSessionCookie } = useContext(GamesContext)

	useEffect(() => {
		if (effect.action === 'get') {
			const getLocal = getLocalStorage(effect.name)
			setToken(getLocal)
		}
		if (effect.action === 'set') setLocalStorage({ TOKEN_NAME: effect.name, data: effect.data })
	}, [effect])

	async function connectWithAPI() {
		setEffect({ action: 'get', name: TOKEN_NAME })
		if (!token) {
			const response = await fetch(TWITCH_AUTH, { method: 'POST' })
			const data = await response.json()
			const { access_token, token_type, expires_in } = data
			setEffect({ action: 'set', name: TOKEN_NAME, data: data })
			setSessionCookies({ expires_in, access_token, token_type })
			console.log('!token: ', getSessionCookie())
		} else {
			//! try to factorize better this. & try and catch
			const { access_token, token_type, expires_in } = token
			setSessionCookies({ expires_in, access_token, token_type })
			console.log('else: ', getSessionCookie())
		}

		setCookiesAvailable(!cookiesAvailable)
	}

	return (
		<>
			{!cookiesAvailable ? (
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
