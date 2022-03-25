import React, { useEffect, useState } from "react";
import './App.css';
import Controls from './components/Controls/Controls';
import Results from './components/Results/Results';
import getTypeEffectiveness from "./type-effectiveness";

const POKEMON_DATA = require('./pokemonData.json');

const POKEMON_RANGES = {
  'red-blue': range(0, 150),
  'gold-silver': range(0, 250),
  'ruby-sapphire': range(0, 385),
  'diamond-pearl': range(0, 492),
  'platinum': range(0, 492).concat(range(807, 812), range(814, 818)),
  'black-white': range(0, 648).concat(range(807, 824)),
  'black-2-white-2': range(0, 648).concat(range(807, 829)),
  'x-y': range(0, 720).concat(range(807, 869)),
  'omega-ruby-alpha-sapphire': range(0, 720).concat(range(807, 885), range(892, 896)),
  'sun-moon': range(0, 801).concat(range(807, 885), range(892, 898), range(906, 921), 923, 924, 926, range(929, 933), 942),
  'ultra-sun-ultra-moon': range(0, 885).concat(range(892, 898), range(906, 921), 923, 924, 926, range(929, 933), 942, 958, range(961, 963)),
  'renegade-platinum': range(0, 492).concat(range(807, 812), range(814, 818)), // same as platinum
}

const VERSION_TO_TYPE_CHART = {
  'red-blue': 'gen1',
  'gold-silver': 'gen2',
  'ruby-sapphire': 'gen2',
  'diamond-pearl': 'gen2',
  'platinum': 'gen2',
  'black-white': 'gen2',
  'black-2-white-2': 'gen2',
  'x-y': 'gen6',
  'omega-ruby-alpha-sapphire': 'gen6',
  'sun-moon': 'gen6',
  'ultra-sun-ultra-moon': 'gen6',
  'renegade-platinum': 'gen6',
}

// generate an array of integers from start to end, inclusive
function range(start, end) {
  return [...Array(end - start + 1).keys()].map(x => x + start);
}

function App() {
  const [version, setVersion] = useState('ruby-sapphire');
  const [forceEvo, setForceEvo] = useState(false);
  const [selectedMoveTypes, setSelectedMoveTypes] = useState([]);
  const [resultArrays, setResultArrays] = useState({
    '0': [],
    '0.25': [],
    '0.5': [],
    '1': [],
    '2': [],
    '4': [],
  });


  useEffect(() => {
    console.log('selected version: ', version);
    console.log('force fully evolved: ', forceEvo);
    console.log('types: ', selectedMoveTypes);
    console.log('results: ', resultArrays);
  })

  function calculate() {
    if (selectedMoveTypes.length === 0) return; // abort if no moves selected
    let results = {
      '0': [],
      '0.25': [],
      '0.5': [],
      '1': [],
      '2': [],
      '4': [],
    }
    POKEMON_RANGES[version].forEach(index => {
      // console.log(POKEMON_DATA[index]);
      let pokemon = POKEMON_DATA[index];
      if (forceEvo && pokemon.canEvolve[version]) return;
      let bestEffectiveness = selectedMoveTypes.reduce(
        (acc, moveType) => Math.max(getTypeEffectiveness(VERSION_TO_TYPE_CHART[version], moveType, pokemon.types[version]), acc),
        getTypeEffectiveness(VERSION_TO_TYPE_CHART[version], selectedMoveTypes[0], pokemon.types[version])
      )
      // Shedinja/Wonder Guard handling
      if (pokemon.name === 'shedinja' && bestEffectiveness < 2) {
        bestEffectiveness = 0;
      }
      // adding only sprite URL to array for now, might expand later
      results[bestEffectiveness.toString()].push(pokemon.sprite);
    });
    setResultArrays(results);
  }

  return (
    <div className='App'>
      <header className='Header'>
        <h1>
          Ironmon Moveset Coverage Calculator
        </h1>
      </header>
      <Controls
        version={version}
        setVersion={setVersion}
        forceEvo={forceEvo} setForceEvo={setForceEvo}
        selectedMoveTypes={selectedMoveTypes} setSelectedMoveTypes={setSelectedMoveTypes}
        calculate={calculate}
      />
      <Results resultArrays={resultArrays} />
    </div>
  );
}

export default App;
