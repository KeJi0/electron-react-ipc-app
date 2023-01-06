import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [result,setResult] = useState('');
  const handleClick = async () => {
      const a = await window.electronAPI.findAll();
      console.log(a)
      setResult(JSON.stringify(a))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>发送请求</button>
        <textarea value={result}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
