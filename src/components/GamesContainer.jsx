import { useContext, useEffect } from "react";
import {APIInfo} from "../magicStrings";
import { GamesContext } from "../hooks/gamesContext";
import { FETCH_DATA } from "../functions/functions";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export function GamesRow({
  gameGeneral,
  gameCover,
  gameRatings,
  gameGenres,
  gameKeywords,
  gamePlatforms,
  gameThemes,
}) {
  
  const { image_id } = gameCover[0];
  const IMAGE_URL = "https://images.igdb.com/igdb/image/upload/t_1080p/";

  const { total_rating, name, id, storyline } = gameGeneral;




  return (
    <li>
      <header>
        <aside>
          {gameThemes.map((theme) => {
            return <div key={theme.id}>{theme.name}</div>;
          })}
        </aside>
        <h2>{name}</h2>
        <p>{total_rating ? Math.trunc(total_rating) : "?"}/100⭐</p>
        {/* //todo: svg instead of star */}

        <div>
    
        </div>
      </header>

      <main>
        <img src={`${IMAGE_URL}${image_id}.jpg`} alt="" />
        
        
      </main>

      <footer>
        <section>
          {storyline ? (
            <span className="storyline-available">{storyline}</span>
          ) : (
            <span className="storyline-not-available">
              {"Storyline without data"}
            </span>
          )}
        </section>
      </footer>
    </li>
  );
}

async function getPlatformLogos({gamePlatforms, access_token}){
  const platforms_numbers = [];
  const { SECONDARY_APICALLS, FETCH_DATA} = APIInfo



  gamePlatforms.forEach((platforms) => {
    if(platforms_numbers.includes(platforms)) return
    const result = platforms_numbers.every( platLogo => platLogo.platform_logo != platforms.platform_logo);
    if(result) platforms_numbers.push(platforms) 
})


  const searchParams = `fields image_id; w id = (${platforms_numbers});`; 
  const data = await FETCH_DATA(`/api/${SECONDARY_APICALLS.platform_logos}`, CLIENT_ID, access_token, searchParams);
  console.log(data);
  //const data = response.json()

  
}

export function GamesContainer({ results }) {
  const { getSessionCookie } = useContext(GamesContext)
  console.log("results",results);

   useEffect(()=>{
    async function LogosResult () {
      const access_token = getSessionCookie({ allCookies });
      if(!access_token) return
      const logosResult = await getPlatformLogos({gamePlatforms: results.at(5), access_token});
    }

    LogosResult();

   },[])

  return (
    <ul className="game">
        {results.map(function (game) {
          let gameGeneral = game.at(0);
          return (
            <GamesRow
              gameGeneral={gameGeneral}
              gameCover={game[1]}
              gameRatings={game[2]}
              gameGenres={game[3]}
              gameKeywords={game[4]}
              gamePlatforms={game[5]}
              gameThemes={game[6]}
              key={gameGeneral.id}
            />
          );
        })}
      </ul>
  );
}


