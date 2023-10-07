import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import '../css/pokemonminigame.css'

const PokemonMiniGame = () => {
  const [randomPokemon, setRandomPokemon] = useState("");
  const [randomPokemonURL, setRandomPokemonURL] = useState("");
  const [guessedPokemon, setGuessedPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [numOfTries, setNumOfTries] = useState(5); // initial num of tries
  const [gameWon, setGameWon] = useState(false);

  // Get all pokemons on mount
  // Initialize the pokemon starter image
  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=811`;
        const res = await axios.get(url);
        setPokemonData(res.data.results);
        let randomNumber = Math.floor(Math.random() * 811);
        setRandomPokemonURL(res.data.results[randomNumber].url);
        setRandomPokemon(res.data.results[randomNumber].name);
      } catch (e) {
        console.log(e);
      }
    }
    getAllPokemon();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gameEnded) {
      let randomNumber = Math.floor(Math.random() * 811);
      setRandomPokemonURL(pokemonData[randomNumber].url);
      setRandomPokemon(pokemonData[randomNumber].name);
    }
  }, [gameEnded, pokemonData]);

  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent page refresh
    if (guessedPokemon === randomPokemon) {
      setNumOfTries(0);
      setGameWon(true);
    } else {
      if (numOfTries > 0) {
        setNumOfTries((prev) => prev - 1);
      }
    }
    console.log(randomPokemon);
  };

  const buttonHandler = () => {
    // Generate new pokemon
    let randomNumber = Math.floor(Math.random() * 811);
    setRandomPokemonURL(pokemonData[randomNumber].url);
    setRandomPokemon(pokemonData[randomNumber].name);
    setGuessedPokemon("");
    setNumOfTries(5);
    setGameEnded(!gameEnded);
    setGameWon(false);
  };

  return (
    <>
      <div style={{ marginTop: "6rem" }}>
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Who's that Pokemon</h1>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              {randomPokemonURL && (
                <img
                  width="300px"
                  height="300px"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonURL.substring(34, 34 + Math.abs(randomPokemonURL.length - 36 + 1))}.png`}
                  alt="guess the pokemon"
                />
              )}
            </Col>
            <Col className="d-flex flex-column align-items-center">
              {gameWon && <h1>You correctly guessed {randomPokemon}</h1>}
              {numOfTries !== 0 && (
                <form className="submit-handler" onSubmit={onSubmitHandler}>
                  <input
                    type="text"
                    placeholder="Guess the Pokemon here"
                    value={guessedPokemon}
                    onChange={(e) => setGuessedPokemon(e.target.value)} // Update state when input changes
                  />
                </form>
              )}
              {(numOfTries === 0 || gameWon === true) && (
                <div className="d-flex flex-column align-items-center mt-3">
                  {gameWon === false && <p className="fs-3">The pokemon was {randomPokemon}</p>}
                  <button className="btn btn-primary" onClick={buttonHandler}>Play Again?</button>
                </div>
              )}
            </Col>
            <Col className="d-flex flex-column justify-content-center ms-5">
              {[5, 4, 3, 2, 1].map((triesLeft, index) => (
                <img
                  key={index}
                  className="img-life my-2"
                  width="50px"
                  height="50px"
                  src={numOfTries >= triesLeft ? require(`../assets/heartlife.png`) : require(`../assets/heartlife_empty.png`)}
                  alt="heart life"
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default PokemonMiniGame;
