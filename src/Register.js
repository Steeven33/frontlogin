import { SignInButton } from "./SignInButton"
import React, { useState, useEffect } from "react";
import { Home } from "./Home";
import logo from './logo.svg';
import { useMsal } from "@azure/msal-react";
import ContextExternos from './Context/ContextExternos';


export const Register = ()=>{


    // variables
    var usuario = "";
    var contrasenia = "";
    var id = "8b4d2abb-713b-4731-a7b0-d89b358cb8eb";
    
    const [data, setData] = useState("");
    const [response, setResponse] = useState("");
    const { instance } = useMsal();
    const [userconfival, setUserconfival] = useState('');
    const [userexterno, setUserexterno] = useState('');


    // mantiene el context de microsoft con login
    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if(currentAccount){
            var nombreUsuario = currentAccount.username;
            setUserconfival(nombreUsuario);
        }
    }, [instance]);
    
    // permiste iniciar sesion de externos
    function login(){
        setUserexterno(usuario);
        var url = "/api/cuentas/inicioSesion?secret=44c4ec5dec97a44efa4ade06f7eb4b27030ffc980c5d6960c333c4fa5581734f";
        const result = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers' : 'Content-Type',
                'mode': 'no-cors',
                'referrerPolicy': 'no-referrer',
                'withCredentials': true,    
                'crossorigin': true  
            },
            body: JSON.stringify({
                "id": id,
                "email": usuario,
                "password": contrasenia
            })
        }).then(res => res.json()).then(info => {
            setData(info.token);
        });
        setResponse(result.value);
    }

    return(
        <ContextExternos.Provider value={{ userName: userexterno, tokenDefault: data }}>
            <div>
                    <div>
                        {data === "" && response === undefined? 
                            <div>
                                <img src={logo} className="App-logo" alt="logo" />
                                <h1>Login page</h1>
                                <p>contraseña o usuario incorrecto</p>
                                    <div>
                                        <div className="col-sm-10 offset-sm-0">
                                            <input type="text" placeholder="usuario" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input><br/>
                                            <input type="password" placeholder="contraseña" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                                            <button onClick={login} className="btn btn-primary">Login</button><br/>
                                                <div className="container">
                                                    <SignInButton />
                                                </div>
                                        </div>
                                    </div>
                            </div>
                        : 
                        userconfival.length > 0 ? <Home /> : data === "" ?
                        <div>
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1>Login page</h1>
                                <div>
                                    <div className="col-sm-10 offset-sm-0">
                                        <input type="text" placeholder="usuario" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input><br/>
                                        <input type="password" placeholder="contraseña" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                                        <button onClick={login} className="btn btn-primary">Login</button><br/>
                                            <div className="container">
                                                <SignInButton />
                                            </div>
                                    </div>
                                </div>
                        </div>
                        : data.length === 129  ? <Home />  
                        :
                        userexterno.length > 0 ? <Home />
                        : data = null }
                    </div>
                </div>
      </ContextExternos.Provider>

    )
}
export default Register


