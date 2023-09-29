import { Link } from "react-router-dom";

const LoadPokemonData = (props) =>{

    const {pokemons} = props;

    return(
        <>
        {pokemons.map((data,i) => (
              <div key={`${i}`}className="container">
                  
                  {/* onclick go into the /PokemonEncyclopedia_v1/pokemonencyclopedia/:pokemonId  */}
                  <Link to={`/PokemonEncyclopedia_v1/pokemonencyclopedia/${data.url.substring(34, 34+Math.abs(data.url.length-36+1))}`}>
                    <img key={`${data.url.substring(34, 34+Math.abs(data.url.length-36+1))}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.url.substring(34, 34+Math.abs(data.url.length-36+1))}.png`} alt="pokemon" />
                  </Link>
                <h2 key={`${data.name}`} >{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
              </div>
            ))}
            </>
         );
}

export default LoadPokemonData;