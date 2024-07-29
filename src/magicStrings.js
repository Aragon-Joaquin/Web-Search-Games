const PORT = 5173;

export const magicStrings = {
  PORT: PORT,
  LOCAL_URL: `http://localhost:${PORT}`,
  COOKIE_NAME: "sessionCookie"
};

export const APIInfo = {
  GAMES_ENDPOINT: `https://api.igdb.com/v4/`,
  FILTERS:
    "id,name,age_ratings,cover,keywords,genres,platforms,total_rating,themes,storyline",
  APICALLS: {
    // id ,name && total_rating aren't data we need to search
    cover: "covers",
    age_ratings: "age_ratings",
    genres: "genres",
    keywords: "keywords", // good for filter
    platforms: "platforms",
    themes: "themes",
  },
  SECONDARY_APICALLS : {
    platform_logos: "platform_logos"
  }
};

//todo: finish this
function filtersToQuery(id) {
  const filterCall = {
    cover: `f url`,
    age_ratings: `f rating,category; w category=1&id=("${id}");`, //first category is ESRB, second would be PEGI
    themes: `f name`,
  };
}
