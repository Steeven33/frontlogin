import logo from './logo.svg';
import './App.css';
import { MsalProvider} from "@azure/msal-react";
import { Register } from './Register';


 function App({msalInstance}) {
  // var usuario = "";
  // var contrasenia = "";
  // async function login(){
  //   var url = "https://localhost:7157/api/Usuario/Get?nombre=" + usuario  + "&contrasenia=" + contrasenia;
  //   let result = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   });
  //   console.log(result.json());
  // }

  return (
    <MsalProvider instance={msalInstance}>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Register />
      </header>
    </div>
    </MsalProvider>
  );
}

export default App;
