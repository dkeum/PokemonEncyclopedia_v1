import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";

const GuessThePokemonWord = () => {
  const [randomPokemon, setRandomPokemon] = useState("");
  const [guessedPokemon, setGuessedPokemon] = useState("");
  const [allGuessedPokemons, setAllGuessedPokemons] = useState([]);
  const [allLetterColors, setAllLetterColors] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  // Refs for input elements
  const inputRefs = [];

  // Initialize guessedPokemon array with empty values
  useEffect(() => {
    if (randomPokemon) {
      setGuessedPokemon(Array.from({ length: randomPokemon.length }, () => ""));
    }
  }, [randomPokemon]);

  // Initialize letterColors array with empty values
  useEffect(() => {
    if (randomPokemon) {
      const initialColors = Array.from({ length: randomPokemon.length }, () => "");
      setAllGuessedPokemons([initialColors]);
    }
  }, [randomPokemon]);

  //get all pokemons on mount
  //initialize the pokemon starter image
  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=811`;
        const res = await axios.get(url);
        setPokemonData(res.data.results);
        let randomNumber = Math.floor(Math.random() * 811);
        setRandomPokemon(res.data.results[randomNumber].name);
      } catch (e) {
        console.log(e);
      }
    };
    getAllPokemon();

    // eslint-disable-next-line
  }, []);

  const handleInputChange = (event, index) => {
    const { value } = event.target;

    // Update the guessedPokemon array with the entered value
    const newGuessedPokemon = guessedPokemon.slice();
    newGuessedPokemon[index] = value;
    setGuessedPokemon(newGuessedPokemon);

    // Move focus to the next input field if not the last input
    if (index < inputRefs.length - 1 && value.length === 1) {
      inputRefs[index + 1].focus();
    } else if (index === inputRefs.length - 1 && value.length === 1) {
      // All letters are filled, evaluate the guess
      evaluateGuess(newGuessedPokemon);
    }
  };

  const evaluateGuess = (guess) => {
    const isCorrect = guess.join("") === randomPokemon;
    if(isCorrect === true){
        setGameEnded(true);
    }
    const newGuessedPokemons = [...allGuessedPokemons, guess];

    let tempColors = [];
    // Create an array with the letter colors (green for correct, red for incorrect)
     guess.map((letter, index) =>
      tempColors.push({ letter: letter, color: letter === randomPokemon[index] ? "green" : "red" })
    );

    setAllLetterColors([...allLetterColors, tempColors]);

    setAllGuessedPokemons(newGuessedPokemons);

    // Clear current input boxes for new inputs
    setGuessedPokemon(Array.from({ length: randomPokemon.length }, () => "")); // Clear the input boxes here

    // Focus on the first input box
    if (inputRefs[0]) {
      inputRefs[0].focus();
    }
    console.log(randomPokemon);
  };

  const buttonHandler = () => {
    // Generate a new Pokémon
    let randomNumber = Math.floor(Math.random() * 811);
    setRandomPokemon(pokemonData[randomNumber].name);
    setGuessedPokemon(Array.from({ length: randomPokemon.length }, () => ""));
    setGameEnded(false);
    setAllGuessedPokemons([]);
    setAllLetterColors([]); // Clear letter colors

    // Focus on the first input box
    if (inputRefs[0]) {
      inputRefs[0].focus();
    }
  };

  return (
    <>
    <div style={{"marginTop": "7rem"}}>
          <h1>Who's that Pokemon</h1>

          {gameEnded === true && <button onClick={buttonHandler}>Play Again?</button>}

          <div className="pokemon-name">
            {randomPokemon &&
              randomPokemon.split("").map((letter, index) => (
                <div key={index}>
                  <input
                    ref={(el) => (inputRefs[index] = el)}
                    className={`letter-box text-center ${allGuessedPokemons.length === 0 ? "white" : ""}`}
                    type="text"
                    value={guessedPokemon === "" ? "" : guessedPokemon[index] }
                    onChange={(e) => handleInputChange(e, index)}
                    maxLength={1}
                  />
                </div>
              ))}
          </div>

          <div className="guessed-pokemons">
            <Container>
              {allLetterColors.map((guessword, guessIndex) => (
                <Row key={guessIndex} className="d-flex justify-content-center">
                  {guessword.map((guessletter, letterIndex) => (
                    <Col key={letterIndex + guessIndex} style={{ width: "10px" }}>
                      <div className="letter-box text-center" style={{ backgroundColor: guessletter.color }}>
                        {guessletter.letter}
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
            </Container>
          </div>
      </div>
    </>
  );
};

export default GuessThePokemonWord;
