import './App.css';
import { MsalProvider} from "@azure/msal-react";
import { Register } from './Register';
import { Provider } from "./Context/ContextExternos"

 function App({msalInstance}) {

  return (
      <Provider>
        <MsalProvider instance={msalInstance}>
              <div className="App" >
                <header className="App-header">
                  <Register />
                </header>
              </div>
        </MsalProvider>
      </Provider>
  );
}

export default App;
