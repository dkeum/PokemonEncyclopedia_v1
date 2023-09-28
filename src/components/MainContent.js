const MainContent = () =>{
    

    return(
        <>
            <div className="background-animation">
                <h1>Welcome to Pokemon Encyclopedia</h1>

                <img src={require("../assets/openpokeball.jpg")} alt="Pokemon" />
                <button > Learn More </button>
                <img src={require("../assets/blastoise-mega.gif")} alt="blastoise" />
                <img src={require("../assets/charizard.gif")} alt="blastoise" />
                <img src={require("../assets/venusaur-mega.gif")} alt="blastoise" />
            
            </div>
        </>
    );
}

export default MainContent; 