import React from 'react';
import logo from './logo.svg';
import SudokuGrid from './components/SudokuGame';
import './App.css';
import GameSection from './components/GameSection';

function App() {
  return (
    <div className="App">
      {/* <h1>Sudoku</h1> */}
      <GameSection/>
    </div>
  );
}

export default App;
