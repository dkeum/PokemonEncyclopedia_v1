import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../css/homepage.css"; // Import your CSS file where you define the styles

const MainContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="background-animation">
        <Container style={{height:"90vh"}}>
          <Row>
            <Col>
              <h1 className="text-center mt-5">Welcome to Pokemon Encyclopedia</h1>
              <div className="d-flex position-relative justify-content-center mt-5 image-container ">
                <img src={require("../assets/openpokeball.png")} alt="Pokemon" />
                <button className="border-0" onClick={() => { navigate('/PokemonEncyclopedia_v1/pokemonencyclopedia') }}>
                  <p className="flex font-weight-bold align-center pt-3" ><b> Enter</b></p>  
                </button>
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
