import React, { useEffect, useState } from "react";
import './App.css';
import Controls from './components/Controls';
import Results from './components/Results';

function App() {
  const [version, setVersion] = useState('ruby-sapphire');
  const [forceEvo, setForceEvo] = useState(false);

  useEffect(() => {
    console.log('selected version: ', version);
    console.log('force fully evolved: ', forceEvo);
  })

  return (
    <div className='App'>
      <header className='Header'>
        <h1>
          Ironmon Moveset Coverage Calculator
        </h1>
      </header>
      <Controls 
        setVersion={setVersion}
        forceEvo={forceEvo} setForceEvo={setForceEvo} />
      <Results />
    </div>
  );
}

export default App;
