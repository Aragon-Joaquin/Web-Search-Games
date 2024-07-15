import { useCookies } from "react-cookie";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { GameProvider } from "./hooks/gamesContext";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

//const encodeScopeParams = encodeURI("analytics:read:games+user:edit");

const TWITCH_AUTH = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
const COOKIE_NAME = "sessionCookie";
function App() {
  const [allCookies, setSessionCookie] = useCookies([COOKIE_NAME]); //removeSessionCookies
  const [cookiesAvailable, setCookiesAvailable] = useState(false);

  async function connectWithAPI() {
    const response = await fetch(TWITCH_AUTH, {
      method: "POST",
    });
    const data = await response.json();
    const { access_token, token_type, expires_in } = data;

    setSessionCookie(
      COOKIE_NAME,
      { access_token, token_type },
      { maxAge: expires_in, secure: true, httpOnly: true, sameSite: true }
    );

    setCookiesAvailable(!cookiesAvailable);
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

      <>
        <header className="header">
          <h2 className="header-title">Title</h2>
          <p className="header-description">Lorem, ipsum dolor.</p>
        </header>

        <main className="main">
          <GameProvider>
            <SearchBar allCookies={allCookies} />
          </GameProvider>
        </main>
      </>
    </>
  );
}

export default App;
