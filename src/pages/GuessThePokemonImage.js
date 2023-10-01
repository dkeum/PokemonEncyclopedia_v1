import { useState, useEffect} from "react";
import axios from "axios";

const GuessThePokemonImage = () =>{

    const [randomPokemon, setRandomPokemon] = useState("");
    const [randomPokemonURL, setRandomPokemonURL] = useState("");
    const [guessedPokemon, setGuessedPokemon] = useState("");  
    const [pokemonData, setPokemonData] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [numOfTries, setNumOfTries] = useState(5); // initial num of tries
    
        
    
    //get all pokemons on mount
    //initialize the pokemon starter image
    useEffect(() => {
        const getAllPokemon = async () =>{
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/?limit=811`;
                const res = await axios.get(url);
                setPokemonData(res.data.results);
                let randomNumber = Math.floor(Math.random()*811);
                setRandomPokemonURL(res.data.results[randomNumber].url);
                setRandomPokemon(res.data.results[randomNumber].name);
              } catch (e) {
                console.log(e);
              }
        }
        getAllPokemon();
        
        // eslint-disable-next-line
         },[]);


    useEffect(() => {
        if(gameEnded){
            let randomNumber = Math.floor(Math.random()*811);
            setRandomPokemonURL(pokemonData[randomNumber].url);
            setRandomPokemon(pokemonData[randomNumber].name);
        }
    },[gameEnded,pokemonData]);

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
      }

    const buttonHandler = () =>{
        //generate new pokemon
        let randomNumber = Math.floor(Math.random()*811);
        setRandomPokemonURL(pokemonData[randomNumber].url);
        setRandomPokemon(pokemonData[randomNumber].name);
        setGuessedPokemon("");
        setNumOfTries(5);
        setGameEnded(!gameEnded);
    }

    const imageStyle = {
        width: "300px",  // Increase the width
        height: "300px", // Increase the height
        overflow: "hidden",
        // transform: "scale(2)", // Zoom in by a factor of 2 
        clipPath: `inset(${90+(numOfTries*8)}px ${90+(numOfTries*8)}px ${90+(numOfTries*8)}px ${90+(numOfTries*8)}px)`, // Clip to a 50x50px center square
      };

    return(
        <>
             <h1>Who's that Pokemon</h1>

             { randomPokemonURL && numOfTries === 0 &&
                <>
                    <img width="300px" height="300px" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonURL.substring(34, 34+Math.abs(randomPokemonURL.length-36+1))}.png`} alt="guess the pokemon"/>
                    <h1>It's {randomPokemon} !!!</h1>
                </>
             }

             { randomPokemonURL && numOfTries !== 0
                ?<img style={imageStyle} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonURL.substring(34, 34+Math.abs(randomPokemonURL.length-36+1))}.png`} alt="guess the pokemon"/>
                : <></>// :  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`} alt="guess the pokemon"/>
                  }
             
             {numOfTries !== 0 && 
             <form onSubmit={onSubmitHandler}>
             <input 
                type="text"
                placeholder="Guess the Pokemon here"
                value={guessedPokemon}
                onChange={(e) => setGuessedPokemon(e.target.value)} // Update state when input changes
                />
             </form>}
             {numOfTries === 0 && <button onClick={buttonHandler}>Play Again?</button>}
        </>
    );
}

export default GuessThePokemonImage;