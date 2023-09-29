// import { useQuery } from "react-query";
import { useState,useEffect} from "react";
import axios from "axios";
import LoadPokemonData from "../components/LoadPokemonCard";

const PokemonEncyclopedia = () =>{
    // const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
    


    const handleChange = (e) => {
        // setPokemon(e.target.value.toLowerCase());
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        getPokemon();
      };

    //get all pokemons
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
            // sortPokemonList(); 
            //sort the list
            
        // eslint-disable-next-line
      },[]);
    
    // const sortPokemonList = useMemo(() =>{

    // },[]);

    const getPokemon = async () => {
      };
    
      return (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                onChange={handleChange}
                placeholder="enter pokemon name"
              />
            </label>
          </form>
          <LoadPokemonData pokemons={pokemonData}/>
        </>

      );
}

export default PokemonEncyclopedia;