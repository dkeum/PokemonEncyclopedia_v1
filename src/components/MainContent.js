import { useNavigate } from "react-router-dom";

const MainContent = () =>{
    const navigate = useNavigate();
    return(
        <>
            <div className="background-animation">
                <h1>Welcome to Pokemon Encyclopedia</h1>
                <img src={require("../assets/openpokeball.jpg")} alt="Pokemon" />
                <button onClick={()=>{navigate('/PokemonEncyclopedia_v1/pokemonencyclopedia')}}> Learn more </button>
                <img src={require("../assets/blastoise-mega.gif")} alt="blastoise" />
                <img src={require("../assets/charizard.gif")} alt="charizard" />
                <img src={require("../assets/venusaur-mega.gif")} alt="venusaur" />
            </div>
        </>
    );
}

export default MainContent; 