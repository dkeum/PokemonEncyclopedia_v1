import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import PokemonEncyclopedia from './pages/PokemonEncyclopedia';
import PokemonMiniGame from './pages/PokemonMiniGame';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
      <BrowserRouter>
        <div id="page-body">
          <NavBar/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/pokemonencyclopedia" element={<PokemonEncyclopedia/>}/>
              <Route path="/pokemonminigame" element={<PokemonMiniGame/>}/> 
          </Routes>
        </div>
         <Footer/>
      </BrowserRouter>
  );
}

export default App;
