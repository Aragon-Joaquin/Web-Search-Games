import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { GameProvider } from './hooks/gamesContext.jsx'

// !React in client inyection === csr.

hydrateRoot(
	document.getElementById('root'),
	<GameProvider>
		<App />
	</GameProvider>
)

//React.StrictMode
