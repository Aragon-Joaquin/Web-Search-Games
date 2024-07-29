import { useCookies } from "react-cookie";
import { SearchBar } from "./components/SearchBar";
import { useContext, useState } from "react";
import { GamesContext } from "./hooks/gamesContext";
import { magicStrings } from "./magicStrings";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const TWITCH_AUTH = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;
const COOKIE_NAME = "sessionCookie";

function App() {
  const [cookiesAvailable, setCookiesAvailable] = useState(false);
  const { setSessionCookies } = useContext(GamesContext);

  async function connectWithAPI() {
    const response = await fetch(TWITCH_AUTH, {method: "POST"});
    
    const data = await response.json();
    const { access_token, token_type, expires_in } = data;

    setSessionCookies({expires_in, access_token, token_type})

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

        <header className="header">
          <h2 className="header-title">Title</h2>
          <p className="header-description">Lorem, ipsum dolor.</p>
        </header>

        <main className="main"> 
            <SearchBar />
        </main>
    </>
  );
}

export default App;
