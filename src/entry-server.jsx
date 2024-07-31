import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { GameProvider } from './hooks/gamesContext.jsx'

//! REACT SSR INJECTION

export function render () {
  const html = renderToString(
    <CookiesProvider defaultSetOptions>
      <GameProvider>
        <App />
      </GameProvider>
    </CookiesProvider>
  )
  return { html }
}
