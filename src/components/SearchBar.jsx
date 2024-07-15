/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { GamesContainer } from "./GamesContainer";
import { APIInfo } from "../magicStrings";
import { useContext, useEffect } from "react";
import { GamesContext } from "../hooks/gamesContext";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function getSessionCookie({ allCookies }) {
  let checkIfCookies = allCookies?.sessionCookie;

  if (checkIfCookies == undefined) return false;
  const { access_token } = checkIfCookies;
  return access_token;
}

export function SearchBar({ allCookies }) {
  const { games, setGames, gamesRawData, setGamesRawData } =
    useContext(GamesContext);

  async function getGames(evt) {
    evt.preventDefault();
    const gameValue = evt.target[0].value;
    const access_token = getSessionCookie({ allCookies });
    if (gameValue === "" || !access_token) return;
    const searchParams = `
    f ${APIInfo.FILTERS}; limit ${2}; search "${gameValue}";`;

    const response = await fetch("/api/games", {
      method: "POST",
      mode: "cors",
      headers: {
        "Client-ID": `${CLIENT_ID}`,
        Authorization: `Bearer ${access_token}`,
      },
      body: searchParams,
    });

    const data = await response.json();
    setGamesRawData(data);
  }

  useEffect(() => {
    const apiCallEntries = Object.entries(APIInfo.APICALLS);

    const access_token = getSessionCookie({ allCookies });
    async function getGamesSubcategory({ games }) {
      //todo: fix this logic
      const result = games.map(async (game) => {
        const { id, total_rating, name, storyline } = game;
        const resultsOfFetch = apiCallEntries.map(async function (url) {
          let gameUrl = game[url[0]];
          if (!gameUrl) return [];
          let ArrLength = gameUrl;
          if (gameUrl?.length >= 6) ArrLength = gameUrl.slice(0, 5).toString();

          const searchParams = `
    f *; where id=(${ArrLength});
    `;
          const dataResult = await fetch(`/api/${url[1]}`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Client-ID": `${CLIENT_ID}`,
              Authorization: `Bearer ${access_token}`,
            },
            body: searchParams,
          });
          const data = await dataResult.json();
          return data;
        });
        let addingRest = await Promise.all(resultsOfFetch);
        return [{ name, id, total_rating, storyline }, ...addingRest];
      });
      const names = await Promise.all(result);
      setGames(names);
    }
    if (gamesRawData != undefined) getGamesSubcategory({ games: gamesRawData });
  }, [gamesRawData]);

  return (
    <>
      <section>
        <form className="main-form" onSubmit={getGames}>
          <input type="text" placeholder="Search the game you preffer" />
          <input type="submit" value="Search" />
        </form>
      </section>

      <section className="tagsSection">
        <div>
          <p>section of tags loremupsuim</p>
        </div>
      </section>

      <ul>
        {games?.length > 0 ? (
          <GamesContainer results={games} />
        ) : (
          <h1>busca</h1> //todo: make loading state
        )}
      </ul>
    </>
  );
}
