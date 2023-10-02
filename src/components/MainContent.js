import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const MainContent = () =>{
    const navigate = useNavigate();
    return(
        <>
            <div className="background-animation">
                <Container>
                        <Row>
                            <Col>
                                <h1 className="text-center mt-5">Welcome to Pokemon Encyclopedia</h1>
                                <div className="d-flex justify-content-center mt-5">
                                    <img src={require("../assets/openpokeball.png")} alt="Pokemon" /> 
                                    <button onClick={()=>{navigate('/PokemonEncyclopedia_v1/pokemonencyclopedia')}}> Learn more </button>  
                                </div>
                                
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className="d-flex justify-content-center mt-5 wave">
                                    <img src={require("../assets/blastoise-mega.gif")} alt="blastoise" />
                                    <img src={require("../assets/charizard.gif")} alt="charizard" />
                                    <img src={require("../assets/venusaur-mega.gif")} alt="venusaur" />
                                </div>
                            </Col>
                        </Row>

                </Container>

                
                
               
            </div>
        </>
    );
}

export default MainContent; 