import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import AddCommentForm from "../components/AddCommentsForm";
import CommentsList from "../components/CommentList";
import '../css/pokemoninfo.css'
import useUser from "../hooks/useUser";

const PokemonInfo = () => {
  const { pokemonId } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonInfo, setPokemonInfo] = useState({ upvotes: 0, comments: [{ postedBy: "Bob", text: "nice pokemon" }] });

  const {user, isLoading} = useUser();
  
  const baseName= "https://pokemon-encyclopedia-backend.vercel.app"; 

  // Fetch Pokemon data based on the ID from the URL
  useEffect(() => {
    const getPokemon = async () => {
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
  }, [pokemonId]);

  // Load additional Pokemon info, including upvotes and comments
  useEffect(() => {
    const loadPokemonInfo = async () => {
      const response = await axios.get(`${baseName}/api/PokemonEncyclopedia_v1/pokemonencyclopedia/${pokemonId}/`);
      const newPokemonInfo = response.data;

      if (response.data !== "Pokemon doesnt exist yet") {
        setPokemonInfo(newPokemonInfo);
      }
    }
    loadPokemonInfo();
  }, [pokemonId]);

  // Handle the upvote button click
  const buttonHandler = async () => {
    const response = await axios.put(`${baseName}/api/PokemonEncyclopedia_v1/pokemonencyclopedia/${pokemonId}/upvote`, null);
    setPokemonInfo({ ...pokemonInfo, upvotes: response.data.upvotes });
  }

  return (
    <div className="d-flex flex-column" style={{ "marginTop": "10rem" }}>
      <h1 className="text-center mt-5">It's {pokemonData && pokemonData.forms[0].name.charAt(0).toUpperCase() + pokemonData.forms[0].name.slice(1)}</h1>
      <div className="d-flex justify-content-center">
        {pokemonData && <img className="justify-content-center" width="300px" height="300px" src={pokemonData.sprites.front_default} alt="pokemon" />}
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
              <td>{((pokemonData.height * 3.9) / 39.37).toFixed(3)} m</td>
            </tr>
            <tr>
              <th scope="row">Weight</th>
              <td>{Math.round(pokemonData.weight / 4.3)} lbs</td>
            </tr>
          </tbody>
        </table>
      }

<div className="d-grid grid-row gap-3 justify-content-center">
  <div className="d-flex flex-row gap-5 justify-content-center my-5">
    <button className="btn btn-primary btn-lg" style={{ width: '150px' }} onClick={buttonHandler}>
      Upvote
    </button>
    <h1>Upvotes: {pokemonInfo.upvotes}</h1>

  </div>

  <AddCommentForm pokemonId={pokemonId} onCommentAdded={(updatedPokemon) => setPokemonInfo(updatedPokemon)} />
</div>
      {pokemonInfo &&
        <>
          <CommentsList comments={pokemonInfo.comments} />
        </>
      }
    </div>
  );
}

export default PokemonInfo;
