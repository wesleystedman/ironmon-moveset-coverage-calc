import './App.css';
import Controls from './Controls';
import Results from './Results';

function App() {
  return (
    <div className='App'>
      <header className='Header'>
        <h1>
          Ironmon Moveset Coverage Calculator
        </h1>
      </header>
      <Controls />
      <Results />
    </div>
  );
}

export default App;
