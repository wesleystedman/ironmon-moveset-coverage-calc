import React, { useEffect, useState } from "react";
import './App.css';
import Controls from './components/Controls';
import Results from './components/Results';

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

function App() {
  const [version, setVersion] = useState('ruby-sapphire');
  const [forceEvo, setForceEvo] = useState(false);
  const [selectedMoveTypes, setSelectedMoveTypes] = useState([]);

  useEffect(() => {
    console.log('selected version: ', version);
    console.log('force fully evolved: ', forceEvo);
    console.log('types: ', selectedMoveTypes);
  })

  function calculate() {
    POKEMON_RANGES[version].forEach(index => {
      console.log(POKEMON_DATA[index]);
    })
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
      <Results />
    </div>
  );
}

export default App;
