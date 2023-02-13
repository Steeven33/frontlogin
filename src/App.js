import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


 function App() {
  var usuario = "";
  var contrasenia = "";
  async function login(){
    var url = "https://localhost:7157/api/Usuario/Get?nombre=" + usuario  + "&contrasenia=" + contrasenia;
    let result = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // 'mode': "no-cors",
        // 'credentials': 'include'  
      }
    });
    console.log(JSON.stringify(result))
    console.log(result.json())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>Login page</h1>
          <div>
              <div className="col-sm-10 offset-sm-0">
                <input type="text" placeholder="usuario" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input>
                <br/>
                <input type="password" placeholder="contraseña" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input>
                <br/>
                <br/>
                <button onClick={login} className="btn btn-primary">Login</button>
                <br/>
                <br/>
                <button className="btn btn-success">Login with Microsoft</button>
              </div>
        </div>
      </header>
    </div>
  );
}

export default App;
