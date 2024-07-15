import { createContext, useState } from "react";
export const GamesContext = createContext();

export function GameProvider({ children }) {
  //todo: useReducer()
  const [games, setGames] = useState();
  const [gamesRawData, setGamesRawData] = useState();

  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        gamesRawData,
        setGamesRawData,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
