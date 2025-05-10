import React from 'react';
import MultiPageEditor from './components/MultiPageEditor';
import './App.css';

function App() {
  return (
    <div className="App tfu-web-editor">
      <h1 className="text-center text-2xl font-bold my-4">Fabric.js Multi-Page Editor</h1>
      <MultiPageEditor />
    </div>
  );
}

export default App;
