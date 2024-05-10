import { GamesContainer } from "./GamesContainer";

export function SearchBar() {
  async function getGames(evt) {
    evt.preventDefault();
    //const response = await fetch();
  }

  //getGames();
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
          <p>Tag</p>
        </div>
      </section>

      <ul>
        <GamesContainer />
      </ul>
    </>
  );
}
