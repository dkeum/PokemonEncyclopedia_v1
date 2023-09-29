

const LoadPokemonData = (props) =>{

    const {pokemons} = props;

    return(
        <>
        {pokemons.map((data,i) => (
              <div className="container">
              
                <img key={`${data.url.substring(34, 34+Math.abs(data.url.length-36+1))}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.url.substring(34, 34+Math.abs(data.url.length-36+1))}.png`} alt="pokemon" />
            
                <h2 key={`${data.name}`} >{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                {/* <div className="divTable">
                  <div className="divTableBody">
                    <div className="divTableRow">
                      <div className="divTableCell">Type</div>
                      <div className="divTableCell">{data.types[0].type.name}</div>
                    </div>
                    <div className="divTableRow">
                      <div className="divTableCell">Height</div>
                      <div className="divTableCell">
                        {" "}
                        {Math.round(data.height * 3.9)}"
                      </div>
                    </div>
                    <div className="divTableRow">
                      <div className="divTableCell">Weight</div>
                      <div className="divTableCell">
                        {" "}
                        {Math.round(data.weight / 4.3)} lbs
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
            </>
         );
}

export default LoadPokemonData;