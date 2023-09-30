import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import {LinkContainer} from 'react-router-bootstrap'

const NavBar = () => {
  return (
    <Navbar expand="lg" className="">
      
        <Navbar.Brand href="#home">
          <img src={require("../assets/pokemonball.png")} alt="Pokemon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Col xs="2" className="d-flex align-items-center">
            <div className="ms-5"> {/* Use ms-3 class for left margin */}
              <Nav className="me-auto">
                
              <LinkContainer to="/PokemonEncyclopedia_v1">
                <Nav.Link className="border border-dark rounded ms-2 bg-light">Home</Nav.Link>
              </LinkContainer>

                <LinkContainer to="/PokemonEncyclopedia_v1/pokemonencyclopedia">
                  <Nav.Link className="border border-dark rounded ms-2 bg-light">Pokemon Encyclopedia</Nav.Link>
                </LinkContainer>


                <LinkContainer to="/PokemonEncyclopedia_v1/team-builder">
                  <Nav.Link className="border border-dark rounded ms-2 bg-light">Team Builder</Nav.Link>
                </LinkContainer>

                <NavDropdown title="MiniGames" id="basic-nav-dropdown" className="border border-dark rounded ms-2 bg-light">
                  <LinkContainer to="/PokemonEncyclopedia_v1/pokemon-game">
                    <NavDropdown.Item >Guess the Pokemon</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/PokemonEncyclopedia_v1/pokemon-image-game">
                    <NavDropdown.Item>Guess the Pokemon from Image</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/PokemonEncyclopedia_v1/pokemon-word-game">
                    <NavDropdown.Item >Guess the Pokemon from Word</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
                
              </Nav>
            </div>
          </Col>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;