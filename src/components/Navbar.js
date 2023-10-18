import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap';
import "../css/navbar.scss";
import useUser from '../hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';


const NavBar = () => {

  const { user } = useUser();

  return (
    <div id="nav-wrapper">
      <Navbar id="nav" expand="lg" className="bg-primary bg-gradient">

      <div className="nav left">
        <span className="gradient skew pt-1">
            <Navbar.Brand>
              <img
                width="85"
                height="auto"
                className="ms-5"
                src={require("../assets/pokemonball.png")}
                alt="Pokemon"
              />  
            </Navbar.Brand>
          </span>
        </div>

        <div className="nav right">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Col xs="2" className="d-flex align-items-center">
              <div className="ms-5">
                <Nav className="me-auto">
                  
                  <div className="nav-link active">
                    <LinkContainer to="/PokemonEncyclopedia_v1">
                        <Nav.Link className=" nav-link-span">Home</Nav.Link>
                    </LinkContainer>
                  </div>

                  <div className="nav-link active">
                    <LinkContainer to="/PokemonEncyclopedia_v1/pokemonencyclopedia">  
                        <Nav.Link className="nav-link-span">Pokedex</Nav.Link>
                    </LinkContainer>
                  </div>

                  <div className="nav-link active">
                    <LinkContainer to="/PokemonEncyclopedia_v1/team-builder">
                      <Nav.Link className="nav-link-span">Team Builder</Nav.Link>
                    </LinkContainer>
                  </div>


                  <div  className="nav mt-2 skew ms-2 "style={{"lineHeight": "5em"}} >
                    <NavDropdown
                      title="MiniGames"
                      id="basic-nav-dropdown"
                      size="lg"
                      >
                        <LinkContainer to="/PokemonEncyclopedia_v1/pokemon-game" className="dropdown-item">
                          <NavDropdown.Item >Guess the Pokemon</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/PokemonEncyclopedia_v1/pokemon-image-game" className="dropdown-item">
                          <NavDropdown.Item>Guess the Pokemon from Image</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/PokemonEncyclopedia_v1/pokemon-word-game" className="dropdown-item">
                          <NavDropdown.Item>Guess the Pokemon from Word</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                  </div> 

    

                    <div className="nav mt-2 skew ms-2 ">
                    {user 
                      ? <LinkContainer to="/">
                        <Nav.Link className="nav-link-span">
                          <span><button onClick={()=>(signOut(getAuth()))}>Log out</button></span>
                        </Nav.Link>
                        </LinkContainer>

                      :  <LinkContainer to="/login">
                          <Nav.Link className="nav-link-span">
                            <div className="nav-link active">Log In</div>
                          </Nav.Link>
                        </LinkContainer>
                    }
                    </div>



                </Nav>
              </div>
            </Col>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
