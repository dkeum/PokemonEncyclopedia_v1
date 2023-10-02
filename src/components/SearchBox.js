import "../css/searchbox.css"

const Searchbox = ({searchPokemon, pokemon}) => {

    return(
        <>
            <input
                placeholder="Search"
                value={pokemon}
                onChange={(e) => searchPokemon(e.target.value)}
                className="search-box"
            />
        </>

    );
}

export default Searchbox;