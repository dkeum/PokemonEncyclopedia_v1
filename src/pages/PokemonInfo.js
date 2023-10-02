import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import '../css/pokemoninfo.css'

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
        <div className="d-flex flex-column" style={{"margin-top": "6rem"}}>

          {
            <h1 className="text-center mt-5">It's {pokemonData && pokemonData.forms[0].name.charAt(0).toUpperCase() + pokemonData.forms[0].name.slice(1)}</h1>
          }
          <div className="d-flex justify-content-center">
          {pokemonData && <img  className="justify-content-center" width="300px" height="300px" src={pokemonData.sprites.front_default} alt="pokemon"/>}
          </div>
          
          {pokemonData &&
              <table className="table table-striped table-hover custom-table mb-4 mt-2">
              <thead>
                <tr>
                  <th scope="col">Categories</th>
                  <th scope="col">Value</th>
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
                  <td>{((pokemonData.height * 3.9)/39.37).toFixed(3)} m</td>
                </tr>
                <tr>
                  <th scope="row">Weight</th>
                  <td>{Math.round(pokemonData.weight / 4.3)} lbs</td>
                </tr>
              </tbody>
            </table>
            
            
            
          }
                  
          </div>
        </>
    );
}

export default PokemonInfo;