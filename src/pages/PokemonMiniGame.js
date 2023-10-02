import { useState, useEffect} from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import '../css/pokemonminigame.css'


const PokemonMiniGame = () =>{

    const [randomPokemon, setRandomPokemon] = useState("");
    const [randomPokemonURL, setRandomPokemonURL] = useState("");
    const [guessedPokemon, setGuessedPokemon] = useState("");  
    const [pokemonData, setPokemonData] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [numOfTries, setNumOfTries] = useState(5); // initial num of tries
    const [gameWon, setGameWon] = useState(false);
    
        
    
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


    // const style ={
    //    opacity: `${(numOfTries*20)}%` 
    //    //black image filter
    // }

    useEffect(() => {
        if(gameEnded){
            let randomNumber = Math.floor(Math.random()*811);
            setRandomPokemonURL(pokemonData[randomNumber].url);
            setRandomPokemon(pokemonData[randomNumber].name);
        }
    },[gameEnded,pokemonData]);

    const onSubmitHandler = (event) =>{
        event.preventDefault(); // prevent page refresh
        if(guessedPokemon === randomPokemon){
            setNumOfTries(0);
            setGameWon(true);
        }else{
            if(numOfTries >0){
                setNumOfTries((prev)=> prev-1);
            }
        }
        console.log(randomPokemon);
    }

    const buttonHandler = () =>{
        //generate new pokemon
        let randomNumber = Math.floor(Math.random()*811);
        setRandomPokemonURL(pokemonData[randomNumber].url);
        setRandomPokemon(pokemonData[randomNumber].name);
        setGuessedPokemon("");
        setNumOfTries(5);
        setGameEnded(!gameEnded);
        setGameWon(false);
    }

    return(
        <>
        <div  style={{"margin-top": "6rem"}}>
            
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center" >Who's that Pokemon</h1>
                    </Col>
                </Row>
                <Row>
                   

                        <Col className="d-flex justify-content-end">
                             { randomPokemonURL
                            ?<img width="300px" height="300px" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemonURL.substring(34, 34+Math.abs(randomPokemonURL.length-36+1))}.png`} alt="guess the pokemon"/>
                            :<></>}
                           
                        </Col>
                           

                        <Col className="d-flex justify-content-start">
                            
                            <Col>
                                {gameWon && <h1>You correctly guessed {randomPokemon}</h1>}
                                {numOfTries !== 0 && 
                                <form className="submit-handler" onSubmit={onSubmitHandler}>
                                    <input 
                                        type="text"
                                        placeholder="Guess the Pokemon here"
                                        value={guessedPokemon}
                                        onChange={(e) => setGuessedPokemon(e.target.value)} // Update state when input changes
                                        />
                                    </form>
                                    }
                    
                                {(numOfTries === 0 || gameWon === true) && 
                                    <>
                                        {gameWon === false && <h1>The pokemon was {randomPokemon}</h1>}
                                        <button onClick={buttonHandler}>Play Again?</button>
                                    </>
                                }
                            </Col>
                            <Col className="d-flex flex-column">
                                    {numOfTries >= 5 && <img className="img-life" width="80px" height="80px" src={require(`../assets/heartlife.png`)} alt="heart life"/>}
                                    {numOfTries >= 4 && <img className="img-life" width="80px" height="80px" src={require(`../assets/heartlife.png`)} alt="heart life"/>}
                                    {numOfTries >= 3 && <img className="img-life" width="80px" height="80px" src={require(`../assets/heartlife.png`)} alt="heart life"/>}
                                    {numOfTries >= 2 && <img className="img-life" width="80px" height="80px" src={require(`../assets/heartlife.png`)} alt="heart life"/>}
                                    {numOfTries >= 1 && <img className="img-life" width="80px" height="80px" src={require(`../assets/heartlife.png`)} alt="heart life"/>}
                            </Col>
                            
                         </Col>

                    
                </Row>
            </Container>
             
        
             </div>
        </>
    );
}

export default PokemonMiniGame;