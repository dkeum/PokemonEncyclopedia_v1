import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import '../css/pokemoncard.css'

const LoadPokemonData = (props) => {
  const { pokemons } = props;

  return (
    <Container>
      <Row className="d-flex flex-row">
        {pokemons.map((data, i) => (
          <Col key={`${i}`}  className="d-flex justify-content-center mb-3">
            <Card className="pokemon-card text-center">
              <Link to={`/PokemonEncyclopedia_v1/pokemonencyclopedia/${data.url.substring(34, 34 + Math.abs(data.url.length - 36 + 1))}`}>
                <Card.Img
                  variant="top"
  
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.url.substring(34, 34 + Math.abs(data.url.length - 36 + 1))}.png`}
                  alt="pokemon"
                />
              </Link>
              <Card.Body>
                <Card.Title>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LoadPokemonData;
