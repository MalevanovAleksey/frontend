import logo from './logo.svg';
import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';




function App() {
  const [data, setData] = useState(null)

useEffect(() =>{
  fetch("/hello")
  .then((response) =>response.json())
  .then(response => setData(response.message))
})


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
      {
        !data ? 'иди нахуй' : data[0].idUser
      }
        </p>
       
      </header>
    </div>
  );
}

export default App;
