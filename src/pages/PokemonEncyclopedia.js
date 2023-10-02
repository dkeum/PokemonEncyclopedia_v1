import axios from "axios";
import { useState, useEffect, useCallback} from "react";
import LoadPokemonData from "../components/LoadPokemonCard";
import Searchbox from "../components/SearchBox";

const PokemonEncyclopedia = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonSearchData, setPokemonSearchData] = useState([]); // Holds the top 20 results of the search query

  // Get all Pokémon on mount
  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=811`;
        const res = await axios.get(url);
        setPokemonData(res.data.results);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPokemon();
    // eslint-disable-next-line
  }, []);

  const searchPokemon = useCallback(
    (query) => {
      setPokemon(query);
      const filteredPokemon = pokemonData
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 20);
      const sortedList = [...filteredPokemon].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPokemonSearchData(sortedList);
    },
    [pokemonData]
  );

  return (
    <>
      <Searchbox searchPokemon={searchPokemon} pokemon={pokemon} />
      {pokemon ? (
        <LoadPokemonData pokemons={pokemonSearchData} />
      ) : (
        <LoadPokemonData pokemons={pokemonData.slice(0,100)} />
      )}
    </>
  );
};

export default PokemonEncyclopedia;
