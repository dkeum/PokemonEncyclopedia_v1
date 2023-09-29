// import { useQuery } from "react-query";
import axios from "axios";
import { useState, useEffect, useCallback, useMemo} from "react";
import LoadPokemonData from "../components/LoadPokemonCard";
import Searchbox from "../components/SearchBox";

const PokemonEncyclopedia = () =>{
    const [pokemon, setPokemon] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonSearchData, setPokemonSearchData] = useState([]); //holds the top 20 results of search query

 

    //get all pokemons on mount
      useEffect(() => {
            const getAllPokemon = async () =>{
                try {
                    const url = `https://pokeapi.co/api/v2/pokemon/?limit=811`;
                    const res = await axios.get(url);
                    setPokemonData(res.data.results);
                  } catch (e) {
                    console.log(e);
                  }
            }
            getAllPokemon();
        // eslint-disable-next-line
      },[]);
    

    
    const sortedPokemon = useMemo(
        () => {
            const filteredPokemon = pokemonData.filter((p) => p.name.toLowerCase().includes(pokemon.toLowerCase())).slice(0, 20);
            const sortedList = [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name));
            return(sortedList);
        },
        [pokemon,pokemonData]
    ); 


    const searchPokemon = useCallback((pokemon)=>{
        setPokemon(pokemon);
        setPokemonSearchData(sortedPokemon);
     },[sortedPokemon]);

    
      return (
        <>
          {/* <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                onChange={handleChange}
                value={pokemon}
                placeholder="enter pokemon name"
              />
            </label>
          </form> */}
          <Searchbox searchPokemon={searchPokemon} pokemon={pokemon}/>
           {pokemon 
            ? <LoadPokemonData pokemons={pokemonSearchData}/>
            : <LoadPokemonData pokemons={pokemonData}/>}
        </>

      );
}

export default PokemonEncyclopedia;