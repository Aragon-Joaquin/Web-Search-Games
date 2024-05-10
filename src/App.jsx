import { SearchBar } from "./components/SearchBar";

import { APIInfo } from "./magicStrings";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

//const encodeScopeParams = encodeURI("analytics:read:games+user:edit");

// const TWITCH_CONNECTION = `https://id.twitch.tv/oauth2/authorize?
// response_type=token
// &client_id=${CLIENT_ID}
// &redirect_uri=http://localhost:5173
// &scope=${encodeScopeParams}`;

const TWITCH_AUTH = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

function App() {
  async function connectWithAPI() {
    const response = await fetch(TWITCH_AUTH, {
      method: "POST",
    });
    console.log(response);
    const data = await response.json();
    const { access_token, token_type } = data; //expires
    return [access_token, token_type];
  }

  async function getGames() {
    let [access_token, token_type] = await connectWithAPI();
    console.log("access ", access_token);
    console.log("token type", token_type);
    const response = await fetch(APIInfo.GAMES_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Client-ID": `${CLIENT_ID}`,
        Authorization: `Bearer ${access_token}`,
      },
    });

    // mode: "cors",
    // credentials: "include",
    // headers: {
    //   "Client-ID": `${CLIENT_ID}`,
    //   Authorization: `Bearer ${access_token}`,
    // },

    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <a onClick={getGames}>
        <button>Connect NOW!</button>
      </a>

      <>
        <header className="header">
          <h2 className="header-title">Title</h2>
          <p className="header-description">Lorem, ipsum dolor.</p>
        </header>

        <main className="main">
          <SearchBar />
        </main>
      </>
    </>
  );
}

export default App;
