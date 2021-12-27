// To use this script, you must first add "type": "module" to package.json.
// This breaks other things, but this script doesn't need to run except to
// generate the Pokemon data file, so just remove it afterwards.
import Pokedex from 'pokedex-promise-v2';
import * as fs from 'fs';
const P = new Pokedex();

// reduced list of pokeapi game version strings,
// covering only the versions we care about
const VERSIONS = [
  'red-blue',
  'gold-silver',
  'ruby-sapphire',
  'diamond-pearl',
  'platinum',
  'black-white',
  'black-2-white-2',
  'x-y',
  'omega-ruby-alpha-sapphire',
  'sun-moon',
  'ultra-sun-ultra-moon',
]

const VERSION_TO_GENERATION_NUM = {
  'red-blue': 1,
  'gold-silver': 2,
  'ruby-sapphire': 3,
  'diamond-pearl': 4,
  'platinum': 4,
  'black-white': 5,
  'black-2-white-2': 5,
  'x-y': 6,
  'omega-ruby-alpha-sapphire': 6,
  'sun-moon': 7,
  'ultra-sun-ultra-moon': 7,
}

const GENERATION_NAME_TO_NUM = {
  'generation-i': 1,
  'generation-ii': 2,
  'generation-iii': 3,
  'generation-iv': 4,
  'generation-v': 5,
  'generation-vi': 6,
  'generation-vii': 7,
}

let pokemonList = [];

// 1-807 are base forms, 10001-10157 are alternate forms, mega evolutions, etc.
P.getPokemonByName([...Array(807).keys()].map(x => x + 1).concat([...Array(157).keys()].map(x => x + 10001)))
  .then(resp => {
    resp.forEach(pokemon => {
      let reducedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        types: {},
        canEvolve: {},
      }

      VERSIONS.forEach(version => {
        reducedPokemon.types[version] = [];
        if (pokemon.past_types.length > 0 && VERSION_TO_GENERATION_NUM[version] <= GENERATION_NAME_TO_NUM[pokemon.past_types[0].generation.name]) {
          pokemon.past_types[0].types.forEach(typeObj => {
            reducedPokemon.types[version].push(typeObj.type.name);
          });
        } else {
          pokemon.types.forEach(typeObj => {
            reducedPokemon.types[version].push(typeObj.type.name);
          });
        }
      });

      // evolution data is at a different API endpoint, so give this placeholder data for now
      VERSIONS.forEach(version => {
        reducedPokemon.canEvolve[version] = false;
      });

      pokemonList.push(reducedPokemon);
    });
  })
  .then(() => {
    // 427 is the last gen 7 family (Zeraora).  There are 8 gaps between 210 and 251, so we have to skip them to avoid 404s.
    // Also, this data doesn't take old versions or certain forms into account, so the data will require manual intervention.
    let chainIds = [...Array(209).keys()].map(x => x + 1).concat([
      211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 223, 224, 228, 229, 230, 232, 
      233, 234, 235, 236, 237, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250
    ]).concat([...Array(176).keys()].map(x => x + 252))
    P.getEvolutionChainById(chainIds)
      .then(resp => {
        resp.forEach(evoChain => {
          processEvoChain(evoChain.chain);
        })
        // console.log(pokemonList);
      })
      .then(() => {
        fs.writeFileSync('pokemonData.json', JSON.stringify(pokemonList));
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    console.error(error);
  });


function processEvoChain(chainUnit) {
  let targetName = chainUnit.species.name;
  let targetCanEvolve = !!(chainUnit.evolves_to.length);

  let target = pokemonList.find(pokemon => pokemon.name === targetName);
  if (!!target) {
    VERSIONS.forEach(version => {
      target.canEvolve[version] = targetCanEvolve;
    });
  }

  if (targetCanEvolve) {
    chainUnit.evolves_to.forEach(evo => processEvoChain(evo));
  }
}