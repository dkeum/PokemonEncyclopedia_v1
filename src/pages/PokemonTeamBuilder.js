import Searchbox from "../components/SearchBox";
import { Container, Col, Row } from "react-bootstrap";


import { useState, useEffect } from "react";
import axios from "axios";

const PokemonTeamBuilder = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonEggs, setPokemonEggs] = useState([{}, {}, {}, {}, {}, {}]);
  const [pokemon, setPokemon] = useState(""); // Keep the pokemon state

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

  // Function to generate 6 random Pokémon and update pokemonEggs
  const generateRandomTeam = () => {
    const randomIndices = [];
    while (randomIndices.length < 6) {
      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    const newPokemonEggs = randomIndices.map((index) => ({
      name: pokemonData[index].name,
      url: pokemonData[index].url,
    }));

    setPokemonEggs(newPokemonEggs);
  };

  // Function to add a single Pokémon (you can customize this)
  const addPokemon = () => {
    console.log(`Adding Pokemon: ${pokemon}`);
    setPokemon(); // cjange
  };

  return (
    <>
    {/* searchPokemon={searchPokemon} pokemon={pokemon} */}
      <div style={{"margin-top": "7rem"}}>

          <h1>Pokemon Team Builder</h1>
          <Searchbox /> 
          <button onClick={addPokemon}>Add Pokemon</button>
          <button onClick={generateRandomTeam}>Generate Random Team</button>
          <Container>
            <Row>
              {pokemonEggs.map((pokemon, i) => (
                <Col key={i}>
                  {pokemon.url ? (
                    <>
                    <img
                      key={`pokemon-${i}`}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.substring(
                        34,
                        34 + Math.abs(pokemon.url.length - 36 + 1)
                      )}.png`}
                      alt="pokemon"
                    />
                        <p>{pokemon.name}</p>
                    </>
                    
                  ) : (
                    <img
                        width="200px"
                        height="auto"
                      src={require("../assets/PokemonEgg.webp")}
                      alt="pokemon-egg"
                    />
                  )}
                </Col>
              ))}
            </Row>
          </Container>
      </div>
    </>
  );
};

export default PokemonTeamBuilder;
