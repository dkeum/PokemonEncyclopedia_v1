import Searchbox from "../components/SearchBox";
import { Container, Col, Row } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

const PokemonTeamBuilder = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonEggs, setPokemonEggs] = useState([{}, {}, {}, {}, {}, {}]);
  const [pokemon, setPokemon] = useState("");
  const [pokemonCounter, setPokemonCounter] = useState(0);

  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=811`;
        const res = await axios.get(url);
        setPokemonData(res.data.results);
      } catch (e) {
        console.error(e);
      }
    };
    getAllPokemon();
  }, []);

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
    setPokemonCounter(0);
  };

  const restartHandler = () => {
    setPokemonEggs([{}, {}, {}, {}, {}, {}]);
    setPokemonCounter(0);
  };

  const addPokemon = async () => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      pokemonEggs[pokemonCounter].name = pokemon;
      pokemonEggs[pokemonCounter].url = `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`;

      if (pokemonCounter <= 4) {
        setPokemonCounter((prev) => prev + 1);
      } else {
        setPokemonCounter(0);
      }
    } catch (error) {
      console.log("this is the error");
      console.error(error);
      pokemonEggs[pokemonCounter].url = "";
    }
    setPokemon("");
  };

  const searchPokemon = useCallback((query) => {
    setPokemon(query);
  }, []);

  return (
    <>
      <div style={{ marginTop: "10rem" }}>
        <h1>Pokemon Team Builder</h1>
        <Searchbox searchPokemon={searchPokemon} pokemon={pokemon} />
        <button onClick={addPokemon}>Add Pokemon</button>
        <button onClick={generateRandomTeam}>Generate Random Team</button>
        <button onClick={restartHandler}>Reset Team</button>
        <Container>
          <Row>
            <Col className="d-flex flex-row justify-content-center">
              {pokemonEggs.map((pokemon, i) => (
                <div key={i}>
                  {console.log(pokemon)}
                  {pokemon.url ? (
                    <>
                      <img
                        key={`pokemon-${i}`}
                        width="200px"
                        height="auto"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.substring(
                          34,
                          34 + Math.abs(pokemon.url.length - 36 + 1)
                        )}.png`}
                        alt="pokemon"
                      />
                      <p className="text-center">{pokemon.name}</p>
                    </>
                  ) : (
                    <img
                      width="200px"
                      height="auto"
                      src={require("../assets/PokemonEgg.webp")}
                      alt="pokemon-egg"
                    />
                  )}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PokemonTeamBuilder;
