import React, { useEffect, useState } from "react";
import './App.css';
import Controls from './components/Controls/Controls';
import Results from './components/Results/Results';
import getTypeEffectiveness from "./type-effectiveness";

const POKEMON_DATA = require('./pokemonData.json');

const POKEMON_RANGES = {
  'red-blue': [...Array(151).keys()],
  'gold-silver': [...Array(251).keys()],
  'ruby-sapphire': [...Array(386).keys()],
  'diamond-pearl': [...Array(493).keys()],
  'platinum': [...Array(493).keys()],
  'black-white': [...Array(649).keys()],
  'black-2-white-2': [...Array(649).keys()],
  'x-y': [...Array(721).keys()],
  'omega-ruby-alpha-sapphire': [...Array(721).keys()],
  'sun-moon': [...Array(802).keys()],
  'ultra-sun-ultra-moon': [...Array(807).keys()],
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
