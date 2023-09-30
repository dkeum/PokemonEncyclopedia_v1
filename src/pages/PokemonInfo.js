import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const PokemonInfo = () =>{
  const {pokemonId} = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  
  
  useEffect(() => {
    const getPokemon = async () =>{
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
            const res = await axios.get(url);
            setPokemonData(res.data);
          } catch (e) {
            console.log(e);
          }
    }
    getPokemon();
// eslint-disable-next-line
},[]);


    return(
        <>
        <h1>Inside the pokemon info</h1>
          {pokemonData &&<img src={pokemonData.sprites.front_default} alt="pokemon"/>}
          {pokemonData &&
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Type</th>
                  <td>
                    {pokemonData.types.map((attribute, index) => (
                      <React.Fragment key={index}>
                        {attribute.type.name}
                        {index !== pokemonData.types.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Height</th>
                  <td>{Math.round(pokemonData.height * 3.9)}</td>
                </tr>
                <tr>
                  <th scope="row">Weight</th>
                  <td>{Math.round(pokemonData.weight / 4.3)} lbs</td>
                </tr>
              </tbody>
            </table>
            
            
            
          }
                  
    
        </>
    );
}

export default PokemonInfo;