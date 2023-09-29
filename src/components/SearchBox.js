const Searchbox = ({searchPokemon, pokemon}) => {

    return(
        <>
            <input
                placeholder="Search"
                value={pokemon}
                onChange={(e) => searchPokemon(e.target.value)}
                />
        </>

    );
}

export default Searchbox;