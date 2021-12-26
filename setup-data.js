// To use this script, you must first add "type": "module" to package.json.
// This breaks other things, but this script doesn't need to run except to
// generate the Pokemon data file, so just remove it afterwards.
import Pokedex from 'pokedex-promise-v2';
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

P.getPokemonByName([...Array(3).keys()].map(x => x+1))
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

      // console.log(reducedPokemon);
      pokemonList.push(reducedPokemon);
    });
  })
  .then(() => {
    // console.log(pokemonList);
    P.getEvolutionChainById([...Array(1).keys()].map(x => x+1))
      .then(resp => {
        resp.forEach(evoChain => {
          let name = evoChain.chain.species.name;
          let canEvolve = !!(evoChain.chain.evolves_to.length)
          console.log(name, canEvolve);

          if (canEvolve) {
            // find name in pokemonList
            // set canEvolve values
            // despair, for I must make manual adjustments
          }
        })
      })
  })
  .catch(error => {
    console.error(error);
  });
