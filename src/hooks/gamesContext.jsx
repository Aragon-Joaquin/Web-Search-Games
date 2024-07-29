import { createContext, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import { magicStrings } from "../magicStrings";

const {COOKIE_NAME} = magicStrings

export const GamesContext = createContext();

//todo: transform all this function in a all-in object.
export function getSessionCookie({ allCookies }) {
  let checkIfCookies = allCookies?.COOKIE_NAME;

  if (checkIfCookies == undefined) return false;
  const { access_token } = checkIfCookies;
  return access_token;
}

export function setSessionCookies({expires_in = 0,...args}){
  setSessionCookie(
    COOKIE_NAME,
    { args },
    { maxAge: expires_in, secure: true, httpOnly: true, sameSite: true }
  );
}

const initialValues = {
  games : [],
  gamesRawData: []
}

function gameReducer({state,action}){
  
}

export function GameProvider({ children }) {
  //todo: useReducer()
  const [state, dispatch] = useReducer(gameReducer,)
  const [allCookies, setSessionCookie] = useCookies([COOKIE_NAME]);
  const [games, setGames] = useState([]);
  const [gamesRawData, setGamesRawData] = useState([]);
  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        gamesRawData,
        setGamesRawData,
        getSessionCookie,
        setSessionCookies,
        allCookies,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}