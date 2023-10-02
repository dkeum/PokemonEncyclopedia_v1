import axios from "axios";
import { useState, useEffect, useCallback} from "react";
import LoadPokemonData from "../components/LoadPokemonCard";
import Searchbox from "../components/SearchBox";
import { Col, Container, Row } from "react-bootstrap";



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
      <div style={{"marginTop": "10rem"}}>

          <div>
            <Container>
              <Row>
                <Col>
                  <div className="d-flex text-center flex-column">
                   <Row>
                    <h1>PokeDex</h1>
                    <span className="mt-2" >Search for Pokemon</span>
                   </Row>
                   <Row className="justify-content-center">
                   <Searchbox searchPokemon={searchPokemon} pokemon={pokemon} />
                   </Row>
                   </div>
                </Col>
              </Row>
            
           
            </Container>
            
          </div >

          <div className="mt-5">
            {pokemon ? (
              <LoadPokemonData pokemons={pokemonSearchData} />
            ) : (
              <LoadPokemonData pokemons={pokemonData.slice(0,100)} />
            )}
          </div>
      </div>
    </>
  );
};

export default PokemonEncyclopedia;
