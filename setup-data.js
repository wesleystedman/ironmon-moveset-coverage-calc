// Because pokedex-promise-v2 is pure ESM, in order to use this script,
// you must first add "type": "module" to package.json.  Create-React-App
// is not fully ready for that yet, so just remove that line afterwards.
// This script is not used at runtime.
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
  'renegade-platinum' // NOTE: ROMHACK
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
  'renegade-platinum': 7 // moves, stats, and types were updated to match gen 7
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

const TYPE_TO_NUM = {
  'normal': 0,
  'fighting': 1,
  'flying': 2,
  'poison': 3,
  'ground': 4,
  'rock': 5,
  'bug': 6,
  'ghost': 7,
  'steel': 8,
  'fire': 9,
  'water': 10,
  'grass': 11,
  'electric': 12,
  'psychic': 13,
  'ice': 14,
  'dragon': 15,
  'dark': 16,
  'fairy': 17
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
            reducedPokemon.types[version].push(TYPE_TO_NUM[typeObj.type.name]);
          });
        } else {
          pokemon.types.forEach(typeObj => {
            reducedPokemon.types[version].push(TYPE_TO_NUM[typeObj.type.name]);
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
        removeEvoVersions('golbat', 2);
        removeEvoVersions('magneton', 4);
        removeEvoVersions('farfetchd', 8);
        removeEvoVersions('onix', 2);
        removeEvoVersions('lickitung', 4);
        removeEvoVersions('rhydon', 4);
        removeEvoVersions('chansey', 2);
        removeEvoVersions('tangela', 4);
        removeEvoVersions('seadra', 2);
        removeEvoVersions('mr-mime', 8);
        removeEvoVersions('scyther', 2);
        removeEvoVersions('electabuzz', 4);
        removeEvoVersions('magmar', 4);
        removeEvoVersions('porygon', 2);

        removeEvoVersions('togetic', 4);
        removeEvoVersions('aipom', 4);
        removeEvoVersions('yanma', 4);
        removeEvoVersions('murkrow', 4);
        removeEvoVersions('misdreavus', 4);
        removeEvoVersions('gligar', 4);
        removeEvoVersions('sneasel', 4);
        removeEvoVersions('piloswine', 4);
        removeEvoVersions('corsola', 8);
        removeEvoVersions('porygon2', 4);

        removeEvoVersions('linoone', 8);
        removeEvoVersions('nosepass', 4);
        removeEvoVersions('roselia', 4);
        removeEvoVersions('dusclops', 4);

        // Pokeapi evo family data puts Phione and Manaphy in the same family.  Without this adjustment, this script thinks Phione is not fully evolved.
        removeEvoVersions('phione', 100);

        addEvoVersions('pumpkaboo-small');
        addEvoVersions('pumpkaboo-average');
        addEvoVersions('pumpkaboo-large');
        addEvoVersions('pumpkaboo-super');

        addEvoVersions('rattata-alola');
        addEvoVersions('sandshrew-alola');
        addEvoVersions('vulpix-alola');
        addEvoVersions('diglett-alola');
        addEvoVersions('meowth-alola');
        addEvoVersions('geodude-alola');
        addEvoVersions('graveler-alola');
        addEvoVersions('grimer-alola');
        addEvoVersions('rockruff-own-tempo');
      })
      .then(() => {
        // Renegade Platinum type changes
        // data sourced from official documentation: https://drive.google.com/drive/folders/1YZl5iShTdRwQIQ7FO1hAJaYBryWxxHwE --> TypeChanges.txt
        // code generated by mass regex find-and-replace
        pokemonList.forEach(pokemon => {
          if (pokemon.name === 'charizard') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['fire'], TYPE_TO_NUM['dragon']];
          if (pokemon.name === 'ninetales') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['fire'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'golduck') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['water'], TYPE_TO_NUM['psychic']];
          if (pokemon.name === 'farfetchd') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['fighting'], TYPE_TO_NUM['flying']];
          if (pokemon.name === 'meganium') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['grass'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'feraligatr') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['water'], TYPE_TO_NUM['dark']];
          if (pokemon.name === 'noctowl') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['psychic'], TYPE_TO_NUM['flying']];
          if (pokemon.name === 'ampharos') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['electric'], TYPE_TO_NUM['dragon']];
          if (pokemon.name === 'misdreavus') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['ghost'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'sceptile') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['grass'], TYPE_TO_NUM['dragon']];
          if (pokemon.name === 'masquerain') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['bug'], TYPE_TO_NUM['water']];
          if (pokemon.name === 'volbeat') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['bug'], TYPE_TO_NUM['electric']];
          if (pokemon.name === 'illumise') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['bug'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'trapinch') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['bug'], TYPE_TO_NUM['ground']];
          if (pokemon.name === 'vibrava') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['bug'], TYPE_TO_NUM['dragon']];
          if (pokemon.name === 'flygon') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['bug'], TYPE_TO_NUM['dragon']];
          if (pokemon.name === 'swablu') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['fairy'], TYPE_TO_NUM['flying']];
          if (pokemon.name === 'altaria') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['dragon'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'seviper') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['poison'], TYPE_TO_NUM['dark']];
          if (pokemon.name === 'milotic') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['water'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'glalie') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['ice'], TYPE_TO_NUM['rock']];
          if (pokemon.name === 'luvdisc') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['water'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'luxray') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['electric'], TYPE_TO_NUM['dark']];
          if (pokemon.name === 'lopunny') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['normal'], TYPE_TO_NUM['fighting']];
          if (pokemon.name === 'mismagius') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['ghost'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'electivire') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['electric'], TYPE_TO_NUM['fighting']];
          if (pokemon.name === 'uxie') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['psychic'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'mesprit') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['psychic'], TYPE_TO_NUM['fairy']];
          if (pokemon.name === 'azelf') pokemon.types['renegade-platinum'] = [TYPE_TO_NUM['psychic'], TYPE_TO_NUM['fairy']];
        });
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

// For pokemon that went from having no evolutions to having one or more, set older games to false
// pokemon: String, pokeapi name
// gen: Number 2, 4, or 8, which gen introduced the evolution
function removeEvoVersions(targetName, evoGen) {
  let target = pokemonList.find(pokemon => pokemon.name === targetName);
  target.canEvolve['red-blue'] = false;
  if (evoGen === 2) return;
  target.canEvolve['gold-silver'] = false;
  target.canEvolve['ruby-sapphire'] = false;
  if (evoGen === 4) return;
  target.canEvolve['diamond-pearl'] = false;
  target.canEvolve['platinum'] = false;
  target.canEvolve['renegade-platinum'] = false;
  target.canEvolve['black-white'] = false;
  target.canEvolve['black-2-white-2'] = false;
  target.canEvolve['x-y'] = false;
  target.canEvolve['omega-ruby-alpha-sapphire'] = false;
  target.canEvolve['sun-moon'] = false;
  target.canEvolve['ultra-sun-ultra-moon'] = false;
}

// For pokemon that evolve but also have a form suffix, causing them to be missed by the evolution-chain data
function addEvoVersions(targetName) {
  let target = pokemonList.find(pokemon => pokemon.name === targetName);
  VERSIONS.forEach(version => {
    target.canEvolve[version] = true;
  });
}