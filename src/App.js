import logo from './logo.svg';
import './App.css';
import { MsalProvider} from "@azure/msal-react";
import { Register } from './Register';


 function App({msalInstance}) {

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
