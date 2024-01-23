import React from 'react';
import './App.css';
import ApiHandler from './ApiHandler'; // Assurez-vous que le chemin d'importation est correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload de Fichier avec AWS Lambda</h1>
        <ApiHandler />
      </header>
    </div>
  );
}

export default App;
