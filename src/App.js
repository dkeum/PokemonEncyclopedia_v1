import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import PokemonEncyclopedia from './pages/PokemonEncyclopedia';
import PokemonMiniGame from './pages/PokemonMiniGame';
import PokemonInfo from './pages/PokemonInfo';
import GuessThePokemonImage from './pages/GuessThePokemonImage';
import GuessThePokemonWord from './pages/GuessThePokemonWord';
import PokemonTeamBuilder from './pages/PokemonTeamBuilder';
import  Navbar  from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div id="page-body">
          <Navbar/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/PokemonEncyclopedia_v1" element={<HomePage/>}/>
              <Route path="/PokemonEncyclopedia_v1/pokemonencyclopedia" element={<PokemonEncyclopedia/>}/>
              <Route path="/PokemonEncyclopedia_v1/pokemonencyclopedia/:pokemonId" element={<PokemonInfo/>}/>
              <Route path="/PokemonEncyclopedia_v1/team-builder" element={<PokemonTeamBuilder/>}/>
              <Route path="/PokemonEncyclopedia_v1/pokemon-game" element={<PokemonMiniGame/>}/> 
              <Route path="/PokemonEncyclopedia_v1/pokemon-image-game" element={<GuessThePokemonImage/>}/>
              <Route path="/PokemonEncyclopedia_v1/pokemon-word-game" element={<GuessThePokemonWord/>}/>
          </Routes>
        </div>

        <Footer/>
      </BrowserRouter>
  );
}

export default App;
