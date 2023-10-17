import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const GuessThePokemonImage = () => {
  const [randomPokemon, setRandomPokemon] = useState("");
  const [randomPokemonURL, setRandomPokemonURL] = useState("");
  const [guessedPokemon, setGuessedPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [numOfTries, setNumOfTries] = useState(5); // initial num of tries

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
    };
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
    if (numOfTries === 0) {
      return;
    } else {
      if (guessedPokemon === randomPokemon) {
        setNumOfTries(0);
      } else {
        if (numOfTries > 0) {
          setNumOfTries((prev) => prev - 1);
        }
      }
      console.log(randomPokemon);
    }
  };

  const buttonHandler = () => {
    // Generate a new pokemon
    let randomNumber = Math.floor(Math.random() * 811);
    setRandomPokemonURL(pokemonData[randomNumber].url);
    setRandomPokemon(pokemonData[randomNumber].name);
    setGuessedPokemon("");
    setNumOfTries(5);
    setGameEnded(!gameEnded);
  };

  const imageStyle = {
    width: "300px",
    height: "300px",
    overflow: "hidden",
    clipPath: `inset(${90 + numOfTries * 8}px ${90 + numOfTries * 8}px ${90 + numOfTries * 8}px ${90 + numOfTries * 8}px)`,
  };

  return (
    <div className="min-vh-100" style={{ marginTop: "10rem" }}>
      <h1 className="text-center">Who's that Pokemon</h1>

      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            {randomPokemonURL && numOfTries === 0 && (
              <>
              <div className="d-flex flex-row text-center align-items-center">
                <img
                  width="300px"
                  height="300px"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonURL.substring(
                    34,
                    34 + Math.abs(randomPokemonURL.length - 36 + 1)
                  )}.png`}
                  alt="guess the pokemon"
                />
                <h1>It's {randomPokemon} !!!</h1>
                </div>
              </>
            )}

            {randomPokemonURL && numOfTries !== 0 ? (
              <img
                style={imageStyle}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonURL.substring(
                  34,
                  34 + Math.abs(randomPokemonURL.length - 36 + 1)
                )}.png`}
                alt="guess the pokemon"
              />
            ) : (
              <></>
            )}
          </Col>
          
          <Col className="d-flex justify-content-center mb-5 mt-5">
            {numOfTries !== 0 && (
              <form onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  placeholder="Guess the Pokemon here"
                  value={guessedPokemon}
                  onChange={(e) => setGuessedPokemon(e.target.value)}
                />
              </form>
            )}
            {numOfTries === 0 && (
                  <button className="border border-primary btn btn-primary " onClick={buttonHandler}>
                     Play Again?
                  </button>
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
  );
};

export default GuessThePokemonImage;
