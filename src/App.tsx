import React from 'react';
import logo from './logo.svg';
import SudokuGrid from './components/SudokuGame';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Sudoku</h1>
      <SudokuGrid />
    </div>
  );
}

export default App;
