import logo from './logo.svg';
import './App.css';
import st1 from './data/json/st-1.json';
import { useState } from 'react';

function App() {
  const target = st1[0];
  const [name, setName] = useState("");
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkName = () => {
    setAttempts(attempts + 1);
    if (name.toLowerCase() === target.name.toLowerCase())
      setCorrect(true);
  }

  const checkEnter = (e) => {
    if (e.key === 'Enter')
      checkName();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input onChange={(e) => setName(e.target.value)} onKeyDown={checkEnter}/>
        <button onClick={checkName}>
          Check
        </button>
        {correct && <p>That's correct!</p>}
        {attempts > 0 && !correct && <p>Wrong, try again!</p>}
      </header>
    </div>
  );
}

export default App;
