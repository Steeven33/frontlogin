import { SignInButton } from "./SignInButton"
import React, { useState, useEffect } from "react";
import { Home } from "./Components/Home";
import { useMsal } from "@azure/msal-react";
import ContextExternos from './Context/ContextExternos';


export const Register = ()=>{

    // variables
    var usuario = "";
    var contrasenia = "";
    var id = "8b4d2abb-713b-4731-a7b0-d89b358cb8eb";
    
    const [data, setData] = useState("");
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
    }
    return(
        <ContextExternos.Provider value={{ userExterno: userexterno, userConfival: userconfival}}>
            <div>
                    <div>
                        {data === undefined ? 
                            <div>
                                <h1>Login page</h1>
                                <p>contraseña o usuario incorrecto</p>
                                <div>
                                    <div className="row">
                                        <div className="offset-lg-1 col-lg-11">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h2>Bienvenido</h2>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label>Usuario<span className="errmsg">*</span></label>
                                                        <input type="text" placeholder="usuario" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input>
                                                    </div><br/>
                                                    <div className="form-group">
                                                        <label>Password<span className="errmsg">*</span></label>
                                                        <input type="password" placeholder="contraseña" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                                                    </div><br/>
                                                    <div className="form-group">
                                                        <button onClick={login} className="btn btn-primary">Login</button><br/>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="container"><SignInButton /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : 
                        userconfival.length > 0 ? <Home /> 
                        :
                        data === "" ?
                        <div>
                            <h1>Login page</h1><br/>
                                <div>
                                    <div className="row">
                                        <div className="offset-lg-1 col-lg-11">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h2>Bienvenido</h2>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label>Usuario<span className="errmsg">*</span></label>
                                                        <input type="text" placeholder="usuario" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input>
                                                    </div><br/>
                                                    <div className="form-group">
                                                        <label>Password<span className="errmsg">*</span></label>
                                                        <input type="password" placeholder="contraseña" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                                                    </div><br/>
                                                    <div className="form-group">
                                                        <button onClick={login} className="btn btn-primary">Login</button><br/>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="container"><SignInButton /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        : 
                        data.length === 129  ? <Home />  
                        :
                        userexterno.length > 0 ? <Home />
                        : 
                        data = null }
                    </div>
                </div>
      </ContextExternos.Provider>

    )
}
export default Register


