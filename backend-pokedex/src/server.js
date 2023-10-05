import express from "express";
import {db,connectToDb} from './db.js'
import 'dotenv/config';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'../build')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join(__dirname, '..build/index.html'))
});

app.get('/api/PokemonEncyclopedia_v1/pokemonencyclopedia/:pokemonId/', async (req,res)=>{
    let {pokemonId} = req.params;

    // const pokemon = await db.collection('pokemonInfo')
    pokemonId = parseInt(pokemonId);

    const pokemon = await db.collection('pokemonInfo').findOne({pokemonId});
    // console.log(pokemon);

    if (pokemon) {
        // const upvoteIds = pokemon.upvotes || [];
        res.json(pokemon);
    } else {
        // res.sendStatus("404");
        res.send("Pokemon doesnt exist yet");
    }

});

app.put('/api/PokemonEncyclopedia_v1/pokemonencyclopedia/:pokemonId/upvote', async (req,res)=>{
    let {pokemonId} = req.params;

    // const pokemon = await db.collection('pokemonInfo')
    pokemonId = parseInt(pokemonId);

    const pokemon = await db.collection('pokemonInfo').findOne({pokemonId});

    if(pokemon){
        await db.collection('pokemonInfo').updateOne({pokemonId}, 
        {
            $inc: { upvotes: 1 }
        });
        const updatedPokemon = await db.collection('pokemonInfo').findOne({ pokemonId });
        res.json(updatedPokemon);
    }
    else{
        res.send("Pokemon doesn't exist").status(404);
    }
});

app.post('/api/PokemonEncyclopedia_v1/pokemonencyclopedia/:pokemonId/comments', async (req,res)=>{

    let {pokemonId} = req.params;
    pokemonId = parseInt(pokemonId);
    const {postedBy, text} = req.body;

    await db.collection('pokemonInfo').updateOne({ pokemonId }, {
        $push: { comments: { postedBy, text}  },
    });

    const pokemon = await db.collection('pokemonInfo').findOne({ pokemonId });

    if(pokemon){
        res.json(pokemon);
    }
    else{
        try{
        const newPokemon = {
            pokemonId,
            upvotes: 0,
            comments: [{ postedBy, text }],
        };
        await db.collection('pokemonInfo').insertOne(newPokemon);
        res.json(newPokemon);
        }
        catch(e) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    
});





const PORT = process.env.PORT || 8000; 

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
})